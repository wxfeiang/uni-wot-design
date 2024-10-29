import { cardFirstDbrApplication, getCardcheckInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store'
import { useRequest } from 'alova/client'
import dayjs from 'dayjs'
import cloneDeep from 'lodash-es/cloneDeep'

const read = ref(0)
const { userInfo } = useUserStore()
const serchData = ref({
  xm: userInfo.cardName,
  zjhm: userInfo.idCardNumber,
  zjlx: '1',
  zkType: '1',
  wdcode: '999-130632004',
  areaCode: 'CHN',
})
// 卡前置查询

const {
  loading,
  send: sendCardQury,
  onSuccess: cardQuerySucess,
} = useRequest((data) => getCardcheckInfo(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

// 上传身份证
const modelPhoto = ref({
  url1: '',
  url2: '',
})

// 卡信息提交
const model = ref({
  // 代办人信息
  dbrName: userInfo.cardName,
  dbrType: '',
  dbrZjhm: userInfo.idCardNumber,
  dbrSex: '',
  dbrIdCardFrontPhotoId: '',
  dbrIdCardBackPhotoId: '',
  familyRelation: '',
  dbrPhone: '',
  dbrAddress: '',
  // 申领人信息
  name: '',
  idCardNumber: '',
  idCardType: '',
  sex: '',
  birthdate: '',
  nationality: '',
  nation: '',
  areaCode: '',
  phoneNumber: '',
  address: '',
  startDate: null,
  endDate: null,
  work: '',
  bankCode: '',
  bankBranchCode: '',
  photoId: '',
  idCardFrontPhotoId: '',
  idCardBackPhotoId: '',
  isPostcard: '',
  postcardaddress: '',
  postcardPhone: '',
  postcardName: '',
  idName: '',
})
const rules = {
  dbrName: [{ required: true, message: '请输入代办人姓名' }],
  dbrType: [{ required: true, message: '请选择代办人证件类型' }],
  dbrZjhm: [{ required: true, message: '请输入代办人证件号码' }],
  dbrSex: [{ required: true, message: '请选择代办人性别' }],
  dbrIdCardFrontPhotoId: [{ required: true, message: '请上传代办人证件正面照' }],
  dbrIdCardBackPhotoId: [{ required: true, message: '请上传代办人证件反面照' }],
  familyRelation: [{ required: true, message: '请选择亲属关系' }],
  dbrPhone: [{ required: true, message: '请输入代办人联系手机' }],
  dbrAddress: [{ required: true, message: '请输入代办人地址' }],

  name: [{ required: true, message: '请输入姓名' }],
  idCardNumber: [{ required: true, message: '请输入证件号码' }],
  idCardType: [{ required: true, message: '请选择证件类型' }],
  sex: [{ required: true, message: '请选择性别' }],
  phoneNumber: [{ required: true, message: '请输入手机号码' }],
  birthdate: [{ required: true, message: '请选择出生日期' }],
  nationality: [{ required: true, message: '请选择国籍' }],
  nation: [{ required: true, message: '请选择民族' }],
  areaCode: [{ required: true, message: '请选择地区' }],
  address: [{ required: true, message: '请输入地址' }],
  startDate: [{ required: true, message: '请选择开始日期' }],
  endDate: [{ required: true, message: '请选择结束日期' }],
  work: [{ required: true, message: '请输入工作' }],
  bankCode: [{ required: true, message: '请输入银行代码' }],
  bankBranchCode: [{ required: true, message: '请输入银行网点代码' }],
  photoId: [{ required: true, message: '请输入照片ID' }],
  idCardFrontPhotoId: [{ required: true, message: '请上传身份证正面照片' }],
  idCardBackPhotoId: [{ required: true, message: '请上传身份证反面照片' }],
  isPostcard: [{ required: true, message: '请选择是否邮寄' }],
  postcardName: [{ required: true, message: '请输入收件人地址姓名', trigger: 'blur' }],
  postcardPhone: [{ required: true, message: '请输入收件人地址手机号', trigger: 'blur' }],
  postcardAddress: [{ required: true, message: '请输入收件人地址地址', trigger: 'blur' }],
}
const { loading: loading2, send: sendCardData } = useRequest(
  (data) => cardFirstDbrApplication(data),
  {
    immediate: false,
    loading: false,
  },
)

const submitStatus = ref(0)
const statusDel = ref('')
const submitCard = async (form, flog?: any, all?: any) => {
  if (all) {
    return allsubmit()
  }
  const { valid } = await form.validate()
  if (flog) {
    return valid
  }
  if (valid) {
    return allsubmit()
  }
}
async function allsubmit() {
  try {
    const params = cloneDeep(model.value)
    params.birthdate = dayjs(params.birthdate).format('YYYYMMDD')
    params.startDate = dayjs(params.startDate).format('YYYYMMDD')
    params.endDate = dayjs(params.endDate).format('YYYYMMDD')
    console.log('🌮[params]:', params)

    const data: any = await sendCardData(params)

    if (data.message) {
      submitStatus.value = 2
      statusDel.value = data.message
    } else {
      submitStatus.value = 1
      statusDel.value = '提交成功了!'
    }
  } catch (error) {
    console.log('数据校验失败')
  }
}

export default () => {
  return {
    sendCardQury,
    sendCardData,
    serchData,
    submitCard,
    submitStatus,
    statusDel,
    modelPhoto,
    model,
    rules,
    loading,
    loading2,
    read,
  }
}

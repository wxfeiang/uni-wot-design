import { cardFirstApplication, getCardcheckInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store'
import { useRequest } from 'alova/client'
import dayjs from 'dayjs'
import cloneDeep from 'lodash-es/cloneDeep'
import { statusTisProps } from '../types/types'

const read = ref(false)
const { userInfo } = useUserStore()
const serchData = ref({
  xm: userInfo.userName,
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
  name: userInfo.userName,
  idCardNumber: userInfo.idCardNumber,
  idCardType: '1',
  sex: '',
  birthdate: '',
  nationality: 'CHN',
  nation: '',
  areaCode: '',
  phoneNumber: userInfo.userPhone,
  address: '',
  startDate: null,
  endDate: null,
  work: '',
  bankCode: '',
  bankBranchCode: '',
  photoId: '',
  idCardFrontPhotoId: '',
  idCardBackPhotoId: '',

  idName: '',
  isPostcard: '0',
  postcardName: '',
  postcardPhone: '',
  postcardAddress: '',
})
const rules = {
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
  bankBranchCode: [{ required: true, message: '请选择申领网点' }],
  photoId: [{ required: true, message: '请输入照片ID' }],
  idCardFrontPhotoId: [{ required: true, message: '请上传身份证正面照片' }],
  idCardBackPhotoId: [{ required: true, message: '请上传身份证反面照片' }],
  isPostcard: [{ required: true, message: '请选择是否邮寄' }],
  postcardName: [{ required: true, message: '请输入邮寄人姓名', trigger: 'blur' }],
  postcardPhone: [{ required: true, message: '请输入邮寄人手机号', trigger: 'blur' }],
  postcardAddress: [{ required: true, message: '请输入', trigger: 'blur' }],
}
const { loading: loading2, send: sendCardData } = useRequest((data) => cardFirstApplication(data), {
  immediate: false,
  loading: false,
})

const statusDel = ref<statusTisProps>()
const submitStatus = ref(false)

const submitCard = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const params = cloneDeep(model.value)
        params.birthdate = dayjs(params.birthdate).format('YYYYMMDD')
        params.startDate = dayjs(params.startDate).format('YYYYMMDD')
        params.endDate = dayjs(params.endDate).format('YYYYMMDD')
        console.log('🌮[params]:', params)

        const data: any = await sendCardData(params)

        submitStatus.value = true
        statusDel.value = data
      } catch (error) {
        console.log('数据校验失败')
      }
    }
  })
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

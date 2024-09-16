import {
  changeCardData,
  getBranchesInfoSlect,
  getCardcheckInfo,
  uploadPhoneInfo,
} from '@/service/api/cardServe'
import { useUserStore } from '@/store'
import { useRequest } from 'alova/client'
import dayjs from 'dayjs'
import cloneDeep from 'lodash-es/cloneDeep'
import { statusTisProps } from '../types/types'

const read = ref(0)
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
// 网点信息
const {
  loading: loadingBranches,
  send: sendBranches,
  onSuccess: branchesSucess,
} = useRequest((data) => getBranchesInfoSlect(data), {
  immediate: false,
  loading: false,
  initialData: [],
})
// 上传身份证
const modelPhoto = ref({
  url1: '',
  url2: '',
})

const {
  loading: loadingPhoto,
  send: sendPhoto,
  onSuccess: photoSucess,
} = useRequest((data) => uploadPhoneInfo(data), {
  immediate: false,
  loading: false,
})
const bankBranchList = []
// 补卡信息提交
const model = ref({
  name: userInfo.userName,
  idCardNumber: userInfo.idCardNumber,
  sex: userInfo.sex,
  nation: '01',
  phoneNumber: userInfo.userPhone,
  mailAddress: '',
  startDate: null,
  endDate: null,
  work: '',
  bankCode: '',
  bankBranchCode: '',
  businessType: '',
  reason: '',
  photoId: '',
  idCardFrontPhotoId: '',
  idCardBackPhotoId: '',
  dbbs: '',

  // --
  dbrName: '',
  dbrType: '',
  dbrZjhm: '',
  dbrSex: '',
  dbrIdCardFrontPhotoId: '',
  dbrIdCardBackPhotoId: '',
  dbrAddress: '',
  familyRelation: '',
  dbrPhone: '',
  // -----
  isPostcard: '',
  postcardName: '',
  postcardPhone: '',
  postcardAddress: '',

  area: '',
})
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  idCardNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  nation: [{ required: true, message: '请选择民族', trigger: 'change' }],
  phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  mailAddress: [{ required: true, message: '请输入通讯地址', trigger: 'blur' }],
  startDate: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endDate: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
  work: [{ required: true, message: '请输入工作单位', trigger: 'blur' }],
  bankCode: [{ required: true, message: '请选择开户银行', trigger: 'change' }],
  bankBranchCode: [{ required: true, message: '请选择开户网点', trigger: 'change' }],
  businessType: [{ required: true, message: '请选择业务类型', trigger: 'change' }],
  reason: [{ required: true, message: '请选择补卡原因', trigger: 'change' }],
  photoId: [{ required: true, message: '请上传照片', trigger: 'change' }],
  idCardFrontPhotoId: [{ required: true, message: '请上传身份证正面', trigger: 'change' }],
  idCardBackPhotoId: [{ required: true, message: '请上传身份证反面', trigger: 'change' }],
  dbbs: [{ required: true, message: '请选择是否代办', trigger: 'change' }],
  // --
  dbrName: [{ required: true, message: '请输入代办人姓名', trigger: 'blur' }],
  dbrType: [{ required: true, message: '请选择代办人证件类型', trigger: 'change' }],
  dbrZjhm: [{ required: true, message: '请输入代办人证件号码', trigger: 'blur' }],
  dbrSex: [{ required: true, message: '请选择代办人性别', trigger: 'change' }],
  dbrIdCardFrontPhotoId: [{ required: true, message: '请上传代办人身份证正面', trigger: 'change' }],
  dbrIdCardBackPhotoId: [{ required: true, message: '请上传代办人身份证反面', trigger: 'change' }],
  familyRelation: [{ required: true, message: '请选择代办人与申请人关系', trigger: 'change' }],
  dbrPhone: [{ required: true, message: '请输入代办人手机号', trigger: 'blur' }],
  dbrAddress: [{ required: true, message: '请输入代办人地址', trigger: 'blur' }],
  // --
  area: [{ required: true, message: '请选择申领地区', trigger: 'change' }],
  isPostcard: [{ required: true, message: '请选择是否邮寄', trigger: 'change' }],
  postcardName: [{ required: true, message: '请输入邮寄人姓名', trigger: 'blur' }],
  postcardPhone: [{ required: true, message: '请输入邮寄人手机号', trigger: 'blur' }],
  postcardAddress: [{ required: true, message: '请输入', trigger: 'blur' }],
}
const { loading: loading2, send: sendCardData } = useRequest((data) => changeCardData(data), {
  immediate: false,
  loading: false,
})
const { loading: loading3, send: sendBranchesInfos } = useRequest((data) => changeCardData(data), {
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
        params.startDate = dayjs(params.startDate).format('YYYYMMDD')
        params.endDate = dayjs(params.endDate).format('YYYYMMDD')

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
    sendBranchesInfos,
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
    sendPhoto,
    loadingPhoto,
    loadingBranches,
    sendBranches,
  }
}

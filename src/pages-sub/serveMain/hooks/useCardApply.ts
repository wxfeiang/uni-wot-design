import { cardFirstApplication, getCardcheckInfo, uploadPhoneInfo } from '@/service/api/cardServe'
const read = ref(false)
const serchData = ref({
  xm: '常乐',
  zjhm: '210204199207215655',
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
} = getCardcheckInfo(
  { ...serchData.value },
  {
    immediate: false,
    loading: false,
  },
)

// 上传身份证
const modelPhoto = ref({
  url1: '',
  url2: '',
})

const {
  loading: loadingPhoto,
  send: sendPhoto,
  onSuccess: photoSucess,
} = uploadPhoneInfo({
  immediate: false,
  loading: false,
})

// 卡信息提交
const model = ref({
  name: '常乐',
  idCardNumber: '210204199207215655',
  idCardType: '1',
  sex: '1',
  birthdate: '19920721',
  nationality: 'CHN',
  nation: '01',
  areaCode: '133199',
  phoneNumber: '13843456565',
  address: '河北石家庄',
  startDate: '19920721',
  endDate: '20000721',
  work: '20000',
  bankCode: '999',
  bankBranchCode: '999-130632004',
  photoId: '780032',
  idCardFrontPhotoId: '780033',
  idCardBackPhotoId: '780034',
  isPostcard: '0',
  postcardaddress: '',
  postcardPhone: '',
  postcardName: '',
  idName: '',
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
  bankBranchCode: [{ required: true, message: '请输入银行网点代码' }],
  photoId: [{ required: true, message: '请输入照片ID' }],
  idCardFrontPhotoId: [{ required: true, message: '请上传身份证正面照片' }],
  idCardBackPhotoId: [{ required: true, message: '请上传身份证反面照片' }],
  isPostcard: [{ required: true, message: '请选择是否邮寄' }],
}
const { loading: loading2, send: sendCardData } = cardFirstApplication({
  immediate: false,
  loading: false,
})

const submitStatus = ref(false)
const statusDel = ref('')
const submitCard = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        console.log('🦐', model.value)
        const data: any = await sendCardData(model.value)
        if (data.message) {
          submitStatus.value = true
          statusDel.value = data.message
        }

        // uni.navigateBack()
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
  }
}

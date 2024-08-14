import { cardFirstApplication, getCardcheckInfo } from '@/service/api/cardServe'
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

// 卡信息提交
const model = ref({
  name: '常乐',
  idCardNumber: '210204199207215655',
  idCardType: '1',
  sex: '1',
  birthdate: '19920721',
  nationality: 'CHN',
  nation: '01',
  areaCode: 'CHN',
  phoneNumber: '13843456565',
  address: '北京市海淀区',
  startDate: '20240101',
  endDate: '20240101',
  work: '软件工程师',
  bankCode: '999',
  bankBranchCode: '130632004',
  photoId: '20240101',
  idCardFrontPhotoId: '',
  idCardBackPhotoId: '',
  isPostcard: '0',
})
const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
}
const { loading: loading2, send: sendCardData } = cardFirstApplication({
  immediate: false,
  loading: false,
})

const Login = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCardData(model.value)
        uni.navigateBack()
      } catch (error) {}
      console.log('数据校验失败')
    }
  })
}

export default () => {
  return {
    sendCardQury,
    sendCardData,
    modelPhoto,
    model,
    rules,
    loading,
    loading2,
    read,
  }
}

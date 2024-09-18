import { getCardBasicInfo, personInfoChange } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
import { Toast } from '@/utils/uniapi/prompt'
import { useRequest } from 'alova/client'
import dayjs from 'dayjs'

const userStore = useUserStore()
const { userInfo } = userStore
const model = ref({
  xm: userInfo.userName,
  zjhm: userInfo.idCardNumber,
  shbzhm: '',
})
const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  shbzhm: [{ required: true, message: '请输入社会保障号码' }],
  // address: [{ required: true, message: '请输入居住地址' }],
  // phone: [{ required: true, message: '请输入移动电话' }],
  // cardStartTime: [{ required: true, message: '请选择起始日期' }],
  // cardEndTime: [{ required: true, message: '请选择终止日期' }],
  zy: [{ required: true, message: '请选择职业' }],
}

// 卡进度查询
const { loading, send: sendCard } = useRequest((data) => getCardBasicInfo(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

const cardChangeInfo = ref({
  xm: '',
  zjhm: '',
  xb: '',
  gj: '',
  mz: '',
  address: '',
  phone: '',
  cardStartTime: '',
  cardEndTime: '',
  zy: '',
})
const cardQury = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCard(model.value)
        if (data.zjhm) {
          cardChangeInfo.value = data
        }
        console.log('返回的数据', data)
      } catch (error) {}
    }
  })
}

const changeSubmit = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const newData = {
          name: userInfo.userName,
          idCardNumber: userInfo.idCardNumber,
          address: cardChangeInfo.value.address,
          phoneNumber: cardChangeInfo.value.phone,
          startDate: dayjs(cardChangeInfo.value.cardStartTime).format('YYYYMMDD'),
          endDate: dayjs(cardChangeInfo.value.cardEndTime).format('YYYYMMDD'),
          work: cardChangeInfo.value.zy,
        }
        try {
          const resultData = await personInfoChange(newData)
          console.log('++++++++++++++resultData++++++++++++++', resultData)

          // 跳转到登录后的页面
          uni.navigateBack()
        } catch (error) {
          Toast(error)
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
      console.log('数据校验失败')
    }
  })
}

const read = ref(false)
export default () => {
  return {
    cardQury,
    cardChangeInfo,
    model,
    rules,
    loading,
    read,
    changeSubmit,
  }
}

import { getCardPaymentInfo, getCardScheduleInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
import { useForm } from 'alova/client'
import { statusTisProps } from '../types/types'
const userStore = useUserStore()
const { userInfo } = userStore

const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
}

// 卡进度查询
const {
  loading,
  send: sendCard,
  form: model,
} = useForm((data) => getCardScheduleInfo(data), {
  immediate: false,
  loading: false,
  // 设置这个参数为true即可在提交完成后自动重置表单数据
  resetAfterSubmiting: true,
  // 初始化表单数据
  initialForm: {
    xm: userInfo.cardName,
    zjhm: userInfo.idCardNumber,
    // xm: '王冬',
    // zjhm: '321087197912280054',
  },
})
const serchBtnStatus = ref(false)
const statusDel = ref<statusTisProps>()
const submitStatus = ref(false)
const cardInfoData = ref<any>(null)
const cardQury = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCard()
        cardInfoData.value = data.data[data.data.length - 1]
      } catch (error) {
        submitStatus.value = true
        statusDel.value = error.data ?? '查询出数据出错了!'
      }
    }
  })
}

const {
  send: sendCardMail,
  form: model2,
  data: cardMailData,
} = useForm((data) => getCardPaymentInfo(data), {
  immediate: false,
  loading: false,
  // 初始化表单数据
  initialForm: {
    xm: userInfo.cardName,
    zjhm: userInfo.idCardNumber,
    // xm: '王冬',
    // zjhm: '321087197912280054',
  },
  initialData: [],
})

export default () => {
  return {
    cardQury,
    cardInfoData,
    model,
    rules,
    loading,
    submitStatus,
    statusDel,
    serchBtnStatus,
    sendCardMail,
    model2,
    cardMailData,
  }
}

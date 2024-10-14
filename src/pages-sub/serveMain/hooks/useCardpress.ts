import { getCardScheduleInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
import { useForm } from 'alova/client'
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
    xm: userInfo.userName,
    zjhm: userInfo.idCardNumber,
  },
})

const cardInfoData = ref<any>(null)
const cardQury = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCard()
        cardInfoData.value = data[data.length - 1]
      } catch (error) {}
    }
  })
}

const read = ref(false)
export default () => {
  return {
    cardQury,
    cardInfoData,
    model,
    rules,
    loading,
    read,
  }
}

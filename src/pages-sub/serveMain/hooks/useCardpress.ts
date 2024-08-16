import { getCardScheduleInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
import { useRequest } from 'alova'
const userStore = useUserStore()
const { userInfo } = userStore
const model = ref({
  xm: userInfo.userName,
  zjhm: userInfo.idCardNumber,
})
const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
}

// 卡进度查询
const { loading, send: sendCard } = useRequest((data) => getCardScheduleInfo(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

const cardDetilInfo = ref<any>(null)
const cardQury = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCard(model.value)
        console.log('🥦[data]:', data)
      } catch (error) {}
    }
  })
}

const read = ref(false)
export default () => {
  return {
    cardQury,
    model,
    rules,
    loading,
    read,
  }
}

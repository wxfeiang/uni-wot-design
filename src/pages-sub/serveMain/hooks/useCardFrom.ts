import { getCardScheduleInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const model = reactive({
  xm: '常乐',
  zjhm: '210204199207215655',
})
const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
}

// 卡进度查询
const { loading, send: sendCard } = getCardScheduleInfo(
  {},
  {
    immediate: false,
    loading: false,
  },
)
const cardDetilInfo = ref<any>(null)
const cardQury = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCard(model)
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

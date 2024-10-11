import { getDetailUpdateRead, getHistoryPageByUserId } from '@/service/api/source'
import { addBusinessAdvice } from '@/service/api/userMessage'
import { List } from '@/service/model/baseModel'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
// 消息列表

const {
  send: sendHistoryPageByUserId,
  data: histotyMessData,
  loading: histotyMessDataLoadng,
} = useRequest((data) => getHistoryPageByUserId<List>(data), {
  immediate: false,
  loading: false,
  initialData: {} as any,
})
const {
  send: sendDetailUpdateRead,
  data: ReadData,
  loading: DetailUpdateReadDataLoadng,
} = useRequest((data) => getDetailUpdateRead(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.id, showType: 'message' },
  })
}
const adviceType = ref([
  {
    label: '投诉',
    value: 0,
  },
  {
    label: '建议',
    value: 1,
  },
])

// 投诉建议
const model = ref({
  feedbackCon: '',
  feedbackImg: '',
  createPhone: '',
  adviceType: 1,
})
const rules = {
  feedbackImg: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  createPhone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  feedbackCon: [{ required: true, message: '请输入投诉建议内容', trigger: 'blur' }],
}

export const { send: sendBusinessAdvice } = useRequest((data) => addBusinessAdvice(data), {
  immediate: false,
  loading: false,
})

const submit = (form) => {
  console.log('🍲[submit]:', form, model.value)
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendBusinessAdvice(model.value)
        console.log('🍋[data]:', data)
        uni.navigateBack()
      } catch (error) {
        console.log('🍲[error]:', error)
      }
    }
  })
}

export default () => {
  return {
    sendBusinessAdvice,
    messageClick,
    model,
    rules,
    submit,
    adviceType,
    sendHistoryPageByUserId,
    histotyMessDataLoadng,
    histotyMessData,
    sendDetailUpdateRead,
    ReadData,
  }
}

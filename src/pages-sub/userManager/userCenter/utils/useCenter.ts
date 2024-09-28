import { getMessageList } from '@/service/api/source'
import { addBusinessAdvice } from '@/service/api/userMessage'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
// 消息列表

// 消息列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
}: { send: any; data: any; onSuccess: any } = useRequest((data) => getMessageList(data), {
  immediate: false,
  loading: false,
  initialData: [],
})

function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
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
    sendMessageList,
    messageData,
    sendBusinessAdvice,
    messageClick,
    model,
    rules,
    submit,
    adviceType,
  }
}

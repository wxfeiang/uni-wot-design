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

// 投诉建议
const model = ref({
  adviceImgs: '',
  adviceContact: '',
  adviceContent: '',
})
const rules = {
  adviceImgs: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  adviceContact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  adviceContent: [{ required: true, message: '请输入投诉建议内容', trigger: 'blur' }],
}

const { send: sendBusinessAdvice } = useRequest((data) => addBusinessAdvice(data), {
  immediate: false,
  loading: false,
})

const submit = (form) => {
  console.log('🍲[submit]:', form, model.value)
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendBusinessAdvice(model.value)
      } catch (error) {
        console.log('🍲[error]:', error)
      }
    }
  })
}

export default () => {
  return { sendMessageList, messageData, messageClick, model, rules, submit }
}

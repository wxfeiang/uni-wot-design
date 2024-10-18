import { addBusinessAdvice, getAdvicelist, getDetailByAdviceId } from '@/service/api/userMessage'
import { List } from '@/service/model/baseModel'
import { routeTo } from '@/utils'
import { useForm, useRequest } from 'alova/client'
import { detilProp } from './types'

const statusList = ref([
  {
    label: '待处理',
    value: '0',
    bg: 'background: #FCF4E7; color:#EB7113',
  },
  {
    label: '处理中',
    value: '1',
    bg: 'background: #F0F5FE; color:#2D69EF',
  },
  {
    label: '已完结',
    value: '2',
    bg: 'background: #F0F9ED; color:#4EA833',
  },
])

// 反馈列表
// const {
//   send: sendAdvicelist,
//   data: advicelist,
//   // loading: advicelistLoading,
// } = useRequest((data) => getAdvicelist<List>(data), {
//   immediate: false,
//   loading: false,
//   initialData: {} as any,
// })
// 反馈列表
const { send: sendAdvicelist } = useRequest((data) => getAdvicelist(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

// 反馈详情
const { send: sendDetail, data: detilData } = useRequest(
  (data) => getDetailByAdviceId<detilProp>(data),
  {
    immediate: false,
    loading: false,
    initialData: {},
  },
)

function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.id, showType: 'message' },
  })
}
const adviceType = ref([
  {
    label: '投诉',
    value: '0',
  },
  {
    label: '建议',
    value: '1',
  },
  {
    label: '其他',
    value: '2',
  },
])

// 投诉建议

const rules = {
  adviceImg: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  advicePhone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  adviceContent: [{ required: true, message: '请输入投诉建议内容', trigger: 'blur' }],
}

const { send: sendBusinessAdvice, form: model } = useForm((data) => addBusinessAdvice(data), {
  immediate: false,
  loading: false,
  resetAfterSubmiting: true,
  initialForm: {
    adviceContent: '',
    adviceImg: '',
    advicePhone: '',
    adviceType: '0',
    adviceState: '',
    isDone: '',
    adviceId: '',
  },
})

const submitStatus = ref(false)
const submit = async (form, flog?: boolean) => {
  if (flog) {
    console.log('🍤')
  } else {
    const { valid } = await form.validate()
    if (!valid) {
      return false
    }
  }
  try {
    const data: any = await sendBusinessAdvice()
    submitStatus.value = true
  } catch (error) {
    console.log('🍲[error]:', error)
  }
}

export default () => {
  return {
    sendBusinessAdvice,
    messageClick,
    submit,
    adviceType,
    sendAdvicelist,
    sendDetail,
    detilData,
    model,
    rules,
    statusList,
    submitStatus,
  }
}

import { getDetailUpdateRead, getHistoryPageByUserId } from '@/service/api/source'
import { addBusinessAdvice } from '@/service/api/userMessage'
import { List } from '@/service/model/baseModel'
import { routeTo } from '@/utils'
import { useForm, useRequest } from 'alova/client'

const statusList = ref([
  {
    label: '已完结',
    value: 1,
    bg: 'background: #F0F9ED; color:#4EA833',
  },
  {
    label: '待处理',
    value: 2,
    bg: 'background: #FCF4E7; color:#EB7113',
  },
  {
    label: '处理中',
    value: 3,
    bg: 'background: #F0F5FE; color:#2D69EF',
  },
])

// TODO 两个接口都要更新
// 反馈列表
const {
  send: sendHistoryPageByUserId,
  data: histotyMessData,
  loading: histotyMessDataLoadng,
} = useRequest((data) => getHistoryPageByUserId<List>(data), {
  immediate: false,
  loading: false,
  initialData: {} as any,
})

// 反馈详情
const { send: sendDetail, data: detilData } = useRequest((data) => getDetailUpdateRead(data), {
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
  {
    label: '其他',
    value: 2,
  },
])

// 投诉建议

const rules = {
  feedbackImg: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  createPhone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  feedbackCon: [{ required: true, message: '请输入投诉建议内容', trigger: 'blur' }],
}

export const { send: sendBusinessAdvice, form: model } = useForm(
  (data) => addBusinessAdvice(data),
  {
    immediate: false,
    loading: false,
    initialForm: {
      feedbackCon: '',
      feedbackImg: '',
      createPhone: '',
      adviceType: 1,
    },
  },
)

const submitStatus = ref(false)
const submit = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendBusinessAdvice()

        submitStatus.value = true
      } catch (error) {
        console.log('🍲[error]:', error)
      }
    }
  })
}

// 查出详情

export default () => {
  return {
    sendBusinessAdvice,
    messageClick,
    submit,
    adviceType,
    sendHistoryPageByUserId,
    histotyMessDataLoadng,
    histotyMessData,
    sendDetail,
    detilData,

    model,
    rules,
    statusList,
    submitStatus,
  }
}

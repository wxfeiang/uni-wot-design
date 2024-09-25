import { getUserGoodsAddressList } from '@/service/api/userMessage'
import { useRequest } from 'alova/client'

const model = reactive({
  name: '',
  phone: '',
  area: [],
  detail: '',
  isDefault: false,
})
const rules = {
  name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],

  area: [{ required: true, message: '请选择所在地区', trigger: 'change' }],
  detail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
}

// 查询列表
const { send: sendList } = useRequest((data) => getUserGoodsAddressList(data), {
  immediate: false,
  loading: false,
})

export default () => {
  return {
    sendList,
    model,
    rules,
  }
}

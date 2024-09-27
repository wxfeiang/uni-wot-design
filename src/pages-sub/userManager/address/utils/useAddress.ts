import { Toast } from '@/utils/uniapi/prompt'
import { routeTo } from '@/utils'
import { isArray } from 'wot-design-uni/components/common/util'

const model = reactive<any>({
  id: null,
  userName: '',
  userPhone: '',
  area: [],
  userAddress: '',
  isDefault: false,
})
const rules = reactive({
  userName: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
  userPhone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],

  area: [
    {
      required: true,
      message: '请选择所在地区',
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject(new Error('请选择所在地区'))
        }
      },
    },
  ],
  userAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
})

export default () => {
  return {
    model,
    rules,
    routeTo,
    Toast,
  }
}

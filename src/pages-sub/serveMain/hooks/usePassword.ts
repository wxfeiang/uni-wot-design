import { SeverPassRest } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
const { userInfo } = useUserStore()
const model = ref({
  userName: '常乐',
  cardNumber: '210204199207215655',
  socialScCardNumber: 'F10379608',
  password: '',
  resetPassword: '',
  operator: userInfo.userName,
})
const rules = {
  userName: [{ required: true, message: '请输入姓名' }],
  cardNumber: [{ required: true, message: '请输入证件号码' }],
  resetPassword: [{ required: true, message: '请输入新密码' }],
  operator: [{ required: true, message: '请输入操作员' }],
  socialScCardNumber: [{ required: true, message: '请输入社会保障卡号' }],
}

const statusDel = ref('')
// 服务密码重置
const { loading, send: sendCardPassword } = useRequest((data) => SeverPassRest(data), {
  immediate: false,
  loading: false,
})

const submitPasswoed = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCardPassword(model.value)
        if (data.message) {
          // submitStatus.value = true
          // statusDel.value = data.message
        } else {
          uni.navigateBack()
        }
      } catch (error) {
        console.log('数据校验失败')
      }
    }
  })
}

const read = ref(false)
export default () => {
  return {
    loading,
    sendCardPassword,
    submitPasswoed,
    statusDel,
    rules,
    model,
  }
}

import { useUserStore } from '@/store/user'
const { userInfo } = useUserStore()
const model = ref({
  userName: userInfo.userName,
  cardNumber: userInfo.idCardNumber,
  socialScCardNumber: '',
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
const read = ref(false)
export default () => {
  return {
    rules,
    model,
  }
}

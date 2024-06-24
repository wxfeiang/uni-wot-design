import { login } from '@/service/api/auth'
import { useUserStore } from '@/store/user'
import { LoginForm } from '../types/types'
const userStore = useUserStore()
const model = reactive<LoginForm>({
  username: 'admin',
  password: 'admin123456',
  verifyCode: '1212',
})
const rules = {
  username: [{ required: true, message: '手机号/邮箱' }],
  password: [{ required: true, message: '输入密码' }],
}

// 登录操作
const { loading, send: sendLogin } = login(
  {},
  {
    immediate: false,
    loading: false,
  },
)
const toLogin = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendLogin(model)
        console.log('🍰[data]:', data)
        userStore.setUserInfo(data)
      } catch (error) {}
    }
  })
}

export default () => {
  return {
    toLogin,
    model,
    rules,
    loading,
  }
}

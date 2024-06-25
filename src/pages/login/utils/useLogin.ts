import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { login } from '@/service/api/auth'
import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
import { Toast } from '@/utils/uniapi/prompt'
import { LoginForm } from '../types/types'
const userStore = useUserStore()
const model = reactive<LoginForm>({
  username: 'admin',
  password: '123456admin',
})
const rules = {
  username: [{ required: true, message: '请输入手机号/邮箱' }],
  password: [{ required: true, message: '请输入输入密码' }],
}

// 登录操作
const { loading, send: sendLogin } = login(
  {},
  {
    immediate: false,
    loading: false,
  },
)
const Login = (form) => {
  if (!read.value) {
    Toast('请先阅读协议并同意')
    return
  }
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendLogin(model)
        userStore.setUserInfo(data)
        routeTo({ url: '/pages/index/index', navType: NAVIGATE_TYPE.SWITCH_TAB })
      } catch (error) {}
    }
  })
}

const toRegister = () => {
  console.log('🍫')
}
const read = ref(false)
export default () => {
  return {
    Login,
    model,
    rules,
    loading,
    read,
    toRegister,
  }
}

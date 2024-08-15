import { sysLogin, testToken } from '@/service/api/auth'
import { useUserStore } from '@/store'
//
import { useRequest } from 'alova/client'

// 获取验证码
const { getCodeUrl, codeflog } = useImageVerify()

const authStore = useUserStore()
const read = ref(false)
const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写密码' }],
  co: [{ required: true, message: '请填写验证码' }],
}
const model = ref({
  username: '18919853421',
  password: 'Zxe@2020',
  co: '',
})

const { send: sendLogin2, loading } = useRequest((newTodo) => sysLogin(newTodo), {
  immediate: false,
  loading: false,
})

const newData = ref({})
const Login = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const a = {
          username: 'admin',
          password: '123456admin',
          verifyCode: '',
        }
        try {
          const data = await sendLogin2(a)
          console.log('🥦[data]:', data)
          authStore.setUserInfo(data)
          // 跳转到登录后的页面
        } catch (error) {
          getCodeUrl()
        }
      } catch (error) {}
    } else {
      console.log('🥖')
    }
  })
}

const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: false, // 默认不发出请求
  initialData: {}, // 请求响应前，data的初始值
})
export default () => {
  return { Login, tesToken, model, rules, read, loading }
}

import { sysLogin, testToken } from '@/service/api/auth'
import { useUserStore } from '@/store'
//
import { useRequest } from 'alova'
import dayjs from 'dayjs'
import { useMessage } from 'wot-design-uni'

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
  username: 'admin',
  password: '123456admin',
  co: '',
  select: '102',
  date: null,
})

model.value.date = dayjs('20181205').valueOf()
const { send: sendLogin2, loading } = sysLogin(
  {},
  {
    immediate: false,
    loading: false,
  },
)
const message = useMessage()
const newData = ref({})
const Login = (form) => {
  //
  console.log('🍤', message)
  message.alert('操作成功')

  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      console.log('🍮', model.value)
      // const data = await useScancode()
      // console.log('🍍[data]:', data)
      // newData.value = {
      //   appKey: Constant.APP_KEY,
      //   na: model.value.username,
      //   ps: changePassword(model.value.password),
      //   co: model.value.co,
      //   u: codeflog.value,
      //   type: 1,
      //   terminal: Constant.TERMINAL,
      // }

      try {
        const params = {
          username: 'admin',
          password: '123456admin',
        }
        const data: any = await sendLogin2(params)
        console.log('🍵[data]:', data)
        authStore.setUserInfo(data.data.data)
        // 跳转到登录后的页面
      } catch (error) {
        console.log('🍠[error]:', error)
        // getCodeUrl()
      }
    }
  })
}

const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: false, // 默认不发出请求
  initialData: {}, // 请求响应前，data的初始值
})

const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装',
  },
  {
    value: '102',
    label: '奢侈品',
  },
  {
    value: '103',
    label: '女装',
  },
])
const value = ref<string[]>(['102'])

export default () => {
  return { Login, tesToken, model, rules, read, loading, columns }
}

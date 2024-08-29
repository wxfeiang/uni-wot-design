import { sysLogin, testToken } from '@/service/api/auth'
import { useUserStore } from '@/store'
//
import { useRequest } from 'alova/client'
import { useMessage, useToast } from 'wot-design-uni'
const message = useMessage()

const toast = useToast()

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

const { send: sendLogin2, loading } = useRequest((newTodo) => sysLogin(newTodo), {
  immediate: false,
  loading: false,
})

const newData = ref({})
const Login = (form) => {
  //
  // console.log('🍤', message)
  // message.alert('操作成功')
  message
    .confirm({
      msg: '提示文案',
      title: '标题',
    })
    .then(() => {
      console.log('点击了确定按钮')
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const a = {
          username: 'admin',
          password: '123456admin',
          verifyCode: '',
        }
        toast.show('提示信息')
        try {
          const data: any = await sendLogin2(a)
          console.log('🥦[data]:', data)
          authStore.setUserInfo(data.data.data)
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

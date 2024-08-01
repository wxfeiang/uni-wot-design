import { Constant } from '@/enum/constant'

import { login2, testToken } from '@/service/api/auth'
import { useSystemStore, useUserStore } from '@/store'
import { changePassword } from '@/utils/aes/jsencrypt'
//
import { useRequest } from 'alova'

// 初始化系统信息
const systemStore = useSystemStore()
useSystemFig(systemStore.initSystemInfo())

// 获取验证码
const { getCodeUrl, codeflog } = useImageVerify()

const authStore = useUserStore()
const read = ref(false)
const rules = {
  na: [{ required: true, message: '请填写用户名' }],
  ps: [{ required: true, message: '请填写密码' }],
  co: [{ required: true, message: '请填写验证码' }],
}
const model = ref({
  na: '18919853421',
  ps: 'Zxe@2020',
  co: '',
})

const { send: sendLogin2 } = login2(
  {},
  {
    immediate: false,
    loading: false,
  },
)

const newData = ref({})
const Login = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        newData.value = {
          appKey: Constant.APP_KEY,
          na: model.value.na,
          ps: changePassword(model.value.ps),
          co: model.value.co,
          u: codeflog.value,
          type: 1,
          terminal: Constant.TERMINAL,
        }
        try {
          const data = await sendLogin2(newData.value)
          console.log('🥘[data]:', data)
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
  return { Login, tesToken, model, rules, read }
}

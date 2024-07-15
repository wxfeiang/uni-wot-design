import useImageVerify from '@/components/dy-ReImageVerify/useImageVerify'
import { Constant } from '@/enum/constant'

import { login2, testToken } from '@/service/api/auth'
import { useUserStore } from '@/store'
import { changePassword } from '@/utils/aes/jsencrypt'
//
import { useRequest } from 'alova'
const { getCodeUrl, codeflog } = useImageVerify()
const authStore = useUserStore()
const read = ref(false)
const rules = {
  na: [
    {
      required: true,
      message: '用户名不能为空!',
      validator: (val: string) => val.length > 0,
    },
  ],
  ps: {
    required: true,
    message: '密码不能为空',
  },
  co: [
    {
      required: true,
      message: '验证码不能为空',
    },
    {
      message: '输入不合法!',
      validator: (val: string) => val.length < 4,
    },
  ],
}
const model = ref({
  na: '18919853421',
  ps: 'Zxe@2020',
  co: '',
})

const newData = ref({})

const { send: sendLogin2 } = login2(
  {},
  {
    immediate: false,
    loading: false,
  },
)

const Login = async (form: any) => {
  console.log('🍪[form]:', form)
  if (form.validate) {
    newData.value = {
      appKey: Constant.APP_KEY,
      na: model.value.na,
      ps: changePassword(model.value.ps),
      co: model.value.co,
      u: codeflog.value,
      type: 1,
      terminal: Constant.TERMINAL,
    }

    console.log('🌭[newData.value]:', newData.value)

    try {
      const data = await sendLogin2(newData.value)
      authStore.setUserInfo(data)
      // 跳转到登录后的页面
    } catch (error) {
      getCodeUrl()
    }
  } else {
    console.log('🍨')
    // 处理错误逻辑
  }
}

const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: false, // 默认不发出请求
  initialData: {}, // 请求响应前，data的初始值
})
export default () => {
  return { Login, tesToken, model, rules, read }
}

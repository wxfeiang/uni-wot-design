import { Constant } from '@/enum/constant'

import { sysLogin, testToken } from '@/service/api/auth'
import { useUserStore } from '@/store'
//
import { useRequest } from 'alova'

// 获取验证码
// const { getCodeUrl, codeflog } = useImageVerify()

const authStore = useUserStore()
const read = ref(false)
const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写身份证号码' }],
}
const model = ref({
  username: '王鹏',
  password: '622425199311264810',
})

const { send: sendLogin2, loading } = sysLogin({
  immediate: false,
  loading: false,
})

const newData = ref({})
const Login = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        newData.value = {
          appKey: Constant.APP_KEY,
          name: model.value.username,
          idCardNumber: model.value.password,
          // u: codeflog.value,
          type: 1,
          terminal: Constant.TERMINAL,
        }
        // eslint-disable
        // eslint-disable-next-line

        try {
          const data = await sendLogin2(newData.value)
          console.log('🥨[data]:', data)
          // uni.startFacialRecognitionVerify({
          //   name: model.value.username, // 身份证名称
          //   idCardNumber: model.value.password, // 身份证号码
          //   checkAliveType: 1, // 屏幕闪烁(人脸核验的交互方式，默认0,读数字)
          //   success(res) {
          //     console.log(res, ' ========') // 认证结果

          //     if (res.errCode === 0) {
          //       // 识别成功  这个时候可以调后端的接口 （带着返的res.verifyResult）
          //     } else {
          //       console.log('🍎')
          //     }
          //   },
          //   complete(res) {
          //     console.log(res)
          //   },
          //   fail(e) {
          //     console.log('err', e) // 失败处理方法
          //   },
          // })

          authStore.setUserInfo(data)
          // 跳转到登录后的页面
        } catch (error) {
          // getCodeUrl()
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

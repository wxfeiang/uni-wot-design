import { userLogout } from '@/service/api/auth'

import { useForm } from 'alova/client'

import { useUserStore } from '@/store'
import { routeTo } from '@/utils'
import { Toast } from '@/utils/uniapi/prompt'

// 获取验证码
const { getCodeUrl, codeflog } = useImageVerify()
const { sendPhoneCode, countdown, sending } = usePhoneCode()

const authStore = useUserStore()

const rules = {
  phone: [{ required: true, message: '请输入手机号' }],
  imgcode: [{ required: true, message: '请输入图形验证码' }],
  phoneCode: [{ required: true, message: '请输入验证码' }],
}

const {
  loading,
  send: sendUserLogout,
  form: model,
} = useForm((formData) => userLogout(formData), {
  // 设置这个参数为true即可在提交完成后自动重置表单数据
  resetAfterSubmiting: true,
  immediate: false,
  loading: false,
  // 初始化表单数据
  initialForm: {
    imgcode: '',
    phone: authStore.userInfo?.userPhone || '',
    phoneCode: '',
  },
})
// 发送
const submitPhoneCode = (form, formData) => {
  if (!formData?.imgcode) {
    Toast('请输入图形验证码')
    return false
  }
  form
    .validate('phone')
    .then(async ({ valid, errors }) => {
      if (valid) {
        try {
          const params = {
            phone: formData.phone,
            code: formData.imgcode,
            uuid: codeflog.value,
            type: 'loginOff',
          }
          const data: any = await sendPhoneCode(params)
          if (data.errorCode === 0) {
            Toast('验证码发送成功')
          }
        } catch (error) {
          getCodeUrl()
        }
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
// 注销
const submitCance = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        uni.showLoading({ title: '注销中...' })
        const data: any = await sendUserLogout()
        LogOut()
      } catch (error) {
        console.log('🍱=====[error]:', error)
      } finally {
        getCodeUrl()
      }
    }
  })
}
const LogOut = async () => {
  // TODO: 清除用户信息
  authStore.clearUserInfo()
  routeTo({ url: '/pages/index/index' })
}

export default () => {
  return {
    model,
    rules,
    getCodeUrl,
    codeflog,
    submitPhoneCode,
    countdown,
    sending,
    submitCance,
  }
}

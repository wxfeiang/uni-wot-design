import { Constant } from '@/enum/constant'
import {
  faceLogin,
  getUserIdKey,
  getUserInfo,
  openIdCode,
  phoneChartLogin,
  phoneLogin,
} from '@/service/api/auth'
import { getIsReceiveCardInfo } from '@/service/api/cardServe'

import { useRequest } from 'alova/client'

import { useUserStore } from '@/store'
import { getLoginCode, startFacialRecognitionVerify } from '@/utils/uniapi'
import { Toast } from '@/utils/uniapi/prompt'
// 获取验证码
const { getCodeUrl, codeflog } = useImageVerify()
const { sendPhoneCode, countdown, sending } = usePhoneCode()
const openId = ref('')

const authStore = useUserStore()
const read = ref(false)
const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写身份证号码' }],
  co: [{ required: true, message: '图形验证码不能为空' }],
}

const model = ref({
  username: '',
  password: '',
})

const { send: sendUserIdKey, loading: LoadingKey } = useRequest((data) => getUserIdKey(data), {
  immediate: false,
  loading: false,
})

const { send: sendUserInfo, loading: LoadingInfo } = useRequest((data) => getUserInfo(data), {
  immediate: false,
  loading: false,
})

const { send: sendFaceLogin, loading: LoadingFace } = useRequest((data) => faceLogin(data), {
  immediate: false,
  loading: false,
})

const {
  loading,
  send: sendIsReceiveCardInfo,
  onSuccess: cardQuerySucess,
} = useRequest((data) => getIsReceiveCardInfo(data), {
  immediate: false,
  loading: false,
})

const Login = (form) => {
  if (!read.value) {
    Toast('请先阅读并同意相关协议')
    return
  }
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const newData = {
          appKey: Constant.APP_KEY,
          name: model.value.username,
          idCardNumber: model.value.password,
          type: 1,
          terminal: Constant.TERMINAL,
        }
        try {
          // 获取key
          const { userIdKey }: any = await sendUserIdKey(newData)
          const verifyData = {
            name: model.value.username,
            idCardNumber: model.value.password,
            userIdKey,
          }
          // 用key 验证
          const { verifyResult }: any = await startFacialRecognitionVerify(verifyData)
          // info 验证
          const { openid: userId }: any = await sendUserInfo({
            verifyResult,
            idCardNumber: model.value.password,
          })
          // 登录
          const loginData = {
            userId,
          }
          const data: any = await sendFaceLogin(loginData)
          // 保存
          authStore.setUserInfo(data)
          // cardType 是否申请过雄安一卡通卡：3，已申领；0、1、2，未申领
          if (data.cardType !== 3) {
            const params = {
              xm: authStore.userInfo.userName,
              zjhm: authStore.userInfo.idCardNumber,
              zjlx: '1',
              zkType: '1',
              wdcode: '999-130632004',
              areaCode: 'CHN',
            }

            const resultData: any = await sendIsReceiveCardInfo(params)
            console.log('🥞[resultData]:', resultData)
            authStore.userInfo.cardType = resultData.cardType
          } else {
            authStore.userInfo.cardType = data.cardType
          }
          // 跳转到登录后的页面
          uni.navigateBack()
        } catch (error) {
          Toast(error)
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
      console.log('数据校验失败')
    }
  })
}

const model2 = ref({
  phone: '',
  imgcode: '',
  code: '',
})
const rules2 = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  imgcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const submitPhoneCode = (form) => {
  if (!model2.value.imgcode) {
    Toast('请输入图形验证码')
    return false
  }
  form
    .validate('phone')
    .then(async ({ valid, errors }) => {
      if (valid) {
        try {
          const params = {
            phone: model2.value.phone,
            code: model2.value.imgcode,
            uuid: codeflog.value,
          }
          console.log('🧀', params)
          const data: any = await sendPhoneCode(params)
          console.log('🍷[data]:', data)
          if (data.errorCode === '0') {
            Toast('验证码发送成功')
          }

          getCodeUrl()
        } catch (error) {
          console.log('🍱[error]:', error)

          getCodeUrl()
        }
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
//
const { loading: phoneLoading, send: phoneSend } = useRequest((data) => phoneLogin(data), {
  immediate: false,
  loading: false,
})

const submitPhoneLogin = (form) => {
  if (!read.value) {
    Toast('请先阅读并同意相关协议')
    return
  }
  form
    .validate('phone')
    .then(async ({ valid, errors }) => {
      if (valid) {
        try {
          const params = {
            userId: '',
            userPhone: model2.value.phone,
            userName: '',
            verCode: model2.value.code,
            shopId: '',
          }
          console.log('🧀', params)
          const data: any = await phoneSend(params)
          console.log('🍷[data]:', data)

          getCodeUrl()
        } catch (error) {
          console.log('🍱[error]:', error)

          getCodeUrl()
        }
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const { loading: openLoading, send: sendOpenIdCode } = useRequest((data) => openIdCode(data), {
  immediate: false,
  loading: false,
})

const { loading: chartLoading, send: chartSend } = useRequest((data) => phoneChartLogin(data), {
  immediate: false,
  loading: false,
})

const getphonenumber = async (e) => {
  if (!read.value) {
    Toast('请先阅读并同意相关协议')
    return
  }
  if (e.errMsg === 'getPhoneNumber:ok') {
    try {
      // 微信登录
      const wxLoginCode = await getLoginCode()
      // openid
      const openId = await sendOpenIdCode({ code: wxLoginCode })
      const param = {
        encryptedData: encodeURIComponent(encodeURIComponent(e.encryptedData)),
        iv: encodeURIComponent(encodeURIComponent(e.iv)),
        openId,
        openid: openId,
        userId: openId,
        shopId: '',
      }
      console.log('🥫', param)
      const data = await chartSend(param)
      console.log('🍕[data]:', data)
      // TODO: 最终登录 存储信息
    } catch (error) {
      console.log('🍓[error]:', error)
    }
  }
}
export default () => {
  return {
    Login,
    model,
    rules,
    read,
    LoadingKey,
    LoadingInfo,
    sendFaceLogin,
    LoadingFace,
    model2,
    rules2,
    getCodeUrl,
    codeflog,
    submitPhoneCode,
    countdown,
    sending,
    phoneLoading,
    submitPhoneLogin,
    getphonenumber,
    openIdCode,
  }
}

import { Constant } from '@/enums/constant'
import {
  faceLogin,
  getUserIdKey,
  getUserInfo,
  openIdCode,
  phoneChartLogin,
  phoneLogin,
  updateOpenIdAndUnionId,
  updateRealName,
  xcxScanFaceRealNameAuth,
} from '@/service/api/auth'
import { getIsReceiveCardInfo } from '@/service/api/cardServe'

import { useForm, useRequest } from 'alova/client'

import { useUserStore } from '@/store'
import { routeTo } from '@/utils'
import { getLoginCode, startFacialRecognitionVerify } from '@/utils/uniapi'
import { Toast } from '@/utils/uniapi/prompt'

// 获取验证码
const { getCodeUrl, codeflog } = useImageVerify()
const { sendPhoneCode, countdown, sending } = usePhoneCode()
const openId = ref('')

const ablistShow = ref(false)

const authStore = useUserStore()
const read = ref(false)
const model = ref({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入姓名' }],
  password: [{ required: true, message: '请输入身份证号码' }],
}
const rules2 = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  imgcode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }],
}

const { send: sendUserIdKey, loading: LoadingKey } = useRequest((data) => getUserIdKey(data), {
  immediate: false,
  loading: false,
})
const { send: sendFaceLogin, loading: LoadingFace } = useRequest((data) => faceLogin(data), {
  immediate: false,
  loading: false,
})

const { send: sendUserInfo, loading: LoadingInfo } = useRequest((data) => getUserInfo(data), {
  immediate: false,
  loading: false,
})
const { send: sendXcxScanFaceRealNameAuth } = useRequest((data) => xcxScanFaceRealNameAuth(data), {
  immediate: false,
  loading: false,
})

const { loading, send: sendIsReceiveCardInfo } = useRequest((data) => getIsReceiveCardInfo(data), {
  immediate: false,
  loading: false,
})
// 默认身份证登录
// loginStatus 1  正常登录  2, 后期使命认证
const Login = (form, flog = 1, loginStatus = 1) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        uni.showLoading({ title: flog ? '加载中...' : '登录中...' })
        const newData = {
          appKey: Constant.APP_KEY,
          name: model.value.username,
          idCardNumber: model.value.password,
          type: 1,
          terminal: Constant.TERMINAL,
        }

        // 获取key
        const { userIdKey }: any = await sendUserIdKey(newData)
        const verifyData = {
          name: model.value.username,
          idCardNumber: model.value.password,
          userIdKey,
        }
        // 用key 验证
        const { verifyResult }: any = await startFacialRecognitionVerify(verifyData)
        const infoParams = {
          verifyResult,
          name: model.value.username,
          idCardNumber: model.value.password,
        }

        uni.hideLoading()
        if (loginStatus === 2) {
          await sendXcxScanFaceRealNameAuth(infoParams)
          submitUpRealsfz(0) // 提交更新实名认证
        } else {
          // info 验证
          const dataInfo: any = await sendUserInfo(infoParams)
          // 登录根据返回结果列表登录 补充电话
          if (dataInfo.loginUserList && dataInfo.loginUserList.length === 1) {
            if (!dataInfo.loginUserList[0].userPhone) {
              // 展示补充电话号吗
              routeTo({
                url: '/pages/login/phoneLoginbc',
                data: { cardCode: model.value.password, userId: dataInfo.loginUserList[0].userId },
              })
              return false
            } else {
              const usrData = {
                userPhone: dataInfo.loginUserList[0].userPhone,
                cardCode: model.value.password,
              }
              await userLogin(usrData, 2)
            }
          } else if (dataInfo.loginUserList && dataInfo.loginUserList.length > 1) {
            // 显示选择框

            dataInfo.loginUserList.forEach((item) => {
              item.cardCode = model.value.password
            })

            ablistShow.value = true
            return false
          }
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
      console.log('数据校验失败')
    }
  })
}

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
//
const {
  loading: phoneLoading,
  send: phoneSend,
  form: model2,
} = useForm(
  (formData) => {
    const params = {
      userId: '',
      userPhone: formData.phone,
      userName: '',
      verCode: formData.code,
      shopId: '',
    }
    // 可以在此转换表单数据并提交
    return phoneLogin(params)
  },
  {
    // 设置这个参数为true即可在提交完成后自动重置表单数据
    resetAfterSubmiting: true,
    immediate: false,
    loading: false,
    // 初始化表单数据
    initialForm: {
      phone: '',
      imgcode: '',
      code: '',
    },
  },
)

// 手机号登录
const submitPhoneLogin = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        uni.showLoading({ title: '登录中...' })
        const data: any = await phoneSend()
        await resultData(data)
      } catch (error) {
        console.log('🍱=====[error]:', error)
      } finally {
        getCodeUrl()
      }
    }
  })
}

// 获取openid
const { loading: openLoading, send: sendOpenIdCode } = useRequest((data) => openIdCode(data), {
  immediate: false,
  loading: false,
})

const { loading: chartLoading, send: chartSend } = useRequest((data) => phoneChartLogin(data), {
  immediate: false,
  loading: false,
})

// 点击快捷登录
const getphonenumberLogin = async (e) => {
  if (e.errMsg === 'getPhoneNumber:ok') {
    try {
      uni.showLoading({ title: '登录中...' })
      // 微信登录
      const wxLoginCode = await getLoginCode()
      // openid
      const { openId }: any = await sendOpenIdCode({ code: wxLoginCode })
      const param = {
        encryptedData: e.encryptedData,
        iv: e.iv,
        openId,
        openid: openId,
        userId: openId,
        shopId: '',
      }
      console.log('🥫', param)
      const data = await chartSend(param)
      console.log('🍕[data]:', data)

      // TODO: 最终登录 存储信息
      await resultData(data)
    } catch (error) {
      Toast(error?.data?.msg)
    }
  }
}

// 补充手机号/ 实名认证补充
const {
  loading: bcphoneLoading,
  send: sendUpRealName,
  form: model3,
} = useForm(
  (formData) => {
    const authStore = useUserStore()
    const params = {
      userPhone: formData.phone,
      verCode: formData.code,
      code: formData.code,
      // TODO: 证件姓名
      userName: formData.userName || model.value.username,
      userCardCode: formData.userCardCode || model.value.password,
      userId: formData.userId || authStore.userInfo.userDId,
    }
    // 可以在此转换表单数据并提交
    return updateRealName(params)
  },
  {
    immediate: false,
    loading: false,
    // 设置这个参数为true即可在提交完成后自动重置表单数据
    resetAfterSubmiting: true,
    // 初始化表单数据
    initialForm: {
      phone: '',
      imgcode: '',
      code: '',
      userCardCode: '',
      userId: '',
      userName: '',
    },
  },
)
// 补充手机号登录校验
const submitUpRealName = (form, flog) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        uni.showLoading({ title: '处理中...' })
        await sendUpRealName()
        const usrData = {
          userPhone: model3.value.phone,
          cardCode: model3.value.userCardCode || model.value.password,
          userName: model.value.username,
        }
        await userLogin(usrData, flog)
      } catch (error) {
        console.log('补充error:', error)
      } finally {
        getCodeUrl()
      }
    }
  })
}
// 登录后的实名认证提交
const submitUpRealsfz = async (flog) => {
  uni.showLoading({ title: '认证中...' })
  try {
    const res = await sendUpRealName()
    if (res) {
      const data = authStore.userInfo
      const newData = {
        idCardNumber: model.value.password,
        userName: model.value.username,
      }
      uni.showLoading({ title: '认证成功' })
      await resultData({ ...data, ...newData }, flog)
    } else {
      uni.showToast({ title: '认证失败...' })
      uni.hideLoading()
    }
  } catch (error) {
    console.log('认证错误:', error)
  }
}

// 最后一步登录
const userLogin = async (item, flog) => {
  console.log('最后登录数据------>', item)
  const data: any = await sendFaceLogin(item)
  await resultData(data, flog)
}

// 登录后结果处理
const resultData = async (data, flog = 2) => {
  uni.showLoading({ title: '登录成功' })
  // 保存
  authStore.setUserInfo(data)
  // cardType 是否申请过雄安一卡通卡：3，已申领；0、1、2，未申领
  if (data?.idCardNumber && flog !== 0) {
    try {
      const params = {
        xm: authStore.userInfo.userName,
        zjhm: authStore.userInfo.idCardNumber,
        zjlx: '1',
        zkType: '1',
        wdcode: '999-130632004',
        areaCode: 'CHN',
      }
      const rData: any = await sendIsReceiveCardInfo(params)
      console.log('renzhen===[rData]:', rData)
      authStore.userInfo.cardType = rData.cardType
    } catch (error) {
      console.log('🍡[error]:', error)
    }
  }

  // 小程序登录成功后更新或新增 openId 和 unionId
  await updateUnionId()

  // 跳转到登录后的页面
  uni.hideLoading()
  const pages = getCurrentPages() // 当前页面栈
  // 确定返回页面的层数
  const index = pages[pages.length - 1].route === 'pages/login/index' ? 1 : flog
  if (!index) return
  uni.navigateBack({ delta: index })
}

const goPhoneLogin = () => {
  routeTo({
    url: '/pages/login/phoneLogin',
  })
}
const goSfzLogin = () => {
  routeTo({
    url: '/pages/login/sfzLogin',
  })
}
const shuziLogin = () => {
  const pages = getCurrentPages() // 当前页面栈
  console.log('🍻[pages]:', pages)
  Toast('功能开发中...')
}
const toAgreement = (articleId: string, title: string) => {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: articleId, showTop: true, title },
  })
}

const { loading: unionLoading, send: sendUpdateOpenIdAndUnionId } = useRequest(
  (data) => updateOpenIdAndUnionId(data),
  {
    immediate: false,
    loading: false,
  },
)

const updateUnionId = async () => {
  // 微信登录
  const wxLoginCode = await getLoginCode()
  // openid
  await sendUpdateOpenIdAndUnionId({ code: wxLoginCode, appKey: Constant.APP_KEY })
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
    model3,
    rules2,
    getCodeUrl,
    codeflog,
    submitPhoneCode,
    countdown,
    sending,
    phoneLoading,
    submitPhoneLogin,
    getphonenumberLogin,
    openIdCode,
    shuziLogin,
    goPhoneLogin,
    goSfzLogin,
    toAgreement,
    sendIsReceiveCardInfo,
    submitUpRealName,
    userLogin,
    ablistShow,
  }
}

import { Constant } from '@/enum/constant'
import { faceLogin, getUserIdKey, getUserInfo } from '@/service/api/auth'
import { getIsReceiveCardInfo } from '@/service/api/cardServe'

import { useRequest } from 'alova/client'

import { useUserStore } from '@/store'
import { startFacialRecognitionVerify } from '@/utils/uniapi'
import { Toast } from '@/utils/uniapi/prompt'
// 获取验证码
const { getCodeUrl, codeflog } = useImageVerify()
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
  username: '',
  password: '',
  co: '',
})

onMounted(() => {
  getCodeUrl()
})

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
    getCodeUrl,
    codeflog,
  }
}

import { Constant } from '@/enum/constant'
import { faceLogin, getUserIdKey, getUserInfo } from '@/service/api/auth'
import { getCardcheckInfo } from '@/service/api/cardServe'

import { useRequest } from 'alova/client'

import { useUserStore } from '@/store'
import { startFacialRecognitionVerify } from '@/utils/uniapi'
import { Toast } from '@/utils/uniapi/prompt'

const authStore = useUserStore()
const read = ref(false)
const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写身份证号码' }],
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

//

const {
  loading,
  send: sendCardQury,
  onSuccess: cardQuerySucess,
} = useRequest((data) => getCardcheckInfo(data), {
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
          // isApplyCard 是否申请过卡
          if (data.isApplyCard !== 0) {
            authStore.userInfo.isApply = false

            const params = {
              xm: authStore.userInfo.userName,
              zjhm: authStore.userInfo.idCardNumber,
              zjlx: '1',
              zkType: '1',
              wdcode: '999-130632004',
              areaCode: 'CHN',
            }

            const { resultCode }: any = await sendCardQury(params)
            console.log('🥞[resultCode]:', resultCode)
            authStore.userInfo.isApply = resultCode === '0'
          } else {
            authStore.userInfo.isApply = true
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

export default () => {
  return { Login, model, rules, read, LoadingKey, LoadingInfo, sendFaceLogin, LoadingFace }
}

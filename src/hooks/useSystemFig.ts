import { getShcOpId } from '@/service/api/auth'
import { captchaConfig, getDot, getResponseConfig } from '@/service/api/system'
import { useSystemStore } from '@/store/modules/system'
import { changeRes } from '@/utils/aes/encryptUtils'
import { getLoginCode } from '@/utils/uniapi'
import { useRequest } from 'alova/client'
export default (inifConfig?: boolean) => {
  // 获取系统配置
  const systemStore = useSystemStore()
  const {
    data: captchaConfigData,
    onSuccess: sysConfigSuccess,
    onError: sysError,
    send: sysConfig,
  } = captchaConfig({
    immediate: inifConfig,
    force: inifConfig,
    loading: false,
  })

  sysConfigSuccess((data: any) => {
    const newData = { ...data.data.data.data }
    const code = changeRes(data.data, newData.paramId)
    newData.paramId = code

    systemStore.fILTERDATA(newData)
  })

  // 处理加密
  const { onSuccess: getDotSuccess, send: sysDot } = getDot({
    immediate: inifConfig,
    loading: false,
  })
  getDotSuccess((data: any) => {
    const code = changeRes(data.data, data.data.data.data)
    systemStore.DOT(code)
  })

  // 处理解密
  const { onSuccess: responseConfigSuccess, send: sysResponseConfig } = getResponseConfig({
    immediate: inifConfig,
    loading: false,
  })
  responseConfigSuccess((data: any) => {
    const code = changeRes(data.data, data.data.data.data.pubK)
    systemStore.RESSTRPPD(code)
  })

  // 获取数城openId
  const { send: sendShcOpend } = useRequest((data) => getShcOpId(data), {
    immediate: false,
    loading: false,
  })

  const openIdFun = async () => {
    // 微信登录
    try {
      const wxLoginCode = await getLoginCode()

      // openid
      const { data }: any = await sendShcOpend({ code: wxLoginCode })

      systemStore.setOpenId(data)
    } catch (e) {}
  }

  // #ifndef  H5
  // FIX:支付宝小程序要手动触发请求 可能深层次 useRequest 状态的原因
  if (inifConfig) {
    sysConfig()
    sysDot()
    sysResponseConfig()
    openIdFun()
  }

  // #endif
}

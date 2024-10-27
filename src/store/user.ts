import { TOKEN_OVER } from '@/utils/constant'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  nickname: '',
  avatar: '',
  tokenTime: new Date().getTime(),
  appSign: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除 退出后调用
    const reset = () => {
      userInfo.value = { ...initState }
    }
    // 是否已经登录
    const isLogined = computed(() => !!userInfo.value.appSign)

    // token过期 ture
    const isTokenExpired = computed(() => {
      const date = new Date().getTime()
      return date - userInfo.value.tokenTime > TOKEN_OVER
    })

    function getAuthorization() {
      // Bearer 服务端已经返回了，可以不用再写
      return userInfo.value?.appSign ? { appSign: `${userInfo.value?.appSign}` } : {}
    }

    const noLoginRequired = ref('30')

    function setNoLoginRequired(val: string) {
      noLoginRequired.value = val
    }

    // 记录是是否已经积分签到
    const integralSataus = ref(false)
    function setTntegralSataus(val: boolean) {
      integralSataus.value = val
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      getAuthorization,
      isTokenExpired,
      noLoginRequired,
      setNoLoginRequired,
      integralSataus,
      setTntegralSataus,
    }
  },
  {
    persist: true,
  },
)

/**
 * by wxfeiang on 2024-03-06
 * 路由拦截，通常也是登录拦截
 * 可以设置路由白名单，或者黑名单，看业务需要选哪一个
 * 我这里应为大部分都可以随便进入，所以使用黑名单
 */
import { useUserStore } from '@/store'
import { needLoginPages as _needLoginPages, getNeedLoginPages, needLoginFeacePages } from '@/utils'
import { Modal } from '@/utils/uniapi/prompt'

// TODO Check
const loginRoute = '/pages/login/index'
const feaceRouter = '/pages/login/loginsmrz'

const isLogined = () => {
  const userStore = useUserStore()
  return userStore.isLogined
}
const isIdcard = () => {
  const userStore = useUserStore()
  return userStore.userInfo.idCardNumber
}
const isDev = import.meta.env.DEV

// 黑名单登录拦截器 - （适用于大部分页面不需要登录，少部分页面需要登录）
const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    console.log('🍶[url]:', url)
    // /pages/route-interceptor/index?name=feige&age=30
    const path = url.split('?')[0]
    let needLoginPages: string[] = []
    // 为了防止开发时出现BUG，这里每次都获取一下。生产环境可以移到函数外，性能更好
    if (isDev) {
      needLoginPages = getNeedLoginPages()
    } else {
      needLoginPages = _needLoginPages
    }

    const isNeedLogin = needLoginPages.includes(path)

    if (!isNeedLogin) {
      return true
    }
    const hasLogin = isLogined()
    const hasFeace = needLoginFeacePages.includes(path)
    if (hasLogin && !hasFeace) {
      return true
    } else {
      if (!hasLogin) {
        isRouterCheckd(url)
      } else if (hasFeace && !isIdcard()) {
        isRouterCheckd(url, true, '您还没有实名认证,请先认证？')
      } else {
        return true
      }

      return false
    }
  },
}
export const isRouterCheckd = (url, flog = false, title?: string) => {
  Modal({
    title: '提示',
    content: title || '您还没有登录,请先登录？',
    showCancel: true,
  }).then((res: any) => {
    if (res.confirm) {
      // 重定向
      const router = flog ? feaceRouter : loginRoute
      const redirectRoute = `${router}?redirect=${encodeURIComponent(url)}`
      uni.navigateTo({ url: redirectRoute })
    }
  })
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
  },
}

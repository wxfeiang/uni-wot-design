import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { pages, subPackages, tabBar } from '@/pages.json'
import PLATFORM from '@/utils/platform'
import qs from 'qs'
/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有tabBar的话，list不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currPath = lastPage.route
  return !!tabBar.list.find((e) => e.pagePath === currPath)
}

/**
 * 获取当前页面路由的 path 路劲和 redirectPath 路径
 * path 如 ‘/pages/login/index’
 * redirectPath 如 ‘/pages/demo/base/route-interceptor’
 */
export const currRoute = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currRoute = (lastPage as any).$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute as { fullPath: string }
  console.log(fullPath)
  // eg: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/index?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return getUrlObj(fullPath)
}

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query: Record<string, string> = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => !key || page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages: any[] = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  console.log(`getAllPages by ${key} result: `, result)
  return result
}

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)

/**
 * @description: 字典值解析
 * @param {} data 字典数组
 * @param {} value 当前比对值
 * @param {} key  要比对的key
 * @param {} val  要比对的val
 */
export const changeDict = (data: string[], value?: any, key?: string, val?: string) => {
  return data.filter((item: any) => item[val] === value)[key]
}

/**
 * @description: 返回规定长度的随机字符串
 * @param {} length
 * @return {}
 */
export const randomStr = (length: number) => {
  let result = ''
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**
 * @description:  返回当前请求需要的baseUrl
 * @return {}
 */
export const baseUrl = () => {
  if (PLATFORM.isH5) {
    return import.meta.env.VITE_APP_PROXY_PREFI
  } else {
    return import.meta.env.VITE_SERVER_BASEURL + import.meta.env.VITE_APP_PROXY_PREFIX
  }
}

/**
 * @description:  页面跳转
 * @param {} options url  类型   数据
 * @return {}
 */
export const routeTo = (options: { url?: string; data?: any; navType?: NAVIGATE_TYPE }) => {
  let { url, data, navType = NAVIGATE_TYPE.NAVIGATE_TO } = options

  if (data) {
    const queryStr = qs.stringify(data)
    if (url.includes('?')) {
      url += `&${queryStr}`
    } else {
      url += `?${queryStr}`
    }
  }
  if (navType === NAVIGATE_TYPE.NAVIGATE_BACK || !navType) {
    uni.navigateBack({
      delta: 1,
    })
    return
  }
  if (navType === NAVIGATE_TYPE.NAVIGATE_TO) {
    uni.navigateTo({
      url,
    })
    return
  }
  if (navType === NAVIGATE_TYPE.SWITCH_TAB) {
    uni.switchTab({
      url,
    })
  }
  if (navType === NAVIGATE_TYPE.REDIRECT_TO) {
    uni.redirectTo({
      url,
    })
  }
}

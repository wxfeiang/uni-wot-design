import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { pages, subPackages, tabBar } from '@/pages.json'
import PLATFORM from '@/utils/platform'
import { isArray } from 'lodash-es'
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
 * @description: 获取当前页面路由的 path 路劲和 redirectPath 路径
 * @return {}  path 如 ‘/pages/login/index’ redirectPath 如 ‘/pages/demo/base/route-interceptor’
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
 * @description:  * 解析 url 得到 path 和 query
 * @param {} url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * @return {} {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
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
 * @description:  得到所有的需要登录的pages，包括主包和分包的
 * @param {} key 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * @return {} 如果没有传 key，则表示所有的pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // FIX:对权限页面取反
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => {
        return !(!key || page[key])
      })
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages: any[] = []

  subPackages.forEach((subPageObj) => {
    const { root } = subPageObj
    subPageObj.pages.forEach((page) => {})
    subPageObj.pages
      .filter((page) => !(!key || page[key]))
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
 * @description: 得到所有的需要登录的pages，包括主包和分包的
 * @param {} string
 * @return {} 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)

/**
 * @description: 得到所有的需要登录的pages，包括主包和分包的
 * @param {} getAllPages
 * @return {} 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)

/**
 * @description: 得到所有的需要人脸识别的pages，包括主包和分包的
 * @param {} getAllPages
 * @return {} 只得到 path 数组
 */
export const needLoginFeacePages: string[] = getAllPages('needLogin')
  .filter((page) => page.realNameAuthentication)
  .map((page) => page.path)

/**
 * @description: 字典值解析
 * @param {} data 字典数组
 * @param {} value 当前比对值
 * @param {} key  要比对的key
 * @param {} val  要比对的val
 */
export const changeDict = (data: any, value: any, key: string = 'label', val: string = 'value') => {
  return data.find((item: any) => item[val] === value)?.[key] ?? ''
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
    return import.meta.env.VITE_APP_PROXY_PREFIX
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
  console.log('跳转路径:', url, '====跳转携带参数:', data)

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
      url,
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

/**
 * @description:  获取当前地址栏 url 参数 用于第三方进入
 * @param {} key 传入的key
 * @return {}  value
 */
export function getUrlKeyValue(key: string) {
  // 从第一个?开始，且不包括#之后，并截取掉?的部分
  let query = location.search.substring(1)
  query = decodeURIComponent(query)
  // 从#开始的部分，并转换成数组
  const hash = location.hash.split('?')
  // query和hash均没有参数
  if (!query && hash.length < 2) {
    return ''
  }
  // 先取query部分的参数进行匹配
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
  // query没有参数，或者有参数但没找到，则取hash部分的参数
  if (!hash[1]) {
    return ''
  }
  vars = decodeURIComponent(hash[1]).split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
  return ''
}

/**
 * @description:  日期时间去除T
 * @param {} date 传入的key
 * @return {}  value
 */
export function removeT(date: string) {
  if (!date) return ''
  return date.replace('T', ' ')
}

/**
 * @description:  批量处理入参数Json 对象 转码 地址栏
 * @param {} data 传入的key
 * @return {}  data
 */
export function changeUrlJson(data: object) {
  if (!data) return {}
  for (const key in data) {
    data[key] = decodeURIComponent(data[key])
  }
  return data
}

/**
 * @description:  处理小程序码扫码结果
 * @param {} resData 传入的结果
 * @return {}  obg 返回拼接后的url /  不符合的提示
 */
export function sceneResult(resData: any) {
  console.log('扫码内容=====:', resData)
  // 如果不是小程序码的标志 直接返回
  let status = false
  let url = null
  let path = null

  // 扫描到小程序码
  if (resData.scanType === 'WX_CODE') {
    url = decodeURIComponent(resData.path).split('?')
    if (isArray(url) && url[1]) {
      url[1] = url[1].split(',')
      status = url[1].indexOf('xaCard') > -1
      path = `merchantId=${url[1][0].replace('scene=', '')}&type=${url[1][1]}&actionType=${url[1][2]}`
    }
  } else if (resData.scanType === 'QR_CODE' || resData.type === 'qrcode') {
    url = decodeURIComponent(resData.result).split('?')
    if (isArray(url) && url[1]) {
      console.log('🥫[url]:', url)
      status = url[1].indexOf('xaCard') > -1
      path = url[1]
      console.log('🍷,', status)
    }
  }
  return {
    status,
    url: path,
  }
}

/**
 * @description:  处理返回 操作
 */
export function getBack() {
  const pageList = getCurrentPages()
  if (pageList.length <= 1) {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  } else {
    uni.navigateBack()
  }
}

/**
 * @description: 数据脱敏显示
 * @param {} data 数据
 * @param {} flog 是否脱敏
 * @return {}
 */
export function dataDesensitization(
  data: string,
  flog = false,
  position: 'left' | 'right' | 'center' | 'last' | 'first',
) {
  if (!data) return ''
  if (flog) {
    return data
  } else {
    const l = data.length === 2 ? 2 : data.length
    let str = '*'
    for (let i = 0; i < l - 2; i++) {
      str += '*'
    }
    if (position === 'left') {
      return data.replace(/^(.{1})(?:\d+)/, `$1${str}`)
    } else if (position === 'right') {
      return data.replace(/^(?:\d+)(.{1})$/, `${str}$1`)
    } else if (position === 'last') {
      return data.replace(/^(?:\d+)(.{4})$/, `${str}$1`)
    } else if (position === 'first') {
      console.log('🍫', str)
      const dl = data.length
      if (dl < 2) {
        return '*' + data[data.length - 1]
      } else {
        return '**' + data[data.length - 1]
      }
    } else {
      return data.replace(/^(.{1})(?:\d+)(.{1})$/, `$1${str}$2`)
    }
  }
}

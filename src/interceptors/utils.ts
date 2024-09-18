import PLATFORM from '@/utils/platform'

const { VITE_APP_PROXY_PREFIX, VITE_SERVER_BASEURL } = import.meta.env

// FIX: 注意路径斜杠
// 第一个代理后端地址
export const baseUrlApi = (url: string) => {
  if (PLATFORM.isH5) {
    return VITE_APP_PROXY_PREFIX + url
  } else {
    return VITE_SERVER_BASEURL + url
  }
}
// 第二个代理后端地址
export const baseUrlOtherApi = (url: string) => `otherApi${url}`

/* eslint-disable no-param-reassign */
import { useUserStore } from '@/store'
import { platform } from '@/utils/platform'
import qs from 'qs'

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean
  meta?: Record<string, any>
} & IUniUploadFileOptions // 添加uni.uploadFile参数类型

// 请求基准地址
const baseUrl = import.meta.env.VITE_SERVER_BASEURL
const timeOut = import.meta.env.VITE_SERVER_TIME_OUT
//

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    console.log('🍕[options]:', options)
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      } else {
        options.url += `?${queryStr}`
      }
    }
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      // #ifdef H5
      console.log(__VITE_APP_PROXY__)
      if (JSON.parse(__VITE_APP_PROXY__)) {
        // 啥都不需要做
      } else {
        options.url = baseUrl + options.url
      }
      // #endif
      // 非H5正常拼接
      // #ifndef H5
      options.url = baseUrl + options.url
      // #endif
      // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    }
    // 数据元信息
    if (options.meta?.responseType) {
      options.responseType = options.meta.responseType
    }

    // 1. 请求超时
    options.timeout = timeOut
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      platform, // 可选，与 uniapp 定义的平台一致，告诉后台来源
      ...options.header,
    }
    // 3. 添加 token 请求头标识 元信息不需要token
    const userStore = useUserStore()
    const { token } = userStore.userInfo as unknown as IUserInfo
    if (token && !options.meta?.ignoreAuth) {
      options.header.Authorization = `Bearer ${token}`
    }
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  },
}

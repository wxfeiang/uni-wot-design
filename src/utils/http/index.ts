import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
// eslint-disable-next-line import/named
import { API } from '@/service/model/baseModel'
import { useUserStore } from '@/store'
import { checkStatus } from '@/utils/http/checkStatus'
import { Toast } from '@/utils/uniapi/prompt'
import { assign } from 'lodash-es'
const BASE_URL = import.meta.env.VITE_SERVER_BASEURL
const timeOut = import.meta.env.VITE_SERVER_TIME_OUT

const HEADER = {
  'Content-Type': ContentTypeEnum.JSON,
  Accept: 'application/json, text/plain, */*',
}

/**
 * alova 请求实例
 * @link
 */
const alovaInstance = createAlova({
  baseURL: BASE_URL,
  ...AdapterUniapp({
    // /* #ifndef APP-PLUS */
    // mockRequest: isUseMock() ? mockAdapter : undefined, // APP 平台无法使用mock
    // /* #endif */
  }),
  // 在开发环境开启错误日志
  // errorLogger: process.env.NODE_ENV === devMode,
  // // 在开发环境开启缓存命中日志
  // //cacheLogger: process.env.NODE_ENV === 'development',
  timeout: timeOut,
  beforeRequest: (method) => {
    //
    const userStore = useUserStore()

    // 默认不是用全局加载状态。。。
    // Loading('加载中...');
    method.config.headers = assign(method.config.headers, HEADER, userStore.getAuthorization())
  },

  responsed: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config, meta } = method
      const { enableDownload, enableUpload, responseType } = config as any
      // 返回所有结果
      const { statusCode, data: rawData } = response as any

      // 返回所有结果
      if (statusCode === 200 && (meta?.resAll || responseType)) {
        return response
      } else {
        // 返回data
        const { code, message, data } = rawData as API
        if (statusCode === 200) {
          if (enableDownload) {
            // 下载处理
            return rawData
          }
          if (enableUpload) {
            // 上传处理
            return rawData
          }
          if (message === ResultEnum.TYPE) {
            return data as any
          }
          message && Toast(message)
          return Promise.reject(rawData)
        }

        checkStatus(statusCode, message || '')
      }

      return Promise.reject(rawData)
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param err
     * @param method
     */
    onError: (err, method) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ err, method })
    },
  },
})

export const request = alovaInstance

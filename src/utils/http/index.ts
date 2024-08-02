import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'

import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
// eslint-disable-next-line import/named
import { useSystemStore, useUserStore } from '@/store'
import { checkStatus } from '@/utils/http/checkStatus'

import { baseUrl } from '@/utils'
import { beforeQuest, responseAes } from '@/utils/aes/encryptUtils'
import { assign } from 'lodash-es'

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
  baseURL: baseUrl(),
  ...AdapterUniapp({
    // /* #ifndef APP-PLUS */
    // mockRequest: isUseMock() ? mockAdapter : undefined, // APP 平台无法使用mock
    // /* #endif */
  }),
  // 在开发环境开启错误日志
  // errorLogger: process.env.NODE_ENV === devMode,
  // // 在开发环境开启缓存命中日志
  // cacheLogger: process.env.NODE_ENV === 'development',
  statesHook: VueHook,
  timeout: timeOut,
  beforeRequest: (method) => {
    const userStore = useUserStore()
    beforeQuest(method)
    // 默认不是用全局加载状态。。。
    // Loading('加载中...');
    if (!method.meta?.ignorToken) {
      method.config.headers = assign(method.config.headers, HEADER, userStore.getAuthorization())
    }
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
      const { msg, data, code } = rawData as any
      // 返回所有结果
      if (statusCode === 200 && (meta?.resAll || responseType)) {
        return response
      } else {
        if (statusCode === 200) {
          if (enableDownload) {
            // 下载处理
            return rawData
          }
          if (enableUpload) {
            // 上传处理
            return rawData
          }
          // TODO: 处理白名单返回 处理正确数据返回
          const useSystem = useSystemStore()
          if (useSystem.filterData.whiteList.includes(method.url)) {
            return rawData
          }
          // 处理数据
          const resAllData = responseAes(response)
          const { data: rdata, code: rode, msg: rmsg } = resAllData
          if (rode === ResultEnum.CODE) {
            return rdata as any
          } else {
            rmsg && checkStatus(statusCode, rmsg || '')
          }
          return Promise.reject(resAllData)
        }
      }
      checkStatus(statusCode, msg || '')
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

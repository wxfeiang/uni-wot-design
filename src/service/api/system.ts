import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

import { useCaptcha } from '@alova/scene-vue' // eslint-disable-line
import { useRequest } from 'alova'

import { METHOD_INSTANCE } from '../model/baseModel'
const CONFIG = baseUrlApi('/captcha/config')
const CODE = baseUrlApi('/captcha/getCode')
const RESCONFIG = baseUrlApi('/captcha/getResponseConfig')
const GETDOT = baseUrlApi('/captcha/getDot')
const PHNECODE = baseUrlApi('/base/captchaImage')

const USER_ID_KEY = baseUrlApi('/user/app/getUserIdKey')
const GET_INFO = baseUrlApi('/user/app/getInfo')

export const PRIVACY_UPLOAD = baseUrlApi('/system/file/minio/privacyUpload')
export const UPLOAD_FILE = baseUrlApi('/system/file/api/minio/upload')

export const PRIVACY_FILE_STREAM = baseUrlApi('/system/file/minio/getPrivacyFileStream')

export const getDot = (config: any) => {
  const methodInstance = request.Post(GETDOT)
  methodInstance.meta = {
    resAll: true,
    ignorEencrypt: true,
  }

  return useRequest(methodInstance, config)
}

/**
 * 获取配置
 * @param params
 */
export const captchaConfig = (config: any) => {
  const methodInstance = request.Post(CONFIG)
  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
    resAll: true,
  }

  return useRequest(methodInstance, config)
}
/**
 * @description: 获取响应配置
 * @param {} config
 * @return {}
 */
export const getResponseConfig = (config: any) => {
  const methodInstance = request.Post(RESCONFIG)
  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
    resAll: true,
  }

  return useRequest(methodInstance, config)
}
/**
 * 获取验证吗
 * @param params
 */
export function getCode(config: any) {
  const methodInstance = request.Post(
    CODE, // 请求地址
    {},
    {
      responseType: 'arraybuffer', // 配置参数
    },
  )
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
  }
  methodInstance.meta = meta

  return useRequest(methodInstance, config)
}

/**
 * @description:  获取手机验证吗
 * @param {} data
 * @param {} config
 * @return {}
 */
export function getPhoneCode(data: any, config: any) {
  const methodInstance = request.Post(
    PHNECODE, // 请求地址
    data,
    {
      responseType: 'arraybuffer', // 配置参数
    },
  )
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
  }
  methodInstance.meta = meta

  return useCaptcha(methodInstance, config)
}

/**
 * 获取 人脸识别Key
 * @param params
 */

export function getUserIdKey(config: any) {
  return useRequest(
    (newTodo) =>
      request.Post(
        USER_ID_KEY, // 地址
        newTodo, // 参数
      ),
    { ...config },
  )
}

/**
 * 获取 识别后信息
 * @param params
 */
export function getUserInfo(config: any) {
  return useRequest(
    (newTodo) =>
      request.Post(
        GET_INFO, // 地址
        newTodo, // 参数
      ),
    { ...config },
  )
}

/**
 * @description: 解析加密图片
 * @param {} data
 * @param {} config
 * @return {}
 */
export function getFileParse(data: any, config: any) {
  const methodInstance = request.Post(
    PRIVACY_FILE_STREAM, // 请求地址
    data,
    {
      responseType: 'arraybuffer', // 配置参数
    },
  )

  return useRequest(methodInstance, config)
}

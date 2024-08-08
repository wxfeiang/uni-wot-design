import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
const CONFIG = baseUrlApi('/captcha/config')
const CODE = baseUrlApi('/captcha/getCode')
const RESCONFIG = baseUrlApi('/captcha/getResponseConfig')
const GETDOT = baseUrlApi('/system/api/user/getDot')

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

  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
  }

  return useRequest(methodInstance, config)
}

/**
 * @description: 解析加密图片
 * @param {} data
 * @param {} config
 * @return {}
 */
export function getFileParse(data: any, config: any) {
  const methodInstance = request.Post(
    baseUrlApi('/base/captchaImage'), // 请求地址
    {
      responseType: 'arraybuffer', // 配置参数
    },
  )
  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
    resAll: true,
  }

  return useRequest(methodInstance, config)
}

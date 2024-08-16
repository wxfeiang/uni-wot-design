import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
const LOGIN = baseUrlApi('/system/api/helper/productLogin')
const LOGIN_OUT = baseUrlApi('/captcha/faceLoginOut')
const REFRESH_TOKEN = '/refresh/token'
const TEST_TOKEN = '/employee/test'
const GET_AGREEMENT = baseUrlApi('/agreement')
const FACE_LOGIN = baseUrlApi('/user/app/faceLogin')

const FACE_LOGIN_OUT = baseUrlApi('/captcha/faceLoginOut')

const USER_ID_KEY = baseUrlApi('/user/app/getUserIdKey')
const GET_INFO = baseUrlApi('/user/app/getInfo')

/**
 * 获取 人脸识别Key
 * @param params
 */

export function getUserIdKey(data) {
  return request.Post(
    USER_ID_KEY, // 地址
    data,
  )
}

/**
 * 获取 识别后信息
 * @param params
 */
export function getUserInfo(data) {
  return request.Post(
    GET_INFO, // 地址
    data,
  )
}

/**
 * 人脸登录
 * @param params 初始参数()
 * */
export function faceLogin(data) {
  return request.Post(
    FACE_LOGIN, // 地址
    data,
  )
}

/**
 * 登出
 * 测试token
 * @param params
 */
export function logout(data) {
  // TODO: 地址么有配置
  return request.Post(
    FACE_LOGIN, // 地址
    data,
  )
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request.Post<LoginModel>(REFRESH_TOKEN, {})
}

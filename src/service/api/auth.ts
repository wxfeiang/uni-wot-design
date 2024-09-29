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
const ADD_XCX_USER_DETAIL = baseUrlApi('/member/app/addXcxUserDetail')
const ADD_XCX_USER_DETAIL_WXV = baseUrlApi('/member/app/addXcxUserDetailWx')
const GET_USER_OPEN_ID_BY_CODE = baseUrlApi('/member/app/getUserOpenIdByCode')
const GET_XA_SC_OPEN_ID = baseUrlApi('/member/app/xcxLogin/getXaScOpenId')

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
 * 手机登录
 * @param params 初始参数()
 * */
export function phoneLogin(data) {
  return request.Post(
    ADD_XCX_USER_DETAIL, // 地址
    data,
  )
}
/**
 * 登录凭证
 * @param params 初始参数()
 * */
export function openIdCode(data) {
  return request.Post(
    GET_USER_OPEN_ID_BY_CODE, // 地址
    data,
  )
}

/**
 * 微信快捷
 * @param params 初始参数()
 * */
export function phoneChartLogin(data) {
  return request.Post(
    ADD_XCX_USER_DETAIL_WXV, // 地址
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

/**
 * 获取数城openid
 * @param params 初始参数()
 * */
export function getShcOpId(data) {
  // const meta: METHOD_INSTANCE = {
  //   ignoreSign: true,
  //   ignorEencrypt: true,
  //   ignorToken: true,
  //   resdata: true,
  // }
  return request.Post(
    GET_XA_SC_OPEN_ID, // 地址
    data,
    // {
    //   meta,
    // },
  )
}

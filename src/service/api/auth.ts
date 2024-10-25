import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

const REFRESH_TOKEN = '/refresh/token'
const FACE_LOGIN = baseUrlApi('/member/app/xcxLogin/faceLogin')
const FACE_LOGIN_OUT = baseUrlApi('/captcha/faceLoginOut')

const USER_ID_KEY = baseUrlApi('/member/app/xcxLogin/getUserIdKey')
const GET_INFO = baseUrlApi('/member/app/xcxLogin/getInfo')
const ADD_XCX_USER_DETAIL = baseUrlApi('/member/app/xcxLogin/xcxUserLoginByCode')
const ADD_XCX_USER_DETAIL_WXV = baseUrlApi('/member/app/xcxLogin/xcxUserLoginByWx')
const GET_USER_OPEN_ID_BY_CODE = baseUrlApi('/member/app/getUserOpenIdByCode')
const UPDATE_OPENID_AND_UNIONID = baseUrlApi('/member/app/updateOpenIdAndUnionId')

const UPDATE_REAL_NAME = baseUrlApi('/member/app/xcxLogin/updateRealName')

const XCX_SCAN_FACE_REAL_NAME_AUTH = baseUrlApi('/member/app/xcxLogin/xcxScanFaceRealNameAuth')

const LOGIN_OFF = baseUrlApi('/member/app/userInfo/lOginOff')

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
 * 人脸实名认证
 * @param params 初始参数()
 * */
export function xcxScanFaceRealNameAuth(data) {
  return request.Post(
    XCX_SCAN_FACE_REAL_NAME_AUTH, // 地址
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
 * 小程序登录成功后更新或新增 openId 和 unionId
 * @param params 初始参数()
 * */
export function updateOpenIdAndUnionId(data) {
  return request.Post(
    UPDATE_OPENID_AND_UNIONID, // 地址
    data,
  )
}

/**
 * 微信电话号码登录
 * @param params 初始参数()
 * */
export function phoneChartLogin(data) {
  return request.Post(
    ADD_XCX_USER_DETAIL_WXV, // 地址
    data,
  )
}

/**
 * 补充电话号码/实名认证
 * @param params 初始参数()
 * */
export function updateRealName(data) {
  return request.Post(
    UPDATE_REAL_NAME, // 地址
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
 * 补充电话号码/实名认证
 * @param params 初始参数()
 * */
export function userLogout(data) {
  return request.Post(LOGIN_OFF, data)
}

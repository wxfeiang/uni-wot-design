import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
const LOGIN = baseUrlApi('/system/api/helper/productLogin')
const LOGIN_OUT = baseUrlApi('/captcha/faceLoginOut')
const REFRESH_TOKEN = '/refresh/token'
const TEST_TOKEN = '/employee/test'
const GET_AGREEMENT = baseUrlApi('/agreement')
const FACE_LOGIN = baseUrlApi('/user/app/faceLogin')

const FACE_LOGIN_OUT = baseUrlApi('/captcha/faceLoginOut')
/**
 * 登录
 * @param params 初始参数()
 */
export function sysLogin(config: any) {
  return useRequest((newTodo) => request.Post(LOGIN, newTodo), { ...config })
}

/**
 * 人脸登录
 * @param params 初始参数()
 * */
export function faceLogin(config: any) {
  return useRequest((newTodo) => request.Post(FACE_LOGIN, newTodo), { ...config })
}

/**
 * 登出
 */
export function logout(config: any) {
  const methodInstance = request.Post(FACE_LOGIN_OUT)
  return useRequest(methodInstance, config)
}

/**
 * 测试token
 * @param params
 */
export function testToken() {
  return request.Get(TEST_TOKEN)
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request.Post<LoginModel>(REFRESH_TOKEN, {})
}

/**
 * 获取各种富文本协议内容
 */
export function agreement(params: any, config: any) {
  return useRequest((newTodo) => request.Get(GET_AGREEMENT, { params: newTodo }), { ...config })
}

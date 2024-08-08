import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
const LOGIN = baseUrlApi('/system/api/helper/productLogin')
const LOGIN_OUT = '/logout'
const REFRESH_TOKEN = '/refresh/token'
const TEST_TOKEN = '/employee/test'
/**
 * 登录
 * @param params 初始参数()
 */
export function sysLogin(params: any, config: any) {
  return useRequest((newTodo) => request.Post(LOGIN, newTodo), { ...config })
}
/**
 * 测试token
 * @param params
 */
export function testToken() {
  return request.Get(TEST_TOKEN)
}

/**
 * 登出
 */
export function logout() {
  return request.Post(LOGIN_OUT, {})
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request.Post<LoginModel>(REFRESH_TOKEN, {})
}

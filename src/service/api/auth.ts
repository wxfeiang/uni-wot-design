import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
import { METHOD_INSTANCE } from '../model/baseModel'
// const LOGIN = baseUrlApi('/system/api/helper/productLogin')
const LOGIN = baseUrlApi('/employee/login')

const EP_LIST = baseUrlApi('/employee/list')

const LOGIN_OUT = '/logout'
const REFRESH_TOKEN = '/refresh/token'
const TEST_TOKEN = '/employee/test'
const GET_AGREEMENT = baseUrlApi('/agreement')
/**
 * 登录
 * @param params 初始参数()
 */
export function sysLogin(data, config: any) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }
  return useRequest(
    (newTodo) =>
      request.Post(LOGIN, newTodo, {
        meta,
      }),
    { ...config },
  )
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
/**
 * 登出
 */
export function logout(config: any) {
  return useRequest(request.Post(LOGIN_OUT), { ...config })
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

export function epList() {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }

  return request.Post(
    EP_LIST, // 请求地址
    {}, // 请求参数
    {
      meta,
    },
  )
}

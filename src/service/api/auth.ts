import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova/client'
import { METHOD_INSTANCE } from '../model/baseModel'
const LOGIN = baseUrlApi('/employee/login')
const LOGIN_OUT = '/logout'
const REFRESH_TOKEN = '/refresh/token'
const TEST_TOKEN = '/employee/test'
const GET_AGREEMENT = baseUrlApi('/agreement')
const EP_LIST = baseUrlApi('/employee/list')
/**
 * 登录
 * @param params 初始参数()
 */
export function sysLogin(data: any) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }

  return request.Post(
    LOGIN, // 请求地址
    data,
    {
      meta,
      // transform(rawData, headers) {
      //   console.log('🍆[rawData]:', rawData, '=======', headers)
      //   return 1
      // },
    },
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

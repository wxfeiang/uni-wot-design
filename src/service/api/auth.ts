import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'
const LOGIN = baseUrlApi('/employee/login')
const LOGIN_OUT = baseUrlApi('/logout')
const REFRESH_TOKEN = baseUrlApi('/refresh/token')
const TEST_TOKEN = baseUrlApi('/employee/test')
const DOWNFILE = baseUrlApi('/employee/exporeList')
const CODEIMG = baseUrlApi('/base/captchaImage')
/**
 * 登录
 * @param params
 */

export function login(data) {
  return request.Post(
    LOGIN, // 地址
    data,
  )
}

export function captchaImage() {
  return request.Post(CODEIMG)
}

/**
 * 测试token
 * @param params
 */

export const testToken = (config: any) => {
  const meta: METHOD_INSTANCE = {
    ignorToken: true,
  }

  return request.Get(TEST_TOKEN, {
    params: {
      userId: 1,
    },
    meta,
  })
}

// export const downFile = (config: any) => {
//   const methodInstance = request.Post(
//     DOWNFILE,
//     {
//       params: {
//         userId: 2,
//       },
//     },
//     {
//       responseType: 'arraybuffer',
//       params: {
//         userId: 2,
//       },
//     },
//   );
//   methodInstance.meta = {
//     ignoreToken: true,
//   };

//   return useRequest(methodInstance, config);
// };
export const downFile = (config: any) => {
  return request.Post(DOWNFILE, {
    params: {
      userId: 2,
    },
    responseType: 'arraybuffer',
  })
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

import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
const LOGIN = baseUrlApi('/employee/login')
const LOGIN_OUT = baseUrlApi('/logout')
const REFRESH_TOKEN = baseUrlApi('/refresh/token')
const TEST_TOKEN = baseUrlApi('/employee/test')
const DOWNFILE = baseUrlApi('/employee/exporeList')
const CODEIMG = baseUrlApi('/base/captchaImage')
/**
 * 登录s
 * @param params
 */

export function login(params: any, config: any) {
  return useRequest((newTodo) => request.Post(LOGIN, newTodo), { ...config })
}

export function captchaImage(config: any) {
  return useRequest(request.Post(CODEIMG), { ...config })
}

/**
 * 测试token
 * @param params
 */

export const testToken = (config: any) => {
  const methodInstance = request.Get(TEST_TOKEN, {
    params: {
      userId: 1,
    },
  })
  methodInstance.meta = {
    ignoreToken: true,
  }

  return useRequest(methodInstance, config)
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
  const methodInstance = request.Post(DOWNFILE, {
    params: {
      userId: 2,
    },
    responseType: 'arraybuffer',
  })
  // methodInstance.meta = {
  //   ignoreToken: true,
  // };

  return useRequest(methodInstance, config)
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

import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
import { CONFIGN, METHOD_INSTANCE } from '../model/baseModel'
const TYPELIST = '/myresources/tbbType'
const CONTENTLIST = '/myresources/tbbTypeContList'

const CONTENTDESC = '/myresources/tbbTypeDesc'

const MESSAGE_LIST = baseUrlApi('/manageArtacle/listSysArtaclePage')

const ARTACLE_DETAIL = baseUrlApi('/manageArtacle/findArtacleDetail')
/**
 * 获取类型
 * @param params
 */

export function getTypeList(config: any) {
  return useRequest(request.Get(TYPELIST), { ...config })
}

/**
 * 类型类表
 * @param params
 */

export function getcontentList(config: any) {
  return useRequest((newTodo) => request.Post(CONTENTLIST, newTodo), {
    ...config,
  })
}

/**
 * 类型类表
 * @param params
 */

export function getcontentDesc(config: any) {
  return useRequest((newTodo) => request.Post(CONTENTDESC, newTodo), {
    ...config,
  })
}

/**
 * @description: 获取消息列表
 * @param {} data
 * @return {}
 */
export function getMessageList(data: any, config: CONFIGN) {
  const methodInstance = request.Post(
    MESSAGE_LIST, // 请求地址
    data,
  )
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }
  methodInstance.meta = meta

  return useRequest(methodInstance, config)
}

/**
 * @description: 获取文章详情
 * @param {} data
 * @return {}
 */
export function getArtacleDetail(config: CONFIGN) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }

  return useRequest(
    (newTodo) =>
      request.Post(
        ARTACLE_DETAIL, // 地址
        newTodo, // 参数
        {
          meta,
        },
      ),
    { ...config },
  )
}

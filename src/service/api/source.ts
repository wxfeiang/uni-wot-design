import { request } from '@/utils/http'
const TYPELIST = '/myresources/tbbType'
const CONTENTLIST = '/myresources/tbbTypeContList'

const CONTENTDESC = '/myresources/tbbTypeDesc'
/**
 * 获取类型
 * @param params
 */

export function getTypeList<T>() {
  return request.Get<T>(TYPELIST)
}

/**
 * 类型类表
 * @param params
 */

export function getcontentList() {
  return request.Post(CONTENTLIST)
}

/**
 * 类型类表
 * @param params
 */

export function getcontentDesc() {
  return request.Post(CONTENTDESC)
}

import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

import { METHOD_INSTANCE } from '../model/baseModel'
const MESSAGE_LIST = baseUrlApi('/member/app/manageArticle/listSysArtaclePage')

const ARTACLE_DETAIL = baseUrlApi('/member/app/manageArticle/findArtacleDetail')

const GET_BRANCHES_INFO = baseUrlApi('/card/app/getBranchesInfo')

const GET_SPECIAL_TYPE_LIST = baseUrlApi('/promotion/app/xcxUserAdvice/getSpecialTypeList')
const ADD_READ_HISTORY_RECORD = baseUrlApi('/user/app/history/addReadHistoryRecord')
const GET_HISTORY_PAGE_BY_USER_ID = baseUrlApi('/user/app/history/getHistoryPageByUserId')
const GET_DETAIL_UPDATE_READ = baseUrlApi('/user/app/history/getDetailUpdateRead ')
/**
 * @description: 获取消息列表
 * @param {} data
 * @return {}
 */
export function getHistoryPageByUserId<T>(data) {
  return request.Post<T>(
    GET_HISTORY_PAGE_BY_USER_ID, // 请求地址
    data,
  )
}
/**
 * @description: 获取消息列表详情
 * @param {} data
 * @return {}
 */
export function getDetailUpdateRead(data) {
  return request.Post(
    GET_DETAIL_UPDATE_READ, // 请求地址
    data,
  )
}
/**
 * @description: 消息改状态
 * @param {} data
 * @return {}
 */
export function addReadHistoryRecord(data) {
  return request.Post(
    ADD_READ_HISTORY_RECORD, // 请求地址
    data,
  )
}

/**
 * @description: 获取文章列表
 * @param {} data
 * @return {}
 */
export function getMessageList<T>(data) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    Analysis: true,
  }
  return request.Post<T>(
    MESSAGE_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 * @description: 获取文章详情
 * @param {} data
 * @return {}
 */
export function getArtacleDetail(data) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    Analysis: true,
  }

  return request.Post(ARTACLE_DETAIL, data, {
    meta,
  })
}

/**
 * @description: 获取网点信息
 * @return {}
 */

export function getBranchesInfo<T>(data: any) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    Analysis: true,
    loading: true,
  }

  return request.Post<T>(GET_BRANCHES_INFO, data, {
    meta,
  })
}

/**
 * @description: 资源检索列表
 * @return {}
 */

export function getSerchList(data: any) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }

  return request.Post(MESSAGE_LIST, data, {
    meta,
  })
}

export function getSpecialTypeList<T>(data) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    Analysis: true,
  }
  return request.Post<T>(GET_SPECIAL_TYPE_LIST, data, {
    meta,
  })
}

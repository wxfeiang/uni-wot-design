import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

import { METHOD_INSTANCE } from '../model/baseModel'
const MESSAGE_LIST = baseUrlApi('/member/app/manageArticle/listSysArtaclePage')

const ARTACLE_DETAIL = baseUrlApi('/member/app/manageArticle/findArtacleDetail')

const GET_BRANCHES_INFO = baseUrlApi('/card/app/getBranchesInfo')

/**
 * @description: 获取消息列表
 * @param {} data
 * @return {}
 */
export function getMessageList(data) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }
  return request.Post(
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
    resAll: true,
  }

  return request.Post(ARTACLE_DETAIL, data, {
    meta,
  })
}

/**
 * @description: 获取网点信息
 * @return {}
 */

export function getBranchesInfo(data: any) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }

  return request.Post(GET_BRANCHES_INFO, data, {
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

  return request.Post(GET_BRANCHES_INFO, data, {
    meta,
  })
}

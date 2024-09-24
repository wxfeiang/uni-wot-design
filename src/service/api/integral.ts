import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'
const GET_EXCHANGE_GOODS_LIST = baseUrlApi('/promotion/app/h5/exchangeGoods/getExchangeGoodsList')

const GET_INTEGRAL_INFO = baseUrlApi('/member/app/integral/getIntegralInfo')

/**
 *   获取我的可用积分
 * @param params 初始参数()
 * */
export function getIntegralInfo<T>(data) {
  const meta: METHOD_INSTANCE = {}
  return request.Post<T>(
    GET_INTEGRAL_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   获取积分商品列表
 * @param params 初始参数()
 * */
export function getExchangeGoodsList<T>(data) {
  const meta: METHOD_INSTANCE = {}
  return request.Post<T>(
    GET_EXCHANGE_GOODS_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

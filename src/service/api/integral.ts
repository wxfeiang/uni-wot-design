import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'
const GET_EXCHANGE_GOODS_LIST = baseUrlApi('/promotion/app/h5/exchangeGoods/getExchangeGoodsList')

const GET_INTEGRAL_INFO = baseUrlApi('/member/app/integral/getIntegralInfo')

const GET_EXCHANGE_GOODS_INFO = baseUrlApi('/promotion/app/h5/exchangeGoods/getExchangeGoodsInfo')

const EXCHANGE_GOODS = baseUrlApi('/promotion/app/h5/exchangeGoods/exchangeGoods')

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

/**
 *   积分ID 获取积分商品详情
 * @param params 初始参数()
 * */
export function getExchangeGoodsInfo<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post<T>(
    GET_EXCHANGE_GOODS_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   提交积分兑换
 * @param params 初始参数()
 * */
export function exchangeGoods<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post<T>(
    EXCHANGE_GOODS, // 请求地址
    data,
    {
      meta,
    },
  )
}

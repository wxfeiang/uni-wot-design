import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'
const WX_PAY = baseUrlApi('/trade/wxPay/wxPay')
// const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getDetail')

const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getShopDetail')
const GET_GOOD_LIST = baseUrlApi('/product/app/productSpu/listPage')
const GET_GOOD_DETAILS = baseUrlApi('/product/app/productSpu/getProductSpuByIdSkuList')

/**
 *   获取商品列表
 * @param params 初始参数()
 * */
export function getGoodList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_GOOD_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   获取商品详情
 * @param params 初始参数()
 * */
export function getGoodDetails(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_GOOD_DETAILS, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   获取店铺基本信息
 * @param params 初始参数()
 * */
export function getShopDetail<T>(data) {
  const meta: METHOD_INSTANCE = {
    Tips: true,
  }
  return request.Post<T>(
    GET_SHOP_DETAIL, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   获取订单支付信息
 * @param params 初始参数()
 * */
export function getWxPay<T>(data) {
  return request.Post<T>(
    WX_PAY, // 请求地址
    data,
  )
}

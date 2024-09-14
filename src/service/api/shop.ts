import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getShopDetail')
/**
 *   获取店铺基本信息
 * @param params 初始参数()
 * */
export function getShopDetail<T>(data) {
  return request.Post<T>(
    GET_SHOP_DETAIL, // 请求地址
    data,
  )
}

const WX_PAY = baseUrlApi('/trade/wxPay/wxPay')
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

import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const WX_PAY = baseUrlApi('/trade/wxPay/wxPay')
/**
 *   获取订单支付信息
 * @param params 初始参数()
 * */
export function getWxPay<T>(data) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    Analysis: true,
    loading: true,
    Tips: true,
  }
  return request.Post<T>(
    WX_PAY, // 请求地址
    data,
    {
      meta,
    },
  )
}

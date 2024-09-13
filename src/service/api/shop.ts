import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

const WX_PAY = baseUrlApi('/trade/wxPay/wxPay')
/**
 *   获取店铺基本信息
 * @param params 初始参数()
 * */
export function getWxPay<T>(data) {
  return request.Post<T>(
    WX_PAY, // 请求地址
    data,
  )
}

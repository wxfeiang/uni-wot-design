import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const COUPON_RECEIVE = baseUrlApi('/promotion/app/coupon/receiveCenter')

const USER_COUPON_LIST = baseUrlApi('/promotion/app/coupon/userCouponList')

const RECEIVE_COUPON = baseUrlApi('/promotion/app/coupon/userReceive')

/**
 *  可领取优惠券
 * @param params 初始参数()
 * */
export function getCouponList(data) {
  return request.Post(
    COUPON_RECEIVE, // 请求地址
    data,
  )
}

/**
 *  个人中心查看用户优惠卷列表
 * @param params 初始参数()
 * */
export function getUserCouponList(data) {
  return request.Post(
    USER_COUPON_LIST, // 请求地址
    data,
  )
}

/**
 * 用户领取优惠卷
 * @param params 初始参数()
 * */
export function receiveCoupon(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    RECEIVE_COUPON, // 地址
    data,
    {
      meta,
    },
  )
}

import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const FIND_XCX_SCORE_USER = baseUrlApi('/member/app/signIn/getSignInDetail')

const SIGN_IN = baseUrlApi('/member/app/signIn/addSignIn')

const GET_USER_SCORE_PAGE = baseUrlApi('/member/app/integral/getPointsDetailList')

const GET_XIN_CANG_CARD_INFO = baseUrlApi('/card/app/getXinCangCardInfo')
const SET_XIN_CANG_CARD_AUTHORIZE = baseUrlApi('/card/app/setXinCangCardAuthorize')

const PAY_COUPON_USER_PHONE = baseUrlApi('/promotion/app/coupon/payCouponUserPhone')
const COUPON_RECEIVE = baseUrlApi('/promotion/app/coupon/receiveCenter')

const USER_COUPON_LIST = baseUrlApi('/promotion/app/coupon/userCouponList')

const RECEIVE_COUPON = baseUrlApi('/promotion/app/coupon/userReceive')

const GET_USER_GOODS_ADDRESS_LIST = baseUrlApi('/member/app/goodsAddress/getUserGoodsAddressList')

const ADD_BUSINESS_ADVICE = baseUrlApi('/promotion/app/xcxUserAdvice/saveOrUpdate')

const FIND_MY_INFO = baseUrlApi('/member/app/myInfo')

const GET_ADVICELIST = baseUrlApi('/promotion/app/xcxUserAdvice/getAdvicelist')
const GET_DETAIL_BY_ADVICE_ID = baseUrlApi('/promotion/app/xcxUserAdvice/getDetailByAdviceId')
/**
 *  查询雄才卡信息
 * @param params
 * */
export function getXinCangCardInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_XIN_CANG_CARD_INFO, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 *  查询雄才卡查询授权
 * @param params
 * */
export function setXinCangCardAuthorize(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    SET_XIN_CANG_CARD_AUTHORIZE, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 *  查询积分，优惠券，金额，等级
 * @param params
 * */
export function findmyInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    FIND_MY_INFO, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 *  积分信息
 * @param params 初始参数()
 * */
export function findXcxScoreUser(data, flog?: boolean) {
  const meta: METHOD_INSTANCE = {
    loading: !flog,
  }
  return request.Post(
    FIND_XCX_SCORE_USER, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 * 用户积分签到
 * @param params 初始参数()
 * */
export function interSignIn(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    SIGN_IN, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 * 积分列表
 * @param params 初始参数()
 * */
export function getInterList(data) {
  return request.Post(GET_USER_SCORE_PAGE, data)
}

/**
 * 当前用户可使用的支付券列表
 * @param params 初始参数()
 * */
export function getPayCouponUserPhone<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post<T>(PAY_COUPON_USER_PHONE, data, {
    meta,
  })
}

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

/**
 * 用户 收货地址维护
 * @param params 初始参数()
 * */
export function getUserGoodsAddressList(data) {
  return request.Post(
    GET_USER_GOODS_ADDRESS_LIST, // 地址
    data,
  )
}

/**
 * 用户反馈建议新增==
 * @param params 初始参数()
 * */
export function addBusinessAdvice(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    ADD_BUSINESS_ADVICE, // 地址
    data,
  )
}
/**
 * 用户反馈建议列表
 * @param params 初始参数()
 * */
export function getAdvicelist<T>(data) {
  return request.Post<T>(
    GET_ADVICELIST, // 地址
    data,
  )
}

/**
 * 用户反馈详情
 * @param params 初始参数()
 * */
export function getDetailByAdviceId<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post<T>(
    GET_DETAIL_BY_ADVICE_ID, // 地址
    data,
    {
      meta,
    },
  )
}

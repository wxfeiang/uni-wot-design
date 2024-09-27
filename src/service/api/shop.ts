import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const WX_PAY = baseUrlApi('/trade/wxPay/wxPay')
// const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getDetail')

const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getShopDetail')
const GET_GOOD_LIST = baseUrlApi('/product/app/productSpu/listPage')
const GET_GOOD_DETAILS = baseUrlApi('/product/app/productSpu/getProductSpuByIdSkuList')
const USER_FAVORITES = baseUrlApi('/product/app/item/userFavorites')
const UNUSER_FAVORITES = baseUrlApi('/product/app/item/unUserFavorites')
const FAVORITES_LIST = baseUrlApi('/product/app/item/favoritesPage')
const GOODS_SEARCH = baseUrlApi('/product/app/item/xcxListPage')
const SHOP_CAR_LIST = baseUrlApi('/product/manager/shop/cart/getCareList')
const ADD_CART = baseUrlApi('/product/manager/shop/cart/addCart')
const DEL_CART = baseUrlApi('/product/manager/shop/cart/deleteByIdBatch')
const FILTER_CONDITION = baseUrlApi('/product/app/item/getFilterCondition')
const ADD_USER_SHOP = baseUrlApi('/product/app/userShop/addUserShop')
/**
 *   关注店铺
 * @param params 初始参数()
 * */
export function addUserShop(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    ADD_USER_SHOP, // 请求地址
    data,
    {
      meta,
    },
  )
}

const GET_APP_TARGET_ORDER_ID_BY_SHOP = baseUrlApi('/order/app/getAppTargetOrderIdByShop')

/**
 *   商品搜索筛选条件
 * @param params 初始参数()
 * */
export function getFilterCondition(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    FILTER_CONDITION, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品搜索
 * @param params 初始参数()
 * */
export function goodsSearch(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GOODS_SEARCH, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   购物车列表
 * @param params 初始参数()
 * */
export function shopCarList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    SHOP_CAR_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   购物车添加
 * @param params 初始参数()
 * */
export function addCart(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    ADD_CART, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   购物车删除
 * @param params 初始参数()
 * */
export function delCart(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    DEL_CART, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品收藏列表
 * @param params 初始参数()
 * */
export function favoritesList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    FAVORITES_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   商品收藏
 * @param params 初始参数()
 * */
export function userFavorites(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    USER_FAVORITES, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品取消收藏
 * @param params 初始参数()
 * */
export function unUserFavorites(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    UNUSER_FAVORITES, // 请求地址
    data,
    {
      meta,
    },
  )
}

const GET_ORDER_LIST = baseUrlApi('/order/app/getXcxOrderList')
const GET_ORDER_INFO = baseUrlApi('/order/app/getXcxOrderDetailByOrderId')

const USE_RECORD = baseUrlApi('/promotion/app/coupon/useRecord')

const USE_OFFLINE = baseUrlApi('/promotion/app/coupon/useOffline')

const COUPON_INFO = baseUrlApi('/promotion/app/coupon/info')
/**
 *   获取订单列表
 * @param params 初始参数()
 * */
export function getOrderList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_ORDER_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   获取订单详情
 * @param params 初始参数()
 * */
export function getOrderInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_ORDER_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}

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
/**
 * 券码详情
 * @param params 初始参数()
 * */
export function getCouponInfo<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
    Tips: true,
  }
  return request.Post<T>(
    COUPON_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   商户优惠券核销记录
 * @param params 初始参数()
 * */
export function getUseRecord<T>(data) {
  return request.Post<T>(
    USE_RECORD, // 请求地址
    data,
  )
}
/**
 *   商户优惠券核销
 * @param params 初始参数()
 * */
export function getUseOffline<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
    Tips: true,
  }
  return request.Post<T>(
    USE_OFFLINE, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商户收款记录
 * @param params 初始参数()
 * */
export function getAppTargetOrderIdByShop<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post<T>(
    GET_APP_TARGET_ORDER_ID_BY_SHOP, // 请求地址
    data,
    {
      meta,
    },
  )
}

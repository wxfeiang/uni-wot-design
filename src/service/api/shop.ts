import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const WX_PAY = baseUrlApi('/trade/wxPay/wxPay')
// const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getDetail')

const GET_SHOP_DETAIL = baseUrlApi('/product/app/shop/getShopDetail')
const GET_GOOD_LIST = baseUrlApi('/product/app/productSpu/listPage')

const GET_GOOD_LIST_BY_TYPE = baseUrlApi('/product/app/category/categoryList')
const GET_GOOD_TYPE = baseUrlApi('/product/app/item/getCategory')

const GET_GOOD_DETAILS = baseUrlApi('/product/app/productSpu/getProductSpuByIdSkuList')
const USER_FAVORITES = baseUrlApi('/product/app/item/userFavorites')
const UNUSER_FAVORITES = baseUrlApi('/product/app/item/unUserFavorites')
const FAVORITES_LIST = baseUrlApi('/product/app/item/favoritesPage')
const GOODS_SEARCH = baseUrlApi('/product/app/item/xcxListPage')
const SHOP_CAR_LIST = baseUrlApi('/product/app/item/getCareList')
const ADD_CART = baseUrlApi('/product/app/item/addCart')
const DEL_CART = baseUrlApi('/product/app/item/deleteByIdBatch')
const FILTER_CONDITION = baseUrlApi('/product/app/item/getFilterCondition')
const ADD_USER_SHOP = baseUrlApi('/product/app/userShop/addUserShop')
const DEL_USER_SHOP = baseUrlApi('/product/app/userShop/deleteUserShop')
const GET_USER_SHOPLIST = baseUrlApi('/product/app/userShop/getUserShopList')
const GET_SHOP_INFO = baseUrlApi('/product/app/shop/getShopSimpleInfoById')

// const GET_SHOP_GOODS = baseUrlApi('/product/app/productSpu/getShopProductByShopId')
const GET_SHOP_GOODS = baseUrlApi('/product/app/productSpu/pageShopProduct')

const PICK_UP_STORE = baseUrlApi('/product/app/item/getPickUpStoreByMerchantId')
const SUBMIT_ORDER = baseUrlApi('/trade/app/XcxPayment/createOrderProduct')
const GET_ACTIVITY_BY_ID = baseUrlApi('/promotion/app/coupon/getActivityCouponProductById')
const GET_ACTIVITY_LIST = baseUrlApi('/promotion/app/hdShophd/page')
const GET_STD_TD_CODE = baseUrlApi('/member/app/QrCode/getStdTDCodeApp')
const CHANGE_ORDER_STUTAS = baseUrlApi('/trade/app/XcxPayment/updateOrderStatus')
const EVALUATION_LIST = baseUrlApi('/product/app/evaluation/list')
const EVALUATION_ADD = baseUrlApi('/product/app/evaluation/saveOrUpdate')
const GET_APP_TARGET_ORDER_ID_BY_SHOP = baseUrlApi('/order/app/getAppTargetOrderIdByShop')
const GET_MERCHANT_SERVICES_COUNT = baseUrlApi('/order/manage/getMerchantServicesCount')
const GET_REFUND = baseUrlApi('/trade/wxPay/wxRefund')
const GET_REFUND_REQUEST = baseUrlApi('/order/app/manage/orderRefunds')
const GET_REFUND_REVIEW = baseUrlApi('/order/app/manage/merchantAudit')
const ORDER_UPDATE = baseUrlApi('/trade/app/XcxPayment/payAgain')
const GET_ORDER_NUM = baseUrlApi('/order/app/manage/getOrderStatistics')
const GET_BUSINESS_INFO = baseUrlApi('/order/app/manage/merchantIdOrderStatistics')
const GET_POST_LIST = baseUrlApi('/order/app/xcxWaybillBiz')
const GET_POST_INFO = baseUrlApi('/order/app/manage/orderBeanSend')
const GET_HUIFU = baseUrlApi('/product/app/evaluation/reply')
const GET_RECOMMEND_PRODUCT_LIST = baseUrlApi('/product/app/productSpu/getRecommendProductList')
/**
 *   商品列表
 * @param params 初始参数()
 * subjectType=1 热销商品
 * subjectType=2 人气榜
 * subjectType=3 新品上市
 * */
export function getRecommendProductList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_RECOMMEND_PRODUCT_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   商品评价新增
 * @param params 初始参数()
 * */
export function evaluationAdd(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    EVALUATION_ADD, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   商品评价新增
 * @param params 初始参数()
 * */
export function gethuifu(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_HUIFU, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   获取订单数量
 * @param params 初始参数()
 * */
export function getOrderStatistics(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_ORDER_NUM, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   获取订单数量
 * @param params 初始参数()
 * */
export function getBusinessInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_BUSINESS_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}

export function getPostList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_POST_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

export function getPostInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_POST_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品评价列表
 * @param params 初始参数()
 * */
export function evaluationList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    EVALUATION_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品退款
 * @param params 初始参数()
 * */
export function getRefund(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_REFUND, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品退款申请
 * @param params 初始参数()
 * */
export function getRefundRequest(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_REFUND_REQUEST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   商品退款审核
 * @param params 初始参数()
 * */
export function getRefundReview(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_REFUND_REVIEW, // 请求地址
    data,
    {
      meta,
    },
  )
}
/**
 *   商品评价列表
 * @param params 初始参数()
 * */
export function orderUpdate(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    ORDER_UPDATE, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   提交订单
 * @param params 初始参数()
 * */
export function submitOrder(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    SUBMIT_ORDER, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   自提点列表
 * @param params 初始参数()
 * */
export function getPickUpStoreByMerchantId(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    PICK_UP_STORE, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   店铺详情
 * @param params 初始参数()
 * */
export function getShopInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_SHOP_INFO, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   店铺商品列表
 * @param params 初始参数()
 * */
export function getShopGoods(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_SHOP_GOODS, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *   关注店铺列表
 * @param params 初始参数()
 * */
export function getUserShopList(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_USER_SHOPLIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

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

/**
 *   取消关注店铺
 * @param params 初始参数()
 * */
export function delUserShop(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    DEL_USER_SHOP, // 请求地址
    data,
    {
      meta,
    },
  )
}

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

const GET_ORDER_LIST = baseUrlApi('/order/app/manage/getOrderPageByUser')
const GET_ORDER_INFO = baseUrlApi('/order/app/getOrderBeanDetailById')

const USE_RECORD = baseUrlApi('/promotion/app/coupon/useRecord')

const USE_OFFLINE = baseUrlApi('/promotion/app/coupon/useOffline')

const COUPON_INFO = baseUrlApi('/promotion/app/coupon/info')
// const LOG_ISTICS_INFO = baseUrlApi('/order/app/getPath')
const LOG_ISTICS_INFO = baseUrlApi('/order/app/manage/getLogistics')

const GET_ORDER_INFO_JF = baseUrlApi('/promotion/app/h5/exchangeGoods/getExchangeGoodsInfo')
const UPDATA_ORDER_STATUS = baseUrlApi('/order/app/manage/updateOrderBeanStatusById')

const HD_SHOPHD_DETAIL = baseUrlApi('/promotion/app/hdShophd/getDetail')

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
 *   获取订单详情
 * @param params 初始参数()
 * */
export function logistics(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    LOG_ISTICS_INFO, // 请求地址
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
export function updateOrderStatusById(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    UPDATA_ORDER_STATUS, // 请求地址
    data,
    {
      meta,
    },
  )
}

export function getOrderInfoJF(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_ORDER_INFO_JF, // 请求地址
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
 *   获取商品列表
 * @param params 初始参数()
 * */
export function getGoodListByType(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_GOOD_LIST_BY_TYPE, // 请求地址
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
export function getGoodType(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_GOOD_TYPE, // 请求地址
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
    loading: true,
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

/**
 *   我的页面  --- 商户收款统计
 * @param params 初始参数()
 * */
export function getMerchantServicesCount<T>(data) {
  return request.Post<T>(
    GET_MERCHANT_SERVICES_COUNT, // 请求地址
    data,
  )
}

export function changeOrderStatus<T>(data) {
  return request.Post<T>(
    CHANGE_ORDER_STUTAS, // 请求地址
    data,
  )
}

/**
 * 活动列表
 * @param params 分页
 * @returns
 */

export function getActivityList<T>(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post<T>(
    GET_ACTIVITY_LIST, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 * 活动详情
 * @param params 活动id
 * @returns
 */
export const getActivityById = <T>(params: ActivityParams) => {
  return request.Post<T>(GET_ACTIVITY_BY_ID, params)
}

/**
 * 轮播图详情
 * @param params  banner
 * @returns
 */
export const gethdShophddetail = <T>(data) => {
  return request.Post<T>(HD_SHOPHD_DETAIL, data)
}

/**
 *  生成二维码标准码接口
 * @param params
 * @returns
 */

export const getStdTDCode = <T>(params: IStdTDParams) => {
  const meta: METHOD_INSTANCE = {
    Tips: true,
  }
  return request.Post<T>(GET_STD_TD_CODE, params, {
    meta,
  })
}

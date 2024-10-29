import { useRequest } from 'alova/client'
import type { msCountProps, serveListProps, serveProps } from '../utils/types'

import { getIsReceiveCardInfo } from '@/service/api/cardServe'
import {
  findmyInfo,
  findXcxScoreUser,
  getUserCouponList,
  userHasMerchantAuth,
} from '@/service/api/userMessage'
import linquan from '@/static/images/mine/linquan.png'
import shezhi from '@/static/images/mine/shezhi.png'
import spsc from '@/static/images/mine/spsc.png'

import jfscl from '@/static/images/mine/jfscl.png'
import smrz from '@/static/images/mine/smrz.png'
import tsjy from '@/static/images/mine/tsjy.png'
import wdkb from '@/static/images/mine/wdkb.png'
import wdsbk from '@/static/images/mine/wdsbk.png'
import xxtz from '@/static/images/mine/xxtz.png'
import { routeTo } from '@/utils'

import { getBusinessInfo, getMerchantServicesCount, getOrderStatistics } from '@/service/api/shop'
import daifahuo from '../../../static/images/mine/daifahuo.png'
import dafukuan from '../../../static/images/mine/daifukuan.png'
import daishouhuo from '../../../static/images/mine/daishouhuo.png'
import shouhou from '../../../static/images/mine/shouhoudd.png'
import yiwancheng from '../../../static/images/mine/yiwancheng.png'

// 查询user列表
const { send: sendUserCouponList, loading: listLoading2 } = useRequest(
  (data) => getUserCouponList(data),
  {
    immediate: false,
    loading: false,
  },
)

const topList = ref<serveProps[]>([
  {
    title: '积分',
    value: 0,
    path: '/pages-sub/marketManager/integral/interList',
    islink: true,
  },
  {
    title: '优惠券',
    value: 0,
    path: '/pages-sub/marketManager/coupon/mycoupon',
    islink: true,
  },
  {
    title: '钱包',
    value: 0,
    path: '',
    islink: false,
  },
])

const serveOrderList = ref<serveListProps[]>([
  {
    label: '待付款',
    icon: dafukuan,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=1',
  },
  {
    label: '待发货',
    icon: daifahuo,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=10',
  },
  {
    label: '待收货',
    icon: daishouhuo,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=11',
  },
  {
    label: '已完成',
    icon: yiwancheng,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=2',
  },
  {
    label: '退款/售后',
    icon: shouhou,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=20,21,22,23,25,26',
  },
])
const grzqList = ref<serveProps[]>([
  {
    icon: smrz,
    title: '实名信息',
    path: '/pages/login/loginsmrz',
    islink: true,
  },

  {
    icon: wdsbk,
    title: '我的社保',
    path: '/pages-sub/userManager/SocialSecurityCard/detil',
    islink: true,
  },
  {
    icon: wdkb,
    title: '身份卡包 ',
    path: '/pages-sub/userManager/cardManager/index',
    islink: true,
    isSign: true,
  },
])
const serveList = ref<serveProps[]>([
  {
    icon: jfscl,
    title: '积分商城',
    path: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/list',
    islink: true,
  },
  {
    icon: linquan,
    title: '领券中心',
    path: '/pages-sub/marketManager/coupon/index',
    islink: true,
  },
  {
    icon: spsc,
    title: '我的收藏',
    path: '/pages-sub/userManager/collection/collection',
    islink: true,
  },
  // {
  //   icon: dpgz,
  //   title: '店铺关注',
  //   path: '/pages-sub/userManager/collection/follow',
  //   islink: true,
  // },
  // {
  //   icon: shdz,
  //   title: '收货地址',
  //   path: '/pages-sub/userManager/address/list',
  //   islink: true,
  // },
  {
    icon: xxtz,
    title: '我的消息',
    path: '/pages-sub/userManager/myMessage/massage',
    islink: true,
  },
  {
    icon: tsjy,
    title: '投诉建议',
    path: '/pages-sub/userManager/suggest/list',
    islink: true,
  },
  {
    icon: shezhi,
    title: '设置',
    path: '/pages-sub/system/sysconfig/index',
    islink: true,
  },
])
const serveClick = (item: serveProps) => {
  if (item.islink) {
    routeTo({
      url: item.path,
      data: { type: item.data?.articleId, showTop: true, title: item.title },
    })
  } else {
    uni.showToast({
      title: '功能开发中...',
      icon: 'none',
    })
  }
}
const toContent = (item: serveListProps) => {
  routeTo({
    url: item.path,
  })
}

const {
  loading: ReceiveCardInfo,
  send: sendIsReceiveCardInfo,
  onSuccess: cardQuerySucess,
} = useRequest((data) => getIsReceiveCardInfo(data), {
  immediate: false,
  loading: false,
})
// 查询信息
const { send: sendInterInfo } = useRequest((data) => findXcxScoreUser(data, true), {
  immediate: false,
  loading: false,
})

const { send: sendMyInfo } = useRequest((data) => findmyInfo(data), {
  immediate: false,
  loading: false,
})
const { send: sendOrderStatistics } = useRequest((data) => getOrderStatistics(data), {
  immediate: false,
  loading: false,
})

const { send: sendBusinessInfo } = useRequest((data) => getBusinessInfo(data), {
  immediate: false,
  loading: false,
})

const { send: sendMerchantServicesCount, data: msCount } = useRequest(
  (data) => getMerchantServicesCount<msCountProps>(data),
  {
    immediate: false,
    loading: false,
    initialData: {
      totalMoneyDay: 0,
      totalOrderNumDay: 0,
    },
  },
)
const { send: sendUserHasMerchantAuth, data: hasMerchantAutData } = useRequest(
  (data) => userHasMerchantAuth<boolean>(data),
  {
    immediate: false,
    loading: false,
  },
)

export default () => {
  return {
    serveList,
    serveClick,
    sendIsReceiveCardInfo,
    topList,
    sendUserCouponList,
    sendInterInfo,
    serveOrderList,
    toContent,
    sendMerchantServicesCount,
    msCount,
    sendMyInfo,
    sendOrderStatistics,
    sendBusinessInfo,
    grzqList,
    sendUserHasMerchantAuth,
    hasMerchantAutData,
  }
}

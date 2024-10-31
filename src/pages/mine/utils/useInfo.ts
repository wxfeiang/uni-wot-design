import { useRequest } from 'alova/client'
import type {
  integralProps,
  myInfoProps,
  MyOrderProps,
  serveListProps,
  serveProps,
  shopOrederProps,
} from '../utils/types'

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

import { getBusinessInfo, getOrderStatistics } from '@/service/api/shop'
import daifahuo from '../../../static/images/mine/daifahuo.png'
import dafukuan from '../../../static/images/mine/daifukuan.png'
import daishouhuo from '../../../static/images/mine/daishouhuo.png'
import shouhou from '../../../static/images/mine/shouhoudd.png'
import yiwancheng from '../../../static/images/mine/yiwancheng.png'

import level1 from '@/static/images/mine/level1.png'
import level2 from '@/static/images/mine/level2.png'
import level3 from '@/static/images/mine/level3.png'
import level4 from '@/static/images/mine/level4.png'
import level5 from '@/static/images/mine/level5.png'

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
    props: 'pointsNum',
  },
  {
    title: '优惠券',
    value: 0,
    path: '/pages-sub/marketManager/coupon/mycoupon',
    islink: true,
    props: 'couponNum',
  },
  {
    title: '钱包',
    value: 0,
    path: '',
    islink: false,
    props: 'pocketNum',
  },
])

const serveOrderList = ref<serveListProps[]>([
  {
    label: '待付款',
    icon: dafukuan,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=1',
    props: 'dfk',
  },
  {
    label: '待发货',
    icon: daifahuo,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=10',
    props: 'dfh',
  },
  {
    label: '待收货',
    icon: daishouhuo,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=11',
    props: 'dsh',
  },
  {
    label: '已完成',
    icon: yiwancheng,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=2',
    props: 'ywc',
    hidden: true,
  },
  {
    label: '退款/售后',
    icon: shouhou,
    value: 0,
    path: '/pages-sub/order/orderList?tabsVal=20,21,22,23,25,26',
    props: 'sh',
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
// 查询积分信息信息
const { send: sendInterInfo, data: interInfoData } = useRequest(
  (data) => findXcxScoreUser<integralProps>(data, true),
  {
    immediate: false,
    loading: false,
    initialData: {},
  },
)

const { send: sendMyInfo, data: myInfoData } = useRequest((data) => findmyInfo<myInfoProps>(data), {
  immediate: false,
  loading: false,
  initialData: {},
})
const { send: sendOrderStatistics, data: myOrderData } = useRequest(
  (data) => getOrderStatistics<MyOrderProps>(data),
  {
    immediate: false,
    loading: false,
    initialData: {},
  },
)

const { send: sendBusinessInfo, data: shopOrederData } = useRequest(
  (data) => getBusinessInfo<shopOrederProps>(data),
  {
    immediate: false,
    loading: false,
    initialData: {},
  },
)

const { send: sendUserHasMerchantAuth, data: hasMerchantAutData } = useRequest(
  (data) => userHasMerchantAuth<boolean>(data),
  {
    immediate: false,
    loading: false,
  },
)
const userLeavel = ref([
  {
    leavel: 1,
    color: '#548d33',
    bgImg: level1,
  },
  {
    leavel: 2,
    color: '#898989',
    bgImg: level2,
  },
  {
    leavel: 3,
    color: '#ff8000',
    bgImg: level3,
  },
  {
    leavel: 4,
    color: '#f9f0ea',
    bgImg: level4,
  },
  {
    leavel: 5,
    color: '#f9f0ea',
    bgImg: level5,
  },
])
// const cLeavel = ref<any>(userLeavel.value[0])

const cLeavel = computed(() => {
  return (
    userLeavel.value.find((item) => item.leavel === myInfoData.value?.userGrade) ??
    userLeavel.value[0]
  )
})

export default () => {
  return {
    serveList,
    serveClick,
    sendIsReceiveCardInfo,
    topList,
    sendUserCouponList,
    sendInterInfo,
    interInfoData,
    serveOrderList,
    toContent,

    shopOrederData,
    sendMyInfo,
    myInfoData,
    sendOrderStatistics,
    myOrderData,
    sendBusinessInfo,
    grzqList,
    sendUserHasMerchantAuth,
    hasMerchantAutData,
    cLeavel,
  }
}

import { logout } from '@/service/api/auth'
import { useUserStore } from '@/store/user'
import { useRequest } from 'alova/client'
import type { serveProps } from '../utils/types'

import { getIsReceiveCardInfo } from '@/service/api/cardServe'
import { findXcxScoreUser, getUserCouponList } from '@/service/api/userMessage'
import shiming from '@/static/images/mine/shiming.png'
import shenfen from '@/static/images/mine/shenfen.png'
import jifen from '@/static/images/mine/jifen.png'
import quan from '@/static/images/mine/quan.png'
import shoucang from '@/static/images/mine/shoucang.png'
import dizhi from '@/static/images/mine/dizhi.png'
import shezhi from '@/static/images/mine/shezhi.png'
import yiwancheng from '@/static/images/mine/yiwancheng.png'
import tuihuan from '@/static/images/mine/tuihuan.png'
import daishouhuo from '@/static/images/mine/daishouhuo.png'
import daifukuan from '@/static/images/mine/daifukuan.png'
import daifahuo from '@/static/images/mine/daifahuo.png'
import { routeTo } from '@/utils'

// 查询user列表
const { send: sendUserCouponList, loading: listLoading2 } = useRequest(
  (data) => getUserCouponList(data),
  {
    immediate: false,
    loading: false,
  },
)

// 退出操作
const { loading, send: sendLogOut } = useRequest(logout, {
  immediate: false,
  loading: false,
})

const { clearUserInfo, userInfo } = useUserStore()
const LogOut = async () => {
  try {
    // await sendLogOut()
    clearUserInfo()
  } catch (error) {}
  // TODO: 清除用户信息
  clearUserInfo()
}
const orderList = ref<serveProps[]>([
  {
    title: '待付款',
    icon: daifukuan,
    value: 0,
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    title: '待发货',
    icon: daifahuo,
    value: 0,
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    title: '待收货',
    icon: daishouhuo,
    value: 0,
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    title: '已完成',
    icon: yiwancheng,
    value: 0,
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    title: '退换/售后',
    icon: tuihuan,
    value: 0,
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
])

const topList = ref<serveProps[]>([
  {
    title: '积分',
    value: 0,
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    title: '优惠券',
    value: 0,
    path: '/pages-sub/marketManager/coupon/mycoupon',
    islink: true,
  },
  {
    title: '银行卡',
    value: 0,
    path: '',
    islink: false,
  },
])

const serveList = ref<serveProps[]>([
  {
    icon: shiming,
    title: '实名认证',
    path: '/pages/login/login2',
    islink: true,
  },
  {
    icon: shenfen,
    title: '身份卡包 ',
    path: '/pages-sub/userManager/cardManager/index',
    islink: true,
    isSign: true,
  },
  {
    icon: jifen,
    title: '我的积分 ',
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    icon: quan,
    title: '领券中心',
    path: '/pages-sub/marketManager/coupon/index',
    islink: true,
  },
  {
    icon: shoucang,
    title: '商品收藏',
    path: '/pages-sub/marketManager/collection/collection',
    islink: true,
  },
  {
    icon: dizhi,
    title: '收货地址',
    path: '/pages-sub/marketManager/address/address',
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
    // const { userInfo } = useUserStore()
    // if (item.isSign && !userInfo.idCardNumber) {
    //   uni.showToast({
    //     title: '请先实名认证!',
    //     icon: 'none',
    //   })
    //   return
    // }
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

export default () => {
  return {
    LogOut,
    loading,
    serveList,
    serveClick,
    orderList,
    sendIsReceiveCardInfo,
    topList,
    sendUserCouponList,
    sendInterInfo,
  }
}

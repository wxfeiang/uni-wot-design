import { logout } from '@/service/api/auth'
import { useUserStore } from '@/store/user'
import { useRequest } from 'alova/client'
import type { serveProps } from '../utils/types'

import { getIsReceiveCardInfo } from '@/service/api/cardServe'
import { findXcxScoreUser, getUserCouponList } from '@/service/api/userMessage'
import linquan from '@/static/images/mine/linquan.png'
import sfkb from '@/static/images/mine/sfkb.jpg'
import shezhi from '@/static/images/mine/shezhi.png'
import smrz from '@/static/images/mine/smrz.png'
import wdjf from '@/static/images/mine/wdjf.png'
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
    title: '商品收藏',
    value: 0,
    path: '',
    islink: false,
  },
])

const serveList = ref<serveProps[]>([
  {
    icon: smrz,
    title: '实名认证',
    path: '/pages/login/login2',
    islink: true,
  },
  {
    icon: sfkb,
    title: '身份卡包 ',
    path: '/pages-sub/userManager/cardManager/index',
    islink: true,
    isSign: true,
  },
  {
    icon: wdjf,
    title: '我的积分 ',
    path: '/pages-sub/marketManager/integral/index',
    islink: true,
  },
  {
    icon: linquan,
    title: '领券中心',
    path: '/pages-sub/marketManager/coupon/index',
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
    const { userInfo } = useUserStore()
    console.log(item.isSign && !userInfo.idCardNumber, item.isSign, userInfo)
    if (item.isSign && !userInfo.idCardNumber) {
      uni.showToast({
        title: '请先实名认证!',
        icon: 'none',
      })
      return
    }
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
    sendIsReceiveCardInfo,
    topList,
    sendUserCouponList,
    sendInterInfo,
  }
}

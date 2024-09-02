import { logout } from '@/service/api/auth'
import { useUserStore } from '@/store/user'
import { useRequest } from 'alova/client'
import type { serveProps } from '../utils/types'

import gywm from '@/static/images/mine/gywm.png'
import mmdl from '@/static/images/mine/mmdl.png'
import smrz from '@/static/images/mine/smrz.png'
import wdjf from '@/static/images/mine/wdjf.png'
import yhxy from '@/static/images/mine/yhxy.png'
import yszc from '@/static/images/mine/yszc.png'
import { routeTo } from '@/utils'

// 退出操作
const { loading, send: sendLogOut } = useRequest(logout, {
  immediate: false,
  loading: false,
})

const { clearUserInfo } = useUserStore()
const LogOut = async () => {
  try {
    // await sendLogOut()
    clearUserInfo()
  } catch (error) {}
  // TODO: 清除用户信息
  clearUserInfo()
}
const serveList = ref<serveProps[]>([
  {
    icon: smrz,
    title: '实名认证',
    path: '/mine/realName',
    islink: false,
  },
  {
    icon: wdjf,
    title: '我的积分 ',
    path: '/mine/realName',
    islink: false,
  },
  {
    icon: mmdl,
    title: '小程序免密登录',
    path: '/pages-sub/system/sysconfig/setting',
    islink: true,
  },
  {
    icon: yhxy,
    title: '用户协议',
    path: '/pages-sub/webView/index',
    islink: true,
    data: {
      articleId: '1710488285782016006',
    },
  },
  {
    icon: yszc,
    title: '隐私政策',
    path: '/pages-sub/webView/index',
    islink: true,
    data: {
      articleId: '1710488285782016005',
    },
  },
  {
    icon: gywm,
    title: '关于我们',
    path: '/mine/realName',
    islink: true,
    value: 'v1.2.0',
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
export default () => {
  return {
    LogOut,
    loading,
    serveList,
    serveClick,
  }
}

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
    islink: true,
  },
  {
    icon: wdjf,
    title: '我的积分 ',
    path: '/mine/realName',
    islink: true,
  },
  {
    icon: mmdl,
    title: '小程序免密登录',
    path: '/mine/realName',
    islink: true,
  },
  {
    icon: yhxy,
    title: '用户协议',
    path: '/mine/realName',
    islink: true,
  },
  {
    icon: yszc,
    title: '隐私政策',
    path: '/mine/realName',
    islink: true,
  },
  {
    icon: gywm,
    title: '关于我们',
    path: '/mine/realName',
    islink: true,
  },
])

export default () => {
  return {
    LogOut,
    loading,
    serveList,
  }
}

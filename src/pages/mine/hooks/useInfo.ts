import { logout } from '@/service/api/auth'
import huiyuan from '@/static/images/mine/huiyuan.png'
import kefu from '@/static/images/mine/kefu.png'
import qiehuanyonghu from '@/static/images/mine/qiehuanyonghu.png'
import shebaoka from '@/static/images/mine/shebaoka.png'
import shezhi from '@/static/images/mine/shezhi.png'
import shoucang from '@/static/images/mine/shoucang.png'
import shouhuodizhi from '@/static/images/mine/shouhuodizhi.png'
import zhangdan from '@/static/images/mine/zhangdan.png'
import { useUserStore } from '@/store/user'
import { useRequest } from 'alova/client'

const setInfo = ref([
  {
    name: '我的社保卡',
  },
  {
    name: '设置',
    icon: 'star',
    rightValue: '设置小程序服务',
  },
])

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
const serveList = ref([
  {
    title: '我的社保卡',
    icon: shebaoka,
  },
  {
    title: '会员中心',
    icon: huiyuan,
  },
  {
    title: '收获地址',
    icon: shouhuodizhi,
  },
  {
    title: '联系客服',
    icon: kefu,
  },
  {
    title: '商品收藏',
    icon: shoucang,
  },
  {
    title: '我的账单',
    icon: zhangdan,
  },
  {
    title: '设置',
    icon: shezhi,
    url: '/pages-sub/system/sysconfig/index',
  },

  {
    title: '切换为买家',
    icon: qiehuanyonghu,
  },
])

export default () => {
  return {
    setInfo,
    LogOut,
    loading,
    serveList,
  }
}

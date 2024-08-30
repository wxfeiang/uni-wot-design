import { logout } from '@/service/api/auth'
import { useUserStore } from '@/store/user'

const setInfo = ref([
  {
    name: '我的社保卡',
    path: '/pages-sub/userManager/SocialSecurityCard/index',
  },
  {
    name: '消息',
    path: '/pages-sub/serveMassage/newsManager/index',
  },
  {
    name: '设置',
    icon: 'star',
    rightValue: '设置小程序服务',
  },
])

// 退出操作
const { loading, send: sendLogOut } = logout({
  immediate: false,
  loading: false,
})
const { clearUserInfo } = useUserStore()
const LogOut = async () => {
  try {
    const data: any = await sendLogOut()
  } catch (error) {}
  // TODO: 清除用户信息
  clearUserInfo()
}
export default () => {
  return {
    setInfo,
    LogOut,
    loading,
  }
}

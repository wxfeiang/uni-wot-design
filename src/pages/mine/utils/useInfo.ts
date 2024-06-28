import { logout } from '@/service/api/auth'
import { useUserStore } from '@/store/user'
const introduces = ref([
  {
    name: '精简500题',
    desc: '不过补偿',
    icon: 'list',
  },
  {
    name: '考前两小时',
    desc: '临阵抹枪',
    icon: 'list',
  },
  {
    name: '考前冲刺',
    desc: '最后冲刺',
    icon: 'list',
  },
])
const statistics = ref([
  {
    name: '累计答题数',
    num: 5,
    desc: '正确率',
    reight: '60%',
  },
  {
    name: '考试平均分',
    num: 5,
    desc: '累计考试',
    reight: '60%',
  },
  {
    name: '考试平均分',
    num: 5,
    desc: '累计考试',
    reight: '60%',
  },
])

const setInfo = ref([
  {
    name: '报名考试',
    icon: 'setting',
  },
  {
    name: '我的收藏',
    icon: 'setting',
  },
  {
    name: '关于我们',
    icon: 'setting',
  },

  {
    name: '客服',
    icon: 'setting',
  },
  {
    name: '撤回协议',
    icon: 'setting',
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
    introduces,
    statistics,
    setInfo,
    LogOut,
    loading,
  }
}

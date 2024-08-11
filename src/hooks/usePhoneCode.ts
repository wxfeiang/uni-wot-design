import { getPhoneCode } from '@/service/api/system'

// 获取验证码
const {
  send: getCode,
  loading: sending,
  countdown,
} = getPhoneCode(
  {
    phone: '121212',
  },
  {
    initialCountdown: 120,
    loading: false,
  },
)

export default () => {
  return {
    getCode,
    countdown,
    sending,
  }
}

import { getPhoneCode } from '@/service/api/system'
import { useCaptcha } from 'alova/client'
// 获取验证码
const {
  send: sendPhoneCode,
  loading: sending,
  countdown,
} = useCaptcha((data) => getPhoneCode(data), {
  initialCountdown: 90,
  loading: false,
})

export default () => {
  return {
    sendPhoneCode,
    countdown,
    sending,
  }
}

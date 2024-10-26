import { getStdTDCode } from '@/service/api/shop'
import { receiveCoupon } from '@/service/api/userMessage'
import { useCaptcha, useRequest } from 'alova/client'
import dayjs from 'dayjs'

// 用户领取

const { send: sendReceiveCoupon, loading: listLoading3 } = useRequest(
  (data) => receiveCoupon(data),
  {
    immediate: false,
    loading: false,
  },
)

const { send: sendGetStdTDCode, countdown } = useCaptcha((params) => getStdTDCode(params), {
  initialCountdown: 60,
  loading: false,
})
const format = (val: string) => dayjs(val).format('YYYY-MM-DD hh:mm:ss')

const encrypt = (val: string, type: 'name' | 'cardNo', flag: boolean) => {
  if (flag) return val
  switch (type) {
    case 'name':
      return val.replace(/.{2}$/, '**')
    case 'cardNo':
      return val.replace(/^(.{1})(?:\d+)(.{1})$/, '$1*********$2')
  }
}

export default () => ({
  sendReceiveCoupon,
  sendGetStdTDCode,
  format,
  encrypt,
  countdown,
})
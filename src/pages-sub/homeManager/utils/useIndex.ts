import { getStdTDCode } from '@/service/api/shop'
import { useCaptcha } from 'alova/client'
import dayjs from 'dayjs'

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
      return val.replace(/(.{1}).{16}(.{1})/, '$1*********$2')
  }
}

export default () => ({
  sendGetStdTDCode,
  format,
  encrypt,
  countdown,
})

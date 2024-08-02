import { getCode } from '@/service/api/system'

import { base64Encode } from '@/utils/aes/base64Encode'

// 获取验证码
const { send: getCodeUrl, onSuccess: codeSuccess } = getCode({
  immediate: true,
  loading: false,
})
const codeImg = ref('')
const codeflog = ref('')
codeSuccess((event: any) => {
  codeflog.value = event.data.header.flag
  const img = base64Encode(
    new Uint8Array(event.data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
  )
  codeImg.value = 'data:image/gif;base64,' + img
})
export default () => {
  return {
    codeImg,
    getCodeUrl,
    codeflog,
  }
}
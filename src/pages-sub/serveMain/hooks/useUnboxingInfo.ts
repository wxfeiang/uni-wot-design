import { getUnboxingInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'

import { useRequest } from 'alova/client'
import { UnboxingProps } from '../types/types'
const { userInfo } = useUserStore()
console.log('🍋[userInfo]:', userInfo)
const model = ref({
  xm: userInfo.userName,
  zjhm: userInfo.idCardNumber,
  zhbzkh: '',
  jbr: '',
})
const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  zhbzkh: [{ required: true, message: '请输入社会保障卡号' }],
  jbr: [{ required: true, message: '请输入经办人' }],
}
const statusDel = ref<UnboxingProps>()
const submitStatus = ref(false)

// 社保卡解挂
const { loading, send: sendUnboxingInfo } = useRequest((data) => getUnboxingInfo(data), {
  immediate: false,
  loading: false,
})

const submitUnboxingInfo = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendUnboxingInfo(model.value)
        console.log('🍐[data]:', data)
        submitStatus.value = true
        statusDel.value = data
      } catch (error) {
        console.log('数据校验失败')
      }
    }
  })
}

const read = ref(false)
export default () => {
  return {
    loading,
    sendUnboxingInfo,
    submitUnboxingInfo,
    statusDel,
    rules,
    model,
    submitStatus,
  }
}

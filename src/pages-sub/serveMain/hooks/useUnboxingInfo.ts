import { getUnboxingInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'

import { useRequest } from 'alova/client'
const { userInfo } = useUserStore()
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
const statusDel = ref('')
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
        submitStatus.value = true
        if (data.message) {
          statusDel.value = data.message
        } else {
          statusDel.value = data
          uni.navigateBack()
        }
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
  }
}

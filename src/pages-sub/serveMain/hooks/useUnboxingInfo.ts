import { getUnboxingInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'

import { useForm } from 'alova/client'
import { statusTisProps } from '../types/types'
const { userInfo } = useUserStore()

const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  zhbzkh: [{ required: true, message: '请输入社会保障卡号' }],
  jbr: [{ required: true, message: '请输入经办人' }],
}
const statusDel = ref<statusTisProps>()
const submitStatus = ref(false)

// 社保卡解挂
const {
  loading,
  send: sendUnboxingInfo,
  form: model,
} = useForm((data) => getUnboxingInfo(data), {
  immediate: false,
  loading: false,
  resetAfterSubmiting: true,
  initialForm: {
    xm: userInfo.cardName,
    zjhm: userInfo.idCardNumber,
    zhbzkh: '',
    jbr: userInfo.cardName,
  },
})

const submitUnboxingInfo = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendUnboxingInfo(model.value)
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

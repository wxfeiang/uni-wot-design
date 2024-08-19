import { cardLoss } from '@/service/api/cardServe'
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
  jbr: [{ required: true, message: '请输入经办人' }],
  zhbzkh: [{ required: true, message: '请输入社会保障卡号' }],
}

const statusDel = ref('')
const submitStatus = ref(false)
// 社保卡挂失
const { loading, send: sendCardLoss } = useRequest((data) => cardLoss(data), {
  immediate: false,
  loading: false,
})

const submitCard = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCardLoss(model.value)
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
    sendCardLoss,
    submitCard,
    statusDel,
    rules,
    model,
  }
}

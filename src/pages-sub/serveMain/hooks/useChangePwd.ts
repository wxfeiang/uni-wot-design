import { changeCardPwd } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'

import { useRequest } from 'alova'
const { userInfo } = useUserStore()
const model = ref({
  xm: userInfo.userName,
  zjhm: userInfo.idCardNumber,
  shbzkh: '',
  oldPwd: '',
  newPwd: '',
  jbr: userInfo.userName,
})
const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  shbzkh: [{ required: true, message: '请输入社会保障卡号' }],
  oldPwd: [{ required: true, message: '请输入旧密码' }],
  newPwd: [{ required: true, message: '请输入新密码' }],
  jbr: [{ required: true, message: '请输入经办人' }],
}
const statusDel = ref('')
const submitStatus = ref(false)

// 服务密码修改
const { loading, send: sendChangeCardPwd } = useRequest((data) => changeCardPwd(data), {
  immediate: false,
  loading: false,
})

const submitPasswoed = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendChangeCardPwd(model.value)
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
    sendChangeCardPwd,
    submitPasswoed,
    statusDel,
    rules,
    model,
  }
}

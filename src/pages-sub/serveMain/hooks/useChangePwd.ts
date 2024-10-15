import { changeCardPwd } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'

import { useForm } from 'alova/client'
import { statusTisProps } from '../types/types'
const { userInfo } = useUserStore()

const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  shbzkh: [{ required: true, message: '请输入社会保障卡号' }],
  oldPwd: [{ required: true, message: '请输入旧密码' }],
  newPwd: [{ required: true, message: '请输入新密码' }],
  // jbr: [{ required: true, message: '请输入经办人' }],
}
const statusDel = ref<statusTisProps>()
const submitStatus = ref(false)

// 服务密码修改
const {
  loading,
  send: sendChangeCardPwd,
  form: model,
} = useForm((data) => changeCardPwd(data), {
  immediate: false,
  loading: false,
  // 初始化表单数据
  resetAfterSubmiting: true,
  initialForm: {
    xm: userInfo.userName,
    zjhm: userInfo.idCardNumber,
    shbzkh: '',
    oldPwd: '',
    newPwd: '',
    jbr: userInfo.userName,
  },
})

const submitPasswoed = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendChangeCardPwd()
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
    sendChangeCardPwd,
    submitPasswoed,
    statusDel,
    rules,
    model,
    submitStatus,
  }
}

import { changeCardPwd } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
const { userInfo } = useUserStore()
const model = ref({
  xm: '常乐',
  zjhm: '210204199207215655',
  shbzkh: 'F10379608',
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

// 服务密码修改
const { loading, send: sendChangeCardPwd } = changeCardPwd({
  immediate: false,
  loading: false,
})
const submitPasswoed = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendChangeCardPwd(model.value)
        if (data.message) {
          // submitStatus.value = true
          // statusDel.value = data.message
        } else {
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

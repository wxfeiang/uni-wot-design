import { useUserStore } from '@/store/user'
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
const read = ref(false)
export default () => {
  return {
    rules,
    model,
  }
}

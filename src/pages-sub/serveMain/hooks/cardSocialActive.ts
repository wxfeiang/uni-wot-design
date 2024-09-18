/*
 * @Author: chenkezhan 1763932127@qq.com
 * @Date: 2024-08-17 14:48:15
 * @LastEditors: chenkezhan 1763932127@qq.com
 * @LastEditTime: 2024-08-21 10:53:41
 * @FilePath: \xa_card_mini\src\pages-sub\serveMain\hooks\cardSocialActive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useUserStore } from '@/store/user'
const { userInfo } = useUserStore()
const model = ref({
  userName: userInfo.userName,
  cardNumber: userInfo.idCardNumber,
  socialScCardNumber: '',
  operator: userInfo.userName,
})
const rules = {
  userName: [{ required: true, message: '请输入姓名' }],
  cardNumber: [{ required: true, message: '请输入证件号码' }],
  socialScCardNumber: [{ required: true, message: '请输入社会保障卡号' }],
  operator: [{ required: true, message: '请输入经办人' }],
}

const read = ref(false)
export default () => {
  return {
    rules,
    model,
  }
}

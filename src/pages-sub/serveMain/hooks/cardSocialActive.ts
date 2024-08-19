/*
 * @Author: chenkezhan 1763932127@qq.com
 * @Date: 2024-08-17 14:48:15
 * @LastEditors: chenkezhan 1763932127@qq.com
 * @LastEditTime: 2024-08-17 17:16:04
 * @FilePath: \xa_card_mini\src\pages-sub\serveMain\hooks\cardSocialActive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { cardSocialActive } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'

import { useRequest } from 'alova/client'
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
const statusDel = ref('')
const submitStatus = ref(false)

// 社保卡启用
const { loading, send: sendsocialsecardActive } = useRequest((data) => cardSocialActive(data), {
  immediate: false,
  loading: false,
})

const submitCardSocialActive = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        console.log(model)
        const data: any = await sendsocialsecardActive(model.value)
        console.log('==========message' + data.message)
        submitStatus.value = true
        if (data.message) {
          statusDel.value = data.message
        } else {
          statusDel.value = data
          uni.navigateBack()
        }
      } catch (error) {
        console.log(error)
        console.log('数据校验失败')
      }
    }
  })
}

const read = ref(false)
export default () => {
  return {
    loading,
    sendsocialsecardActive,
    submitCardSocialActive,
    statusDel,
    rules,
    model,
  }
}

import { getCouponList, getUserCouponList } from '@/service/api/coupon'
import { useUserStore } from '@/store'

const authStore = useUserStore()
const couponList = ref([])

const getCouList = async (params) => {
  const param = {
    phone: authStore.userInfo.userPhone,
    userDId: authStore.userInfo.userId,
    page: params.page,
    size: params.size,
  }
  const data: any = await getCouponList(param)
  console.log('🍷[couponData]:', data)
  couponList.value = data.content
  couponList.value.forEach((item) => {
    item.couponStatus = 3
  })
}

export default () => {
  return {
    getCouList,
    couponList,
  }
}

import { getCouponList, getUserCouponList, receiveCoupon } from '@/service/api/userMessage'
import { useRequest } from 'alova/client'
// 查询列表
const { send: sendCouponList, loading: listLoading } = useRequest((data) => getCouponList(data), {
  immediate: false,
  loading: false,
})

// 查询user列表
const { send: sendUserCouponList, loading: listLoading2 } = useRequest(
  (data) => getUserCouponList(data),
  {
    immediate: false,
    loading: false,
  },
)

// 用户领取

const { send: sendReceiveCoupon, loading: listLoading3 } = useRequest(
  (data) => receiveCoupon(data),
  {
    immediate: false,
    loading: false,
  },
)

export default () => {
  return {
    sendCouponList,
    sendUserCouponList,
    sendReceiveCoupon,
  }
}

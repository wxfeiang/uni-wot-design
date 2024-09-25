import { getCouponInfo, getUseOffline, getUseRecord } from '@/service/api/shop'
import { getCouponList, getUserCouponList, receiveCoupon } from '@/service/api/userMessage'
import { useRequest } from 'alova/client'
// 查询列表
const { send: sendCouponList, loading: listLoading } = useRequest((data) => getCouponList(data), {
  immediate: false,
  loading: false,
})

// 查询user领取列表
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
// 券码详情

const { send: sendCouponInfo } = useRequest((data) => getCouponInfo(data), {
  immediate: false,
  loading: false,
})
// 线下核销
const { send: sendUseOffline } = useRequest((data) => getUseOffline(data), {
  immediate: false,
  loading: false,
})

// 核销记录
const { send: sendUseRecord } = useRequest((data) => getUseRecord(data), {
  immediate: false,
  loading: false,
})

export default () => {
  return {
    sendCouponList,
    sendUserCouponList,
    sendReceiveCoupon,
    sendCouponInfo,
    sendUseRecord,
    sendUseOffline,
  }
}

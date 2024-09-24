import { getExchangeGoodsList, getIntegralInfo } from '@/service/api/integral'
import { useRequest } from 'alova/client'

// 查询我的积分
const { send: sendInterInfo } = useRequest((data) => getIntegralInfo(data), {
  immediate: false,
  loading: false,
})

// 查询积分商品列表
const { send: sendInterProductList, loading } = useRequest((data) => getExchangeGoodsList(data), {
  immediate: false,
  loading: false,
})

export default () => {
  return { sendInterProductList, sendInterInfo }
}

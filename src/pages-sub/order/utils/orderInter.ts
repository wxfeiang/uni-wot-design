import {
  getOrderList,
  getOrderInfo,
  getOrderInfoJF,
  updateOrderStatusById,
  logistics,
} from '@/service/api/shop'

import { useRequest } from 'alova/client'

// 查询订单详情
const { send: sendOrderInfo } = useRequest((data) => getOrderInfo(data), {
  immediate: false,
  loading: false,
})
const { send: sendOrderInfoJF } = useRequest((data) => getOrderInfoJF(data), {
  immediate: false,
  loading: false,
})

// 查询订单列表
const { send: sendOrderList } = useRequest((data) => getOrderList(data), {
  immediate: false,
  loading: false,
})
const { send: updateOrderBeanStatusById } = useRequest((data) => updateOrderStatusById(data), {
  immediate: false,
  loading: false,
})

const { send: changeOrderStatus } = useRequest((data) => changeOrderStatus(data), {
  immediate: false,
  loading: false,
})

const { send: getLogistics } = useRequest((data) => logistics(data), {
  immediate: false,
  loading: false,
})
export default () => {
  return {
    sendOrderInfo,
    sendOrderList,
    changeOrderStatus,
    sendOrderInfoJF,
    updateOrderBeanStatusById,
    getLogistics,
  }
}

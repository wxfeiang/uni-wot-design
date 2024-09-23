import { serveListProps } from './types'

import daifahuo from '../static/daifahuo.png'
import dafukuan from '../static/daifukuan.png'
import daishouhuo from '../static/daishouhuo.png'
import shouhou from '../static/shouhoudd.png'
import shoukuanjilu from '../static/shoukuanjilu.png'
import shoukuanma from '../static/shoukuanma.png'
import yhq from '../static/yhq.png'
import yhqlog from '../static/yhqlog.png'

const serveOrderList = ref<serveListProps[]>([
  {
    label: '待付款',
    icon: dafukuan,
    value: 12,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '待发货',
    icon: daifahuo,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '待收货',
    icon: daishouhuo,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '售后订单',
    icon: shouhou,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
])

const dataList = ref<serveListProps[]>([
  {
    label: '今日收款 (元)',
    icon: dafukuan,
    value: 12,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '今日订单 (笔)',
    icon: daifahuo,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '待收货订单金额',
    icon: daishouhuo,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '优惠券领取数',
    icon: shouhou,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '优惠券核销',
    icon: shouhou,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
  {
    label: '新增粉丝',
    icon: shouhou,
    value: 0,
    path: '/pages-sub/shopManager/orderList/index?status=0',
  },
])

const serveList = ref<serveListProps[]>([
  {
    label: '收款码',
    icon: shoukuanma,
    value: 0,
    path: '/pages-sub/shopManager/shopCode',
  },
  {
    label: '收款记录',
    icon: shoukuanjilu,
    value: 0,
    path: '/pages-sub/shopManager/shopPayList',
  },
  {
    label: '核销优惠券',
    icon: yhq,
    value: 0,
    path: '/pages-sub/marketManager/coupon/writeOffCoup',
  },
  {
    label: '核销优惠券记录',
    icon: yhqlog,
    value: 0,
    path: '/pages-sub/marketManager/coupon/writeOffCoupList',
  },
])

export default () => {
  return {
    serveOrderList,
    dataList,
    serveList,
  }
}

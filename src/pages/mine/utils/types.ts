interface serveProps {
  icon?: string
  path: string
  title: string
  islink: boolean
  isSign?: boolean // 是否需要登录
  value?: string | number
  id?: string
  data?: any
}
interface serveListProps {
  label: string
  value: number
  icon: string
  path: string
}
interface msCountProps {
  totalOrderNumDay?: string // 今日订单数
  totalMoneyDay?: string // 今日收款金额
  couponReceiveDay?: string // 今日优惠券领取数
  couponOffDay?: string // 今日优惠券核销数
  notMoneyDay?: string // 今日待收款金额
}

export type { msCountProps, serveListProps, serveProps }

interface serveProps {
  icon?: string
  path: string
  title: string
  islink: boolean
  isSign?: boolean // 是否需要登录
  value?: string | number
  id?: string
  data?: any
  props?: any // 对应字段
}
interface serveListProps {
  label: string
  value: number
  icon: string
  path: string
  props?: any // 对应字段
  hidden?: boolean
}
interface msCountProps {
  totalOrderNumDay?: string // 今日订单数
  totalMoneyDay?: string // 今日收款金额
  couponReceiveDay?: string // 今日优惠券领取数
  couponOffDay?: string // 今日优惠券核销数
  notMoneyDay?: string // 今日待收款金额
}

interface myInfoProps {
  couponNum: number
  userGradeName: string
  userGrade: number
  pocketNum: number
  pointsNum: number
}
interface MyOrderProps {
  ywc: number
  sh: number
  dfh: number
  dfk: number
  dsh: number
}
interface shopOrederProps {
  couponsReceive: number
  dskAmount: number
  todayOrderNum: number
  couponsVerification: number
  todayAmount: number
}
interface integralProps {
  todayIntegral: number
  stageList: any[]
  today: boolean
  surplusIntegral: number
  lxSignInDay: number
  totalSignInDay: number
  totalIntegral: number
}

export type {
  MyOrderProps,
  integralProps,
  msCountProps,
  myInfoProps,
  serveListProps,
  serveProps,
  shopOrederProps,
}

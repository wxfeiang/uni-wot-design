interface conponListProps {
  id: string
  couponType: number // 优惠券类型
  couponTypeName: string // 优惠券类型名称
  couponAmount: string // 优惠券金额
  couponAmountType: number // 优惠券金额类型
  couponAmountTypeName: string // 优惠券金额类型名称
  couponLimit: string // 优惠券限制
  couponTime: string // 领取时间
  couponEndTime: string // 优惠券有效日期
  couponStartTime: string // 优惠券有效日期
  couponConternt: string // 优惠券内容
  couponStatus: number // 优惠券状态
}

export type { conponListProps }

export interface shopDetilProps {
  liveNum: number
  address: string
  shopName: string
  shopPhone: string
  shopId: string
  url?: string
}

export interface couponProps {
  type: number
  couponSource: number
  couponId: number
  couponCode: string
  couponType: number
  couponName: string
  couponScop: number
  couponPrice: number
  couponFillPrice: number
  couponUsedObj: number
  couponUsedWay?: any
  couponBeginDate: string
  couponEndDate: string
  couponNum: number
  couponReceiveLimit: number
  couponReceiveWay: number
  couponRemark: string
  couponReceiveBeginDate: string
  couponReceiveEndDate: string
  userId?: any
  createTime: string
  updateTime: string
  receiveNum: number
  flag: number
  createUser?: any
  createUserName?: any
  updateUser?: any
  useQuantity: number
  topFlag: number
  orgList?: any
  shopList?: any
  itemList?: any
  receiveId: number
}

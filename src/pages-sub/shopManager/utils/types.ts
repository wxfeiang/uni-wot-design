interface serveListProps {
  label: string
  value: number
  icon: string
  path: string
}
interface shopDetilProps {
  shopPicture: string
  inShopPicture: string
  updateUser: string
  accountPicture: string
  updateTime: string
  terminalId: string
  businessDesc: string
  merchantName: string
  merchantNumber: string
  rejectReason: string
  isDeleted: number
  createTime: string
  merchantId: string
  accountProve: string
  auditStatus: number
  createUser: string
  id: string
  merchantType: number
}

interface respVoList {
  orderPaymentCount: number
  orderPaymentAmount: number
}
interface shopPayList {
  orderPaymentCount: number
  respVoList: respVoList[]
}

export type { serveListProps, shopDetilProps, shopPayList }

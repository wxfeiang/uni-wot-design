export interface LoginForm {
  username: string
  password: string
  verifyCode?: string
}

export interface RegisterForm {
  // 当前项名称
  name: string
  // 当前项内容
  content: string
}

export interface Camera {
  title: string
  imgType: number
  devicePosition: 'front' | 'back'
}

export interface statusTisProps {
  message?: string
}

export interface BankBranchProps {
  id?: any
  wdCode: string
  name: string
  address: string
  longitude?: any
  dimension?: any
  areaCode?: any
  phone: string
  state?: any
  createBy?: any
  createTime?: any
  updateBy?: any
  updateTime?: any
  distance?: any
}

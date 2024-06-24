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

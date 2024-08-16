// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  data: T
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
  tokenTime?: number // 当前时间戳
  appSign?: string // app 签名
  userName?: string
  userPhone?: string
  userDId?: string
  idCardNumber?: string
  isApply?: boolean // 是否申请完成
  isAuth?: boolean // 是否认证
  isBind?: boolean // 是否绑定手机号
  address?: string
}

enum TestEnum {
  A = 'a',
  B = 'b',
}

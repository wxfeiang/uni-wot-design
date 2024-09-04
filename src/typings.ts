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
  userDid?: string
  sex?: '1' | '2' // 1:男 2:女
  idCardNumber?: string
  cardType?: '0' | '1' | '2' | '3' // 是否申请完成判断  社保卡类型：0：未领取，1：持有二代卡，2：持有三代卡（非雄安一卡通），3：持有雄安一卡通
  cardStatus?: string // 电子社保卡状态：0：未申请电子社保卡，1：已申请电子社保卡，2：未知
  isAuth?: boolean // 是否认证
  isBind?: boolean // 是否绑定手机号
  address?: string
}

enum TestEnum {
  A = 'a',
  B = 'b',
}

import { ResultEnum } from '@/enums/httpEnum'

export declare interface API<T = any> {
  code: ResultEnum
  data?: T
  message: string
  success?: boolean
}

export declare interface METHOD_INSTANCE<T = any> {
  data?: T
  ignoreSign?: boolean // 忽略签名
  ignorEencrypt?: boolean // 忽略加密
  ignorToken?: boolean // 返回所有数据
  ignorToken: true // 忽略token
  resAll?: boolean // 返回所有数据
  resdata?: boolean // 不加解密的情况下只返回data
}

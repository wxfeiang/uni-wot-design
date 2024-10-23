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
  ignorToken?: boolean // 忽略token
  resAll?: boolean // 返回所有数据
  Analysis?: boolean // 不加解密的情况下只返回data
  loading?: boolean // 是否显示全局loading
  Tips?: boolean // 是否显示全局提示 (默认显示: false)
}

export declare interface List<T = any> {
  content: T
  totalElements?: string
  size?: number
  number?: number
  numberOfElements?: number
  totalPages?: number
}

// 字典类型接口
export declare interface Dict<T = any> {
  label: any
  value: T
  type?: string
}

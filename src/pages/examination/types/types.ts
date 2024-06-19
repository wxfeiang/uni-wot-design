export interface Options {
  name: string | number
  value: string | number
  // 当前项类名
  activeName?: string | number
  // 当前项是否选中
  isActive?: boolean
  // 当前项是否禁用
  isDisabled?: boolean
}

export interface ProBlemItemList {
  // 题目名称
  name: string
  // 题目类型s
  type: 'checkbox' | 'radio' | 'boolean'

  // 题目答案
  answer: string

  // 当前选中的答案
  currentAnswer: string | number | string[] | number[]

  // 答案列表
  options: Options[]

  // 题目解析
  explain?: string

  // 题目分数
  score?: number

  // 题目难度
  difficulty?: number

  // 题目备注
  remark?: string

  // 答错率
  errorRate?: number

  // 是否收藏
  isCollect?: boolean

  // 是否已答
  isAnswer?: boolean

  // 是否正确
  isRight?: boolean
}

// 模式
export enum Mode {
  examination,
  answer,
  practice,
}

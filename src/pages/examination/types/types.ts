export interface ProBlemList {
  // 题目名称
  name: string
  // 题目类型
  type: string | number

  // 题目答案
  answer: string | number

  // 答案列表
  options: string[]

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

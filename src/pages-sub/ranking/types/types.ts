// 个人历史记录数据
export interface hostoryList {
  id: number
  time: string // 所用时间
  name: string
  score: number // 分数
  label: string // 称号
  date: string // 考试时间
}

export interface RankList {
  id: number
  rank: number
  name: string
  avatar: string
  time: string // 所用时间
  score: number // 分数
  label?: string // 称号
  date?: string // 考试时间
}

export enum rankType {
  Rank = 1,
  History = 2,
}

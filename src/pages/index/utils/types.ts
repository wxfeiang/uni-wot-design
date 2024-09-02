interface messProps {
  createTime: string
  articleId: string
  articleTitle: string
  createBy: string
  islink?: boolean // 是否跳转
  path?: string // 跳转路径
  type?: 'webView' | 'article' | 'router' // 跳转类型
  data?: any // 额外数据
}
interface bannerProps {
  id: string
  path: string
  title: string
  description?: string
  islink: boolean
  image: string
  type: 'webView' | 'article' | 'router'
  data?: any
}

export type { bannerProps, messProps }

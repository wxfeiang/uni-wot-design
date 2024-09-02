interface messProps {
  createTime: string
  articleId: string
  articleTitle: string
  createBy: string
}
interface bannerProps {
  id: string
  path: string
  title: string
  description?: string
  islink: boolean
  image: string
  type: 'h5' | 'article' | 'router'
  data?: any
}

export type { bannerProps, messProps }

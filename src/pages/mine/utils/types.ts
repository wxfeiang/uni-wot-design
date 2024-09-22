interface serveProps {
  icon?: string
  path: string
  title: string
  islink: boolean
  isSign?: boolean // 是否需要登录
  value?: string | number
  id?: string
  data?: any
}
interface serveListProps {
  label: string
  value: number
  icon: string
  path: string
}

export type { serveListProps, serveProps }

const { VITE_APP_PROXY_PREFIX } = import.meta.env

// FIX: 注意路径斜杠
// 第一个代理后端地址
export const baseUrlApi = (url: string) => `${VITE_APP_PROXY_PREFIX}${url}`
// 第二个代理后端地址
export const baseUrlOtherApi = (url: string) => `otherApi${url}`

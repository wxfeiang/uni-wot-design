import isEmpty from 'lodash-es/isEmpty'
import { isArray, isString } from 'wot-design-uni/components/common/util'

/**
 * @description: 拼接图片地址
 * @param {} data 图片list
 * @param {} url 前缀
 * @return {} []
 */
export const changeDefaultFileList = (data: string | Array<any>, url: string) => {
  let a: string[] = []
  if (isEmpty(data)) {
    return a
  }
  if (isString(data)) {
    a = data.split(',')
  }
  if (isArray(data)) {
    a = data
  }
  return a.map((item) => {
    return url + item
  })
}

/**
 * @description: 转换出当前系统正确的文件地址
 * @param {} data 原始文件数据
 * @param {} matchCharacters  匹配字符
 * @param {} key false 替换  true 拼接
 * @return {} src
 */

export function rightFileUrl<T>(data: string, matchCharacters?: string, key?: boolean) {
  const str = matchCharacters || 'XXXXXX'
  if (!data) return ''
  if (key) {
    return `${import.meta.env.VITE_FILE_BASRURL}${data}`
  }
  return data.replace(str, `${import.meta.env.VITE_FILE_BASRURL}`)
}

/**
 * @description:  上传后最后返回的文件字符串
 * @param {} data 文件组
 * @return {} url
 */
export const changeUploadUrl = (data: Array<any>) => {
  let str = ''
  if (isEmpty(data)) {
    return str
  } else {
    str = data
      .map((i: any, index) => {
        if (i.response) {
          const p = JSON.parse(i.response)
          return p.data.url
        } else {
          return i.name
        }
      })
      .join(',')
    // 最后删除空数据
    return str
  }
}

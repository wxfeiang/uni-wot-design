/*
 * @Description: 自定义上传组件
 * @Date: 2024-08-06 14:55:48
 * @LastEditors: wxfeiang wxfeiang@qq.com
 * @LastEditTime: 2024-08-06 18:13:16
 * @FilePath: /uni-wot-design/src/components/dy-upload/types.ts
 * Copyright (c) 2024 by ${git_name} email: ${git_email}, All Rights Reserved.
 */

import { useUserStore } from '@/store'
import { sign } from '@/utils/aes/encryptUtils'
import type { ExtractPropTypes } from 'vue'
import {
  makeBooleanProp,
  makeNumberProp,
  makeStringProp,
} from 'wot-design-uni/components/common/props'

// const actionUrl = import.meta.env.VITE_UPLOAD_BASEURL
const fliePrefix = import.meta.env.VITE_UPLOAD_BASEURL
const actionUrl = 'http://47.99.93.97/v1/base/uploadLocal'
const userStore = useUserStore()
const header = { sign: sign({ appkey: 'app' }), ...userStore.getAuthorization() }

export type ButtonSize = 'small' | 'medium' | 'large'

// 图片数据组
export interface FilesList {
  name: string
  url: string
  meta: any // 元信息
}
export const uploadProps = {
  /**
   * modelValue 上传后图片地址
   */
  modelValue: makeStringProp(''),
  /**
   *  默认图片上传地址
   */
  action: makeStringProp(actionUrl),
  /**
   *  默认图片上传  header
   */
  header: {
    type: Object,
    default: () => {
      return header
    },
  },
  /**
   *  其他数据
   */
  formData: Object,

  /**
   *  默认图片只上传1张
   * */
  name: makeStringProp('file'),

  /**
   *  默认图片只上传1张
   */
  limit: makeNumberProp(1),

  /**
   *  默认图片只上传1张
   */
  showFileList: makeBooleanProp(false),

  /**
   *  默认多图
   */
  multiple: makeBooleanProp(true),

  /**
   *  默认多图
   */
  maxSize: makeNumberProp(2048),
  /**
   * 文件显示需要的前缀
   */

  fliePrefix: makeStringProp(fliePrefix),
  /**
   * 文件预览形式
   */
  disabled: makeBooleanProp(false),
  /**
   * 文件预览形式
   */

  imageMode: makeStringProp('aspectFit'),

  /**
   *  是否加密数据
   */
  isAes: makeBooleanProp(false),

  /**
   * 原组件素有的属性
   */
  defaultAttrs: {
    type: Object,
    default: () => {
      return {
        // 'show-limit-num': true,
        // disabled: true,
      }
    },
  },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

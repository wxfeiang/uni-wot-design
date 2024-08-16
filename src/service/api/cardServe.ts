import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
import { METHOD_INSTANCE } from '../model/baseModel'

const BASIC_INFO = baseUrlApi('/card/app/getBasicInfo')

const CARD_SCHEDULE_INFO = baseUrlApi('/card/app/getCardScheduleInfo')

const CARDCHECK_INFO = baseUrlApi('/card/app/getCardcheckInfo')

const CARD_FIRST_APPLICATION = baseUrlApi('/card/app/cardFirstApplication')

const UPLOAD_PHOTO = baseUrlApi('/card/app/uploadPhoto')

const SERVICE_PASSWORD_RESE = baseUrlApi('/card/app/getServicePasswordRese')

const CHANGE_CARD_PWD = baseUrlApi('/card/app/changeCardPwd')

/**
 *  卡基础信息查询
 * @param params 初始参数()
 * */
export function getCardBasicInfo(data) {
  return request.Post(
    BASIC_INFO, // 请求地址
    data,
  )
}

/**
 *  卡进度信息查询
 * @param params 初始参数()
 * */
export function getCardScheduleInfo(data: any, config: any) {
  const methodInstance = request.Post(
    CARD_SCHEDULE_INFO, // 请求地址
    data,
  )

  return useRequest(methodInstance, config)
}

/**
 *  社保卡申请前
 * @param params 初始参数()
 * */
export function getCardcheckInfo(data) {
  return request.Post(
    CARDCHECK_INFO, // 请求地址
    data,
    {},
  )
}

/**
 * @description: 上传身份正
 * @param {} config
 * @return {}
 */
export function uploadPhoneInfo(data) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }

  return request.Post(
    UPLOAD_PHOTO, // 请求地址
    data,
    {
      meta,
    },
  )
}

/**
 *  社保卡申请数据提交
 * @param params 初始参数()
 * */
export function cardFirstApplication(data) {
  return request.Post(
    CARD_FIRST_APPLICATION, // 请求地址
    data,
  )
}

/**
 *  服务密码重置
 * @param params 初始参数()
 * */
export function SeverPassRest(data) {
  return request.Post(
    SERVICE_PASSWORD_RESE, // 请求地址
    data,
  )
}

/**
 *  服务密码修改
 * @param params 初始参数()
 * */
export function changeCardPwd(data) {
  return request.Post(
    CHANGE_CARD_PWD, // 请求地址
    data,
  )
}

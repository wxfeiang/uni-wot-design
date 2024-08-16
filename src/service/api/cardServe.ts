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
export function uploadPhoneInfo(config: any) {
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }
  return useRequest(
    (newTodo) =>
      request.Post(
        UPLOAD_PHOTO, // 地址
        newTodo, // 参数
        {
          meta,
        },
      ),
    { ...config },
  )
}

/**
 *  社保卡申请数据提交
 * @param params 初始参数()
 * */
export function cardFirstApplication(config: any) {
  return useRequest(
    (newTodo) =>
      request.Post(
        CARD_FIRST_APPLICATION, // 地址
        newTodo, // 参数
        // {
        //   meta,
        // },
      ),
    { ...config },
  )
}

/**
 *  服务密码重置
 * @param params 初始参数()
 * */
export function SeverPassRest(config: any) {
  return useRequest(
    (newTodo) =>
      request.Post(
        SERVICE_PASSWORD_RESE, // 地址
        newTodo, // 参数
        // {
        //   meta,
        // },
      ),
    { ...config },
  )
}

/**
 *  服务密码修改
 * @param params 初始参数()
 * */
export function changeCardPwd(config: any) {
  return useRequest(
    (newTodo) =>
      request.Post(
        CHANGE_CARD_PWD, // 地址
        newTodo, // 参数
        // {
        //   meta,
        // },
      ),
    { ...config },
  )
}

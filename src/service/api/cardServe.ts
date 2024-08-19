import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const BASIC_INFO = baseUrlApi('/card/app/getBasicInfo')

const CARD_SCHEDULE_INFO = baseUrlApi('/card/app/getCardScheduleInfo')

const CARDCHECK_INFO = baseUrlApi('/card/app/getCardcheckInfo')

const CARD_FIRST_APPLICATION = baseUrlApi('/card/app/cardFirstApplication')

const UPLOAD_PHOTO = baseUrlApi('/card/app/uploadPhoto')

const SERVICE_PASSWORD_RESET = baseUrlApi('/card/app/getServicePasswordReset')

const CHANGE_CARD_PWD = baseUrlApi('/card/app/changeCardPwd')

const CARD_RECHARGE = baseUrlApi('/card/app/changeCardData')

const SOCIAL_SECARD_ACTIVE = baseUrlApi('/card/app/getSocialActive')

const IS_RECEIVE_CARD_INFO = baseUrlApi('/card/app/getIsReceiveCardInfo')

const PERSON_INFO_CHANGE = baseUrlApi('/card/app/personInfoChange')

const CARD_LOSS = baseUrlApi('/card/app/getLossInfo')
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
export function getCardScheduleInfo(data) {
  return request.Post(
    CARD_SCHEDULE_INFO, // 请求地址
    data,
  )
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
 *  社保卡补换
 * @param params 初始参数()
 * */
export function changeCardData(data) {
  return request.Post(
    CARD_RECHARGE, // 请求地址
    data,
  )
}

/**
 *  服务密码重置
 * @param params 初始参数()
 * */
export function SeverPassRest(data) {
  return request.Post(
    SERVICE_PASSWORD_RESET, // 请求地址
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

/**
 *  社保卡挂失
 * @param params 初始参数()
 * */
export function cardLoss(data) {
  return request.Post(
    CARD_LOSS, // 请求地址
    data,
  )
}

/**
 *  查询人员是否领取过河北地区的社保卡
 * @param params 初始参数()
 * */
export function getIsReceiveCardInfo(data) {
  return request.Post(
    IS_RECEIVE_CARD_INFO, // 请求地址
    data,
    {},
  )
}

/**
 *  人员信息变更
 * @param params 初始参数()
 * */
export function personInfoChange(data) {
  return request.Post(
    PERSON_INFO_CHANGE, // 请求地址
    data,
    {},
  )
}

/**
 *  社保卡启用
 * @param params 初始参数()
 * */
export function cardSocialActive(data) {
  return request.Post(
    SOCIAL_SECARD_ACTIVE, // 请求地址
    data,
  )
}
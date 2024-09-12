import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'
const FIND_XCX_SCORE_USER = baseUrlApi('/member/app/ScoreUser/findXcxScoreUser')
const SIGN_IN = baseUrlApi('/member/app/ScoreUser/signIn')

const GET_USER_SCORE_PAGE = baseUrlApi('/member/app/UserScore/getUserScorePage')

const GET_XIN_CANG_CARD_INFO = baseUrlApi('/card/app/getXinCangCardInfo')
const SET_XIN_CANG_CARD_AUTHORIZE = baseUrlApi('/card/app/setXinCangCardAuthorize')

/**
 *  查询雄才卡信息
 * @param params
 * */
export function getXinCangCardInfo(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    GET_XIN_CANG_CARD_INFO, // 地址
    data,
    {
      meta,
    },
  )
}
/**
 *  查询雄才卡查询授权
 * @param params
 * */
export function setXinCangCardAuthorize(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    SET_XIN_CANG_CARD_AUTHORIZE, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 *  积分信息
 * @param params 初始参数()
 * */
export function findXcxScoreUser(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    FIND_XCX_SCORE_USER, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 * 用户积分签到
 * @param params 初始参数()
 * */
export function interSignIn(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
  }
  return request.Post(
    SIGN_IN, // 地址
    data,
    {
      meta,
    },
  )
}

/**
 * 积分列表
 * @param params 初始参数()
 * */
export function getInterList(data) {
  return request.Post(GET_USER_SCORE_PAGE, data)
}

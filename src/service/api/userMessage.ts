import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
const FIND_XCX_SCORE_USER = baseUrlApi('/member/app/ScoreUser/findXcxScoreUser')

const SIGN_IN_LIST = baseUrlApi('/member/app/signIn/webList')

/**
 *  积分信息
 * @param params 初始参数()
 * */
export function findXcxScoreUser(data) {
  return request.Post(
    FIND_XCX_SCORE_USER, // 地址
    data,
  )
}

/**
 * 用户积分签到
 * @param params 初始参数()
 * */
export function faceLogin(data) {
  return request.Post(
    '', // 地址
    data,
  )
}

/**
 * 积分列表
 * @param params 初始参数()
 * */
export function getInterList(data) {
  return request.Post(
    SIGN_IN_LIST, // 地址
    data,
  )
}

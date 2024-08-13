import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'

const BASIC_INFO = baseUrlApi('/card/app/getBasicInfo')

const CARD_SCHEDULE_INFO = baseUrlApi('/card/app/getCardScheduleInfo')

/**
 *  卡基础信息查询
 * @param params 初始参数()
 * */
export function getCardBasicInfo(data: any, config: any) {
  const methodInstance = request.Post(
    BASIC_INFO, // 请求地址
    data,
  )

  return useRequest(methodInstance, config)
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

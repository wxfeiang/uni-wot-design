import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
const answerList = baseUrlApi('/dymock/answer')

export function getAnswerList(config: any) {
  return useRequest(request.Post(answerList), { ...config })
}

import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { useRequest } from 'alova'
const answerList = baseUrlApi('/dymock/answer')

export function getAnswerList(params: any, config: any) {
  return useRequest((newTodo) => request.Post(answerList, newTodo), { ...config })
}

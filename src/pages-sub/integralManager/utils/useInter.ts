import { findXcxScoreUser, getInterList } from '@/service/api/userMessage'
import { useRequest } from 'alova/client'
// 查询信息
const { send: sendInterInfo, loading } = useRequest((data) => findXcxScoreUser(data), {
  immediate: false,
  loading: false,
})

// 查询列表
const { send: sendMessageList, loading: listLoading } = useRequest((data) => getInterList(data), {
  immediate: false,
  loading: false,
})

export default () => {
  return { sendMessageList, loading, sendInterInfo }
}

import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
import { messProps } from './types'

// 消息列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
  loading: messageLoading,
} = useRequest(
  getMessageList({
    page: 1,
    size: 10,
  }),
  {
    immediate: false,
    loading: false,
    initialData: [],
  },
)

function messageClick(item: messProps) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}

export default () => {
  return { messageData, messageClick, sendMessageList, messageLoading }
}

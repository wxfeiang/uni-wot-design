import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
// 消息列表
const { send: sendMessageList, data: messageData } = useRequest((data) => getMessageList(data), {
  immediate: false,
  loading: false,
})

function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}
export default () => {
  return { sendMessageList, messageData, messageClick }
}

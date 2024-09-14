import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
// 消息列表

// 消息列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
}: { send: any; data: any; onSuccess: any } = useRequest((data) => getMessageList(data), {
  immediate: false,
  loading: false,
  initialData: [],
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

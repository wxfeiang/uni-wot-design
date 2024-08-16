import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova'
// 消息列表

// 消息列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
}: { send: any; data: any; onSuccess: any } = useRequest(
  getMessageList({
    page: 1,
    size: 10,
    articleType: '0',
  }),
  {
    immediate: false,
    loading: false,
    initialData: [],
  },
)
function messageClick(item) {
  console.log('🍤[item]:', item)
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}
export default () => {
  return { sendMessageList, messageData, messageClick }
}

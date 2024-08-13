import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'

// 消息列表
const { data: messageData }: { data: any } = getMessageList(
  {
    page: 1,
    size: 2,
  },
  {
    immediate: true,
    loading: false,
    initialData: [],
  },
)
// const sendMessageList = (data) => {
//   messageList(data)
// }

function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}

export default () => {
  return { messageData, messageClick }
}

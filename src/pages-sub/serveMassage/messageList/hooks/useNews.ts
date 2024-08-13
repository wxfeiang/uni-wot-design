import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'

// 消息列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
}: { send: any; data: any; onSuccess: any } = getMessageList(
  {
    page: 1,
    size: 10,
  },
  {
    immediate: true,
    loading: false,
    initialData: [],
  },
)

const messageListData = ref([])
messageSucess((data: any) => {
  console.log('🥤[data]:-------', data)
  messageListData.value = data.data.data.content
})
function messageClick(item) {
  console.log('🍤[item]:', item)
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}
export default () => {
  return { sendMessageList, messageData, messageListData, messageClick }
}

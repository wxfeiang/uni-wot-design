import { getMessageList } from '@/service/api/source'

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
    immediate: false,
    loading: false,
    initialData: [],
  },
)

const messageListData = ref([])
messageSucess((data: any) => {
  console.log('🥤[data]:-------', data)
  messageListData.value = data.data.data.content
})

export default () => {
  return { sendMessageList, messageData, messageListData }
}

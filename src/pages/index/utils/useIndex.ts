import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
import { bannerProps, messProps } from './types'

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
const bannerUrl = 'http://47.99.93.97/v1/'
const swiperList = ref<bannerProps[]>([
  {
    id: '1',
    path: '/pages-sub/serveMain/cardApplyType',
    title: '社保卡申领',
    description: '',
    islink: true,
    image:
      bannerUrl + 'public/uploads/image/1725327394702-c3cb364e-544b-41d4-97d2-1c4daf1f4b7e.png',
    type: 'router',
    data: { base: 'shebaoksl', title: '社保卡申领' },
  },
  {
    id: '1710488285782016008',
    path: '/pages-sub/webView/index',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl + 'public/uploads/image/1725172128186-2ab9df4e-54db-4228-ab3a-f93f5a9c7f59.png',
    type: 'article',
  },
  {
    id: '1710488285782016007',
    path: '/pages-sub/webView/index',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl + 'public/uploads/image/1725172156390-21e78f8b-2791-4cc1-b8ff-1b01c015058e.png',
    type: 'article',
  },
])

export default () => {
  return { messageData, messageClick, sendMessageList, messageLoading, swiperList }
}

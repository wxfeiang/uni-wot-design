import { getCardBasicInfo } from '@/service/api/cardServe'

import { routeTo } from '@/utils'

// 卡基础信息
const { data: cardInfoData }: { data: any } = getCardBasicInfo(
  {
    xm: '常乐',
    zjhm: '210204199207215655',
    shbzhm: 'F10379608',
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
  return { cardInfoData, messageClick }
}

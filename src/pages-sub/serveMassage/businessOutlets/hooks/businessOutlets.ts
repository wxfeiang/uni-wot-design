import { getBranchesInfo } from '@/service/api/source'

import { routeTo } from '@/utils'

// 消息列表
const { data: cardInfoData, send: sendbranchesInfo }: { data: any; send: any } = getBranchesInfo(
  {
    yhdm: '105',
    areaCode: '130629',
    isMail: '0',
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

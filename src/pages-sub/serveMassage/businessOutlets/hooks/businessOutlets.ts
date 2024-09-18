import { getBranchesInfo } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'

import { useBaseStore } from '@/store'

const { userLocation } = useBaseStore()

const {
  data: cardInfoData,
  send: sendbranchesInfo,
  loading,
} = useRequest((data) => getBranchesInfo(data), {
  immediate: false,
  loading: false,
})

// 点击消息
function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}

export default () => {
  return { cardInfoData, messageClick, sendbranchesInfo, loading }
}

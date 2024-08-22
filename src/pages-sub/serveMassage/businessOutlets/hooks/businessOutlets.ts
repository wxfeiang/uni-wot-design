import { getBranchesInfo } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'

import { useBaseStore } from '@/store'

const { userLocation } = useBaseStore()

// 网点信息
const {
  data: cardInfoData,
  send: sendbranchesInfo,
  loading,
} = useRequest(
  getBranchesInfo({
    yhdm: '',
    areaCode: '',
    isMail: '',
    longitude: userLocation.longitude.toString(),
    dimension: userLocation.latitude.toString(),
  }),
  {
    immediate: false,
    loading: false,
    initialData: [],
  },
)

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

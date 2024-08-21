import { getCardBasicInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store'
import { useRequest } from 'alova/client'
const { userInfo } = useUserStore()
// 卡基础信息
const {
  send: getCadInfo,
  data: cardInfoData,
  loading,
} = useRequest(
  getCardBasicInfo({
    xm: userInfo.userName,
    zjhm: userInfo.idCardNumber,
    shbzhm: '',
  }),
  {
    immediate: false,
    loading: false,
    initialData: [],
  },
)

export default () => {
  return { cardInfoData, getCadInfo, loading }
}

import { getCardBasicInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store'
import { routeTo } from '@/utils'
import { useRequest } from 'alova'
const { userInfo } = useUserStore()
// 卡基础信息
const { data: cardInfoData }: { data: any } = useRequest(
  getCardBasicInfo({
    xm: userInfo.userName,
    zjhm: userInfo.idCardNumber,
    shbzhm: '',
  }),
  {
    immediate: true,
    loading: false,
    initialData: [],
  },
)

export default () => {
  return { cardInfoData }
}

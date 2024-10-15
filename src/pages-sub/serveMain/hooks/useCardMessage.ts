import { getCardBasicInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store'
import { useForm } from 'alova/client'
const { userInfo } = useUserStore()

// 卡信息查询
const {
  loading,
  send: getCadInfo,
  data: cardInfoData,
  form: model,
} = useForm((data) => getCardBasicInfo(data), {
  immediate: false,
  loading: false,
  initialData: {},
  // 初始化表单数据
  resetAfterSubmiting: true,
  initialForm: {
    xm: userInfo.userName,
    zjhm: userInfo.idCardNumber,
    shbzhm: '',
  },
})

export default () => {
  return { cardInfoData, getCadInfo, loading, model }
}

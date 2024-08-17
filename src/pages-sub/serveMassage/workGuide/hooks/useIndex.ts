import { epList } from '@/service/api/auth'
import { useRequest } from 'alova'
const {
  send: sendLogin2,
  loading,
  data: epListData,
  onSuccess: onSuccess2,
}: {
  send: any
  loading: any
  data: any
  onSuccess: any
} = useRequest(epList(), {
  initialData: {}, // 设置data状态的初始数据
  immediate: true, // 是否立即发送请求，默认为true
})

const list = ref([])
export default () => {
  return { loading, epListData, sendLogin2 }
}

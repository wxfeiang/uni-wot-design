import {
  addReadHistoryRecord,
  getDetailUpdateRead,
  getHistoryPageByUserId,
} from '@/service/api/source'
import { List } from '@/service/model/baseModel'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
// 消息列表

const {
  send: sendHistoryPageByUserId,
  data: histotyMessData,
  loading: histotyMessDataLoadng,
} = useRequest((data) => getHistoryPageByUserId<List>(data), {
  immediate: false,
  loading: false,
  initialData: [],
})
const {
  send: sendDetailUpdateRead,
  data: ReadData,
  loading: DetailUpdateReadDataLoadng,
} = useRequest((data) => getDetailUpdateRead(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

const { send: sendDetailStatus } = useRequest((data) => addReadHistoryRecord(data), {
  immediate: false,
  loading: false,
})

async function messageClick(item) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { id: item.id, code: item.code, showType: 'message' },
  })
  await sendDetailStatus(item)
}

export default () => {
  return {
    messageClick,
    sendHistoryPageByUserId,
    histotyMessDataLoadng,
    histotyMessData,
    sendDetailUpdateRead,
    ReadData,
    sendDetailStatus,
  }
}

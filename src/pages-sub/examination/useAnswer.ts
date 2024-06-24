import { getAnswerList } from '@/service/api/answer'
import { chunk } from 'lodash-es'

// 获取题目

const anList = ref([])
// 对页面数据分组
const list = ref() // 分页数据
const cIndex = ref(0) // 获取总数下标
const cList = ref([]) // 获取当前数据

const {
  send: getList,
  onSuccess: listSuccess,
  loading: listLoading,
} = getAnswerList({
  immediate: false,
  loading: false,
})

listSuccess(async (event: any) => {
  const { data } = await event
  anList.value = data
  list.value = chunk(anList.value, 1)
  cList.value = list.value[cIndex.value]
})
export default () => {
  return {
    getList,
    anList,
    cIndex,
    list,
    cList,
    listLoading,
  }
}

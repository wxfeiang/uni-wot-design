import { getAnswerList } from '@/service/api/answer'

// 获取题目

const anList = ref([])

const cIndex = ref(0) // 获取总数下标
const cList = ref([]) // 获取当前数据

const { send: sendGetAnswer, loading: listLoading } = getAnswerList(
  {},
  {
    immediate: false,
    loading: false,
  },
)

const getList = async (size) => {
  const params = {
    size,
  }
  const data: any = await sendGetAnswer(params)
  anList.value = data
  // list.value = chunk(anList.value, 1)
  cList.value = anList.value[cIndex.value]
}

export default () => {
  return {
    getList,
    anList,
    cIndex,

    cList,
    listLoading,
  }
}

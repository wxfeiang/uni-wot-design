import { defineStore } from 'pinia'
import { ref } from 'vue'
type CameraData = {
  id: string
  url: string
  data?: object
}

export const useBaseStore = defineStore(
  'baseStore',
  () => {
    // 进入服务页面激活标志
    const active = ref(0)

    function setActive(val) {
      active.value = val
    }

    // 当前用户坐标
    const userLocation = ref({} as any)

    const setLocation = (val) => {
      userLocation.value = val
    }
    // bannet 自带详情
    const bannerData = ref(0)

    function setbannetData(val) {
      bannerData.value = val
    }

    // 用户历史搜索记录
    const historySearch = ref([])

    const setHistorySearch = (val) => {
      if (historySearch.value.includes(val)) return
      historySearch.value.unshift(val)
      if (historySearch.value.length > 10) {
        historySearch.value.pop()
      }
    }
    const clearHistorySearch = () => {
      historySearch.value = []
    }

    return {
      active,
      userLocation,
      setLocation,
      historySearch,
      setHistorySearch,
      clearHistorySearch,
      setActive,
      setbannetData,
      bannerData,
    }
  },
  {
    persist: true,
  },
)

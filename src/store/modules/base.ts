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
    // 当前用户坐标
    const userLocation = ref({} as any)

    const setLocation = (val) => {
      userLocation.value = val
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
    }
  },
  {
    persist: true,
  },
)

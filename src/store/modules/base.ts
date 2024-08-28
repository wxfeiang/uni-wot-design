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

    return {
      active,
      userLocation,
      setLocation,
    }
  },
  {
    persist: true,
  },
)

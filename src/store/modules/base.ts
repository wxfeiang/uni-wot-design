import { defineStore } from 'pinia'
import { ref } from 'vue'
type CameraData = {
  id: string
  url: string
  data: object
}

export const useBaseStore = defineStore(
  'baseStore',
  () => {
    // 进入服务页面激活标志
    const active = ref(0)
    // 相机拍照数据

    const cameraData = ref<CameraData[]>([
      {
        id: '',
        url: '',
        data: {},
      },
      {
        id: '',
        url: '',
        data: {},
      },
      {
        id: ' ',
        url: '',
        data: {},
      },
    ])

    const setCameraData = (photoType, val) => {
      cameraData.value[photoType] = val
    }

    return {
      active,
      cameraData,
      setCameraData,
    }
  },
  {
    persist: true,
  },
)

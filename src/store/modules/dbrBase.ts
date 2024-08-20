import { defineStore } from 'pinia'
import { ref } from 'vue'
type DbrCameraData = {
  id: string
  url: string
  data?: object
}

export const useDbrBaseStore = defineStore(
  'baseStore',
  () => {
    // 进入服务页面激活标志
    const active = ref(0)
    // 相机拍照数据
    const dbrCameraData = ref({
      idCardFront: {} as DbrCameraData, // 身份正面
      idCardBackPhoto: {} as DbrCameraData, // 身份反面
    })

    const setCameraData = (photoType, val) => {
      if (photoType * 1 === 1) {
        dbrCameraData.value.idCardFront = val
      } else if (photoType * 1 === 2) {
        dbrCameraData.value.idCardBackPhoto = val
      }
    }
    const clearCameraData = () => {
      dbrCameraData.value = {
        idCardFront: {} as DbrCameraData, // 身份正面
        idCardBackPhoto: {} as DbrCameraData, // 身份反面
      }
    }

    return {
      active,
      dbrCameraData,
      setCameraData,
      clearCameraData,
    }
  },
  {
    persist: true,
  },
)

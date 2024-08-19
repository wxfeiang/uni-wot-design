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
    // 相机拍照数据
    const cameraData = ref({
      photo: {} as CameraData, // 人脸
      idCardFront: {} as CameraData, // 身份正面
      idCardBackPhoto: {} as CameraData, // 身份反面
    })

    const setCameraData = (photoType, val) => {
      cameraData.value[photoType] = val
      if (photoType * 1 === 0) {
        cameraData.value.photo = val
      } else if (photoType * 1 === 1) {
        cameraData.value.idCardFront = val
      } else if (photoType * 1 === 2) {
        cameraData.value.idCardBackPhoto = val
      }
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

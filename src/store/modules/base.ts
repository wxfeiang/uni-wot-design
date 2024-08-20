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
      dbrCardFront: {} as CameraData, // 代办人身份正面
      dbrdBackPhoto: {} as CameraData, // 代办人身份反面
    })

    const setCameraData = (photoType, val) => {
      if (photoType === 0) {
        cameraData.value.photo = val
      } else if (photoType === 1) {
        cameraData.value.idCardFront = val
      } else if (photoType === 2) {
        cameraData.value.idCardBackPhoto = val
      } else if (photoType === 3) {
        cameraData.value.dbrCardFront = val
      } else if (photoType === 4) {
        cameraData.value.dbrdBackPhoto = val
      }
    }
    const clearCameraData = () => {
      cameraData.value = {
        photo: {} as CameraData, // 人脸
        idCardFront: {} as CameraData, // 身份正面
        idCardBackPhoto: {} as CameraData, // 身份反面
        dbrCardFront: {} as CameraData, // 代办人身份正面
        dbrdBackPhoto: {} as CameraData, // 代办人身份反面
      }
    }

    return {
      active,
      cameraData,
      setCameraData,
      clearCameraData,
    }
  },
  {
    persist: true,
  },
)

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBaseStore = defineStore(
  'baseStore',
  () => {
    // 进入服务页面激活标志
    const active = ref(0)

    return {
      active,
    }
  },
  {
    persist: true,
  },
)

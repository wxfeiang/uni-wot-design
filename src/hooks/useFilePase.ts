import { getFileParse } from '@/service/api/system'
import { useSystemStore } from '@/store/modules/system'
export default (path: string) => {
  // 获取系统配置
  const systemStore = useSystemStore()
  const {
    data: fData,
    onSuccess: filePaseSuccess,
    // send: sysConfig,
  } = getFileParse(
    {
      path,
    },
    {
      immediate: true,
      loading: false,
    },
  )
  const fileData = ref('')
  filePaseSuccess(async (event: any) => {
    console.log('🍦[event]:', event.data)
    // const arrayBuffer = new Uint8Array(event.data.data)
    // fileData = 'data:image/png;base64,' + uni.arrayBufferToBase64(arrayBuffer)
    fileData.value = 'https://cdn.uviewui.com/uview/demo/upload/positive.png' // event.data.data.data.code
    await console.log('🍪[fileData.value]:=======', fileData.value)
  })

  // sysConfig()

  return {
    fileData,
    fData,
  }
}

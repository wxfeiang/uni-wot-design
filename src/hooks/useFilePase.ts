import { getFileParse } from '@/service/api/system'
import { useSystemStore } from '@/store/modules/system'
export default (path: string) => {
  // 获取系统配置
  const systemStore = useSystemStore()
  const {
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
  let fileData = ''
  filePaseSuccess((event: any) => {
    const arrayBuffer = new Uint8Array(event.data.data)
    fileData = 'data:image/png;base64,' + uni.arrayBufferToBase64(arrayBuffer)
    console.log('🍪[fileData.value]:', fileData)
  })

  // sysConfig()

  return {
    fileData,
  }
}

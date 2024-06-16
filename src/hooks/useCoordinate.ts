import { Toast } from '@/utils/uniapi/prompt'

const startData = reactive({
  clientX: 0,
  clientY: 0,
})
const start = (e) => {
  startData.clientX = e.changedTouches[0].clientX

  startData.clientY = e.changedTouches[0].clientY
}
const end = (e) => {
  // console.log(e)
  const subX = e.changedTouches[0].clientX - startData.clientX
  const subY = e.changedTouches[0].clientY - startData.clientY
  if (subY > 50 || subY < -50) {
    console.log('上下滑')
  } else {
    if (subX > 100) {
      console.log('右滑')
      Toast('右滑')
    } else if (subX < -100) {
      console.log('左滑')
      Toast('左滑')
    } else {
      console.log('无效')
    }
  }
}
export default () => {
  return {
    startData,
    start,
    end,
  }
}

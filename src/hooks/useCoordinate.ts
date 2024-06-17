export default (index?: number, maxCont?: number) => {
  const startData = reactive({
    clientX: 0,
    clientY: 0,
  })
  const flog = ref()
  const start = (e) => {
    startData.clientX = e.changedTouches[0].clientX

    startData.clientY = e.changedTouches[0].clientY
  }

  const end = (e) => {
    //
    const subX = e.changedTouches[0].clientX - startData.clientX
    const subY = e.changedTouches[0].clientY - startData.clientY
    if (subY > 50 || subY < -50) {
      console.log('🍇', '上下滑')
    } else {
      if (subX > 100) {
        flog.value = false
      } else if (subX < -100) {
        flog.value = false
      }
      // else {
      //
      // }
    }
  }

  return {
    startData,
    start,
    end,
    flog,
  }
}

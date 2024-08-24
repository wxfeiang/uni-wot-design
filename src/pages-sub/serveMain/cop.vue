<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import { getCurrentInstance, onMounted } from 'vue'
const instance = getCurrentInstance().proxy

const eventChannel = instance.getOpenerEventChannel() // eslint-disable-line
function loadTempImagePath(url) {
  const { windowWidth, windowHeight } = uni.getSystemInfoSync()
  console.log('🥐[windowWidth, windowHeight ]:', windowWidth, windowHeight, copData.value)

  const x = copData.value.left
  const y = copData.value.top
  const testc = uni.createCanvasContext('myCanvas')
  testc.drawImage(url, 0, 0, windowWidth, windowHeight)
  testc.draw(false, () => {
    uni.canvasToTempFilePath({
      x,
      y,
      width: copData.value.width,
      height: copData.value.height,
      destWidth: copData.value.width,
      destHeight: copData.value.height,
      canvasId: 'myCanvas',
      fileType: 'jpg',
      quality: 1,
      complete: (res2) => {
        console.log('🍨[res2]:', res2)
        copSrc.value = res2.tempFilePath
        eventChannel.emit('camera', {
          data: res2.tempFilePath,
        })
        uni.navigateBack()
      },
    })
  })
}
const copSrc = ref('')
function choose() {
  // uni.chooseImage({
  //   count: 1,
  //   sizeType: ['original', 'compressed'],
  //   sourceType: ['album'], // 这要注意，camera掉拍照，album是打开手机相册
  //   success: (res: any) => {
  //     loadTempImagePath(res.tempImagePath)
  //   },
  // })

  const ctx = uni.createCameraContext()
  ctx.takePhoto({
    quality: 'high',

    success: (res) => {
      loadTempImagePath(res.tempImagePath)
    },
  })
}

function watchData() {}
const copData = ref()

onMounted(() => {
  uni
    .createSelectorQuery()
    .select('.cop')
    .boundingClientRect(function (data) {
      console.log('🌽[data]:', data)
      copData.value = data
    })
    .exec()
  eventChannel.on('options', function (data) {
    console.log('options', data)
  })
})
</script>
<template>
  <view class="bigBox">
    <view class="box">
      <camera device-position="back" flash="off" class="facevideo"></camera>
      <view class="cover-box">
        <view class="cop" @click="choose"></view>
      </view>
    </view>
    <image class="copSrc" :src="copSrc" style="width: 200px; height: 300px"></image>
  </view>
  <canvas canvas-id="myCanvas" id="aa"></canvas>
</template>
<style>
.bigBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: #ccc;
}

.box {
  position: relative;

  width: 100%;
  height: 100%;
}
.cover-box {
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.facevideo {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.cop {
  width: 200px;
  height: 300px;

  background: rgba(0, 0, 0, 0.5);
}
.copSrc {
  position: absolute;
  top: 0;
  z-index: 21;
  width: 200px;
  height: 300px;
  background: #ff0024;
}

.cover-box {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
}

#aa {
  position: absolute;
  top: 50000px;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  border: 1px solid #ff0024;
  /* opacity: 0; */
}
</style>

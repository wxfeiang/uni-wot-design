<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import { useBaseStore } from '@/store'
import { Toast } from '@/utils/uniapi/prompt'
import { pathToBase64 } from 'image-tools'
import { getCurrentInstance, onMounted } from 'vue' // eslint-disable-line
import { useToast } from 'wot-design-uni'
import useCardBhk from './hooks/useCardBhk'
import card0 from './static/images/Card0.png'
import card1 from './static/images/Card1.png'
import card2 from './static/images/Card2.png'
const instance = getCurrentInstance().proxy

const eventChannel = instance.getOpenerEventChannel() // eslint-disable-line
const { setCameraData } = useBaseStore()
const { sendPhoto, loadingPhoto } = useCardBhk()
const toast = useToast()
const cover = ref(null) // 辅助
const camera = ref(null)
const cameraContext = ref(null)
const copSrc = ref<any>(null) // 截图

const dataList = ref([
  {
    title: '人脸正面照片',
    imgType: 0,
    devicePosition: 'front',
  },
  {
    title: '身份证人像面',
    imgType: 1,
    devicePosition: 'back',
  },
  {
    title: '身份证国徽面',
    imgType: 2,
    devicePosition: 'back',
  },
])

const currentParams = ref(null)
const camerType = ref<number>()
const currData = ref<any>()
onLoad((options: any) => {
  console.log('🥩[options]:', options)
  const { photoType, camerType: opcamerType } = options

  currData.value = dataList.value.find((item) => {
    return item.imgType === photoType * 1
  })
  camerType.value = opcamerType || photoType * 1
  currentParams.value = {
    ...options,
  }
  console.log('🍵[photoType]:', currentParams.value, photoType)
})

const copData = ref<any>(null)

// 生成截图
function loadTempImagePath(url) {
  return new Promise((resolve, reject) => {
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
        complete: (res) => {
          resolve(res.tempFilePath)
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  })
}
// 图片压缩
function pressImage(src) {
  return new Promise((resolve, reject) => {
    uni.compressImage({
      src,
      quality: 80, // 压缩比例
      success: (res) => {
        resolve(res.tempFilePath)
      },
      fail: (err) => {
        console.log('🥠[err]:', err)
        Toast('图片压缩,拍照失败')
      },
    })
  })
}

// 从相册选取
const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album'],
    success: async (res) => {
      try {
        // 截图
        const copUrl = await loadTempImagePath(res.tempFilePaths[0])
        copSrc.value = copUrl
        // 压缩
        const pressUrl = await pressImage(copUrl)
        // 上传
        upload(pressUrl)
      } catch (error) {
        toast.error('图片拍照失败')
      }
    },
    fail: (err) => {
      console.log('相册选取失败', err)
    },
  })
}
// 相机拍照
const takePhoto = () => {
  cameraContext.value.takePhoto({
    quality: 'high',
    success: async (res) => {
      try {
        // 截图
        const copUrl = await loadTempImagePath(res.tempImagePath)
        copSrc.value = copUrl
        console.log('🥜[ copSrc.value]:', copSrc.value)
        // 压缩
        const pressUrl = await pressImage(copUrl)
        // 上传
        upload(pressUrl)
      } catch (error) {
        toast.error('图片拍照失败')
      }
    },
    fail: (err) => {
      console.log('🍚[err]:', err)
      toast.error('图片拍照失败')
      toast.close()
    },
  })
}
// upload
async function upload(ress) {
  console.log('🍢[ress]:', ress)
  const photoBase64 = await pathToBase64(ress)
  toast.loading('正在上传中...')
  const formData = {
    ...currentParams.value,

    photoBase64: photoBase64.replace('data:image/png;', 'data:image/jpg;'),
  }
  try {
    const resData: any = await sendPhoto(formData)
    if (resData.data.data.message) {
      console.log('🍫[resData]:', resData)
      toast.error(resData.data.data.message)
    } else {
      console.log('🍦[resData]========:', resData)

      const cameraData = {
        url: ress,
        id: resData.data.data.id,
        data: currData.value.imgType === 0 ? {} : JSON.parse(resData.data.data?.identifyCardInfo),
      }

      eventChannel.emit('camera', {
        data: cameraData,
      })
      close()
    }
  } catch (error) {
    toast.error('图片上传出问题了')
    toast.close()
  }
}

function reverseCamera() {
  currData.value.devicePosition = currData.value.devicePosition === 'back' ? 'front' : 'back'
}
function cameraError(e) {
  console.log(e.detail)
  toast.error('以拒绝，使用请手动开启')
  setTimeout(() => {
    close()
  }, 5000)
}

// 关闭相机
const close = () => {
  console.log('🌭======关闭相机-----')
  toast.close()
  uni.navigateBack()
}
function del() {
  copSrc.value = ''
}
onMounted(() => {
  if (uni.createCameraContext) {
    cameraContext.value = uni.createCameraContext()
  } else {
    toast.error('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。')
  }
  uni
    .createSelectorQuery()
    .select('#cover')
    .boundingClientRect(function (data) {
      console.log('辅助信息========>:', data)
      copData.value = data
      if (currData.value.imgType === 0) {
        copData.value.width = 358
        copData.value.height = 448
        copData.value.left = 28 //
      }
    })
    .exec()
})
</script>
<template>
  <view class="bigBox">
    <view class="box">
      <camera
        mode="normal"
        :device-position="currData!.devicePosition"
        flash="auto"
        class="facevideo"
        binderror="cameraError"
        ref="camera"
        id="camera"
        @error="cameraError"
      ></camera>
      <view class="cover-box flex flex-col justify-center items-center">
        <view v-if="!copSrc" class="flex flex-col justify-center items-center">
          <!-- 人脸面 -->
          <cover-image
            ref="cover"
            id="cover"
            v-if="currData.imgType == 0"
            class="w-100% h-700rpx"
            :src="card0"
          />
          <!-- 正面 -->
          <cover-image
            ref="cover"
            id="cover"
            v-if="currData.imgType == 1"
            class="w-350px h-500px"
            :src="card1"
          />
          <!-- 背面 -->
          <cover-image
            ref="cover"
            v-if="currData.imgType == 2"
            class="w-350px h-500px"
            :src="card2"
            id="cover"
          />

          <wd-toast />
        </view>
        <view class="relative flex flex-col justify-center items-center bgCop size-full" v-else>
          <view
            class="p-5px bd-solid_#fff"
            :style="`width: ${copData.width}px;height:${copData.height}px`"
            @click="del"
          >
            <image :src="copSrc" alt="" :width="copData.width" :height="copData.height" />
          </view>
        </view>
      </view>

      <view class="w-full h-10% absolute bottom-0 bg-#000 font-size-20px color-#fff z-99">
        <view class="flex justify-between items-center px-70px py-10px">
          <view class="back" @click="close">
            <wd-icon name="arrow-down" size="22px" color="#fff"></wd-icon>
          </view>
          <view @click="takePhoto" hover-class="color-red">
            <view class="i-carbon-circle-filled font-size-50px color-#fff"></view>
          </view>
          <view @click="chooseImage">
            <wd-icon name="refresh1" size="22px" color="#fff"></wd-icon>
          </view>
        </view>
      </view>
    </view>
    <canvas canvas-id="myCanvas" id="aa"></canvas>
  </view>
</template>

<style lang="scss" scoped>
.bigBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
}
.facevideo {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.cover-box {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 90%;
}
#aa {
  position: absolute;
  top: 50000px;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
}

.bgCop {
  background: rgba(0, 0, 0, 0.9);
}
</style>

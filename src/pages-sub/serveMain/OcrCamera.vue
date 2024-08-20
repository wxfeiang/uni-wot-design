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
import { pathToBase64 } from 'image-tools'
import { useToast } from 'wot-design-uni'
import useCardBhk from './hooks/useCardBhk'
import card0 from './static/images/Card0.png'
import card1 from './static/images/Card1.png'
import card2 from './static/images/Card2.png'
const { setCameraData } = useBaseStore()
const { sendPhoto, loadingPhoto } = useCardBhk()
const toast = useToast()
const peop = ref(null)
const fornt = ref(null)
const back = ref(null)
const camera = ref(null)
const cameraContext = ref(null)

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
const currData = ref()
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
const imgData = ref<any>(null)
onMounted(() => {
  if (uni.createCameraContext) {
    cameraContext.value = uni.createCameraContext()
    if (currData.value.imgType === 0) {
      uni
        .createSelectorQuery()
        .select('#peop')
        .boundingClientRect((data) => {
          imgData.value = data
        })
        .exec()
    }
    if (currData.value.imgType === 1) {
      uni
        .createSelectorQuery()
        .select('#fornt')
        .boundingClientRect((data) => {
          imgData.value = data
        })
        .exec()
    }

    if (currData.value.imgType === 2) {
      uni
        .createSelectorQuery()
        .select('#back')
        .boundingClientRect((data) => {
          imgData.value = data
        })
        .exec()
    }

    uni
      .createSelectorQuery()
      .select('#camera')
      .boundingClientRect((data) => {
        console.log('当前camera----', data) //  打印获取结果
        camera.value = data
      })
      .exec()
  } else {
    toast.error('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。')
  }
})

function cameraError(e) {
  console.log(e.detail)
  toast.error('以拒绝，使用请手动开启')
  setTimeout(() => {
    wx.navigateBack({
      delta: 1, // 返回上一级页面
    })
  }, 3000)
}

// rpx转px
function rpx2px(rpx) {
  const screenWidth = uni.getSystemInfoSync().screenWidth
  return (screenWidth * Number.parseInt(rpx)) / 750
}
//  358 441
const showImg = ref()
function loadTempImagePath(url) {
  uni.getImageInfo({
    src: url,
    success: (res) => {
      console.log('🍊[res]:', res)
      console.log('🍋', imgData.value)

      const x = res.width * (imgData.value.width / camera.value.width)
      const y = res.height * (imgData.value.width / camera.value.height)

      // const imageWidth = res.width * (300 / camera.value.width)
      // const imageHeight = res.height * (475 / camera.value.height)
      // console.log('🍇', x, y, imageWidth, imageHeight)

      const testc = uni.createCanvasContext('image-canvas')
      testc.drawImage(res.path, 0, 0, res.width, res.height)

      const destWidth = currData.value.imgType === 0 ? 358 : res.width
      const destHeight = currData.value.imgType === 0 ? 441 : res.height

      testc.draw(false, () => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: res.width,
          height: res.height,
          destWidth,
          destHeight,
          canvasId: 'image-canvas',
          fileType: 'jpg',
          quality: 50,
          complete: (res2) => {
            console.log('===========截图后的图片地址:', res2)
            showImg.value = res2.tempFilePath
            upload(res2.tempFilePath)
          },
        })
      })
    },
  })
}

const takePhoto = () => {
  cameraContext.value.takePhoto({
    quality: 'high',
    success: (res) => {
      const quality = 50
      uni.compressImage({
        src: res.tempImagePath,
        quality, // 压缩比例
        success: async (ress: any) => {
          // if (currData.value.imgType === 0) {
          //   loadTempImagePath(ress.tempFilePath)
          // } else {
          //   upload(ress.tempFilePath)
          // }
          upload(ress.tempFilePath)
        },
        fail: (err) => {
          console.log('🍚[err]:', err)
          toast.error('图片压缩====拍照失败')
          toast.close()
        },
      })
    },
    fail: (err) => {
      console.log('🍚[err]:', err)
      toast.error('图片拍照失败')
      toast.close()
    },
  })
}
// 从相册选取
const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album'],
    success: (res) => {
      // loadTempImagePath(res.tempFilePaths[0])
      upload(res.tempFilePaths[0])
    },
    fail: (err) => {
      console.log('相册选取失败', err)
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
    zjhm: '210204199207215655',
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
      setCameraData(camerType.value, cameraData)
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
// 关闭相机
const close = () => {
  console.log('🌭======关闭相机-----')
  toast.close()
  uni.navigateBack()
}
function del() {
  showImg.value = ''
}
</script>
<template>
  <view class="bigBox">
    <view class="box">
      <camera
        mode="normal"
        :device-position="currData.devicePosition"
        flash="auto"
        class="facevideo"
        binderror="cameraError"
        ref="camera"
        id="camera"
      ></camera>
      <view class="cover-box flex flex-col justify-center items-center">
        <view v-if="!showImg" class="flex flex-col justify-center items-center">
          <!-- 人脸面 -->
          <cover-image
            ref="peop"
            id="peop"
            v-if="currData.imgType == 0"
            class="w-100% h-700rpx"
            :src="card0"
          />
          <!-- 正面 -->
          <cover-image
            ref="fornt"
            id="fornt"
            v-if="currData.imgType == 1"
            class="w-350px h-500px"
            :src="card1"
          />
          <!-- 背面 -->
          <cover-image
            ref="back"
            v-if="currData.imgType == 2"
            class="w-350px h-500px"
            :src="card2"
            id="back"
          />

          <wd-toast />
        </view>
        <view class="center" v-else @click="del">
          <img :src="showImg" alt="" class="img" />
        </view>
      </view>

      <view class="w-full absolute bottom-0 bg-#000 font-size-20px color-#fff z-99">
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
    <canvas class="" id="aa" canvas-id="image-canvas"></canvas>
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
  width: 5000px;
  height: 5000px;
  border: 1px solid #ff0024;
  /* opacity: 0; */
}
.center {
  position: relative;
  box-sizing: content-box;
  float: left;
  width: 300px;
  height: 475px;
  border: 1px solid #eee;
}
.img {
  width: 300px;
  height: 475px;
}
</style>

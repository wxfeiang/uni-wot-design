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
import { getBase64ImageSize } from './hooks/useUpload'
import card0 from './static/images/Card0.png'
import card1 from './static/images/Card1.png'
import card2 from './static/images/Card2.png'
const { setCameraData } = useBaseStore()
const { sendPhoto, loadingPhoto } = useCardBhk()
const toast = useToast()

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

const emit = defineEmits(['getImgPath', 'colseCamera'])
const currentParams = ref(null)
const currData = ref()
onLoad((options: any) => {
  console.log('🥑============')
  const { photoType } = options
  console.log('🍵[photoType]:', photoType)

  currData.value = dataList.value.find((item) => {
    return item.imgType === photoType * 1
  })
  currentParams.value = {
    ...options,
  }
})

onMounted(() => {
  if (uni.createCameraContext) {
    cameraContext.value = uni.createCameraContext()
  } else {
    toast.error('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。')
  }
})
// onBeforeUnmount(() => {
//   uni.stopGyroscope({
//     success() {
//       console.log('stop success!')
//     },
//     fail() {
//       console.log('stop fail!')
//     },
//   })
//   uni.stopDeviceMotionListening()
// })
function cameraError(e) {
  console.log(e.detail)
  // wx.showToast({
  //   title: '以拒绝，使用请手动开启',
  //   icon: 'none',
  // })
  toast.error('以拒绝，使用请手动开启')
  setTimeout(() => {
    wx.navigateBack({
      delta: 1, // 返回上一级页面
    })
  }, 3000)
}

const takePhoto = () => {
  cameraContext.value.takePhoto({
    quality: 'high',
    success: (res) => {
      console.log('🥦[res]:', res)
      const quality = 60
      // if (res.tempFiles[0].size > 1024 * 80) {
      //   quality = 1
      // }
      uni.compressImage({
        src: res.tempImagePath,
        quality, // 压缩比例
        success: async (ress: any) => {
          console.log('🍢[ress]:', ress, ress.tempFilePath)
          const photoBase64 = await pathToBase64(ress.tempFilePath)
          toast.loading('正在上传中...')
          const size = getBase64ImageSize(photoBase64)
          // console.log('🍔', size)
          // if (size > 1024 * 80) {
          //   toast.error('图片大小超过限制，请重新拍摄')
          //   return
          // }

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
              const cameraData = {
                url: ress.tempFilePath,
                id: resData.data.data.id,
                data:
                  currData.value.imgType === 0
                    ? {}
                    : JSON.parse(resData.data.data?.identifyCardInfo),
              }
              setCameraData(currData.value.imgType, cameraData)

              console.log('🍦[resData]========:', resData)
              close()
            }
          } catch (error) {
            toast.error('图片上传出问题了')
            toast.close()
          }
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
      let quality = 90
      if (res.tempFiles[0].size > 1024 * 80) {
        quality = 1
      }
      uni.compressImage({
        src: res.tempFilePaths[0],
        quality, // 压缩比例
        success: async (ress: any) => {
          console.log('🍢[ress]:', ress, ress.tempFilePath)
          const photoBase64 = await pathToBase64(ress.tempFilePath)
          toast.loading('正在上传中...')
          const size = getBase64ImageSize(photoBase64)
          // console.log('🍔', size)
          // if (size > 1024 * 80) {
          //   toast.error('图片大小超过限制，请重新拍摄')
          //   return
          // }

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
                url: res.tempFilePaths[0],
                id: resData.data.data.id,
                data:
                  currData.value.imgType === 0
                    ? {}
                    : JSON.parse(resData.data.data?.identifyCardInfo),
              }
              setCameraData(currData.value.imgType, cameraData)
              close()
            }
          } catch (error) {
            toast.error('图片上传出问题了')
            toast.close()
          }
        },
      })
    },
    fail: (err) => {
      console.log('相册选取失败', err)
    },
  })
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
</script>
<template>
  <view class="h-90vh">
    <camera
      mode="normal"
      :device-position="currData.devicePosition"
      flash="auto"
      class="w-full h-90vh"
      binderror="cameraError"
    >
      <cover-view class="size-100% flex flex-col justify-center items-center">
        <!-- 人脸面 -->
        <cover-image v-if="currData.imgType == 0" class="w-full h-700rpx" :src="card0" />
        <!-- 正面 -->
        <cover-image v-if="currData.imgType == 1" class="w-500px h-350px rotate-90" :src="card1" />
        <!-- 背面 -->
        <cover-image v-if="currData.imgType == 2" class="w-500px h-350px rotate-90" :src="card2" />

        <wd-toast />
      </cover-view>
    </camera>
    <view class="w-full h-10vh bg-#000 font-size-20px color-#fff">
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
</template>

<style lang="scss" scoped></style>

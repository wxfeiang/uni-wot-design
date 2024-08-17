import { needLoginPages } from '../../utils/index';
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
// import { pathToBase64 } from 'image-tools'
// import { useMessage } from 'wot-design-uni'
// import useUpload, { getBase64ImageSize } from './hooks/useUpload'
// const message = useMessage('wd-message-box-slot')

const basestore = useBaseStore()

const { sendPhoto, loadingPhoto } = useUpload()

const showHeader = ref(true)

const devicePosition = ref('back') // 0 为前置摄像头，1 为后置摄像头
const ctxHeader = ref(null)
const authCamera = ref(false)
const currentParams = ref(null)
onLoad((options: any) => {
  console.log('🌯[options]:', options)
  currentParams.value = options
  devicePosition.value = options.photoType === '0' ? 'front' : 'back'
})
//
onShow(() => {
  getCameraAuth()
})
//  获取相机权限

//  获取相机权限
function getCameraAuth() {
  uni.getSetting({
    success(res) {
      if (res.authSetting['scope.camera']) {
        authCamera.value = true
      } else {
        authCamera.value = false
      }
    },
  })
}
function reverseCamera() {
  devicePosition.value = devicePosition.value === 'back' ? 'front' : 'back'
}
function handleCameraError() {
  uni.showToast({
    title: '用户拒绝使用摄像头',
    icon: 'none',
  })
}
// 拍摄头像
function takePhotoByHead() {
  ctxHeader.value = uni.createCameraContext()
  ctxHeader.value.takePhoto({
    quality: 'high',
    // success: (res) => {
    //   uni.compressImage({
    //     src: res.tempImagePath,
    //     quality: 90, // 压缩比例
    //     success: async (ress: any) => {
    //       message.alert('图片上传出问题了')
    //       console.log('🍢[ress]:', ress, ress.tempFilePath)
    //       // const photoBase64 = await pathToBase64(ress.tempFilePath)

    //       // const size = getBase64ImageSize(photoBase64)
    //       console.log('🍔', size)
    //       // if (size > 1024 * 80) {
    //       //   message.alert('图片大小超过限制，请重新拍摄')
    //       //   return
    //       // }
    //       const ingmUrl = ress.tempFilePath
    //       const formData = {
    //         ...currentParams.value,
    //         zjhm: '31242520311264800',
    //         photoBase64: photoBase64.replace('data:image/png;', 'data:image/jpg;'),
    //       }
    //       console.log('🌰', formData, ingmUrl)
    //       try {
    //         const resData: any = await sendPhoto(formData)
    //         if (resData.data.data.message || resData.data.code === 500) {
    //           message.alert(resData.data.data.message || resData.data.msg)
    //         } else {
    //           // console.log('🍦[resData]:', resData.data.data.identifyCardInfo)
    //           // basestore.cameraData = resData.data.data
    //           close()
    //         }
    //       } catch (error) {
    //         message.alert('图片上传出问题了')
    //         console.log('🥟', error)
    //       }

    //       // 调用上传接口 -----
    //     },
    //   })
    // },
  })
}

// 关闭/返回

function close() {
  console.log('🍐关闭摄像头')

  uni.navigateBack()
}
</script>

<template>
  <view v-if="showHeader">
    <view class="h-100vh">
      <camera
        :binderror="handleCameraError"
        :device-position="devicePosition"
        output-dimension="360P"
        flash="auto"
        class="w-full h-100vh bg-coolGray-5"
      >
        <cover-image
          src="https://img-blog.csdnimg.cn/20210126152753150.png"
          class="w-full h-700rpx mt-180px"
        ></cover-image>

        <view
          class="w-full h-10vh flex justify-center items-center bg-transparent absolute bottom-50px"
        >
          <!-- <wd-icon name="chevron-down" size="30px" color="#fff" @click="close"></wd-icon> -->
          <wd-icon
            name="stop-circle-filled"
            size="80px"
            color="#fff"
            @click="takePhotoByHead"
          ></wd-icon>
          <!-- <wd-icon name="camera" size="30px" color="#fff" @click="takePhotoByHead"></wd-icon> -->
          <!-- <wd-icon name="picture" size="22px" color="#fff"></wd-icon> -->
        </view>
        <wd-message-box selector="wd-message-box-slot"></wd-message-box>
      </camera>
      <cover-view v-if="loadingPhoto" class="size-full flex justify-center items-center">
        <wd-loading type="outline" />
      </cover-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// :deep(.nav_bg) {
//   background-color: var(--color-nav-bg);
//   .wd-navbar__title {
//     color: var(--color-nav-text);
//   }
//   .wd-navbar__left {
//     color: var(--color-nav-text);
//   }
// }
// :deep(.custom-title) {
//   @apply px-20px! pt-20px!;
// }
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  needLoginPages: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { routeTo, sceneResult } from '@/utils'
import { Modal } from '@/utils/uniapi/prompt'
import { storeToRefs } from 'pinia'
import qs from 'qs'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const inValue = ref<any>() // 输入框的值
const actualPrice = ref(0)
actualPrice.value = inValue.value
const urlData = ref()
onLoad(async (options) => {
  console.log('🍮[options]:', options)
  urlData.value = qs.parse(decodeURIComponent(options.url) || options.url)
  console.log('🥫[urlData.value]:', urlData.value)
})
onShow(() => {
  const loginRoute = '/pages/login/index'
  if (!isLogined.value) {
    Modal({
      title: '提示',
      content: '您还没有登录,请先登录？',
      showCancel: true,
    }).then((res: any) => {
      if (res.confirm) {
        // 重定向
        const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent('/page/pay/scanResult')}`
        uni.navigateTo({ url: redirectRoute })
      } else {
        routeTo({
          url: 'page/index/index',
        })
      }
    })
  } else {
    const data = uni.getLaunchOptionsSync()
    console.log('获取到场景数据', data)
    const resData = {
      scanType: 'WX_CODE',
      scene: data.scene,
    }
    const { status, url } = sceneResult(resData)
    if (status) {
      routeTo({
        url: '/pages/pay/index',
        data: { url },
      })
    } else {
      message.alert({
        msg: '未识别到二维码内容',
        title: '提示',
      })
    }
  }
})
onLaunch((options) => {
  console.log(options)
})
</script>
<template>
  <dy-navbar leftTitle="扫码结果" left></dy-navbar>
  <view>audisrfnvjk</view>
</template>

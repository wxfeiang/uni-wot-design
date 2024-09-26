<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { pathToBase64 } from 'image-tools'
import icons from './static/editlog.png'
import tobg from './static/tobg.png'
// TODO: 背景图片
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { routeTo } from '@/utils'
import qs from 'qs'

import { useMessage } from 'wot-design-uni'
import { shopDetilProps } from './utils/types'
import useShopServe from './utils/useShopServe'
const { shopMessage, sendShopDetail } = useShopServe()
const topbgBase64 = ref('')
const { VITE_SERVER_BASEURL } = import.meta.env
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
const message = useMessage()
const cfig = ref()
cfig.value = {
  str: '',
  size: 400,
}

function toMingxi() {
  routeTo({ url: '/pages-sub/shopManager/shopPayList' })
}

onLoad(async (options) => {
  topbgBase64.value = await pathToBase64(tobg)
  try {
    await sendShopDetail()
    const qrcodeData = {
      merchantId: shopMessage.value.merchantId,
      type: 'xaCard',
    }
    cfig.value.str = `${VITE_SERVER_BASEURL}?${qs.stringify(qrcodeData)}`
  } catch (error) {
    shopMessage.value = {} as shopDetilProps
    message.alert({ title: '提示', msg: error.data.msg, closeOnClickModal: false }).then((res) => {
      // uni.navigateBack()
    })
  }
})
</script>

<template>
  <view
    class="bg-#F2F3F7 w-100vw h-100vh flex flex-col bg-no-repeat"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 300px`"
  >
    <dy-navbar leftTitle="收款码" left isNavShow></dy-navbar>
    <view class="mt-40px px-20px">
      <view class="bg-#fff p-20px py-0 rounded-10px overflow-hidden">
        <view class="text-18px py-10px">商户收款码</view>
        <view class="flex justify-center mt-10px flex-col items-center">
          <view class="py-10px">{{ shopMessage.merchantName }}</view>
          <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
          <view class="py-10px">
            <wd-text text="下载二维码" color="#2D69EF" size="14px"></wd-text>
          </view>
        </view>
        <view
          @click="toMingxi"
          class="flex justify-between items-center text-14px color-#555 bt-1px_dashed_#E2E2E2 py-20px p-15px mt-20px mx-[-20px]"
        >
          <view class="flex items-center gap-10px">
            <wd-img :src="icons" width="19" height="22px"></wd-img>
            收款记录
          </view>
          <view><wd-icon name="chevron-right" size="14px"></wd-icon></view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

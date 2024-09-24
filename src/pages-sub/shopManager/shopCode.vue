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
import { downSaveImage } from '@/utils/uniapi'
const topbgBase64 = ref('')
const show = ref(false)
const qrCodeImg = ref('')
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
const str = ref<any>('')

const cfig = ref()
cfig.value = {
  str: str.value,
  size: 400,
}

function toMingxi() {
  routeTo({ url: '/pages-sub/shopManager/shopPayList' })
}
const downQrcode = () => {
  qrcode.value?.save().then((img) => {
    show.value = true
    qrCodeImg.value = img

    // 开始下载
    downSaveImage(qrCodeImg.value)
  })
}

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(tobg)
})
</script>

<template>
  <view
    class="bg-#F2F3F7 w-100vw h-100vh flex flex-col bg-no-repeat"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 300px`"
  >
    <dy-navbar leftTitle="收款码" left isNavShow></dy-navbar>
    <view class="mt-30px px-20px">
      <view class="bg-#fff p-20px py-0 rounded-10px overflow-hidden">
        <view class="text-18px py-10px">商户收款码</view>
        <view class="flex justify-center mt-10px flex-col items-center">
          <view class="py-10px">雄安乐享便利店（**莹）</view>
          <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>

          <view class="py-10px">
            <wd-text text="下载二维码" color="#2D69EF" size="14px" @click="downQrcode"></wd-text>
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

  <wd-overlay :show="show" @click="show = false">
    <view class="size-full flex flex-col justify-center items-center bg-#fff">
      <view class="w-90% bg-sm rounded-10px px-15px">
        <view class="text-center py-25px color-#fff font-600 text-24px">商户收款码</view>
        <view class="bg-#fff px-20px pb-40px rounded-10px flex flex-col items-center">
          <view class="py-20px">雄安乐享便利店（**莹）</view>
          <view class="w-232px h-232px">
            <image class="w-232px h-232px" :src="qrCodeImg"></image>
          </view>
        </view>
        <view class="py-20px text-center color-#fff">打开雄安一卡通【扫一扫】</view>
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.bg-sm {
  background: linear-gradient(131deg, #72c2fe 0%, #4055fe 100%);
}
</style>

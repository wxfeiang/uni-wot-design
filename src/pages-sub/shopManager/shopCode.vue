<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { useRequest } from 'alova/client'
import { pathToBase64 } from 'image-tools'
import icons from './static/editlog.png'
import tobg from './static/tobg.png'
// TODO: 背景图片
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { getSignValid } from '@/service/api/cardServe'
import { routeTo } from '@/utils'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
const { sendPhoneCode, countdown, sending } = usePhoneCode()
const topbgBase64 = ref('')
const opts = ref({
  lineColor: '#000000',
  fontSize: 20,
  width: 2,
  textMargin: 0,
  text: '1234567890657890',
  value: '1234567890657890',
  displayValue: false,
})
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

const lingdu = ref(0)

const sendTiem = ref(60)
let timer = null
const incrementCount = () => {
  timer = setInterval(() => {
    if (sendTiem.value > 0) {
      sendTiem.value--
    } else {
      // 刷新二维码请求
      sendTiem.value = 60
    }
  }, 1000)
}

const { send: sendSignValid, loading: LoadingValid } = useRequest((data) => getSignValid(data), {
  immediate: false,
  loading: false,
})

watch(
  () => countdown.value,
  () => {
    if (countdown.value === 0) {
      sendPhoneCode()
    }
  },
  { deep: true },
)

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(tobg)
})
onMounted(async () => {
  incrementCount()
  sendPhoneCode()
  lingdu.value = (await usegetScreenBrightness()) as number

  setTimeout(async () => {
    await useSetScreenBrightness(1)
    await useSetKeepScreenOn(true)
  }, 3000)
})
onUnmounted(async () => {
  timer && clearInterval(timer)

  await useSetKeepScreenOn(false)
  await useSetScreenBrightness(lingdu.value + 0.05)
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

<style lang="scss" scoped>
.bg-sm {
  background: linear-gradient(122deg, #ff9c06 0%, #ff181b 100%);
}
</style>

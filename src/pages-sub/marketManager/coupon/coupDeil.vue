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
// TODO: 背景图片
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { getSignValid } from '@/service/api/cardServe'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
const { sendPhoneCode, countdown, sending } = usePhoneCode()
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
  <view class="bg-#FCC388 w-100vw h-100vh flex flex-col">
    <dy-navbar leftTitle="优惠券" left isNavShow></dy-navbar>
    <view class="text-center mt-15px px-20px">
      <view class="color-#F2110D font-600 text-30px">20元无门槛红包</view>
      <view class="color-#fff bg-sm rounded-5px text-center text-16px py-5px my-10px">
        有效期截至：2024-09-23 00:00:00
      </view>
    </view>

    <view class="mt-20px px-20px">
      <view class="bg-#FF7206 py-10px rounded-10px">
        <view class="bg-#fff pt-20px rounded-10px overflow-hidden">
          <view class="py-20px color-#FF7206 text-16px text-center">券码：5757686996948784</view>
          <view class="flex justify-center mt-10px flex-col items-center">
            <view class="p-10px rounded-10px bg-#FFE9D8">
              <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
            </view>

            <view>
              <text class="color-#333">请出示二维码核销</text>
            </view>
          </view>

          <view class="text-14px p-15px mt-20px bg-#FFF6EF">
            <view class="color-#000 text-16px">使用说明</view>
            <view class="color-#333 mt-5px">xx商户可用，立减x元。</view>
          </view>
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

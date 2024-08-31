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
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { routeTo } from '@/utils'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
import stkts from '../static/image/sbkts.png'
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
  logoImage: 'https://cdn.tmui.design/public/design/logoCir.png',
  str: str.value,
  logoWidth: 60,
  logoHeight: 60,
  size: 440,
}
const barcodeBg = ref(false)
const logcation = ref('北京市')
const user = ref({
  name: '张三',
  shbzkh: '1234567890657890',
})
const show = ref(true)
const textArr = ref([
  '电子社保卡二维码用于身份认证和支付',
  '结算时向商家出示',
  '请不要将二维码及数字发送给他人',
])
const lingdu = ref(0)
const isShow = async () => {
  show.value = !show.value
  lingdu.value = (await usegetScreenBrightness()) as number
  console.log('🍖[ lingdu.value]:', lingdu.value)
  setTimeout(() => {
    useSetScreenBrightness(1)
    useSetKeepScreenOn(true)
  }, 3000)
}
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

onMounted(() => {
  incrementCount()
})
onUnmounted(() => {
  timer && clearInterval(timer)

  useSetKeepScreenOn()
  useSetScreenBrightness(lingdu.value)
})
const barodeClick = () => {
  routeTo({ url: '/pages-sub/userManager/SocialSecurityCard/barcode' })
}
</script>

<template>
  <view v-if="!show" class="mt-0">
    <view class="bg-#2D69EF h-280px">
      <view class="flex">
        <view>logout</view>
        <view>电子社保卡</view>
      </view>
      <view class="color-#fff">
        <view>姓名：{{ user.name }}</view>
        <view>社会保障卡号：{{ user.shbzkh }}</view>
      </view>
    </view>
    <view class="mt-[-120px] px-15px">
      <view class="bg-#fff pt-26px pb-5px rounded-10px overflow-hidden">
        <view class="flex justify-center flex-col items-center" @click="barodeClick">
          <dy-barcode :width="636" :option="opts"></dy-barcode>
          <view class="color-#999 text-14px mt-[-16px]">{{ opts.value }}</view>
        </view>

        <view class="flex justify-center mt-20px flex-col items-center">
          <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
          <view>
            <text class="text-#999999 text-14px mr-10px">{{ sendTiem }}秒自动刷新</text>
            <wd-button type="text">手动刷新</wd-button>
          </view>
        </view>

        <view
          class="flex justify-between items-center text-14px color-#555 bt-1px_dashed_#E2E2E2 py-10px px-15px mt-20px"
        >
          <view>参保地</view>
          <view>
            {{ logcation }}
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 横屏显示 -->
  <!-- <view class="size-100vh fixed top-0 left-0 right-0 z-99999 rotate-90" v-if="barcodeBg">
    <view
      class="size-full flex flex-col justify-center items-center bg-#1890ff relative z-99"
      @click="barcodeBg = false"
    >
      <view>
        <dy-barcode :width="636" :option="opts"></dy-barcode>
        <view class="color-#999 text-14px mt-[-5px] text-center">{{ opts.value }}</view>
      </view>
    </view>
  </view> -->

  <!-- 提示信息 -->
  <wd-overlay :show="show">
    <view class="size-full flex flex-col justify-center items-center bg-#fff">
      <wd-status-tip
        :image="stkts"
        :image-size="{
          height: 132,
          width: 224,
        }"
      />
      <view class="mt-20px">
        <view class="mt-10px text-center" v-for="(item, index) in textArr" :key="index">
          <wd-text :text="item" color="#555"></wd-text>
        </view>
      </view>
      <view class="mt-20px w-100% px-40px box-border">
        <wd-button type="primary" :round="false" @click="isShow" color="#2D69EF" block>
          我知道了
        </wd-button>
      </view>
    </view>
  </wd-overlay>
</template>

<style>
page {
  background: #f7f7f7;
}
</style>
<style lang="scss" scoped></style>

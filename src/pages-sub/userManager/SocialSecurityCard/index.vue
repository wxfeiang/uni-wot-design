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
import { getPhoneCode } from '@/service/api/system'
import logo from '@/static/images/logo.png'
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
  logoImage: logo,
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
const show = ref(false)
const textArr = ref([
  '电子社保卡二维码用于身份认证和支付',
  '结算时向商家出示',
  '请不要将二维码及数字发送给他人',
])
const lingdu = ref(0)
const isShow = async () => {
  routeTo({ url: '/pages-sub/userManager/SocialSecurityCard/barcode' })
  show.value = !show.value
  lingdu.value = (await usegetScreenBrightness()) as number
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
function disableScreenCapture() {
  // 判断当前环境是否支持setScreenCaptured方法
  // uni.setUserCaptureScreen({
  //   enable: false,
  //   success: (res) => {
  //     console.log('setUserCaptureScreen success: ' + JSON.stringify(res))
  //   },
  //   fail: (res) => {
  //     console.log('setUserCaptureScreen fail: ' + JSON.stringify(res))
  //   },
  //   complete: (res) => {
  //     console.log('setUserCaptureScreen complete: ' + JSON.stringify(res))
  //   },
  // })
}

// 获取验证码
const {
  send: getCode,
  loading: sending,
  countdown,
  data: codeDatas,
} = getPhoneCode(
  {
    phone: '121212',
  },
  {
    immediate: true,
    initialCountdown: 60,
    loading: false,
  },
)
watch(
  () => countdown.value,
  () => {
    if (countdown.value === 0) {
      getCode()
    }
  },
  { deep: true },
)

onMounted(() => {
  incrementCount()
  disableScreenCapture()
  console.log('🍖[ lingdu.value]:', lingdu.value)

  setTimeout(() => {
    useSetScreenBrightness(1)
    useSetKeepScreenOn(true)
  }, 3000)
  getCode()
})
onUnmounted(() => {
  timer && clearInterval(timer)

  useSetKeepScreenOn(false)
  useSetScreenBrightness(0.5)
})
const barodeClick = () => {
  show.value = !show.value
}
</script>

<template>
  <view v-if="!show">
    <view class="bg-#2D69EF h-945rpx">
      <wd-navbar
        safeAreaInsetTop
        placeholder
        fixed
        custom-class="nav_show"
        :title="2323"
        :bordered="false"
      ></wd-navbar>
      <view class="flex gap-5px items-center justify-center mt-30px">
        <view>
          <wd-img :src="logo" :width="38" :height="38"></wd-img>
        </view>
        <view class="color-#fff font-600">电子社保卡</view>
      </view>
      <view class="color-#fff mt-20px pl-30px line-height-30px">
        <view>姓名：{{ user.name }}</view>
        <view>社会保障卡号：{{ user.shbzkh }}</view>
      </view>
    </view>
    <view class="mt-[-80px] px-15px">
      <view class="bg-#fff pt-26px pb-5px rounded-10px overflow-hidden">
        <view class="flex justify-center flex-col items-center" @click="barodeClick">
          <dy-barcode :width="636" :option="opts"></dy-barcode>
          <view class="color-#999 text-14px mt-[-16px]">{{ opts.value }}</view>
        </view>

        <view class="flex justify-center mt-10px flex-col items-center">
          <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
          <view>
            <text class="text-#999999 text-14px mr-10px">{{ countdown }}秒自动刷新</text>
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
  <!-- <wd-overlay :show="barcodeBg">
    <view
      class="size-full flex flex-col justify-center items-center bg-#fff relative z-99"
      @click="barcodeBg = false"
    >
      <view>
        <dy-barcode :width="636" :option="opts"></dy-barcode>
        <view class="color-#999 text-14px mt-[-5px] text-center">{{ opts.value }}</view>
      </view>
    </view>
  </wd-overlay> -->

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
<style lang="scss" scoped>
:deep(.nav_show) {
  @apply bg-transparent!;
}
</style>

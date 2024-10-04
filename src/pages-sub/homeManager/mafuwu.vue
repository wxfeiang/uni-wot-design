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

import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { getSignValid } from '@/service/api/cardServe'
import logo from '@/static/images/logo.png'
import { routeTo } from '@/utils'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
import stkts from '@/static/images/index/sbkts.png'
import useModule from './utils'
import { useUserStore } from '@/store'

const { sendPhoneCode, countdown, sending } = usePhoneCode()
const { sendGetStdTDCode, encrypt } = useModule()
const { userInfo } = useUserStore()
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
const showS = ref(false)
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
watch(
  () => sendTiem.value,
  async (newv) => {
    if (newv === 60) {
      const res = await sendGetStdTDCode({
        appId: 'KB23GNsIXC',
        appSign: '一卡通个人码',
        data: {
          publicKey:
            '3059301306072a8648ce3d020106082a811ccf5501822d03420004bad31a84302aeeb8918e75cbc2c6ee6405597ab1793008374a7e9c40894ab682e80cf91b5a1b12d3264e4b69851041aeeaf5ec3d4efe96ce0ff0a47373d9b839',
          xm: userInfo.userName,
          cardNo: '632534193838174714',
          term: 'wx',
          userId: userInfo.userDId,
        },
      })
      console.log(res)
    }
  },
  {
    immediate: true,
  },
)
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
  disableScreenCapture()
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
const barodeClick = () => {
  show.value = !show.value
}
</script>

<template>
  <view v-if="!show">
    <!-- <view class="navbar"> -->
    <dy-navbar leftTitle="码服务" left isNavShow :placeholder="true"></dy-navbar>
    <view class="back"></view>
    <!-- <view class="flex gap-5px items-center justify-center mt-15px">
        <view>
          <wd-img :src="logo" :width="38" :height="38"></wd-img>
        </view>
        <view class="color-#fff font-600">电子社保卡</view>
      </view>
      <view class="color-#fff mt-10px pl-30px line-height-30px">
        <view>姓名：{{ user.name }}</view>
        <view>社会保障卡号：{{ user.shbzkh }}</view>
      </view> -->
    <!-- </view> -->

    <view
      class="mt-[-120px] mb-20px px-15px"
      style="position: relative; z-index: 2; margin-top: 24rpx"
    >
      <view class="code_board">
        <view class="user_info_board">
          <view class="user_info">
            <text style="margin-bottom: 8rpx">
              姓名：{{ encrypt(userInfo.userName, 'name', showS) }}
            </text>
            <text>身份证号：{{ encrypt('548651496533154995', 'cardNo', showS) }}</text>
          </view>
          <view class="eye">
            <wd-icon
              :name="showS ? 'view' : 'eye-close'"
              size="22px"
              @click="showS = !showS"
            ></wd-icon>
          </view>
        </view>
        <view class="bg-#fff pt-20px pb-5px rounded-10px overflow-hidden">
          <!-- <view class="flex justify-center flex-col items-center" @click="barodeClick">
            <dy-barcode :width="636" :option="opts"></dy-barcode>
            <view class="color-#999 text-14px mt-[-16px]">{{ opts.value }}</view>
          </view> -->

          <view class="flex justify-center mt-10px flex-col items-center">
            <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
            <view>
              <text class="text-#999999 text-14px mr-10px">{{ sendTiem }}秒自动刷新</text>
              <wd-button type="text">手动刷新</wd-button>
            </view>
            <view class="tip">
              绑定银行卡，即可开启便捷支付功能
              <navigator class="a">【去绑卡】</navigator>
            </view>
          </view>

          <!-- <view
            class="flex justify-between items-center text-14px color-#555 bt-1px_dashed_#E2E2E2 py-10px px-15px mt-20px"
          >
            <view>参保地</view>
            <view>
              {{ logcation }}
            </view>
          </view> -->
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
.back {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: 600rpx;
  background: linear-gradient(#d1e8fe, #f7f7f7);
}
.code_board {
  font-size: 26rpx;
  color: #fff;
  background: #2d69ef;
  border-radius: 24rpx;
  .user_info_board {
    display: flex;
    padding: 24rpx;
    .user_info {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
    .eye {
      width: 36rpx;
    }
  }
}
.tip {
  display: flex;
  padding-top: 66rpx;
  padding-bottom: 54rpx;
  font-size: 28rpx;
  color: #999;
  .a {
    color: #2d69ef;
  }
}
</style>

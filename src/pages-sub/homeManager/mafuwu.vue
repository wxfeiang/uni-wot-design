<route lang="json5" type="page">
{
  layout: 'default',
  realNameAuthentication: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { Constant } from '@/enums/constant'
import logo from '@/static/images/logo.png'
import { useUserStore } from '@/store'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
import qs from 'qs'
import stkts from './static/image/sbkts.png'
import useModule from './utils/useIndex'
const { VITE_SERVER_BASEURL } = import.meta.env
const { sendGetStdTDCode, encrypt } = useModule() // countdown
const { userInfo } = useUserStore()

const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
// TODO:临时使用
const countdown = ref(60)
const timer = ref(null)
const incrementCount = () => {
  clearInterval(timer.value)
  countdown.value = 60
  timer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      // 刷新二维码请求
      countdown.value = 60
    }
  }, 1000)
}
const cfig = ref({
  logoImage: logo,
  str: '',
  logoWidth: 60,
  logoHeight: 60,
  size: 440,
})

const show = ref(true)
const textArr = ref([
  '电子社保卡二维码用于身份认证和支付',
  '结算时向商家出示',
  '请不要将二维码及数字发送给他人',
])
const lingdu = ref(0)

const privacyStatus = ref(false)
const codeRefsh = async () => {
  // const params = {
  //   appId: 'KB23GNsIXC',
  //   appSign: '一卡通个人码',
  //   data: {
  //     publicKey:
  //       '3059301306072a8648ce3d020106082a811ccf5501822d03420004bad31a84302aeeb8918e75cbc2c6ee6405597ab1793008374a7e9c40894ab682e80cf91b5a1b12d3264e4b69851041aeeaf5ec3d4efe96ce0ff0a47373d9b839',
  //     term: '1',
  //     userId: userInfo.userDId,
  //   },
  // }
  // const res = await sendGetStdTDCode(params)
  // console.log(res)
  const qrcodeData = {
    time: new Date().getTime(),
    idCardNumber: userInfo.idCardNumber,
    userId: userInfo.userDId,
    qrCodeType: Constant.QR_CODE_FLAG,
    actionType: Constant.QR_CODE_CARD,
  }
  cfig.value.str = `${VITE_SERVER_BASEURL}?${qs.stringify(qrcodeData)}`
  incrementCount()
}

watch(
  () => countdown.value,
  () => {
    if (countdown.value === 0) {
      timer.value = null
      countdown.value = 60
      codeRefsh()
    }
  },
  { deep: true },
)
const isShow = async () => {
  show.value = !show.value
  if (!show.value) {
    codeRefsh()
    lingdu.value = (await usegetScreenBrightness()) as number

    setTimeout(async () => {
      await useSetScreenBrightness(1)
      await useSetKeepScreenOn(true)
    }, 3000)
  }
}

onMounted(async () => {})
onUnmounted(async () => {
  await useSetKeepScreenOn(false)
  await useSetScreenBrightness(lingdu.value + 0.05)
  timer.value && clearInterval(timer.value)
})
</script>

<template>
  <view v-if="!show" class="min-h-100vh bg-#F2F3F7">
    <view class="back">
      <dy-navbar leftTitle="码服务" left isNavShow color="#000"></dy-navbar>
      <view class="mt-20px px-15px">
        <view class="bg-#2D69EF color-#fff rounded-10px">
          <view class="relative p-10px">
            <view class="">
              <view class="text-14px py-5px">
                姓名：{{ encrypt(userInfo.userName, 'name', privacyStatus) }}
              </view>
              <view class="text-14px py-5px">
                身份证号：{{ encrypt(userInfo.idCardNumber, 'cardNo', privacyStatus) }}
              </view>
            </view>
            <view class="absolute right-15px top-5px">
              <wd-icon
                :name="privacyStatus ? 'view' : 'eye-close'"
                size="22px"
                @click="privacyStatus = !privacyStatus"
              ></wd-icon>
            </view>
          </view>
          <view class="bg-#fff py-20px rounded-10px overflow-hidden">
            <view class="flex justify-center mt-10px flex-col items-center">
              <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
              <view>
                <text class="text-#999999 text-14px mr-10px">{{ countdown }}秒自动刷新</text>
                <wd-button type="text" @click="codeRefsh">手动刷新</wd-button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

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

<style lang="scss" scoped>
.back {
  background: linear-gradient(#d1e8fe, #f7f7f7);
}
.tip {
  display: flex;
  padding-top: 66 rpx;
  padding-bottom: 54 rpx;
  font-size: 28 rpx;
  color: #999;

  .a {
    color: #2d69ef;
  }
}
</style>

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
import stkts from '@/static/images/index/sbkts.png'
import logo from '@/static/images/logo.png'
import { useUserStore } from '@/store'
import { routeTo } from '@/utils'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
import useModule from './utils'

const { sendGetStdTDCode, encrypt, countdown } = useModule()
const { userInfo } = useUserStore()

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
const showS = ref(false)
const codeShow = async () => {
  // // "term":"调用终端：1 微信小程序 2 支付宝小程序 3 androd 4 ios  "

  const params = {
    appId: 'KB23GNsIXC',
    appSign: '一卡通个人码',
    data: {
      publicKey:
        '3059301306072a8648ce3d020106082a811ccf5501822d03420004bad31a84302aeeb8918e75cbc2c6ee6405597ab1793008374a7e9c40894ab682e80cf91b5a1b12d3264e4b69851041aeeaf5ec3d4efe96ce0ff0a47373d9b839',
      term: '1',
      userId: userInfo.userDId,
    },
  }
  const res = await sendGetStdTDCode(params)
  console.log(res)
}

watch(
  () => countdown.value,
  () => {
    if (countdown.value === 0) {
      codeShow()
    }
    console.log('🥛', countdown)
  },
  { deep: true },
)

onMounted(async () => {
  codeShow()
  lingdu.value = (await usegetScreenBrightness()) as number

  setTimeout(async () => {
    await useSetScreenBrightness(1)
    await useSetKeepScreenOn(true)
  }, 3000)
})
onUnmounted(async () => {
  await useSetKeepScreenOn(false)
  await useSetScreenBrightness(lingdu.value + 0.05)
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
              <view class="text-14px py-5px">姓名：{{ countdown }}</view>
              <view class="text-14px py-5px">身份证号：{{ 111 }}</view>
            </view>
            <view class="absolute right-15px top-5px">
              <wd-icon
                :name="showS ? 'view' : 'eye-close'"
                size="22px"
                @click="showS = !showS"
              ></wd-icon>
            </view>
          </view>
          <view class="bg-#fff py-20px rounded-10px overflow-hidden">
            <view class="flex justify-center mt-10px flex-col items-center">
              <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
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

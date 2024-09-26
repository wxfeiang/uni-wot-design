<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
// import { useRequest } from 'alova/client'
// TODO: 背景图片
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import qs from 'qs'
import { useMessage } from 'wot-design-uni'
import { removeT } from '../../../utils/index'
import { conponListProps } from './utils/types'
import userCoupon from './utils/userCoupon'

const message = useMessage()
const { VITE_SERVER_BASEURL } = import.meta.env
const bg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/a729f7e3-985b-451e-9a22-6f0a50e2fc16yhqmbg.png',
)

const { sendCouponInfo, couponInfoData } = userCoupon()
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)

const cfig = ref({
  str: '', // 要生成二维码的字符串
  size: 400,
})

onLoad(async (options) => {
  console.log('🥧======', options)
  try {
    await sendCouponInfo({ couponCode: options.couponCode })
    const qrcodeData = {
      couponCode: options.couponCode,
      type: 'xaCard',
      atticon: 'writeOff',
    }
    cfig.value.str = `${VITE_SERVER_BASEURL}?${qs.stringify(qrcodeData)}`
  } catch (error) {
    couponInfoData.value = {} as conponListProps
    message.alert({ title: '提示', msg: error.data.msg, closeOnClickModal: false }).then((res) => {
      uni.navigateBack()
    })
  }
})
</script>

<template>
  <view
    class="bg-#FCC388 w-100vw h-100vh flex flex-col"
    :style="`background-image: url(${bg}); background-size: 100%`"
  >
    <dy-navbar leftTitle="优惠券" left isNavShow></dy-navbar>
    <view class="text-center mt-15px px-20px">
      <view class="color-#F2110D font-600 text-30px">
        {{ couponInfoData.couponPrice }}元无门槛红包
      </view>
      <view class="color-#fff bg-sm rounded-5px text-center text-16px py-5px my-10px">
        有效期截至：{{ removeT(couponInfoData?.couponEndDate) }}
      </view>
    </view>

    <view class="mt-20px px-20px">
      <view class="bg-#FF7206 py-10px rounded-10px">
        <view class="bg-#fff pt-15px rounded-10px overflow-hidden">
          <view class="py-10px color-#FF7206 text-16px text-center">
            券码：{{ couponInfoData.couponCode }}
          </view>
          <view class="flex justify-center mt-10px flex-col items-center">
            <view class="p-10px rounded-10px bg-#FFE9D8">
              <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
            </view>

            <view class="py-10px">
              <text class="color-#333">请出示二维码核销</text>
            </view>
          </view>

          <view class="text-14px p-15px mt-20px bg-#FFF6EF">
            <view class="color-#000 text-16px">使用说明</view>
            <view class="color-#333 mt-5px">{{ couponInfoData.couponRemark }}</view>
            <view class="color-#333 mt-5px">线下进店展码核销!</view>
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

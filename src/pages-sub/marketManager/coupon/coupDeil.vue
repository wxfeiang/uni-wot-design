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
import cloneDeep from 'lodash-es/cloneDeep'
import qs from 'qs'
import { removeT } from '../../../utils/index'
import { qrCodeProps } from './utils/types'
const { VITE_SERVER_BASEURL } = import.meta.env
const bg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/a729f7e3-985b-451e-9a22-6f0a50e2fc16yhqmbg.png',
)

const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)

const cfig = ref({
  str: '', // 要生成二维码的字符串
  size: 400,
})

const qrData = ref<qrCodeProps>()

onLoad((options) => {
  console.log('🥧', options)
  qrData.value = options as qrCodeProps
  const params = cloneDeep(qrData.value)
  delete params.couponRemark
  cfig.value.str = `${VITE_SERVER_BASEURL}?${qs.stringify(params)}`
})
</script>

<template>
  <view
    class="bg-#FCC388 w-100vw h-100vh flex flex-col"
    :style="`background-image: url(${bg}); background-size: 100%`"
  >
    <dy-navbar leftTitle="优惠券" left isNavShow></dy-navbar>
    <view class="text-center mt-15px px-20px">
      <view class="color-#F2110D font-600 text-30px">{{ qrData.couponPrice }}元无门槛红包</view>
      <view class="color-#fff bg-sm rounded-5px text-center text-16px py-5px my-10px">
        有效期截至：{{ removeT(qrData?.couponEndDate) }}
      </view>
    </view>

    <view class="mt-20px px-20px">
      <view class="bg-#FF7206 py-10px rounded-10px">
        <view class="bg-#fff pt-20px rounded-10px overflow-hidden">
          <view class="py-20px color-#FF7206 text-16px text-center">
            券码：{{ qrData.couponId }}
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
            <view class="color-#333 mt-5px">{{ qrData?.couponRemark }}</view>
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

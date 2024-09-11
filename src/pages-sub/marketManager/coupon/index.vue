<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import { pathToBase64 } from 'image-tools'
import hubgtitle from '../static/images/coupon/hubgtitle.png'
import myyhbtn from '../static/images/coupon/myyhbtn.png'
import bg from '../static/images/coupon/yhbg.png'
import CouponList from './compoents/couponList.vue'
import { conponListProps } from './utils/types'

const topbgBase64 = ref('')
const title = ref('领券中心')

const conponList = ref<conponListProps[]>([
  {
    id: '1',
    couponType: 1,
    couponTypeName: '中秋节月饼',
    couponAmount: '2000',
    couponAmountType: 2,
    couponAmountTypeName: '平台券',
    couponLimit: '满200元可用',
    couponTime: '2022-09-01至2022-09-30',
    couponEndTime: '2022-09-30',
    couponStartTime: '2022-09-01',
    couponConternt: '领取时间：长期（xxx-xxxx',
    couponStatus: null, // 优惠券状态
  },
  {
    id: '1',
    couponType: 1,
    couponTypeName: '中秋节月饼',
    couponAmount: '2000',
    couponAmountType: 2,
    couponAmountTypeName: '平台券',
    couponLimit: '满200元可用',
    couponTime: '2022-09-01至2022-09-30',
    couponEndTime: '2022-09-30',
    couponStartTime: '2022-09-01',
    couponConternt: '领取时间：长期（xxx-xxxx',
    couponStatus: null, // 优惠券状态
  },
])
function toYouhuiquan() {
  routeTo({ url: '/pages-sub/marketManager/coupon/mycoupon' })
}

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
</script>

<template>
  <view
    class="flex flex-col bg-no-repeat bg-#ffd7af h-100vh"
    :style="`background-image: url(${topbgBase64});background-size: 100% 290px`"
  >
    <dy-navbar :leftTitle="title" left isNavShow></dy-navbar>

    <view class="mt-15px ml-40px">
      <wd-img :src="hubgtitle" width="196" height="73"></wd-img>
    </view>
    <view class="mt-15px ml-60px" @click="toYouhuiquan">
      <wd-img :src="myyhbtn" width="153" height="35"></wd-img>
    </view>

    <view class="bg-#ffd7af rounded-20px overflow-hidden mt-20px">
      <view class="pt-10px px-10px">
        <view class="rounded-4px overflow-hidden" v-for="(item, index) in conponList" :key="index">
          <Coupon-List :data="item"></Coupon-List>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.bg {
  background: #feb329;
  border: 0.9px solid rgba(255, 255, 255, 0.51);
  border-radius: 1000px;
}
.bg2 {
  background: linear-gradient(127deg, #ea5233 0%, #eb8935 100%);
}
:deep(.custom-class-pop) {
  @apply w-80%  rounded-10px;
}
</style>

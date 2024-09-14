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
import userCoupon from './utils/userCoupon'
const { sendCouponList } = userCoupon()
const topbgBase64 = ref('')
const title = ref('领券中心')

const conponList = ref<conponListProps[]>([])
function toYouhuiquan() {
  routeTo({ url: '/pages-sub/marketManager/coupon/mycoupon' })
}
const paging = ref(null)
async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    const data: any = await sendCouponList(params)
    conponList.value = data.content
    conponList.value.forEach((item) => {
      item.couponStatus = 3
    })
    paging.value.complete(conponList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="conponList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="flex flex-col bg-no-repeat bg-#ffd7af h-100vh"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 290px`"
  >
    <!-- <view
    class="flex flex-col bg-no-repeat bg-#ffd7af h-100vh"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 290px`"
  > -->
    <template #top>
      <dy-navbar :leftTitle="title" left isNavShow></dy-navbar>

      <view class="mt-15px ml-40px">
        <wd-img :src="hubgtitle" width="196" height="73"></wd-img>
      </view>
      <view class="mt-15px ml-60px" @click="toYouhuiquan">
        <wd-img :src="myyhbtn" width="153" height="35"></wd-img>
      </view>
    </template>
    <view class="bg-#ffd7af rounded-20px overflow-hidden mt-20px" style="min-height: 10px">
      <view class="pt-10px px-10px">
        <view class="rounded-4px overflow-hidden" v-for="(item, index) in conponList" :key="index">
          <Coupon-List :data="item" @refresh="paging.reload()"></Coupon-List>
        </view>
      </view>
    </view>
  </z-paging>
  <!-- </view> -->
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
:deep(.zp-scroll-view-super) {
  margin-top: 15rpx;
}
</style>

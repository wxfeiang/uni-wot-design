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
import myyhbtn from '../static/images/coupon/lingqu.png'
import bg from '../static/images/coupon/myuhbg.png'
import hubgtitle from '../static/images/coupon/tomyh.png'
import CouponList from './compoents/couponList.vue'
import { conponListProps } from './utils/types'

const topbgBase64 = ref('')
const title = ref('我的优惠券')
const paging = ref(null)
const tab = ref(0)
const tablist = ref([
  {
    index: 0,
    title: '未使用',
  },
  {
    index: 1,
    title: '已使用',
  },
  {
    index: 2,
    title: '已过期',
  },
])
const changeTab = (e) => {
  tab.value = e.index
  paging.value.reload()
}

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
    couponStatus: 1, // 优惠券状态
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
    couponStatus: 2, // 优惠券状态
  },
])

function queryList(pageNo: number, pageSize: number) {
  const params = {
    number: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    // const data: any = await sendMessageList(params)
    // dataList.value = data.data.data.content
    paging.value.complete(conponList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
function toYouhuiquan() {
  routeTo({ url: '/pages-sub/marketManager/coupon/index' })
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
    class="flex flex-col bg-no-repeat h-100vh"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 222px`"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left isNavShow></dy-navbar>
      <view class="mt-20px flex justify-around items-center">
        <wd-img :src="hubgtitle" width="190" height="73"></wd-img>
        <view class="mt-20px" @click="toYouhuiquan">
          <wd-img :src="myyhbtn" width="138" height="35"></wd-img>
        </view>
      </view>
      <view class="bg-#C30000 mt-42px h-42px">
        <wd-tabs v-model="tab" @change="changeTab" custom-class="custom-class-tab">
          <block v-for="item in tablist" :key="item.index">
            <wd-tab :title="`${item.title}   (${item.index})`"></wd-tab>
          </block>
        </wd-tabs>
      </view>
    </template>
    <view class="mt-10px">
      <view class="pt-10px px-10px">
        <view
          class="rounded-4px overflow-hidden my-10px"
          v-for="(item, index) in conponList"
          :key="index"
        >
          <Coupon-List :data="item"></Coupon-List>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.custom-class-tab),
:deep(.custom-class-tab .wd-tabs__nav) {
  @apply bg-transparent!;
}
:deep(.custom-class-tab) {
  .wd-tabs__nav-item {
    @apply text-#D8B9B9;
  }
  .wd-tabs__nav-item.is-active {
    @apply color-#fff;
  }
  .wd-tabs__line {
    @apply top-0  w-33% bg-#fff h-1px;
  }
}
</style>

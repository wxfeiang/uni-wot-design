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
import useNav from '@/hooks/useNav'
import { pathToBase64 } from 'image-tools'
import jinbi from './static/images/jinbi.png'
import bg from './static/images/topbg.png'
const topbgBase64 = ref('')
const title = '积分'
const handleClickLeft = () => {
  uni.navigateBack()
}
const { navTop } = useNav()
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
const dataList = ref([
  {
    title: 1,
    value: 20,
  },
  {
    title: 2,
    value: 20,
  },
  {
    title: 3,
    value: 20,
  },
  {
    title: 4,
    value: 20,
  },
  {
    title: 5,
    value: 20,
  },
  {
    title: 6,
    value: 20,
  },
  {
    title: 7,
    value: 20,
  },
])
</script>

<template>
  <view
    class="h-482rpx bg-cover"
    :style="`padding-top:${navTop}px ;background-image: url(${topbgBase64})`"
  >
    <wd-navbar safeAreaInsetTop placeholder fixed custom-class="nav_bg" :bordered="false">
      <template #left>
        <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
      </template>
      <template #title>
        <text class="color-#fff">{{ title }}</text>
      </template>
    </wd-navbar>
    <view class="flex justify-between px-10px">
      <view class="flex justify-between flex-col">
        <view class="text-14px font-500 color-#fff">可用积分</view>
        <view class="text-28px font-500 color-#fff my-10px">989</view>
        <view class="text-13px font-500 color-#fff">
          累计获得积分
          <text>{{ '908' }}</text>
          ,已使用积分
          <text>{{ '908' }}</text>
        </view>
      </view>
      <view class="flex justify-between flex-col items-end">
        <view class="text-12px font-500 color-#fff">积分规则</view>
        <view class="text-12px font-500 color-#fff px-10px py-5px bg">积分明细</view>
      </view>
    </view>
  </view>
  <view class="px-10px mt-[-150rpx]">
    <view class="bg-#fff px-10px py-15px rounded-md">
      <view class="flex justify-between">
        <view class="text-14px">
          您已连续签到
          <text class="color-#ff4920 text-16px">{{ '5' }}</text>
          天
        </view>
        <view class="px-10px text-14px color-#fff bg-#FF7433 line-height-22px rounded-full">
          签到
        </view>
      </view>

      <view class="mt-10px">
        <view class="flex items-center gap-10px flex-wrap justify-between">
          <view
            class="bg-#fff3e9 text-center rounded-md p-10px w-1/6 flex flex-col justify-between h-140rpx"
            :class="index === dataList.length - 1 ? 'ml-auto w-2.55/6! text-left' : ''"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <view>
              第
              <text>{{ item.title }}</text>
              天
            </view>
            <view class="my-5px relative">
              <image
                v-if="index === dataList.length - 1"
                class="w-43px h-43px absolute right-0 top-[-30rpx]"
                :src="jinbi"
                mode="aspectFit"
              ></image>
              <image v-else class="w-23px h-23px" :src="jinbi" mode="aspectFit"></image>
            </view>
            <view class="color-#999">+{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<style>
page {
  background: #f5f5f5;
}
</style>

<style lang="scss" scoped>
:deep(.nav_bg) {
  @apply bg-transparent!;
}
.bg {
  background: #feb329;
  border: 0.9px solid rgba(255, 255, 255, 0.51);
  border-radius: 1000px;
}
</style>

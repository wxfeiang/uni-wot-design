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
import { routeTo } from '@/utils'
import { pathToBase64 } from 'image-tools'
import jinbi from './static/images/jinbi.png'
import jinb2 from './static/images/jinbi2.png'
import bg from './static/images/topbg.png'
const topbgBase64 = ref('')
const title = ref('积分')
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
const toMingxi = () => {
  routeTo({ url: '/pages-sub/integralManager/interList' })
}
const toAgreement = () => {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: '19aer903e4u90', showTop: true, title: '积分规则' },
  })
}
const tips = ref(false)
const qiandao = () => {
  tips.value = true
}

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
</script>

<template>
  <view class="h-482rpx bg-cover" :style="`background-image: url(${topbgBase64})`">
    <dy-navbar :leftTitle="title" center isNavShow></dy-navbar>
    <view class="flex justify-between mt-5px pl-25px pr-10px">
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
        <view class="text-12px font-500 color-#fff" @click="toAgreement">
          <wd-icon name="info-circle" size="14px"></wd-icon>
          积分规则
        </view>
        <view class="text-12px font-500 color-#fff px-10px py-5px bg" @click="toMingxi">
          积分明细
        </view>
      </view>
    </view>
  </view>
  <view class="px-10px mt-[-120rpx]">
    <view class="bg-#fff px-10px py-15px rounded-md">
      <view class="flex justify-between">
        <view class="text-14px">
          您已连续签到
          <text class="color-#ff4920 text-16px">{{ '5' }}</text>
          天
        </view>
        <view
          class="px-15px text-14px color-#fff bg-#FF7433 line-height-22px rounded-full"
          @click="qiandao"
        >
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
  <wd-popup v-model="tips" custom-class="custom-class-pop">
    <view>
      <view class="flex justify-center items-center bg2">
        <view>
          <wd-img :src="jinb2" width="52" height="52"></wd-img>
        </view>
        <view class="color-#fff text-18px font-semibold">签到赢积分</view>
      </view>
      <view class="flex flex-col justify-center items-center py-20px">
        <view class="color-#000 text-18px font-semibold mb-10px">签到成功，再接再厉</view>
        <view class="color-#666 text-14px">
          当前已连续签到
          <text class="color-#E95433">{{ '4' }}</text>
          天，积分
          <text class="color-#E95433">+ {{ '4' }}</text>
        </view>
      </view>
    </view>
  </wd-popup>
</template>
<style>
page {
  background: #f5f5f5;
}
</style>

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

<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>
<script lang="ts" setup>
import useInfo from './utils/useInfo'

import { routeTo } from '@/utils'
const anvter = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')
const { introduces, statistics, setInfo } = useInfo()

function login() {
  routeTo({ url: '/pages/login/index' })
}
</script>
<template>
  <view class="h-200px bg-blue-500"></view>
  <view class="mt-[-100px] bg-white p-20px shadow rounded-10px w-80% mx-auto">
    <view class="flex items-center gap-10px">
      <view>
        <wd-img :width="60" :height="60" :src="anvter" round />
      </view>
      <view @click="login">
        <view class="font-bold">马上登录</view>
        <view class="text-gray-400 font-size-12px mt-5px">考试 ,练习 ,一应俱全</view>
      </view>
    </view>

    <view class="flex gap-10px mt-20px">
      <template v-for="(item, index) in introduces" :key="index">
        <view class="flex-1 px-6px py-10px bg-amber-100 rounded-5px">
          <view class="font-bold font-size-14px">{{ item.name }}</view>
          <view class="flex justify-between text-gray-400 font-size-12px mt-10px">
            {{ item.desc }}
            <wd-icon :name="item.icon" />
          </view>
        </view>
      </template>
    </view>
  </view>
  <view class="flex gap-10px p-5px mt-10px">
    <template v-for="(item, index) in statistics" :key="index">
      <view class="flex-1 p-10px text-center">
        <view class="font-bold line-height-20px font-size-18px">{{ item.num }}</view>
        <view class="font-size-12px line-height-20px">{{ item.name }}</view>
        <view class="font-size-12px">
          {{ item.desc }}
          <text class="color-sky">{{ item.reight }}</text>
        </view>
      </view>
    </template>
  </view>
  <wd-gap bg-color="#F3F7F8"></wd-gap>

  <wd-cell-group border>
    <template v-for="(item, index) in setInfo" :key="index">
      <wd-cell :title="item.name" is-link :icon="item.icon" />
    </template>
  </wd-cell-group>
</template>

<style lang="scss" scoped></style>

<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useTravel from './utils/useTravel'

import { useBaseStore } from '@/store'
import { getLocation, useToLocation } from '@/utils/uniapi'
import dizhi from '../static/images/travel/dzl.png'

const baseStore = useBaseStore()
const { list } = useTravel()
const index = ref(0)
const data = ref<any>()
onLoad((options) => {
  index.value = Number(options.index)
  data.value = list.content[index.value]
})
const location = async () => {
  try {
    const location = await getLocation()
    await baseStore.setLocation(location)
  } catch (error) {
    console.log('🥜[error]:', error)
    // uni.showToast({ title: '定位失败', icon: 'none' })
  }
}
onMounted(async () => {
  location()
})
</script>

<template>
  <dy-content customClass="z-paging-content" customClassCenter="customClassCenter">
    <template #top>
      <dy-navbar leftTitle="详情" left isNavShow color="#000" :placeholder="false"></dy-navbar>
      <wd-swiper
        :list="data.imgArr"
        :autoplay="true"
        :current="0"
        :height="300"
        custom-indicator-class="custom-indicator-class"
        customClass="custom-class-swiper"
        imageMode="scaleToFill"
        indicatorPosition="bottom-right"
      ></wd-swiper>
    </template>
    <view class="bg-#fff rounded-t-10px relative z-index-99 p-20px">
      <view>
        <view class="flex justify-between items-center">
          <view class="text-20px font-600">{{ data.name }}</view>
          <view class="text-14px color-#F44D24" v-if="data.level">{{ data.level }} 景区</view>
        </view>
        <view class="flex justify-between items-center my-10px">
          <view class="text-14px color-#999 line-height-20px mt-5px">
            <view class="">地址: {{ data.address }}</view>
            <view>距您: {{ data.distance }}km</view>
          </view>
          <view @click="useToLocation(data)">
            <wd-img :src="dizhi" width="16" height="18"></wd-img>
          </view>
        </view>
        <view class="text-14px color-#333">开放时间</view>
        <view class="text-14px color-#999 mt-10px">
          <view>冬季：{{ data.kTime }}</view>
        </view>
        <view class="bb-1px_#ECECEC_dashed my-20px"></view>
      </view>
      <view>
        <view class="text-16px font-600">景区简介</view>
        <view class="line-height-24px mt-10px color-#333">
          {{ data.description }}
        </view>
      </view>
    </view>
  </dy-content>
</template>

<style lang="scss" scoped>
:deep(.z-paging-content) {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 40%, #f2f3f7 100%) !important;
}

:deep(.custom-class-swiper) {
  @apply rounded-0!;
}
:deep(.wd-swiper__track) {
  @apply rounded-0!;
}
:deep(.customClassCenter) {
  @apply mt-[-10px] !;
}
</style>

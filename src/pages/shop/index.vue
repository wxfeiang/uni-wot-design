<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '商城',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/index/indexbg.png'
import { pathToBase64 } from 'image-tools'

defineOptions({
  name: 'Index',
})

const { VITE_APP_LOGOTITLE } = import.meta.env
const topbgBase64 = ref('')
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(indexbg)
})

// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
</script>
<template>
  <view
    class="box-border h-310px relative bg-no-repeat bg-cover"
    :style="` background-image: url(${topbgBase64});background-size: 100% 99%`"
  >
    <wd-navbar safeAreaInsetTop placeholder fixed custom-class="nav_custom" :bordered="false">
      <template #left>
        <view class="flex gap-10px items-center">
          <text class="line-height-44px text-18px color-#fff mt-5px">{{ VITE_APP_LOGOTITLE }}</text>
        </view>
      </template>
    </wd-navbar>

    <wd-sticky :offset-top="navTop">
      <view class="w-100vw flex items-center justify-between gap-2px box-border">
        <view class="flex-1 px-10px flex justify-between">
          <view
            class="flex justify-between w-70vw items-center serch-bg px-10px py-10px color-#fff opacity-65"
          >
            <wd-icon name="search" size="16px"></wd-icon>
            <view class="text-left text-16px flex-1 px-10px">请输入搜索关键词</view>
            <view class="text-14px relative search-type">搜索</view>
          </view>
          <view>
            <wd-button type="icon" icon="cart"></wd-button>
          </view>
        </view>
      </view>
    </wd-sticky>

    <wd-tabs
      v-model="tab"
      animated
      :slidable-num="6"
      :map-num="15"
      custom-class="shopNav"
      color="#fff"
      inactive-color="#fff"
    >
      <block v-for="item in 6" :key="item">
        <wd-tab :title="`标签${item}`"></wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<style>
.main-title-color {
  color: #d14328;
}

:deep(.nav_custom) {
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent !important;
}

.shopNav {
  position: absolute !important;
  bottom: 0px;
  background: transparent !important;
}

:deep(.wd-tabs__nav) {
  color: #fff;
  background: transparent !important;
}
/*:deep(.wd-tabs__nav-item) {*/
/*  color: #fff;*/
/*}*/
</style>

<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="p-6 text-center">
    <view class="my-2">使用的是 laf 云后台</view>
    <view class="text-green-400">我的推荐码，可以获得佣金</view>

    <!-- #ifdef H5 -->
    <view class="my-2">
      <a class="my-2" :href="recommendUrl" target="_blank">{{ recommendUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">{{ recommendUrl }}</view>
    <!-- #endif -->

    <!-- http://localhost:9000/#/pages/index/request -->
    <wd-button @click="send" class="my-6">发送请求</wd-button>
  </view>
</template>

<script lang="ts" setup>
const { codeImg, getCodeUrl } = useVerify()
const recommendUrl = 'http://localhost:9000/#/pages/index/request'
const send = () => {
  console.log('🍅')
  getCodeUrl()
}
</script>

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
import useWebview from './hooks/useWebview'
const { content, AarData, articleTitle, createTime } = useWebview()
const types = ref(null)
function handleClickLeft() {
  uni.navigateBack()
}

onLoad((options) => {
  console.log('🍬[options]:', options)
  types.value = options.type
  AarData(types.value)
})
</script>

<template>
  <view class="">
    <wd-navbar safeAreaInsetTop placeholder fixed custom-class="nav_bg" :bordered="false">
      <template #left>
        <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
      </template>
      <template #title>
        <text class="color-#fff">详情</text>
      </template>
    </wd-navbar>
    <view class="mt-20px">
      <view class="text-center line-height-30px">{{ articleTitle }}</view>
      <view class="text-center flex justify-center gap-20px mt-10px">
        <view class="text-center color-#999 font-size-12px line-height-20px">
          {{ createTime }}
        </view>
        <view class="text-center color-#999 font-size-12px line-height-20px">
          {{ createTime }}
        </view>
      </view>
    </view>
    <view class="p-20px">
      <dy-richtext :html="content"></dy-richtext>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.nav_bg) {
  background-color: var(--color-nav-bg);
  .wd-navbar__title {
    color: var(--color-nav-text);
  }
  .wd-navbar__left {
    color: var(--color-nav-text);
  }
}
</style>

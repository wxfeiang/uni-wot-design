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
console.log('🥠')
const value = ref('')
function handleClickLeft() {
  uni.navigateBack()
}
</script>

<template>
  <wd-navbar safeAreaInsetTop placeholder fixed custom-class="nav_bg" :bordered="false">
    <template #left>
      <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
    </template>
    <template #title>
      <text class="color-#fff">设置</text>
    </template>
  </wd-navbar>
  <view class="py-20px px-10px">
    <view class="bg-#fff">
      <wd-radio-group v-model="value" shape="dot" cell>
        <wd-radio value="30">30天免登录</wd-radio>
        <wd-radio value="7">7天免登录</wd-radio>
        <wd-radio value="3">3天免登录</wd-radio>
      </wd-radio-group>
    </view>

    <view class="p-10px mt-20px">
      <wd-button block>修改</wd-button>
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
  background-color: var(--color-nav-bg);
  .wd-navbar__title {
    color: var(--color-nav-text);
  }
  .wd-navbar__left {
    color: var(--color-nav-text);
  }
}
</style>

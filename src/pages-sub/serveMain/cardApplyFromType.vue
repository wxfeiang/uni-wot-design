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
import CardApplyFrom from './components/cardApplyFrom.vue'
import CardBhkFrom from './components/cardBhkFrom.vue'

const navTitle = ref('')
function handleClickLeft() {
  uni.navigateBack()
}
const baseCon = ref('')
onLoad((options) => {
  console.log('🌯=======>>>>[options]:', options)
  baseCon.value = options.base
  navTitle.value = decodeURIComponent(options.title)
})
</script>

<template>
  <view class="h-100vh bg-#f5f5f5">
    <wd-navbar
      safeAreaInsetTop
      rightDisabled
      placeholder
      leftArrow
      fixed
      :bordered="false"
      :title="navTitle"
      custom-class="nav_bg"
    >
      <template #left>
        <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
      </template>
    </wd-navbar>
    <!-- 社保卡申领 -->
    <Card-ApplyFrom v-if="baseCon === 'shebaoksl'" />
    <!-- 补卡换卡 -->
    <Card-BhkFrom v-if="baseCon === 'shebaokbh'" />
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
:deep(.custom-title) {
  @apply px-20px! pt-20px!;
}
</style>

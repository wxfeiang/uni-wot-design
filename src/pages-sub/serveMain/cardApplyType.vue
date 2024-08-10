<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import CardApply from './components/CardApply.vue'
const navTitle = ref('')

onMounted(() => {
  navTitle.value = '申请须知'
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
    ></wd-navbar>

    <!-- 动态加载类型对应的组件 -->
    <!-- CardProgressInquiry 卡进度查询-->
    <Card-Apply />
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

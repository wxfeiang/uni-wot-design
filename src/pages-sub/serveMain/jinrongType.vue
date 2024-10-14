<route lang="json5" type="page">
{
  layout: 'default',
  realNameAuthentication: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import CardJRchaoshi from '@/pages-sub/serveMain/components/CardJRchaoshi.vue'

const navTitle = ref('')

const baseCon = ref('')

onLoad((options: any) => {
  console.log('🌯[options]:', options)
  baseCon.value = options.base
  navTitle.value = decodeURIComponent(options.title)
})
</script>

<template>
  <view class="h-100vh bg-#f5f5f5">
    <dy-navbar :leftTitle="navTitle" center customClass="nav_bg"></dy-navbar>
    <!--    <dy-title :title="navTitle" customClass="custom-title"></dy-title>-->
    <!-- 动态加载类型对应的组件 -->
    <!--  金融超市-->
    <Card-JRchaoshi v-if="baseCon === 'JRchaoshi'" />
  </view>
</template>

<style lang="scss" scoped>
:deep(.custom-title) {
  @apply px-20px! pt-20px!;
}
</style>

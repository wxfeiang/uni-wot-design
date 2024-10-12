<route lang="json5" type="page">
{
  layout: 'default',
  // needLogin: true,
  realNameAuthentication: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import CardApply from './components/CardApply.vue'
import CardBhk from './components/CardBhk.vue'
import CardJuvenApply from './components/CardJuvenApply.vue'

const navTitle = ref('')
const baseCon = ref('')
onLoad((options: any) => {
  console.log('🌯=======[options]:', options)
  baseCon.value = options.base
  navTitle.value = decodeURIComponent(options.title)
})
</script>

<template>
  <view class="h-100vh">
    <dy-navbar :leftTitle="navTitle" center customClass="nav_bg"></dy-navbar>

    <Card-Apply v-if="baseCon === 'shebaoksl'" />
    <!-- 补卡换卡 -->
    <Card-Bhk v-if="baseCon === 'shebaokbh'" />
    <!-- 未成年人申领 -->
    <Card-Juven-Apply v-if="baseCon === 'xinshenersl'" />
  </view>
</template>

<style lang="scss" scoped></style>

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
import CardApplyFrom from './components/cardApplyFrom.vue'
import CardBhkFrom from './components/cardBhkFrom.vue'
import CardJuven from './components/CardJuven.vue'

const navTitle = ref('')
const baseCon = ref('')
onLoad((options) => {
  console.log('🌯=======>>>>[options]:', options)
  baseCon.value = options.base
  navTitle.value = decodeURIComponent(options.title)
})
</script>

<template>
  <view class="h-100vh">
    <dy-navbar :leftTitle="navTitle" center customClass="nav_bg"></dy-navbar>
    <!-- 社保卡申领 -->
    <Card-ApplyFrom v-if="baseCon === 'shebaoksl'" />
    <!-- 补卡换卡 -->
    <Card-BhkFrom v-if="baseCon === 'shebaokbh'" />
    <!--未成年人申领 -->
    <Card-Juven v-if="baseCon === 'xinshenersl'" />
  </view>
</template>

<style lang="scss" scoped></style>

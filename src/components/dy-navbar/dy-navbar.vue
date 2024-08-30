<script setup lang="ts">
const props = defineProps({
  leftTitle: {
    type: [String, Number],
  },
})
function handleClickLeft() {
  uni.navigateBack()
}
</script>
<template>
  <view class="">
    <wd-navbar safeAreaInsetTop placeholder fixed :bordered="false">
      <template #left>
        <wd-icon @click="handleClickLeft" name="arrow-left" size="22px"></wd-icon>
        <view class="ml-5px truncate-1">{{ props.leftTitle }}</view>
      </template>
    </wd-navbar>
  </view>
</template>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>

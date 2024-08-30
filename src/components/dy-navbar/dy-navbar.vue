<script setup lang="ts">
const props = defineProps({
  leftTitle: {
    type: [String, Number],
  },
  left: {
    type: Boolean,
    default: false,
  },
})
function handleClickLeft() {
  uni.navigateBack()
}
</script>
<template>
  <view class="">
    <!-- dy 完全居左 -->
    <wd-navbar
      safeAreaInsetTop
      placeholder
      fixed
      :bordered="false"
      custom-class="custom-class-nav-left"
      v-if="props.left"
    >
      <template #left>
        <wd-icon @click="handleClickLeft" name="arrow-left" size="22px"></wd-icon>
      </template>
      <template #title>
        <view class="flex items-center" @click="handleClickLeft">
          <view class="ml-5px truncate-1 text-left font-400">
            {{ props.leftTitle }}
          </view>
        </view>
      </template>
    </wd-navbar>
  </view>
</template>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
:deep(.custom-class-nav-left) {
  .wd-navbar__content {
    @apply flex! items-center! justify-between! gap-10px!;
    .wd-navbar__title {
      @apply flex-1! flex! max-w-85%!;
    }
  }
}
</style>

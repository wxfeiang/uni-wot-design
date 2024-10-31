<script lang="ts" setup>
const props = defineProps({
  customStyle: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '',
  },
  customClassCenter: {
    type: String,
    default: '',
  },
  customstyleCenter: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <view
    class="h-100vh w-100% flex flex-col"
    :custom-style="props.customStyle"
    :class="props.customClass"
  >
    <slot name="top"></slot>
    <view class="flex-1" :class="props.customClassCenter" :style="`${props.customstyleCenter}`">
      <scroll-view scroll-y="true" class="scroll-Y">
        <slot></slot>
      </scroll-view>
    </view>

    <slot name="bottom"></slot>
  </view>
</template>

<style lang="scss" scoped>
.scroll-Y {
  position: relative;
}
</style>

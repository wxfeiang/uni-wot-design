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
})
</script>

<template>
  <view
    class="h-100vh w-100% flex flex-col"
    :custom-style="props.customStyle"
    :class="props.customClass"
  >
    <slot name="top"></slot>
    <scroll-view scroll-y="true" class="scroll-Y">
      <slot></slot>
    </scroll-view>
    <slot name="bottom"></slot>
  </view>
</template>

<style lang="scss" scoped>
.scroll-Y {
  position: relative;
  flex: 1;
}
</style>

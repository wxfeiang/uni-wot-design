<script lang="ts" setup>
//
const props = defineProps({
  title: {
    type: [String, Number],
  },
  border: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <view class="flex">
    <view v-if="props.border" class="w-2px h-20px mr-10px bg-blue"></view>
    <view class="font-bold">{{ props.title }}</view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

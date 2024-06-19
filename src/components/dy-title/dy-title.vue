<script lang="ts" setup>
//
const props = defineProps({
  title: {
    type: [String, Number],
  },
})
</script>

<template>
  <view class="flex">
    <view class="w-2px h-20px mr-10px bg-blue"></view>
    <view class="font-bold">{{ props.title }}</view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

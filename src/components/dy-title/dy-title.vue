<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'moreClick', value: any): void
}>()

const props = defineProps({
  title: {
    type: [String, Number],
  },
  border: {
    type: Boolean,
    default: false,
  },
  more: {
    type: Boolean,
    default: false,
  },
})
const toMore = () => {
  emit('moreClick', '')
}
</script>

<template>
  <view class="flex items-center">
    <view v-if="props.border" class="w-2px h-20px mr-10px bg-blue"></view>
    <view class="font-bold">{{ props.title }}</view>
    <view v-if="props.more" class="ml-auto text-blueGray text-12px" @click.stop="toMore">
      更多
      <wd-icon name="arrow-right" size="14px"></wd-icon>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

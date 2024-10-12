<script lang="ts" setup>
import { changeDict, removeT } from '@/utils'
import useSuggest from '../utils/useSuggest'
const { statusList } = useSuggest()

defineOptions({
  name: 'sugItem',
})
const emit = defineEmits<{
  (e: 'deitl', value: any): void
}>()

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => [],
  },
  status: {
    type: Boolean,
    default: false,
  },
  statusBg: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <wd-cell-group>
    <wd-cell
      v-for="(item, index) in props.dataList"
      :key="index"
      title-width="80%"
      clickable
      custom-class="custom-class-cell"
      @click="emit('deitl', item)"
    >
      <template #title>
        <view class="truncate-1 text-16px font-600">
          反馈类型: {{ changeDict(statusList, item.adviceType) }}
        </view>
      </template>
      <template #label>
        <view class="flex gap-20px color-#888 text-14px">
          <view>{{ removeT(item.createTime) }}</view>
        </view>
      </template>
      <view class="flex">
        <view class="relative w-60px h-50px">
          <view
            class="absolute top-[-10px] right-0 px-10px py-2px text-12px rounded-lb-15px"
            :style="changeDict(statusList, item.type, 'bg')"
          >
            {{ changeDict(statusList, item.type) }}
          </view>
        </view>
      </view>
    </wd-cell>
  </wd-cell-group>
</template>

<style lang="scss" scoped>
:deep(.wd-cell-group),
:deep(.wd-cell-group__body) {
  @apply bg-transparent!;
}
:deep(.custom-class-cell) {
  @apply rounded-6px mb-10px overflow-hidden;
}
:deep(.wd-cell__wrapper) {
  @apply items-center!;
}
</style>

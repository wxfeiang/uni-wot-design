<script lang="ts" setup>
import { changeDict, removeT } from '@/utils'
import useSuggest from '../utils/useSuggest'
const { statusList, adviceType } = useSuggest()

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
const defaultAttrs = {
  disabled: true,
}
</script>

<template>
  <view>
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
            反馈类型: {{ changeDict(adviceType, item.adviceType) }}
          </view>
        </template>
        <template #label>
          <view class="flex gap-20px color-#888 text-14px" v-if="!props.status">
            <view>{{ removeT(item.createTime) }}</view>
          </view>
          <view class="flex gap-20px color-#888 text-14px" v-else>
            联系电话: {{ item.advicePhone }}
          </view>
        </template>
        <view class="flex">
          <view class="relative w-60px h-50px">
            <view
              class="absolute top-[-10px] right-[-6px] px-10px py-2px text-12px rounded-lb-15px"
              :style="changeDict(statusList, item.adviceState, 'bg')"
            >
              {{ changeDict(statusList, item.adviceState) }}
            </view>
          </view>
        </view>
      </wd-cell>
    </wd-cell-group>
    <view v-if="props.status" class="bg-#fff rounded-6px overflow-hidden p-10px mt-10px">
      <view class="flex justify-between items-center py-10px">
        <text class="font-600 text-14px">反馈内容</text>
        <text class="color-#999 text-14px">{{ removeT(props.dataList[0]!.createTime) }}</text>
      </view>
      <view class="mt-10px">
        <wd-text
          color="#777777"
          lineHeight="26px"
          :text="props.dataList[0]!.adviceContent"
        ></wd-text>
      </view>
      <view class="mt-20px" v-if="props.dataList[0]!.adviceImg">
        <dy-upload v-model="props.dataList[0]!.adviceImg" disabled></dy-upload>
      </view>
    </view>
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
:deep(.wd-cell-group),
:deep(.wd-cell-group__body) {
  @apply bg-transparent!;
}
:deep(.custom-class-cell) {
  @apply rounded-6px! mb-10px! overflow-hidden!;
}
:deep(.wd-cell__wrapper) {
  @apply items-center! overflow-hidden!;
}
.custom-class-cell {
  @apply rounded-6px! mb-10px! overflow-hidden!;
}
</style>

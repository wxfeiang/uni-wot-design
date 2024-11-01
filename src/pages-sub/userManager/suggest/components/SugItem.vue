<script lang="ts" setup>
import { changeDict, removeT } from '@/utils'
import { detilProp } from '../utils/types'
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
    type: Object as PropType<detilProp[]>,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  statusBg: {
    type: Boolean,
    default: true,
  },
  objData: {
    type: Object as PropType<detilProp>,
    default: () => ({}),
  },
})
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
    <template v-if="props.status">
      <view class="bg-#fff rounded-6px overflow-hidden p-10px mt-10px">
        <view class="flex justify-between items-center py-10px">
          <text class="font-600 text-14px">反馈内容</text>
          <text class="color-#999 text-14px">{{ removeT(props.objData!.createTime) }}</text>
        </view>
        <view class="mt-10px">
          <wd-text color="#777777" lineHeight="26px" :text="props.objData!.adviceContent"></wd-text>
        </view>
        <view class="mt-20px" v-if="props.objData!.adviceImg">
          <dy-upload v-model="props.objData!.adviceImg" disabled></dy-upload>
        </view>
      </view>
      <view
        class="bg-#fff rounded-6px overflow-hidden p-10px mt-10px"
        v-if="props.objData!.replyContent"
      >
        <view class="flex justify-between items-center py-10px">
          <text class="font-600 text-14px">平台回复</text>
        </view>
        <view class="mt-10px">
          <wd-text color="#777777" lineHeight="26px" :text="props.objData!.replyContent"></wd-text>
        </view>
        <view class="mt-20px" v-if="props.objData!.replyImg">
          <dy-upload v-model="props.objData!.replyImg" disabled></dy-upload>
        </view>
      </view>
    </template>
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

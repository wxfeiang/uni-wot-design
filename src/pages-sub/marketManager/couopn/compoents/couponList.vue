<script lang="ts" setup>
import { pathToBase64 } from 'image-tools'
import bg from '../../static/images/items.png'
import { conponListProps } from '../utils/types'
const emit = defineEmits<{
  (e: 'moreClick', value: any): void
}>()

const props = defineProps({
  data: {
    type: Object as PropType<conponListProps>,
    default: () => ({}),
  },
})
const toMore = () => {
  emit('moreClick', '')
}

const topbgBase64 = ref('')
const value = ref<string[]>(['item1'])
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
</script>

<template>
  <view
    class="bg-no-repeat h-120px relative pl-24px pr-10px py-20px box-border rounded-t-10px overflow-hidden"
    :style="`background-image: url(${topbgBase64});background-size:100% 100%`"
  >
    <view class="flex justify-between items-center h-100%">
      <view class="flex flex-col justify-between h-100%">
        <view class="color-#fff text-22px">{{ props.data.couponTypeName }}</view>
        <view class="color-#FFC4A6 text-12px">有效期: {{ props.data.couponTime }}</view>
        <view class="flex justify-between items-center">
          <view class="px-15px py-2px rounded-100 bd-1px_#fff color-#fff text-12px">领取</view>
          <view class="color-#FFF6DA text-12px flex items-center" @click="toMore">
            查看使用说明
            <wd-icon name="fill-arrow-down" color="#fff" size="16px"></wd-icon>
          </view>
        </view>
      </view>
      <view class="flex flex-col justify-around pt-15px items-end gap-10px">
        <view class="text-32px color-#FF4345">
          <text>¥</text>
          <text>{{ props.data.couponAmount }}</text>
        </view>
        <view class="text-12px color-#666">
          {{ props.data.couponLimit }}
        </view>
      </view>
    </view>
    <view
      class="absolute top-10px right-0 px-15px py-2px rounded-bl-22px rounded-tr-4px bg-#F71603 color-#fff text-12px"
    >
      {{ props.data.couponAmountTypeName }}
    </view>

    <!-- <view class="flex justify-between items-center">
      <view>
        <view class="color-#fff text-22px">{{ props.data.couponTypeName }}</view>
        <view class="color-#FFC4A6 text-12px">有效期: {{ props.data.couponTime }}</view>
        <view class="flex justify-between items-center">
          <view>领取</view>
          <view>查看使用说明</view>
        </view>
      </view>
      <view>sdsd</view>
    </view> -->
  </view>
</template>

<style lang="scss" scoped>
.border {
  border-radius: 0 0 50% 50% / 20%;
}
:deep(.custom-class-coll) {
  @apply bg-transparent!;
}
</style>

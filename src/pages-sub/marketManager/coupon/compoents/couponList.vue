<script lang="ts" setup>
import { pathToBase64 } from 'image-tools'
import ybg from '../../static/images/coupon/items.png'
import status1 from '../../static/images/coupon/status1.png'
import status2 from '../../static/images/coupon/status2.png'

import { conponListProps } from '../utils/types'

defineOptions({
  name: 'couponList',
})
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

const open = ref(false)
const showDetil = () => {
  open.value = !open.value
}

const statusCoupopnList = ref([
  {
    statsSrc: '',
    btnText: '去使用',
    btnShow: true,
  },
  {
    statsSrc: status1,
    btnText: '已使用',
    btnShow: false,
  },
  {
    statsSrc: status2,
    btnText: '已过期',
    btnShow: false,
  },
  {
    statsSrc: '',
    btnText: '领取',
    btnShow: true,
  },
])
// 券3种状态
const statusCoupopn = computed(() => {
  return statusCoupopnList.value[props.data.couponStatus ?? 3]
})
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(ybg)
  console.log('🍜[topbgBase64.value]:', topbgBase64.value)
})
//
</script>

<template>
  <view
    :style="`background-image: url(${topbgBase64});background-size: 100% 120px`"
    class="bg-no-repeat min-h-120px relative pl-24px pr-10px py-20px box-border rounded-t-10px ml-[-5px]"
    :class="!props.data.couponStatus ? '' : 'grayscale opacity-50'"
  >
    <view class="flex justify-between items-center">
      <view class="flex flex-col justify-between">
        <view class="color-#fff text-22px">{{ props.data.couponTypeName }}</view>
        <view class="color-#FFC4A6 text-12px">有效期: {{ props.data.couponTime }}</view>
        <view class="flex justify-between items-center mt-10px">
          <view
            class="px-15px py-2px rounded-100 bd-1px_#fff color-#fff text-12px"
            v-if="statusCoupopn.btnShow"
          >
            {{ statusCoupopn.btnText }}
          </view>
          <view class="color-#FFF6DA text-12px flex items-center" @click="showDetil">
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
    <view class="absolute top-30px right-25% z-99">
      <wd-img :src="statusCoupopn.statsSrc" :width="66" :height="66" />
    </view>
    <!-- 详情显示 -->
    <view :class="open ? 'block' : 'hidden'">
      <view class="p-10px ml-[-5px] mt-16px bg-#FFE1C2 color-#6D341C text-12px line-height-20px">
        <view>领取时间: {{ props.data.couponTime }}</view>
        <view>有效期: {{ props.data.couponTime }}</view>
        <view>优惠内容: {{ props.data.couponConternt }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

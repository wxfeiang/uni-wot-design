<script lang="ts" setup>
import { RankList, hostoryList, rankType } from '../types/types'

const props = defineProps({
  Hlist: {
    type: Object as PropType<hostoryList[]>,
  },
  Rlist: {
    type: Object as PropType<RankList[]>,
  },
  type: {
    type: Number as PropType<rankType>,
    required: true,
  },
})
</script>

<template>
  <template v-if="props.type == rankType.History">
    <view
      class="flex items-center justify-around px-20px py-10px bb-1px_solid_#f5f5f5"
      v-for="(item, index) in props.Hlist"
      :key="index"
    >
      <view class="w-120px color-red font-size-18px font-bold">{{ item.score }} 分</view>
      <view class="color-#999999">{{ item.time }}</view>
      <view class="flex-1 text-right">
        <view class="line-height-24px color-#666">{{ item.label }}</view>
        <view class="line-height-24px color-coolGray">{{ item.date }}</view>
      </view>
    </view>
    <wd-status-tip image="search" tip="还没有考试记录哦" v-if="props.Hlist.length === 0" />
  </template>
  <template v-if="props.type == rankType.Rank">
    <view
      class="flex items-center justify-around px-20px py-10px bb-1px_solid_#f5f5f5"
      v-for="(item, index) in props.Rlist"
      :key="index"
    >
      <template v-if="item.rank < 4">
        <view class="relative px-10px mr-5px">
          <view class="absolute top-[-19px] left-0 z-0">
            <i class="iconfont dy-icon-paihangbang text-30px"></i>
          </view>
          <view class="absolute top-[-6px] left-3 z-0 font-size-12px color-#fff">
            {{ item.rank }}
          </view>
        </view>
      </template>
      <template v-else>
        <view class="relative px-10px mr-5px">
          <view class="absolute top-[-6px] left-3 z-0 color-#666">
            {{ item.rank }}
          </view>
        </view>
      </template>

      <view class="mx-20px">
        <wd-img :width="40" :height="40" :src="item.avatar" round />
      </view>
      <view class="flex-1 text-left">
        <view class="color-#333 line-height-26px">{{ item.name }}</view>
        <view class="color-#999 line-height-26px">{{ item.score }}</view>
      </view>

      <view
        class="text-right line-height-24px color-coolGray"
        :class="item.rank < 4 ? 'color-red' : 'color-blue'"
      >
        {{ item.time }}
      </view>
    </view>
    <wd-status-tip image="search" tip="还没有排行记录哦" v-if="props.Rlist.length === 0" />
  </template>
</template>
<style lang="scss" scoped>
//
</style>

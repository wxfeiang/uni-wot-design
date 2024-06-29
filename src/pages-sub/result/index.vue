<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
const { isLogined, userInfo } = useUserStore()
const current = ref<number>(20)
function handleClickLeft() {
  routeTo({
    url: '/pages/index/index',
    navType: NAVIGATE_TYPE.SWITCH_TAB,
  })
}
function handleClickRight(e) {
  routeTo({
    url: '/pages-sub/examination/index',
    data: { cMode: e },
    navType: NAVIGATE_TYPE.REDIRECT_TO,
  })
}
</script>

<template>
  <wd-navbar
    fixed
    left-arrow
    :bordered="false"
    safeAreaInsetTop
    custom-style="background-color: transparent !important; color: #f5f5f5 !important;"
    @click-left="handleClickLeft"
  >
    <template #left>
      <view class="flex items-center">
        <wd-icon name="arrow-left" size="16px"></wd-icon>
        <view class="ml-10px font-size-14px">首页</view>
      </view>
    </template>
  </wd-navbar>

  <view class="h-250px box-border pt-15 px-5 top">
    <view class="flex justify-center">
      <wd-circle v-model="current" :strokeWidth="15" :size="120" color="#1C6" layer-color="#e08e8e">
        <view class="text-14px text-white">不合格</view>
        <view class="text-40px text-white">20</view>
      </wd-circle>
    </view>
    <view class="flex items-center mt-3">
      <wd-img
        :width="50"
        :height="50"
        :src="isLogined ? userInfo.avatar : 'dd'"
        round
        class="bg-coolGray"
      />

      <view class="ml-10px">
        <view class="font-size-10px text-#f5f5f5">获得称号</view>
        <view class="font-size-16px text-white">马鹿杀手</view>
      </view>
    </view>
  </view>

  <view class="px-20px py-10px my-20px">
    <view
      @click="handleClickRight(1)"
      class="flex justify-between gap-5 items-center mb-5 px-20px py-10px shadow-lg bd-1px_solid_#f5f5f5"
    >
      <view class="text-#1890ff">
        <wd-icon name="layers" size="22px"></wd-icon>
      </view>
      <view>
        <view>本次错题</view>
        <view class="text-#999 font-size-12px mt-5px">练习本次错题</view>
      </view>
      <view class="flex-1 text-right">
        <wd-button type="text">
          <text class="text-#333 font-size-12px">
            <wd-icon name="arrow-right" size="16px"></wd-icon>
          </text>
        </wd-button>
      </view>
    </view>
    <view
      @click="handleClickRight(1)"
      class="flex justify-between gap-5 items-center mb-5 px-20px py-10px shadow-lg bd-1px_solid_#f5f5f5"
    >
      <view class="text-#1890ff">
        <wd-icon name="layers" size="22px"></wd-icon>
      </view>
      <view>
        <view>回顾试卷</view>
        <view class="text-#999 font-size-12px mt-5px">查看本次考试情况</view>
      </view>
      <view class="flex-1 text-right">
        <wd-button type="text">
          <text class="text-#333 font-size-12px">
            <wd-icon name="arrow-right" size="16px"></wd-icon>
          </text>
        </wd-button>
      </view>
    </view>
    <view
      @click="handleClickRight(0)"
      class="flex justify-between gap-5 items-center mb-5 px-20px py-10px shadow-lg bd-1px_solid_#f5f5f5"
    >
      <view class="text-#1890ff">
        <wd-icon name="layers" size="22px"></wd-icon>
      </view>
      <view>
        <view>重新考试</view>
        <view class="text-#999 font-size-12px mt-5px">成绩不满意,再来一次</view>
      </view>
      <view class="flex-1 text-right">
        <wd-button type="text">
          <text class="text-#333 font-size-12px">
            <wd-icon name="arrow-right" size="16px"></wd-icon>
          </text>
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
.top {
  background-image: linear-gradient(to bottom, rgb(235, 26, 22), rgb(247, 119, 110));
}
</style>

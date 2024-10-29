<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
const title = ref('乘车记录详情')
</script>

<template>
  <view class="dy-blue-bg">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>

    <view class="">
      <view class="px-15px">
        <view class="my-10px p-15px bg-#fff rounded-6px">
          <view>
            <view class="flex justify-center items-center">
              <view class="flex items-center">
                <!-- <wd-ing></wd-ing> -->
                <view>公交</view>
              </view>
            </view>
            <view class="my-15px flex flex-col items-center">
              <view class="text-44px font-600 color-#000 py-5px">-150.0</view>
              <view class="text-16px color-#999 py-3px mt-10px">已扣款</view>
            </view>
          </view>
        </view>
      </view>
      <view class="px-15px">
        <view class="my-10px p-15px bg-#fff rounded-6px">
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易卡号:</view>
            <view class="color-#000 text-14px">
              {{ 777 }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易时间:</view>
            <view class="color-#000 text-14px">
              {{ 777 }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易类型:</view>
            <view class="color-#000 text-14px">
              {{ 777 }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易流水号:</view>
            <view class="color-#000 text-14px">¥{{ 777 }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.custom-cell-picker) {
  @apply bg-#fff;

  .wd-picker__arrow {
    @apply hidden !;
  }
}

:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}
</style>

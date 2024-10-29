<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import bus from '@/static/images/transit/bus.png'
const title = ref('乘车记录详情')
</script>

<template>
  <view class="dy-blue-bg">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>

    <view class="">
      <view class="px-15px">
        <view class="my-10px p-15px bg-#fff rounded-6px">
          <view class="flex justify-between items-center mb-14px border-box">
            <view class="flex justify-between items-center">
              <wd-img :src="bus" :width="22" :height="22"></wd-img>
              <wd-text text="214" size="16px" color="#000" bold custom-class="ml-8px"></wd-text>
            </view>
            <wd-text text="公交站" size="14px" color="#000000"></wd-text>
          </view>
          <view class="my-15px flex flex-col items-center">
            <view class="text-44px font-600 color-#000 py-5px">-150.0</view>
            <view class="text-16px color-#999 py-3px mt-10px">已支付</view>
          </view>
        </view>
      </view>
      <view class="px-15px">
        <view class="my-10px p-15px bg-#fff rounded-6px">
          <view class="mb-10px">
            <wd-text text="订单信息" color="#000" bold size="16px"></wd-text>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">订单号:</view>
            <view class="color-#000 text-14px">
              {{ 777 }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">下单时间:</view>
            <view class="color-#000 text-14px">
              {{ 777 }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">乘车时间:</view>
            <view class="color-#000 text-14px">
              {{ 777 }}
            </view>
          </view>
        </view>
        <view class="my-10px p-15px bg-#fff rounded-6px">
          <view class="mb-10px">
            <wd-text text="支付信息" color="#000" bold size="16px"></wd-text>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">行程票价:</view>
            <view class="color-#000 text-14px">1.00元</view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">票制票价优惠:</view>
            <view class="color-#000 text-14px">1.00元</view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">优惠券折扣:</view>
            <view class="color-#000 text-14px">1.00元</view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">实付金额:</view>
            <view class="color-#000 text-14px">1.00元</view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">支付方式:</view>
            <view class="color-#000 text-14px">在线支付</view>
          </view>
          <view class="flex justify-between text-16px py-5px items-center">
            <view class="color-#999999">支付时间:</view>
            <view class="color-#000 text-14px">2020-02-20 19:19:19</view>
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

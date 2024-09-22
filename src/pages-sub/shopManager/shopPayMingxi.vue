<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
const title = ref('支付明细')
const data = ref({
  name: '张三',
  jine: '12345678901',
  address: '北京市朝阳区',
  orderNo: '1234567890',
  orderTime: '2021-01-01 12:00:00',
  orderStatus: '已完成',
  orderPrice: '100.00',
})
</script>
<template>
  <dy-navbar :leftTitle="title" left></dy-navbar>
  <view>
    <view class="color-#555 text-20px text-center mt-30px">{{ data.name }}</view>
    <view class="text-32px text-center py-15px">+ {{ data.jine }}</view>
    <view class="mt-30px px-20px">
      <view class="flex justify-between text-16px py-10px">
        <view class="color-#999999">交易订单号:</view>
        <view class="color-#000">
          {{ data.orderNo }}
        </view>
      </view>
      <view class="flex justify-between text-16px py-10px">
        <view class="color-#999999">商户订单号:</view>
        <view class="color-#000">
          {{ data.orderNo }}
        </view>
      </view>
      <view class="flex justify-between text-16px py-10px">
        <view class="color-#999999">收款时间:</view>
        <view class="color-#000">
          {{ data.orderTime }}
        </view>
      </view>
      <view class="flex justify-between text-16px py-10px">
        <view class="color-#999999">收款金额:</view>
        <view class="color-#000">
          {{ data.orderPrice }}
        </view>
      </view>
      <view class="flex justify-between text-16px py-10px">
        <view class="color-#999999">优惠金额:</view>
        <view class="color-#FF6600">-{{ data.orderNo }}</view>
      </view>
    </view>
  </view>
</template>

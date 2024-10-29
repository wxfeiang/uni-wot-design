<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import dayjs from 'dayjs'
const title = ref('充值记录详情')
const data = reactive({})
const desc = ref('-')

const formatTime = (val) => {
  if (val.length === 8) {
    return dayjs(val).format('YYYY-MM-DD')
  } else {
    return val.substring(0, 2) + ':' + val.substring(2, 4) + ':' + val.substring(4)
  }
}
onLoad((options) => {
  console.log('传参', options)
  Object.assign(data, options)
  title.value = options.type === '1' ? '消费记录详情' : '充值记录详情'
  desc.value = options.type === '1' ? '-' : '+'
})
</script>

<template>
  <view class="h-100vh flex flex-col mainbg">
    <dy-navbar
      :leftTitle="title"
      left
      isNavShow
      color="#000"
      style="background: transparent"
    ></dy-navbar>

    <view class="rounded-6px flex-1 bg-#fff">
      <view class="">
        <view class="mt-10px p-15px">
          <view>
            <view class="flex justify-center items-center">
              <view class="flex items-center color-#555555 font-size-20px">
                <!-- <wd-ing></wd-ing> -->
                <view>{{ data.txntypedesc }}</view>
              </view>
            </view>
            <view class="my-15px flex flex-col items-center">
              <view class="text-44px font-600 color-#000 py-5px">
                {{ desc }}{{ Number(data.txnamt).toFixed(2) }}
              </view>
              <!-- <view class="text-16px color-#999 py-3px mt-10px">已扣款</view> -->
            </view>
          </view>
        </view>
      </view>
      <view class="">
        <view class="p-15px">
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易卡号:</view>
            <view class="color-#000 text-14px">
              {{ data.cardno }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易时间:</view>
            <view class="color-#000 text-14px">
              {{ formatTime(data.txndate) + ' ' + formatTime(data.txntime) }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易类型:</view>
            <view class="color-#000 text-14px">
              {{ data.txntypedesc }}
            </view>
          </view>
          <view class="flex justify-between text-16px py-10px items-center">
            <view class="color-#999999">交易流水号:</view>
            <view class="color-#000 text-14px">{{ data.index }}</view>
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
.mainbg {
  background: #f3f4f6;
}
:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}
</style>

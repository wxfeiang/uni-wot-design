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

import CouponLine from './components/couponLine.vue'
import { couponDetailProps } from './utils/types'
import userCoupon from './utils/userCoupon'
const { sendUseRecord } = userCoupon()

const title = ref('优惠券核销记录')
const paging = ref(null)
const maxDate = dayjs().add(1, 'day').valueOf()

const timer = ref<number[]>([Date.now(), dayjs().add(1, 'day').valueOf()])
const timerShow = ref([
  dayjs(timer.value[0]).format('YYYY-MM-DD'),
  dayjs(timer.value[1]).format('YYYY-MM-DD'),
])

function handleConfirm({ value }) {
  timerShow.value[0] = dayjs(value[0]).format('YYYY-MM-DD')
  timerShow.value[1] = dayjs(value[1]).format('YYYY-MM-DD')
  timer.value = value
  paging.value.reload()
}

const conponList = ref<couponDetailProps[]>([])

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    createStartTime: timerShow.value[0],
    createEndTime: timerShow.value[1],
  }
  // 调用接口获取数据
  try {
    const data: any = await sendUseRecord(params)
    console.log('🥜[data]:', data)
    conponList.value = data.coupons.content as couponDetailProps[]
    paging.value.complete(conponList.value)
  } catch (error) {
    conponList.value = []
    paging.value.complete(false)
  }
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="conponList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="flex flex-col bg-no-repeat h-100vh"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <wd-datetime-picker
        v-model="timer"
        placeholder="请选择日期"
        @confirm="handleConfirm"
        custom-value-class="custom-view-picker"
        custom-cell-class="custom-cell-picker"
        use-default-slot
        :maxDate="maxDate"
        type="date"
      >
        <view
          class="flex justify-between items-center p-10px px-20px color-#666 bg-#F3F4F6 text-14px"
        >
          <view>
            {{ timerShow[0] ? timerShow[0] : '开始时间' }}
            <wd-icon name="arrow-down" size="12px"></wd-icon>
          </view>

          <view>至</view>
          <view>
            {{ timerShow[1] ? timerShow[1] : '结束时间' }}
            <wd-icon name="arrow-down" size="12px"></wd-icon>
          </view>
        </view>
      </wd-datetime-picker>
    </template>
    <view class="">
      <view class="px-10px">
        <view
          class="rounded-4px overflow-hidden my-10px"
          v-for="(item, index) in conponList"
          :key="index"
        >
          <Coupon-Line :data="item" :status="true" :statusBg="false"></Coupon-Line>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.custom-cell-picker) {
  @apply bg-#F3F4F6;

  .wd-picker__arrow {
    @apply hidden !;
  }
}

:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}
</style>

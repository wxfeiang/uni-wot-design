<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import dayjs from 'dayjs'

// import userCoupon from './utils/userCoupon'
// const { sendUseRecord } = userCoupon()

const title = ref('乘车记录')
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

const conponList = ref([
  {
    time: '2023-01-01 12:00:00',
    title: '优惠券名称',
    status: '已核销',
    price: '100',
    type: '代金券',
  },
  {
    time: '2023-01-01 12:00:00',
    title: '优惠券名称',
    status: '已核销',
    price: '100',
    type: '代金券',
  },
])

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    createStartTime: timerShow.value[0],
    createEndTime: timerShow.value[1],
  }
  // 调用接口获取数据
  try {
    // const data: any = await sendUseRecord(params)
    // conponList.value = data.content as couponDetailProps[]
    paging.value.complete(conponList.value)
  } catch (error) {
    // conponList.value = []
    paging.value.complete(conponList.value)
    paging.value.complete(false)
  }
}
function toMingxi(item) {
  routeTo({ url: '/pages-sub/userManager/transit/detil' })
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="conponList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="flex flex-col bg-no-repeat h-100vh dy-blue-bg"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
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
          class="flex justify-between items-center p-10px px-20px color-#666 bg-#Ffff text-14px"
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
          class="my-10px p-15px bg-#fff rounded-6px"
          v-for="(item, index) in conponList"
          :key="index"
        >
          <view>
            <view class="flex justify-between items-center">
              <view class="flex items-center">
                <!-- <wd-ing></wd-ing> -->
                <view>公交</view>
              </view>
              <view class="color-#2D69EF">
                {{ '已完成' }}
              </view>
            </view>
            <view class="my-15px">
              <view class="text-16px font-600 color-#000 py-5px">雄安一卡通</view>
              <view class="text-12px color-#999 py-3px">乘车时间：2024-08-21 12:23:21</view>
            </view>
            <view
              class="flex justify-between items-center bt-1px_dashed_#999"
              @click="toMingxi(item)"
            >
              <view class="color-#999999 text-14px py-10px mt-5px">
                行程票价：
                <text class="color-#F44D24">￥2元</text>
              </view>
              <view class="color-#999999 text-14px py-10px mt-5px">查看详情</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
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

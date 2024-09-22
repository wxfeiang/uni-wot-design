<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import dayjs from 'dayjs'
import { pathToBase64 } from 'image-tools'
import bg from '../static/images/coupon/myuhbg.png'
import CouponLine from './components/couponLine.vue'
import { conponListProps } from './utils/types'
import userCoupon from './utils/userCoupon'
const { sendUserCouponList } = userCoupon()
const topbgBase64 = ref('')
const title = ref('优惠券核销记录')
const paging = ref(null)
const tab = ref(0)
const tablist = ref([
  {
    index: 0,
    title: '未使用',
    count: 0,
  },
  {
    index: 1,
    title: '已使用',
    count: 0,
  },
  {
    index: 2,
    title: '已过期',
    count: 0,
  },
])
const matchTab = ref(['unUsedCouponNum', 'usedCouponNum', 'overdueCouponNum'])
const changeTab = (e) => {
  tab.value = e.index
  paging.value.reload()
}

const conponList = ref<conponListProps[]>([])

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    status: tab.value,
  }

  // 调用接口获取数据
  try {
    const data: any = await sendUserCouponList(params)
    conponList.value = data.coupons.content
    tablist.value.forEach((e, i) => {
      e.count = data[matchTab.value[i]]
    })
    paging.value.complete(conponList.value)
  } catch (error) {
    paging.value.complete([
      {
        title: '优惠券名称',
      },
    ])
    paging.value.complete(false)
  }
}
function toYouhuiquan() {
  routeTo({ url: '/pages-sub/marketManager/coupon/index' })
}
const timer = ref<any[]>(['', ''])
const timerShow = ref([])

function handleConfirm({ value }) {
  console.log('🍖[value]:', value)

  timerShow.value[0] = dayjs(value[0]).format('YYYY-MM-DD')
  timerShow.value[1] = dayjs(value[1]).format('YYYY-MM-DD')

  console.log(new Date(value))
}

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
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
          <Coupon-Line :data="item"></Coupon-Line>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.custom-cell-picker) {
  @apply bg-#F3F4F6;
  .wd-picker__arrow {
    @apply hidden!;
  }
}
:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}
</style>

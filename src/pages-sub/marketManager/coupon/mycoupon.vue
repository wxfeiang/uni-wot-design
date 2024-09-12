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
import { pathToBase64 } from 'image-tools'
import myyhbtn from '../static/images/coupon/lingqu.png'
import bg from '../static/images/coupon/myuhbg.png'
import hubgtitle from '../static/images/coupon/tomyh.png'
import CouponList from './compoents/couponList.vue'
import { conponListProps } from './utils/types'
import { getUserCouponList } from '@/service/api/coupon'
import { useUserStore } from '@/store'

const topbgBase64 = ref('')
const title = ref('我的优惠券')
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
const params = ref({
  page: '1',
  size: '10',
  status: 0,
})
const authStore = useUserStore()
const changeTab = (e) => {
  tab.value = e.index
  params.value.status = e.index
  getUserCoupon()
  // getUserCouList(params.value)
}

const conponList = ref<conponListProps[]>([])

function queryList(pageNo: number, pageSize: number) {
  params.value.page = pageNo + ''
  params.value.size = pageSize + ''
  // 调用接口获取数据
  try {
    getUserCoupon()
    paging.value.complete(conponList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
function toYouhuiquan() {
  routeTo({ url: '/pages-sub/marketManager/coupon/index' })
}

const getUserCoupon = async () => {
  const param = {
    phone: authStore.userInfo.userPhone,
    status: params.value.status,
    page: params.value.page,
    size: params.value.size,
  }
  const data: any = await getUserCouponList(param)
  console.log('🍷[userCouponData]:', data)
  conponList.value = data.content
}

const getUserCouponCount = async (stu) => {
  const param = {
    phone: authStore.userInfo.userPhone,
    status: stu,
  }
  const data: any = await getUserCouponList(param)
  // console.log(
  //   '🍷[userCouponCount]:',
  //   stu === 0 ? '未使用' : stu === 1 ? '已使用' : '已过期',
  //   data.content.length,
  // )
  if (data.content) {
    tablist.value[param.status].count = data.content.length
  }
}

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
  // 获取未使用条数
  await getUserCouponCount(0)
  // 获取已使用条数
  await getUserCouponCount(1)
  // 获取已过期条数
  await getUserCouponCount(2)
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="conponList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="flex flex-col bg-no-repeat h-100vh"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 222px`"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left isNavShow></dy-navbar>
      <view class="mt-20px flex justify-around items-center">
        <wd-img :src="hubgtitle" width="190" height="73"></wd-img>
        <view class="mt-20px" @click="toYouhuiquan">
          <wd-img :src="myyhbtn" width="138" height="35"></wd-img>
        </view>
      </view>
      <view class="bg-#C30000 mt-42px h-42px">
        <wd-tabs v-model="tab" @change="changeTab" custom-class="custom-class-tab">
          <block v-for="item in tablist" :key="item.index">
            <wd-tab :title="`${item.title}   (${item.count})`"></wd-tab>
          </block>
        </wd-tabs>
      </view>
    </template>
    <view class="mt-10px">
      <view class="pt-10px px-10px">
        <view
          class="rounded-4px overflow-hidden my-10px"
          v-for="(item, index) in conponList"
          :key="index"
        >
          <Coupon-List :data="item"></Coupon-List>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.custom-class-tab),
:deep(.custom-class-tab .wd-tabs__nav) {
  @apply bg-transparent!;
}
:deep(.custom-class-tab) {
  .wd-tabs__nav-item {
    @apply text-#D8B9B9;
  }
  .wd-tabs__nav-item.is-active {
    @apply color-#fff;
  }
  .wd-tabs__line {
    @apply top-0  w-33% bg-#fff h-1px;
  }
}
</style>

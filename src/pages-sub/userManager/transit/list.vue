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
import laonianka from '@/static/images/transit/laonianka.png'
import laoniankaicon from '@/static/images/transit/laoniankaicon.png'
import xueshengka from '@/static/images/transit/xueshengka.png'
import xueshengkaicon from '@/static/images/transit/xueshengkaicon.png'
import putongka from '@/static/images/transit/putongka.png'
import putongkaicon from '@/static/images/transit/putongkaicon.png'
import { routeTo } from '@/utils'
import dayjs from 'dayjs'

// import userCoupon from './utils/userCoupon'
// const { sendUseRecord } = userCoupon()

const title = ref('乘车记录')
const paging = ref(null)
const form = reactive({
  cardno: '3104951799000000904',
  cardtype: '',
  name: '',
})
const conponList = ref([{}, {}])

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
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
  routeTo({ url: '/pages-sub/userManager/transit/travelRecord' })
}
onLoad((options) => {
  console.log('传参', options)
})
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
      <view class="topbg flex justify-between items-center">
        <view class="flex flex-col justify-between">
          <div class="flex items-end mb4px">
            <wd-img :src="laonianka" :width="60" :height="30" v-if="form.cardtype === '0301'" />
            <wd-img :src="xueshengka" :width="60" :height="30" v-if="form.cardtype === '0201'" />
            <wd-img :src="putongka" :width="60" :height="30" v-if="form.cardtype === '0100'" />
            <view class="name">{{ form.name }}</view>
          </div>
          <div class="font-600 color-white font-size-24px">{{ form.cardno }}</div>
        </view>
        <view>
          <wd-img :src="laoniankaicon" :width="54" :height="63" v-if="form.cardtype === '0301'" />
          <wd-img :src="xueshengkaicon" :width="54" :height="63" v-if="form.cardtype === '0201'" />
          <wd-img :src="putongkaicon" :width="54" :height="63" v-if="form.cardtype === '0100'" />
        </view>
      </view>
    </template>
    <view class="px-15px">
      <view
        class="my-10px py-15px bg-#fff rounded-6px border-box"
        v-for="(item, index) in conponList"
        :key="index"
        @click="toMingxi(item)"
      >
        <view class="flex justify-between items-center mb-14px px-15px border-box">
          <view class="flex justify-between items-center">
            <wd-img :src="bus" :width="22" :height="22"></wd-img>
            <wd-text text="214" size="16px" color="#000" bold custom-class="ml-8px"></wd-text>
          </view>
          <wd-text text="已支付" size="14px" color="#2D69EF"></wd-text>
        </view>

        <view class="bt-1px_dashed_#999 px-15px border-box">
          <view class="text-16px font-600 color-#000 mt-11px">在哪里 上车</view>
          <view class="flex justify-between items-center">
            <view class="text-12px color-#999 py-3px">乘车时间：2024-08-21 12:23:21</view>

            <view class="color-#999999 text-14px mt-5px">
              <text class="color-#F44D24">￥2元</text>
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
.topbg {
  box-sizing: border-box;
  width: calc(100% - 30px);
  padding: 14px 20px;
  margin: 10px auto;
  background: linear-gradient(48deg, #2bc5ff 0%, #1d4adc 100%);
  border-radius: 8px 8px 8px 8px;
  .name {
    box-sizing: border-box;
    height: 21px;
    padding: 0 31px 0 11px;
    margin-left: 10px;
    font-size: 14px;
    line-height: 21px;
    color: #fff;
    background: linear-gradient(90deg, #3561ef 0%, rgba(36, 140, 239, 0) 100%);
    border-radius: 11px 11px 11px 11px;
  }
}
:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}
</style>

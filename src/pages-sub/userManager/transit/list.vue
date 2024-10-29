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
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import {
  getCardInfo,
  getTransitCardTradeDetails,
  cardRealNameQuery,
  getUserCard,
} from '@/service/api/userMessage'
import dayjs from 'dayjs'

// import userCoupon from './utils/userCoupon'
// const { sendUseRecord } = userCoupon()

const { userInfo } = storeToRefs(useUserStore())
const title = ref('乘车记录')
const paging = ref(null)
const form = reactive({
  cardno: '',
  cardtype: '',
  name: '',
})
const conponList = ref([])

async function queryList(pageNo: number, pageSize: number) {
  try {
    const obj = {
      cardno: form.cardno,
      page: pageNo,
      size: pageSize,
      rectype: '2',
      orderby: '1',
    }
    getTransitCardTradeDetails(obj).then((res) => {
      console.log('交通卡消费记录', res)
      conponList.value = res.txndetail
      paging.value.complete(res.txndetail)
    })
  } catch (error) {
    paging.value.complete(false)
  }
}
function toMingxi(item) {
  routeTo({ url: '/pages-sub/userManager/transit/travelRecord' })
}
const getCardinfo = () => {
  getCardInfo({ cardno: form.cardno }).then((res) => {
    console.log('交通卡信息', res)
    form.cardtype = res.cardtype
  })
}
const formatTime = (val) => {
  if (val.length === 8) {
    return dayjs(val).format('YYYY-MM-DD')
  } else {
    return val.substring(0, 2) + ':' + val.substring(2, 4) + ':' + val.substring(4)
  }
}
onLoad((options) => {
  console.log('传参', options)
})
onShow(() => {
  console.log('userInfo', userInfo.value)
  getUserCard({ cardId: userInfo.value.cardId }).then((res) => {
    console.log('ress', res)
    form.cardno = res.trafficNumber
    console.log('form', form)
    getCardinfo()
    paging.value.reload()
  })
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
            <view class="name">{{ userInfo.cardName }}</view>
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
            <wd-text
              :text="item.txntypedesc"
              size="16px"
              color="#000"
              bold
              custom-class="ml-8px"
            ></wd-text>
          </view>
          <wd-text text="已支付" size="14px" color="#2D69EF"></wd-text>
        </view>

        <view class="bt-1px_dashed_#999 px-15px border-box">
          <view class="text-16px font-600 color-#000 mt-11px">{{ item.txntypedesc }}</view>
          <view class="flex justify-between items-center">
            <view class="py-3px">
              <wd-text text="乘车时间" size="12px" color="#999999"></wd-text>
              <wd-text
                :text="formatTime(item.txndate) + ' ' + formatTime(item.txntime)"
                size="12px"
                color="#999999"
              ></wd-text>
            </view>

            <view class="color-#999999 text-14px mt-5px">
              <text class="color-#F44D24">￥{{ item.txnamt }}元</text>
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

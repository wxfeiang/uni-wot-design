<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import {
  cardRealNameQuery,
  getCardInfo,
  getTransitCardTradeDetails,
} from '@/service/api/userMessage'

import { routeTo } from '@/utils'
import dayjs from 'dayjs'

const title = ref('')
const paging = ref(null)
const conponList = ref([])
const form = reactive({
  cardno: '3104951799000000904',
  cardtype: '',
  name: '',
})
const desc = ref('充值')

async function queryList(pageNo: number, pageSize: number) {
  // 调用接口获取数据
  try {
    const obj = {
      cardno: form.cardno,
      page: pageNo,
      size: pageSize,
      rectype: '1',
      orderby: '1',
    }
    getTransitCardTradeDetails(obj).then((res) => {
      console.log('交通卡充值记录', res)
      conponList.value = res.txndetail
      paging.value.complete(res.txndetail)
    })
  } catch (error) {
    paging.value.complete(false)
  }
}
const getCardRealname = () => {
  cardRealNameQuery({ cardno: form.cardno }).then((res) => {
    console.log('交通卡实名信息', res)
    form.name = res.custinfo.name
  })
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
onShow(() => {
  getCardinfo()
  getCardRealname()
})
function toMingxi(item) {
  routeTo({ url: '/pages-sub/userManager/transit/detil', data: { ...item, cardno: form.cardno } })
}
onLoad((options) => {
  desc.value = options.type ? '充值' : '消费'
  title.value = options.type ? '充值记录' : '消费记录'
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
    </template>
    <view class="px-15px box-border">
      <view
        class="my-10px p-15px bg-#fff rounded-6px box-border"
        v-for="(item, index) in conponList"
        :key="index"
        @click="toMingxi(item)"
      >
        <view class="flex justify-between items-center mb-14px">
          <view class="flex justify-between items-center">
            <!-- <wd-img :src="recordicon" :width="22" :height="22"></wd-img> -->
            <wd-text
              :text="item.txntypedesc"
              size="16px"
              color="#000"
              bold
              custom-class="ml-8px"
            ></wd-text>
          </view>
          <wd-text text="已完成" size="14px" color="#2D69EF"></wd-text>
        </view>
        <view class="mb-3px">
          <wd-text :text="`${desc}金额：`" size="12px" color="#999999"></wd-text>
          <wd-text :text="`￥${item.txnamt}元`" size="12px" color="#FF0000"></wd-text>
        </view>
        <view class="mb-3px">
          <wd-text :text="`${desc}食堂：`" size="12px" color="#999999"></wd-text>
          <wd-text
            :text="formatTime(item.txndate) + ' ' + formatTime(item.txntime)"
            size="12px"
            color="#999999"
          ></wd-text>
        </view>
        <view>
          <wd-text :text="`${desc}时间：`" size="12px" color="#999999"></wd-text>
          <wd-text
            :text="formatTime(item.txndate) + ' ' + formatTime(item.txntime)"
            size="12px"
            color="#999999"
          ></wd-text>
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

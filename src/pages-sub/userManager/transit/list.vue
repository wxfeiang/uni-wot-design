<route lang="json5" type="page">
{
  layout: 'default',
  realNameAuthentication: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import dayjs from 'dayjs'
import recordicon from '@/static/images/transit/recordicon.png'
import laonianka from '@/static/images/transit/laonianka.png'
import laoniankaicon from '@/static/images/transit/laoniankaicon.png'
import xueshengka from '@/static/images/transit/xueshengka.png'
import xueshengkaicon from '@/static/images/transit/xueshengkaicon.png'
import putongka from '@/static/images/transit/putongka.png'
import putongkaicon from '@/static/images/transit/putongkaicon.png'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useToast } from 'wot-design-uni'
import {
  getCardInfo,
  getTransitCardTradeDetails,
  cardRealNameQuery,
  getUserCard,
} from '@/service/api/userMessage'

const toast = useToast()
const { userInfo } = storeToRefs(useUserStore())
const title = ref('公交乘车记录')
const paging = ref(null)
const conponList = ref([])
const form = reactive({
  cardno: '',
  cardtype: '',
  name: '',
})
// const maxDate = dayjs().add(1, 'day').valueOf()
// const timer = ref<number[]>([Date.now(), dayjs().add(1, 'day').valueOf()])
// const timerShow = ref([
//   dayjs(timer.value[0]).format('YYYY-MM-DD'),
//   dayjs(timer.value[1]).format('YYYY-MM-DD'),
// ])

// function handleConfirm({ value }) {
//   timerShow.value[0] = dayjs(value[0]).format('YYYY-MM-DD')
//   timerShow.value[1] = dayjs(value[1]).format('YYYY-MM-DD')
//   timer.value = value
//   paging.value.reload()
// }

async function queryList(pageNo: number, pageSize: number) {
  // 调用接口获取数据
  try {
    const obj = {
      cardno: form.cardno,
      page: pageNo,
      size: pageSize,
      rectype: '2',
      orderby: '0',
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
  console.log('userInfo', userInfo.value)
  getUserCard({ cardId: userInfo.value.cardId }).then((res) => {
    console.log('ress', res)
    form.cardno = res.trafficNumber
    console.log('form', form)
    getCardinfo()
    paging.value.reload()
  })
})
function toMingxi(item) {
  routeTo({
    url: '/pages-sub/userManager/transit/detil',
    data: { ...item, type: 1, cardno: form.cardno },
  })
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="conponList"
    @query="queryList"
    :auto="false"
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
          <div class="font-600 color-white font-size-22px">{{ form.cardno }}</div>
        </view>
        <view>
          <wd-img :src="laoniankaicon" :width="54" :height="63" v-if="form.cardtype === '0301'" />
          <wd-img :src="xueshengkaicon" :width="54" :height="63" v-if="form.cardtype === '0201'" />
          <wd-img :src="putongkaicon" :width="65" :height="63" v-if="form.cardtype === '0100'" />
        </view>
      </view>
      <!-- <wd-datetime-picker
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
            class="flex justify-between items-center p-10px px-20px color-#666 bg-#Ffff text-14px bg-transparent"
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
        </wd-datetime-picker> -->
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
            <wd-img :src="recordicon" :width="22" :height="22"></wd-img>
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
          <wd-text text="消费金额：" size="12px" color="#999999"></wd-text>
          <wd-text
            :text="`￥${(item.txnamt / 100).toFixed(2)}元`"
            size="12px"
            color="#FF0000"
          ></wd-text>
        </view>
        <view>
          <wd-text text="消费时间：" size="12px" color="#999999"></wd-text>
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

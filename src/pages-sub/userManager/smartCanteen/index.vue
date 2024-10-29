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
import { useToast } from 'wot-design-uni'
import dayjs from 'dayjs'
import chongzhi from '@/static/images/smartCanteen/chongzhi.png'
import chongzhijilu from '@/static/images/smartCanteen/chongzhijilu.png'
import logo from '@/static/images/smartCanteen/logo.png'
import qiehuan from '@/static/images/smartCanteen/qiehuan.png'
import right from '@/static/images/smartCanteen/right.png'
import xiaofei from '@/static/images/smartCanteen/xiaofei.png'
import {
  getCardInfo,
  getTransitCardTradeDetails,
  cardRealNameQuery,
} from '@/service/api/userMessage'

const value = ref('1')
const toast = useToast()
const title = ref('智慧食堂')
const conponList = ref([
  {
    id: 1,
    name: '充值',
    url: chongzhi,
    path: '',
  },
  {
    id: 2,
    name: '消费记录',
    url: xiaofei,
    path: '',
    type: 1,
  },
  {
    id: 3,
    name: '充值记录',
    url: chongzhijilu,
    path: '',
    type: 2,
  },
])
const form = reactive({
  cardno: '3104951799000000904',
  cardtype: '',
  name: '',
})
const show = ref(false)
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
  if (item.path) {
    routeTo({
      url: '/pages-sub/userManager/smartCanteen/rechargeAndSonsumption',
      data: { type: item.type }, // 1 充值 2 消费
    })
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}
</script>

<template>
  <view class="flex flex-col bg-no-repeat h-100vh dy-blue-bg">
    <view>
      <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
      <view class="topbg pos-relative">
        <view
          class="brge pos-absolute pos-top-none pos-right-none flex justify-center items-center"
          @click="show = true"
        >
          <wd-img :src="qiehuan" :width="13" :height="11" custom-class="mr-5px"></wd-img>
          <wd-text text="切换食堂" color="#A5D8FF" size="12px"></wd-text>
        </view>
        <view class="flex items-center">
          <wd-img :src="logo" :width="40" :height="40" custom-class="mr-11px"></wd-img>
          <wd-text text="食堂名称" size="26px" color="#fff" bold></wd-text>
        </view>
        <view class="flex justify-end">
          <wd-text text="￥200" size="26px" color="#fff" bold></wd-text>
        </view>
        <view
          class="pos-absolute w-full pos-left-none pos-bottom-none h-38px line-height-38px px-20px box-border flex justify-between"
          style="background: rgba(19, 35, 187, 0.3)"
        >
          <wd-text text="张三" size="14px" color="#fff"></wd-text>
          <wd-text text="18888888888" size="14px" color="#94C1E3"></wd-text>
        </view>
      </view>
    </view>
    <view class="px-15px box-border">
      <view
        class="my-10px p-15px bg-#fff rounded-6px box-border w-full flex justify-between items-center"
        v-for="(item, index) in conponList"
        :key="index"
        @click="toMingxi(item)"
      >
        <view class="flex items-center">
          <wd-img :width="22" :height="22" :src="item.url" custom-class="mr-10px"></wd-img>
          <wd-text :text="item.name" size="16px" color="#000"></wd-text>
        </view>
        <wd-img :width="7" :height="12" :src="right"></wd-img>
      </view>
    </view>
  </view>
  <wd-popup
    v-model="show"
    custom-style="height:440px;borderRadius:20px 20px 0 0 ;padding:15px 20px 25px 28px;box-sizing:border-box;display:flex;flex-direction: column;"
    position="bottom"
  >
    <view class="flex justify-center items-center pos-relative">
      <wd-text text="切换食堂"></wd-text>
      <view class="pos-absolute pos-right-5px pos-top-5spx" @click="show = false">
        <wd-icon name="close" size="12px" color="#C9C9C9"></wd-icon>
      </view>
    </view>
    <view class="flex-1 overflow-y-auto mt-30px">
      <wd-radio-group v-model="value" inline shape="dot" checked-color="#F44D24">
        <view class="w-full flex items-center mb-10px" v-for="i in 20" :key="i">
          <wd-radio value="1"></wd-radio>
          <wd-text :text="'单选框' + i" size="18px" color="#000000"></wd-text>
        </view>
      </wd-radio-group>
    </view>
    <view
      class="w-full h-40px flex justify-center items-center bg-#2D69EF color-#fff border-rd-6px mt-30px"
    >
      确认切换
    </view>
  </wd-popup>
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
  padding: 19px 19px 45px 19px;
  margin: 10px auto;
  overflow: hidden;
  background: linear-gradient(48deg, #2bc5ff 0%, #1d4adc 100%);
  border-radius: 8px 8px 8px 8px;
  .brge {
    width: 87px;
    height: 28px;
    background: rgba(35, 31, 150, 0.42);
    border-radius: 0px 8px 0px 25px;
  }
}
:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}
</style>

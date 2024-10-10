<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo, changeUrlJson } from '@/utils'

import quanbg from '../../static/images/integral/quanbg.png'
import { NAVIGATE_TYPE } from '@/enums/routerEnum'

const title = ref('兑换结果')
const gopath = () => {
  routeTo({
    url: '/pages/shop/index',
    navType: NAVIGATE_TYPE.SWITCH_TAB,
  })
}
const opData = ref()

const goodsInfoData = ref({})

onLoad(async (option) => {
  console.log('opData', opData.value, option)
  opData.value = { ...changeUrlJson(option) }
})
</script>

<template>
  <view class="min-h-100vh bg-#f3f4f6">
    <view class="top-bg">
      <dy-navbar :leftTitle="title" left isNavShow :placeholder="false" color="#000"></dy-navbar>
      <view class="w-full h-200px flex flex-col justify-center items-center pt-30px">
        <view class="w-60px h-60px bg-#F44D24 border-rd-50px flex items-center justify-center">
          <wd-icon name="check" size="30px" color="#fff"></wd-icon>
        </view>
        <wd-text text="兑换成功" color="#000" bold size="20px" custom-class="my-20px"></wd-text>
      </view>
    </view>

    <view class="cardtop"></view>
    <view class="bg-white w-screen p4 box-border pt-0 absolute contentBox">
      <wd-cell-group>
        <wd-cell title="消耗积分" :value="opData.consumePoints" />
        <wd-cell title="兑换单号" :value="opData.orderNo" />
        <wd-cell title="兑换时间" :value="opData.createTime" />
        <wd-cell title="特别说明" :value="opData.description" />
      </wd-cell-group>

      <view class="w-full mt-30px flex">
        <view class="pos-relative">
          <wd-img :src="quanbg" :width="90" :height="70"></wd-img>
          <view
            class="pos-absolute w-full h-full pos-top-none flex flex-col items-center justify-center"
          >
            <wd-text :text="opData.exchangeNotes" size="12px" color="#FF4345"></wd-text>
            <!-- <wd-text text="满100可用" size="8px" color="#FF4345"></wd-text>
            <view class="mt-10px">
              <wd-text text="20" bold size="28px" color="#FF4345"></wd-text>
              <wd-text text="￥" bold size="12px" color="#FF4345"></wd-text>
            </view> -->
          </view>
        </view>
        <view class="flex-1 ml-10px flex flex-col justify-between">
          <wd-text :text="opData.goodName" :lines="1" bold size="16px" color="#000000"></wd-text>
          <wd-text text="仅雄安一卡通支付使用" size="12px" color="#999999"></wd-text>
          <view class="w-full flex justify-end">
            <view class="btn" @click="gopath">去使用</view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="z-10 px-4 py-2 shadow bg-white fixed b0 w-full box-border pb-20px flex"
      style="bottom: 0px"
    >
      <wd-button
        block
        custom-class="duihuanBtn"
        custom-style="background-color: #ffe7e1;color:#F44D24;"
        :round="false"
        @click="
          routeTo({
            url: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/list',
          })
        "
      >
        暂不使用
      </wd-button>
      <wd-button
        block
        custom-class="duihuanBtn"
        :round="false"
        custom-style="background-color: #F44D24;color:#fff;"
        @click="gopath"
      >
        立即使用
      </wd-button>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.top-bg {
  background: #f5f6f8;
}

:deep(.wd-navbar) {
  width: 100%;
  color: #ffffff !important;
  background-color: transparent !important;
}

:deep(.wd-navbar__title) {
  color: #ffffff !important;
}

.cardtop {
  position: relative;
  top: -14px;
  z-index: 2;
  float: left;
  width: 100vw;
  height: 15px;
  background: #ffffff;
  border-radius: 15px 15px 0 0;
}

:deep(.duihuanBtn) {
  width: 157px;
  line-height: 40px !important;
}

.borders {
  border-top: 1px dotted #e4e7ec;
  border-bottom: 1px dotted #e4e7ec;
}
.btn {
  width: 68px;
  font-size: 12px;
  line-height: 22px;
  color: #ff4345;
  text-align: center;
  border: 1px solid #ff4345;
  border-radius: 13px 13px 13px 13px;
}
.contentBox {
  box-sizing: border-box;
  min-height: calc(100vh - 200px);
  padding-bottom: 80px;
}
</style>

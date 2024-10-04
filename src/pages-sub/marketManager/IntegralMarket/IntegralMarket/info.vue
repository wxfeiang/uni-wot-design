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
import { goodsInfoProps } from './utils/types'
import useInter from './utils/useInter'

const title = ref('商品详情')

const { sendInterProductInfo } = useInter()
const gopath = (id) => {
  routeTo({
    url: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/buyOrder',
    data: { goodId: id },
  })
}
const opData = ref()
const url = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png',
)
const goodsInfoData = ref<goodsInfoProps>({
  goodImg: '',
  coinPrice: 0,
  goodName: '',
  goodSort: 0,
  createTime: '',
  exchangeLevel: null,
  exchangeNotes: '',
  isSale: null,
  updateTime: '',
  goodId: null,
  stock: null,
  purchaseLimit: null,
  sellOut: null,
})
onLoad(async (option) => {
  opData.value = option

  const params = {
    goodId: option.goodId,
  }
  try {
    const data = await sendInterProductInfo(params)
    goodsInfoData.value = { ...data, sellOut: opData.value.sellOut }
    console.log('🥕[ goodsInfoData.value]:', goodsInfoData.value)
  } catch (error) {
    console.log('🥠[error]:', error)
  }
})
</script>

<template>
  <view class="min-h-100vh bg-#f3f4f6">
    <view class="h-300px">
      <dy-navbar :leftTitle="title" left isNavShow :placeholder="false"></dy-navbar>
      <wd-img :src="goodsInfoData.goodImg ?? url" width="100%" height="300"></wd-img>
    </view>
    <view class="flex justify-between items-center navbg w-screen h-90px">
      <view class="flex justify-left items-start flex-col">
        <view class="text-base text-white mb-1">我的积分</view>
        <view class="text-xs text-slate-100 opacity-60">积分可兑换商品，避免失效请尽快使用</view>
      </view>
      <view class="text-2xl text-white">{{ opData ? opData.surplusIntegral : '0' }}</view>
    </view>

    <view class="cardtop"></view>
    <view class="bg-white w-screen p4 box-border pt-0 absolute contentBox">
      <view class="flex justify-between items-center w-full mb-2">
        <view class="flex justify-left items-center">
          <wd-text
            :text="goodsInfoData.coinPrice + ''"
            :lines="1"
            size="24px"
            color="#FB2549"
            custom-class="font-bold"
          ></wd-text>
          <wd-text text="积分" :lines="1" size="12px" color="#FB2549" custom-class="ml-1"></wd-text>
        </view>

        <wd-text
          :text="`已兑 ${goodsInfoData.sellOut ?? 0} 件`"
          :lines="1"
          size="12px"
          color="#999999"
          custom-class="ml-1"
        ></wd-text>
      </view>
      <wd-text
        :text="goodsInfoData?.goodName"
        :lines="2"
        size="18px"
        color="#000000"
        custom-class="font-bold mb-2"
      ></wd-text>

      <view class="flex justify-left items-center borders pt-2 pb-2 mt-2 mb-2">
        <wd-text text="兑换规则" :lines="1" size="14px" color="#000000"></wd-text>
        <wd-text
          :text="goodsInfoData.exchangeNotes"
          :lines="1"
          size="14px"
          color="#777777"
          custom-class="ml-2"
        ></wd-text>
      </view>

      <view class="mt-2 mb-1">
        <wd-text
          text="商品详情"
          :lines="1"
          size="18px"
          color="#000000"
          custom-class="font-bold"
        ></wd-text>
        <view>
          <wd-img :src="goodsInfoData.goodImg" width="100%" height="150"></wd-img>
        </view>
      </view>
    </view>

    <view
      v-if="goodsInfoData.stock > 0"
      class="z-10 px-4 py-2 shadow bg-white fixed b0 w-full box-border"
      style="bottom: 0px"
    >
      <wd-button
        block
        custom-class="duihuanBtn"
        :round="false"
        @click="gopath(goodsInfoData.goodId)"
      >
        立即兑换
      </wd-button>
    </view>
    <view
      v-else
      class="z-10 px-4 py-2 shadow bg-white fixed b0 w-full box-border"
      style="bottom: 0px"
    >
      <wd-button block type="info" :round="false" disabled>暂时缺货</wd-button>
    </view>
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.navbg {
  box-sizing: border-box;
  padding: 0px 30px 20px 30px;
  background-image: url('https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
  background: #f44d24 !important;
}

.borders {
  border-top: 1px dotted #e4e7ec;
  border-bottom: 1px dotted #e4e7ec;
}

.contentBox {
  box-sizing: border-box;
  min-height: calc(100vh - 390px);
  padding-bottom: 80px;
}
</style>

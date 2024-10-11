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
import quanbg from '../../static/images/integral/quanbg.png'
import { ExchangeGoodsListProps } from './utils/types'
import useInter from './utils/useInter'

const title = ref('积分兑换')
const paging = ref(null)
const { sendInterProductList, sendInterInfo } = useInter()

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    goodSort: active.value,
  }
  // 调用接口获取数据
  try {
    const data: any = await sendInterProductList(params)
    list.value = data.content as ExchangeGoodsListProps[]
    paging.value.complete(list.value)
  } catch (error) {
    paging.value.complete(false)
  }
}

const active = ref<any>('')

const list = ref([])

function changeTab(e) {
  active.value = e
  paging.value.reload()
}

const gopath = (e) => {
  let url = '/pages-sub/marketManager/IntegralMarket/IntegralMarket/info'
  if (e.goodSort === 4) {
    url = '/pages-sub/marketManager/IntegralMarket/IntegralMarket/virtualGoods'
  }
  routeTo({
    url,
    data: { goodId: e.goodId, surplusIntegral: surplusIntegral.value, sellOut: e.sellOut },
  })
}
const surplusIntegral = ref(0)
onLoad(async () => {
  try {
    const data: any = await sendInterInfo()
    surplusIntegral.value = data.surplusIntegral ?? 0
  } catch (error) {
    surplusIntegral.value = 0
  }
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="list"
    @query="queryList"
    :auto-show-system-loading="true"
    style="background: #f3f4f6"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-between items-center navbg w-screen h-80px">
        <view class="flex justify-left items-start flex-col">
          <view class="text-base text-white mb-1">
            <wd-text :text="surplusIntegral" size="28px" color="#fff"></wd-text>
            <wd-text text=" 分" size="12px" color="#fff"></wd-text>
          </view>
          <view class="text-xs text-slate-100 opacity-60">积分可兑换商品，避免失效请尽快使用</view>
        </view>
        <view
          class="font-size-14px text-#F44D24 bg-white px-20px py-5px border-rd-50px"
          @click="
            routeTo({
              url: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/exchangeRecords',
            })
          "
        >
          兑换记录
        </view>
      </view>
      <view class="w-full flex items-center px-25px pt-15px">
        <view :class="active === '' ? 'text-#F44D24' : 'color-#888888'" @click="changeTab('')">
          全部
        </view>
        <view
          :class="active === 2 ? 'text-#F44D24' : 'color-#888888'"
          class="ml-20px"
          @click="changeTab(2)"
        >
          实物商品
        </view>
        <view
          :class="active === 4 ? 'text-#F44D24' : 'color-#888888'"
          class="ml-20px"
          @click="changeTab(4)"
        >
          优惠券
        </view>
      </view>
    </template>
    <view class="p2 pageBoxBg">
      <view v-for="(item, index) in list" class="p2 float-left w-1/2 box-border" :key="index">
        <view class="bg-white rounded-md p-8px">
          <view class="flex items-center justify-center mb-2">
            <view class="w-full h-135px pos-relative" v-if="item.goodSort === 4">
              <wd-img width="100%" :height="135" :src="quanbg" />
              <view
                class="w-full h-full pos-absolute pos-top-none pos-left-none flex flex-col justify-center items-center"
              >
                <wd-text :text="item.exchangeNotes" size="18px" color="#ff4345"></wd-text>
                <!-- <view class="mt-20px">
                  <wd-text text="100" size="42px" bold color="#ff4345"></wd-text>
                  <wd-text text="￥" size="20px" bold color="#ff4345"></wd-text>
                </view> -->
              </view>
            </view>
            <wd-img width="100%" :height="135" :src="item.goodImg" v-else />
          </view>
          <view class="min-h-44px truncate-2 color-#999">
            {{ item.goodName }}
          </view>

          <view class="flex justify-between items-center">
            <view class="flex justify-left items-start flex-col">
              <view class="flex justify-left items-center">
                <wd-text
                  :text="item.coinPrice.toString()"
                  :lines="2"
                  size="18px"
                  color="#F44D24"
                  class="font-bold"
                ></wd-text>
                <wd-text text="积分" :lines="2" size="12px" color="#F44D24" class="ml-1"></wd-text>
              </view>
              <wd-text
                :text="'已兑' + item.sellOut + '件'"
                :lines="1"
                size="12px"
                color="#999999"
              ></wd-text>
            </view>
            <wd-button
              v-if="item.stock > 0"
              size="small"
              custom-class="duihuanBtn m0"
              @click="gopath(item)"
            >
              去兑换
            </wd-button>
            <wd-button v-if="item.stock <= 0" size="small" disabled type="info">暂无货</wd-button>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>
<style lang="scss" scoped>
.pageBoxBg {
  overflow: hidden;
  background: #f3f4f6;
}

.navbg {
  box-sizing: border-box;
  padding: 0px 30px;
  background-image: url('https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

:deep(.z-paging-content) {
  background: #f3f4f6;
}

.tabsBox {
  background: transparent !important;
}

:deep(.duihuanBtn) {
  background: #f44d24 !important;
}
:deep(.wd-button) {
  margin: 0;
}

.tabTool {
  z-index: 10;
  width: 100vw;
  background: #f3f4f6;
}

.ListBox {
  height: auto;
  padding-bottom: 60px;
  margin-top: 114px;
  background: #f3f4f6;
}
</style>

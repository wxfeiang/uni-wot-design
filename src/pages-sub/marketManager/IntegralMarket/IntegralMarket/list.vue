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
import { ExchangeGoodsListProps } from './utils/types'
import useInter from './utils/useInter'
const title = ref('积分兑换')
const paging = ref(null)
const { sendInterProductList, sendInterInfo } = useInter()

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    minVal: Number(tabslist.value[active.value].name.split('-')[0] || 0),
    maxVal: Number(tabslist.value[active.value].name.split('-')[1] || 0),
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

const active = ref(0)

const tabslist = ref([
  { name: '0-1000', value: 1 },
  { name: '1000-2000', value: 2 },
  { name: '2000-3000', value: 3 },
  { name: '3000-4000', value: 4 },
  { name: '4000-5000', value: 5 },
  { name: '>5000', value: 6 },
])
const list = ref([])

function changeTab(e) {
  active.value = e.index
  paging.value.reload()
}

const gopath = (e) => {
  routeTo({
    url: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/info',
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
    class="pageBoxBg"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-between items-center navbg w-screen h-80px">
        <view class="flex justify-left items-start flex-col">
          <view class="text-base text-white mb-1">我的积分</view>
          <view class="text-xs text-slate-100 opacity-60">积分可兑换商品，避免失效请尽快使用</view>
        </view>
        <view class="text-2xl text-white">{{ surplusIntegral }}</view>
      </view>
      <wd-tabs
        v-model="active"
        swipeable
        custom-class="tabsBox"
        :slidable-num="4"
        @change="changeTab"
      >
        <block>
          <wd-tab :title="active > 0 ? '显示全部' : '分值浏览'"></wd-tab>
        </block>

        <block v-for="item in tabslist" :key="item.value">
          <wd-tab :title="item.name"></wd-tab>
        </block>
      </wd-tabs>
    </template>
    <view class="p2">
      <view v-for="(item, index) in list" class="p2 float-left w-1/2 box-border" :key="index">
        <view class="bg-white rounded-md p-8px">
          <view class="flex items-center justify-center">
            <wd-img :width="100" :height="100" :src="item.goodImg" />
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
            <wd-button size="small" custom-class="duihuanBtn" @click="gopath(item)">
              去兑换
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>
<style lang="scss" scoped>
.pageBoxBg {
  background: #f3f4f6;
}

.navbg {
  box-sizing: border-box;
  padding: 0px 30px;
  background-image: url('https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

:deep(.tabsBox .wd-tabs__line) {
  display: none;
}

:deep(.tabsBox .wd-tabs__nav-item) {
  height: 26px;
  margin: 8px 5px;
  line-height: 26px;

  color: rgba(244, 77, 36, 0.79);
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
}

:deep(.tabsBox .wd-tabs__nav-item:first-child) {
  height: 26px;
  margin: 8px 5px;
  font-weight: bold;
  line-height: 26px;
  color: rgba(244, 77, 36, 0.79);
  background: transparent !important;
  border-radius: 3px 3px 3px 3px;
}

:deep(.tabsBox .wd-tabs__nav-item.is-active) {
  background: rgb(255, 223, 212);
}

:deep(.tabsBox .wd-tabs__nav) {
  background: transparent;
}

.tabsBox {
  background: transparent;
}

:deep(.duihuanBtn) {
  background: #f44d24 !important;
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

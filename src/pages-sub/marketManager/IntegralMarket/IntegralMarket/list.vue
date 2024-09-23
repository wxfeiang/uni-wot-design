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

const state = ref<string>('loading')
const title = ref('积分兑换')
const tabsVal = ref(0)

const tabslist = ref([
  { name: '0-1000', value: 1 },
  { name: '1000-2000', value: 2 },
  { name: '2000-3000', value: 3 },
  { name: '3000-4000', value: 4 },
  { name: '4000-5000', value: 5 },
  { name: '>5000', value: 6 },
])
const list = ref([])

const pageNum = ref<number>(1)
const pageSize = ref<number>(1)
const over = ref<number>(false)

async function getList(item: any) {
  uni.showLoading({ title: '' })
  // 这里是请求数据
  list.value = 10
  state.value = 'loading'
  await uni.hideLoading()
}

function changeTab(e) {
  tabsVal.value = e.index
  console.log(e)
}

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

onReachBottom(async () => {
  if (!over.value) {
    await getList()
    pageNum.value = pageNum.value + 1
  } else if (over.value) {
    state.value = 'finished'
  }
})

onLoad(async () => {
  await getList()
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen">
    <dy-navbar :leftTitle="title" left></dy-navbar>
    <view class="fixed tabTool">
      <view class="flex justify-between items-center navbg w-screen h-80px">
        <view class="flex justify-left items-start flex-col">
          <view class="text-base text-white mb-1">我的积分</view>
          <view class="text-xs text-slate-100 opacity-60">积分可兑换商品，避免失效请尽快使用</view>
        </view>
        <view class="text-2xl text-white">32857</view>
      </view>

      <wd-tabs
        v-model="tabsVal"
        swipeable
        custom-class="tabsBox"
        :slidable-num="4"
        @change="changeTab"
      >
        <block>
          <wd-tab :title="tabsVal > 0 ? '显示全部' : '分值浏览'"></wd-tab>
        </block>

        <block v-for="item in tabslist" :key="item.value">
          <wd-tab :title="item.name"></wd-tab>
        </block>
      </wd-tabs>
    </view>
    <view class="p2 overflow-hidden ListBox">
      <view v-for="(item, index) in list" class="p2 float-left w-1/2 box-border" :key="index">
        <view class="bg-white rounded-md p2">
          <wd-img :width="100" :height="100" :src="item.image" />
          <wd-text :text="text" :lines="2" size="16px"></wd-text>
          <view class="flex justify-between items-center">
            <view class="flex justify-left items-start flex-col">
              <view class="flex justify-left items-center">
                <wd-text
                  :text="item.jifen"
                  :lines="2"
                  size="18px"
                  color="#F44D24"
                  class="font-bold"
                >
                  12312
                </wd-text>
                <wd-text text="积分" :lines="2" size="12px" color="#F44D24" class="ml-1">
                  积分
                </wd-text>
              </view>
              <wd-text
                :text="'已兑' + item.yidui + '件'"
                :lines="1"
                size="12px"
                color="#999999"
              ></wd-text>
            </view>
            <wd-button
              size="small"
              class="m0"
              custom-class="duihuanBtn"
              @click="gopath('/pages-sub/marketManager/IntegralMarket/IntegralMarket/info', item)"
            >
              去兑换
            </wd-button>
          </view>
        </view>
      </view>
      <wd-loadmore custom-class="loadmore" state="loading" />
    </view>
  </view>
  <!-- </view> -->
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

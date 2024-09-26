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
import orderInter from './utils/orderInter'

const { sendOrderInfo, sendOrderList } = orderInter()
const paging = ref(null)

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    shopId: 30561,
    // merchantId: '',
    // orderStatus: ''
  }
  // 调用接口获取数据
  try {
    const data: any = await sendOrderList(params)
    list.value = data.content as any
    paging.value.complete(list.value)
  } catch (error) {
    paging.value.complete(false)
  }
}

const title = ref('订单列表')
const tabsVal = ref('0')
const tabslist = ref([
  { name: '全部', value: '0' },
  { name: '待付款', value: '1' },
  { name: '待发货', value: '2' },
  { name: '待收货', value: '3' },
  { name: '已完成', value: '4' },
  { name: '退换/取消', value: '5' },
])
const list = ref([])
const list2 = ref([])

const goback = function (url, e) {
  uni.navigateBack()
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

const goInfo = function (e) {
  routeTo({
    url: '/pages-sub/order/orderInfo',
    data: e,
  })
}

onLoad((options) => {
  tabsVal.value = options.tabsVal ? options.tabsVal : '1'
})
</script>

<template>
  <!--  <view class="pageBoxBg w-screen h-screen">-->
  <z-paging
    ref="paging"
    v-model="list"
    @query="queryList"
    :auto-show-system-loading="false"
    class="w-screen h-screen"
  >
    <template #top>
      <view class="tabTool w-screen">
        <wd-navbar safeAreaInsetTop placeholder :bordered="false">
          <template #left>
            <view class="flex justify-left items-center">
              <wd-icon name="thin-arrow-left" size="18px" @click="goback"></wd-icon>
              <view
                style="height: 22px; padding: 5px 15px; background: #f6f6f6"
                class="rounded-3xl px-4 text-left ml-2 overflow-hidden flex justify-left items-center"
              >
                <wd-icon name="search" size="16px" custom-class="mr-2 " color="#777777"></wd-icon>
                <input class="text-16px" />
              </view>
            </view>
          </template>
        </wd-navbar>

        <wd-tabs
          v-model="tabsVal"
          swipeable
          custom-class="tabsBox"
          :slidable-num="4"
          @change="changeTab"
        >
          <block v-for="item in tabslist" :key="item.value">
            <wd-tab :title="item.name" :name="item.value"></wd-tab>
          </block>
        </wd-tabs>
      </view>
    </template>
    <view class="pt-2 overflow-hidden ListBox pageBoxBg overflow-hidden">
      <view v-for="(item, index) in 5" class="float-left w-full box-border" :key="index">
        <wd-card>
          <template #title>
            <view class="flex justify-between items-center">
              <view class="flex justify-left items-center">
                <wd-img
                  :width="30"
                  :height="30"
                  round
                  src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
                />
                <wd-text text="无备注" size="16px" color="#777777" custom-class="ml-1"></wd-text>
                <wd-icon name="arrow-right" size="16px" class="ml-1" color="#777777"></wd-icon>
              </view>
              <wd-text text="代发货" size="14px" color="#777777" class=""></wd-text>
            </view>
          </template>
          <view v-for="(it, ind) in 2" :key="ind">
            <view class="flex justify-between items-center mt-2 mb-4">
              <wd-img
                :width="100"
                :height="100"
                radius="7"
                src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
              />
              <view class="ml-2 flex-1">
                <wd-text
                  text="知味观糕点礼盒杭州特产中式送礼送长辈中式糕点心中秋月节饼"
                  :lines="2"
                  size="16px"
                  color="#000000"
                  custom-class="font-bold"
                ></wd-text>
                <wd-text
                  text="圆形铁盒/盒"
                  :lines="1"
                  size="14px"
                  color="#757575"
                  custom-class="mt-1"
                ></wd-text>
                <view class="flex justify-between items-center mt-4">
                  <wd-text text="￥32111" size="16px" color="#000000"></wd-text>
                  <wd-text text="x1" size="14px" color="#777777" custom-class="ml-1"></wd-text>
                </view>
              </view>
            </view>
          </view>
          <view class="flex justify-end items-center my-3">
            <wd-text text="共6件 金额：" size="14px" color="#000000"></wd-text>
            <wd-text text="￥" size="14px" font-bold color="#d04b55" custom-class="ml-1"></wd-text>
            <wd-text text="2339" size="18px" font-bold color="#d04b55" class=""></wd-text>
          </view>
          <template #footer>
            <view class="flex justify-between items-center">
              <wd-text text="代发货" size="14px" color="#f0883a" class=""></wd-text>
              <view class="flex justify-right items-center">
                <wd-button
                  size="small"
                  plain
                  type="warning"
                  custom-class="inline-block ml-2"
                  style="width: 5rem"
                  @click="goInfo()"
                >
                  评价
                </wd-button>
                <wd-button
                  size="small"
                  plain
                  type="info "
                  custom-class="inline-block ml-2"
                  style="width: 5rem"
                >
                  立即使用
                </wd-button>
              </view>
            </view>
          </template>
        </wd-card>
      </view>
      <!--      <wd-loadmore custom-class="loadmore" state="loading"/>-->
    </view>
  </z-paging>
  <!--  </view>-->
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  overflow: hidden;
  background: #f3f4f6;
}

:deep(.wd-card__footer) {
  padding-top: 6px;
}

:deep(.wd-card__title-content) {
  padding-bottom: 6px;
}

:deep(.wd-input) {
  background: #f6f6f6;
}
:deep(.z-paging-content) {
  background: #f3f4f6;
}
</style>

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
import orderInter from './utils/orderInter'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const { sendOrderInfo, sendOrderList } = orderInter()
const paging = ref(null)

async function queryList(pageNo: number, pageSize: number) {
  const params = {
    page: pageNo,
    size: pageSize,
    statusStr: tabsVal.value === '-1' ? '' : tabsVal.value,
    orderFlag: 1,
    loginUserId: userStore.userInfo.userDId,
  }
  // 调用接口获取数据
  try {
    const data: any = await sendOrderList(params)

    list.value = data.records as any
    paging.value.complete(list.value)
    // paging.value.complete([])
  } catch (error) {
    paging.value.complete(false)
  }
}

const title = ref('订单列表')
const tabsVal = ref('')
const tabslist = ref([
  { name: '全部', value: '-1' },
  { name: '待付款', value: '1' },
  { name: '待发货', value: '10' },
  { name: '待收货', value: '11' },
  { name: '已完成', value: '2' },
  { name: '退换/取消', value: '3,20,21,22,23' },
])
const list = ref([])

const goback = function (url, e) {
  uni.navigateBack()
}

function changeTab(e) {
  tabsVal.value = e.name
  paging.value.reload()
}

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}
const goshop = function (shopId) {
  routeTo({ url: '/pages-sub/shopManager/shopHome', data: { id: shopId } })
}

onLoad((options) => {
  tabsVal.value = options.tabsVal ? options.tabsVal : ''
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
      <view v-for="(item, index) in list" class="float-left w-full box-border" :key="index">
        <wd-card>
          <template #title>
            <view class="flex justify-between items-center">
              <view class="flex justify-left items-center" @click="goshop(item.shopId)">
                <wd-img :width="30" :height="30" round :src="item.shopAvatar" />
                <wd-text
                  :text="item.shopName"
                  size="16px"
                  color="#777777"
                  custom-class="ml-1"
                ></wd-text>
                <wd-icon name="arrow-right" size="16px" class="ml-1" color="#777777"></wd-icon>
              </view>
              <wd-text
                v-if="item.status === 1"
                text="待付款"
                size="14px"
                color="#e3832a"
                class=""
              ></wd-text>
              <wd-text
                v-else-if="item.status === 10"
                text="待发货"
                size="14px"
                color="#e3832a"
                class=""
              ></wd-text>
              <wd-text
                v-else-if="item.status === 11"
                text="待收货"
                size="14px"
                color="#e3832a"
                class=""
              ></wd-text>
              <wd-text
                v-else-if="item.status === 2"
                text="已完成"
                size="14px"
                color="#e3832a"
                class=""
              ></wd-text>
              <wd-text v-else text="售后/退款" size="14px" color="#e3832a" class=""></wd-text>
            </view>
          </template>

          <view v-for="(it, ind) in item.sysOrderItemBeans" :key="ind">
            <view
              class="flex justify-between items-center mt-2 mb-4"
              @click="gopath('/pages/shop/shopInfo', { id: it.productSpuId })"
            >
              <wd-img :width="100" :height="100" radius="7" :src="JSON.parse(it.skuUrl)[0].data" />
              <view class="ml-2 flex-1">
                <wd-text
                  :text="it.productName"
                  :lines="2"
                  size="16px"
                  color="#000000"
                  custom-class="font-bold"
                ></wd-text>
                <wd-text
                  :text="item.skuName"
                  :lines="1"
                  size="14px"
                  color="#757575"
                  custom-class="mt-1"
                ></wd-text>
                <view class="flex justify-between items-center mt-4">
                  <wd-text
                    :text="`￥${it.skuSellingPrice?.toFixed(2)}`"
                    size="16px"
                    color="#000000"
                  ></wd-text>
                  <wd-text
                    :text="`x${it.productSkuCount}`"
                    size="14px"
                    color="#777777"
                    custom-class="ml-1"
                  ></wd-text>
                </view>
              </view>
            </view>
          </view>
          <view class="flex justify-end items-center my-3">
            <wd-text
              v-if="item.sysOrderItemBeans"
              :text="`共${item.sysOrderItemBeans.length}件 金额：`"
              size="14px"
              color="#000000"
            ></wd-text>
            <wd-text text="￥" size="14px" font-bold color="#d04b55" custom-class="ml-1"></wd-text>
            <wd-text
              :text="item.orderActualAmount"
              size="18px"
              font-bold
              color="#d04b55"
              class=""
            ></wd-text>
          </view>
          <template #footer>
            <view class="flex justify-between items-center">
              <view></view>
              <view class="flex justify-right items-center">
                <template v-if="tabsVal == '2'">
                  <wd-button
                    size="small"
                    plain
                    type="warning"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                    @click="goInfo(item.orderId)"
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
                </template>
                <template v-else-if="tabsVal == '1'">
                  <wd-button
                    size="small"
                    plain
                    type="info"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                  >
                    取消订单
                  </wd-button>
                  <wd-button
                    size="small"
                    plain
                    type="warning"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                  >
                    去支付
                  </wd-button>
                </template>
                <template v-else-if="tabsVal == '10'">
                  <wd-button
                    size="small"
                    plain
                    type="info"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                  >
                    申请退款
                  </wd-button>
                  <wd-button
                    size="small"
                    plain
                    type="info"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                  >
                    联系催单
                  </wd-button>
                </template>
                <template v-else-if="tabsVal == '11'">
                  <wd-button
                    size="small"
                    plain
                    type="info"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                  >
                    查看物流
                  </wd-button>
                  <wd-button
                    size="small"
                    plain
                    type="warning"
                    custom-class="inline-block ml-2"
                    style="width: 5rem"
                  >
                    确认收货
                  </wd-button>
                </template>
                <template v-else>退换/取消</template>
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

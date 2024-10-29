'
<route lang="json5" type="page">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import orderInter from './utils/orderInter'
import { getShopInfo } from '@/service/api/shop'
import { openEmbeddedMiniProgram } from '@/utils/uniapi'
import { useToast } from 'wot-design-uni/index'
import { removeT, routeTo } from '@/utils'

const toast = useToast()

const { submitTickets, sendOrderInfo } = orderInter()

const title = ref('平台介入')

const orderInfo = ref({})
const orderID = ref('')

const ticketsInfo = ref({
  reason: '',
  reasonInd: '',
  description: '',
  imageListstr: '',
  phone: '',
})

const imageList = ref([])
const time = ref<number>(108000)
const reasonList = ref(['不想要了', '信息填错，重新下单', '卖家缺货', '物流原因', '其他原因'])

function choose() {
  showPop.value = false
}

function submit() {
  submitTickets({ orderId: orderInfo.value.orderId }).then((res) => {
    uni.redirectTo({ url: '/pages-sub/order/orderList' })
  })
}

const showSKU = function (obj) {
  const SKU = []
  Object.values(obj).map((i) => SKU.push(i))

  return SKU.join(',')
}

async function getInfo(id: any) {
  // 这里是请求数据
  const da = { orderId: id }
  orderInfo.value = await sendOrderInfo(da)
  time.value = new Date(orderInfo.value.orderTime).getTime() + 1000 * 60 * 31 - new Date().getTime()
}

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

function goback(url, e) {
  uni.navigateBack()
}

onLoad(async (options) => {
  orderID.value = options.id
  if (orderID.value) {
    await getInfo(orderID.value)
  }
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen">
    <view class="tabTool w-screen">
      <dy-navbar
        :leftTitle="title"
        left
        custom-style="background: transparent;position: relative;"
      ></dy-navbar>

      <view class="border-box">
        <wd-card class="cardno">
          <view class="my-2">
            <view class="mb-1">
              <wd-text text="关联订单" color="#333" size="16" bold></wd-text>
            </view>
            <view>
              <view v-for="(it, ind) in orderInfo.sysOrderItemBeans" :key="ind">
                <view
                  class="flex justify-between items-center mt-2 mb-4"
                  @click="gopath('/pages-sub/homeManager/shopInfo', { id: it.productSpuId })"
                >
                  <wd-img
                    :width="100"
                    :height="100"
                    radius="7"
                    :src="JSON.parse(it.skuUrl)[0].data"
                  />
                  <view class="ml-2 flex-1">
                    <wd-text
                      :text="it.productName"
                      :lines="2"
                      size="16px"
                      color="#000000"
                      custom-class="font-bold"
                    ></wd-text>
                    <wd-text
                      :text="showSKU(JSON.parse(it.skuName))"
                      :lines="1"
                      size="14px"
                      color="#757575"
                      class="mt-1"
                    ></wd-text>
                    <view class="flex justify-between items-center mt-4">
                      <wd-text
                        :text="'￥' + it.skuSellingPrice"
                        size="16px"
                        color="#000000"
                      ></wd-text>
                      <wd-text
                        :text="'x' + it.productSkuCount"
                        size="14px"
                        color="#777777"
                        custom-class="ml-1"
                      ></wd-text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="border"></view>

          <view class="my-2">
            <view class="mb-1">
              <wd-text text="申请原因" color="#333" size="16" bold></wd-text>
            </view>
            <view>
              <wd-cell-group>
                <wd-picker
                  custom-style="padding:0"
                  :columns="reasonList"
                  v-model="ticketsInfo.reasonInd"
                  @confirm="handleConfirm"
                />
              </wd-cell-group>
            </view>
          </view>
          <view class="border"></view>
          <view class="my-2">
            <view class="mb-1">
              <wd-text text="问题描述" color="#333" size="16" bold></wd-text>
            </view>
            <view>
              <wd-cell-group>
                <wd-textarea
                  custom-style="padding:0"
                  v-model="ticketsInfo.description"
                  placeholder="请填问题描述"
                />
              </wd-cell-group>
            </view>
          </view>
          <view class="border"></view>
          <view class="my-2">
            <view class="mb-1">
              <wd-text text="上传凭证" color="#333" size="16" bold></wd-text>
            </view>
            <view>
              <dy-upload v-model="ticketsInfo.imageListstr"></dy-upload>
            </view>
          </view>
          <view class="border"></view>
          <view class="my-2">
            <view class="mb-1">
              <wd-text text="联系方式" color="#333" size="16" bold></wd-text>
            </view>
            <view>
              <wd-cell-group>
                <wd-input v-model="ticketsInfo.phone" placeholder="请输入联系电话" no-border />
              </wd-cell-group>
            </view>
          </view>
        </wd-card>
      </view>
    </view>

    <view class="px-10px py-10px fixed bottom-0 left-0 right-0 bg-#fff safe-area-after">
      <wd-button block :round="false" @click="submit(ticketsInfo)">提 交</wd-button>
    </view>
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  position: relative;
  background-image: linear-gradient(#daebfd, #fff);
}

.con {
  background: #fff;
  border-radius: 5px;
}

:deep(.wd-card__footer) {
  padding-top: 6px;
}

:deep(.wd-card__title-content) {
  padding-bottom: 6px;
}

:deep(.wd-card__footer) {
  padding: 5px 0 !important;
}

:deep(.wd-card__title-content) {
  padding: 5px 0 !important;
}

:deep(.wd-picker__cell) {
  padding: 0px !important;
}

.border {
  width: 100%;
  height: 1px;
  margin: 15px 0;
  background: #fdfdfd;
}

.tabTool {
  padding-bottom: 120px;
}
</style>

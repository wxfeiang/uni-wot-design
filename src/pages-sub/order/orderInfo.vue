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
import { getShopInfo } from '@/service/api/shop'
import { openEmbeddedMiniProgram } from '@/utils/uniapi'
import { useToast } from 'wot-design-uni/index'

const toast = useToast()
const { sendOrderInfo, sendOrderList, changeOrderStatus } = orderInter()

const paging = ref(null)
const chooseIndex = ref(-1)

const title = ref('订单详情')

const orderInfo = ref({})
const shopDetails = ref({})

const showPop = ref(false)

function openPop(e) {
  showPop.value = true
}

const time = ref<number>(108000)
const dispay = ref(false)

function closePop() {
  showPop.value = false
}

function Choose(index) {
  chooseIndex.value = index
  // console.log('chooseIndex', index)
  // skuInfo.value = skuList.value[index]
  closePop()
}

function timefinish() {
  dispay.value = true
  changeOrderStatus({ orderId: orderInfo.value.orderId }).then((res) => {
    uni.redirectTo({ url: '/pages-sub/order/orderList' })
  })
}

async function goPay() {
  if (dispay.value) {
    toast.warning('订单已失效！')
  } else {
    const params = {
      // invoice: orderInfo.value.orderTotalFee, // 订单金额
      // actualPrice: orderInfo.value.orderActualAmount, // 实际支付金额
      // merchantId: orderInfo.value.merchantId,
      // couponId: orderInfo.value.couponId,
      actualPrice: orderInfo.value.orderActualAmount, // 实际支付金额
      orderId: orderInfo.value.orderId,
      payStatus: 1,
      payType: 'order',
    }
    console.log('🍩', params)
    await openEmbeddedMiniProgram('/pages/pay/index', params)
  }
}

const getShopDetails = (shopId) => {
  getShopInfo({ shopId }).then((res) => {
    shopDetails.value = res
  })
}

async function getInfo(id: any) {
  uni.showLoading({ title: '' })
  // 这里是请求数据
  const da = { orderId: id }
  const data: any = await sendOrderInfo(da)

  time.value = new Date(data.orderTime).getTime() + 1000 * 60 * 30 - new Date().getTime()
  if (orderInfo.value.stutas === 1 && time.value <= 0) {
    // 修改订单状态
    changeOrderStatus({ orderId: id }).then((res) => {
      uni.redirectTo({ url: '/pages-sub/order/orderList' })
    })
  }

  orderInfo.value = data

  if (data.shopId) {
    getShopDetails(data.shopId)
  }

  uni.hideLoading()
}

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

const showSKU = function (obj) {
  const SKU = []
  Object.values(obj).map((i) => SKU.push(i))

  return SKU.join(',')
}
const goshop = function () {
  routeTo({ url: '/pages-sub/shopManager/shopHome', data: { id: orderInfo.value.shopId } })
}

const goback = function (url, e) {
  uni.navigateBack()
}
const copy = function (data) {
  uni.setClipboardData({
    data,
    success: function () {
      uni.getClipboardData({
        success: function (res) {
          uni.showToast({
            title: '复制成功',
          })
        },
      })
    },
  })
}

onLoad((options) => {
  showPop.value = options.showPop?.showPop || false
  getInfo(options.id)
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen pt-4 pb-4">
    <view class="tabTool w-screen">
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-center items-center flex-col">
        <wd-text
          text="等待付款"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-count-down
            :time="time"
            size="14px"
            color="#e3832a"
            custom-class="mr-1 time"
            @finish="timefinish()"
          />

          <wd-text
            text="后订单将自动取消"
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <wd-card class="cardno">
        <view class="flex justify-between items-center py-2">
          <view class="flex justify-left items-center">
            <wd-icon name="location" size="22px"></wd-icon>
            <view class="flex justify-left items-start flex-col ml-1">
              <wd-text
                :text="orderInfo.receiverName + ' ' + orderInfo.receiverTel"
                size="16px"
                color="#333333"
                custom-class="font-bold"
              ></wd-text>
              <wd-text
                :text="orderInfo.receiverAddress"
                size="16px"
                color="#777777"
                custom-class="mt-1"
              ></wd-text>
            </view>
          </view>
        </view>
      </wd-card>

      <wd-card>
        <template #title>
          <view class="flex justify-between items-center">
            <view class="flex justify-left items-center" @click="goshop">
              <wd-img :width="30" :height="30" round :src="shopDetails.shopAvatar" />
              <wd-text
                :text="shopDetails.name"
                size="16px"
                color="#777777"
                custom-class="ml-2"
              ></wd-text>
              <wd-icon name="arrow-right" size="16px" custom-class="ml-1" color="#777777"></wd-icon>
            </view>
            <wd-text
              v-if="orderInfo.status === 1"
              text="待付款"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text
              v-else-if="orderInfo.status === 10"
              text="待发货"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text
              v-else-if="orderInfo.status === 11"
              text="待收货"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text
              v-else-if="orderInfo.status === 2"
              text="已完成"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text v-else text="售后/退款" size="14px" color="#e3832a" class=""></wd-text>
          </view>
        </template>
        <view v-for="(it, ind) in orderInfo.sysOrderItemBeans" :key="ind">
          <view
            class="flex justify-between items-center mt-2 mb-4"
            @click="gopath('/pages-sub/homeManager/shopInfo', { id: it.productSpuId })"
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
                :text="showSKU(JSON.parse(it.skuName))"
                :lines="1"
                size="14px"
                color="#757575"
                class="mt-1"
              ></wd-text>
              <view class="flex justify-between items-center mt-4">
                <wd-text :text="'￥' + it.skuSellingPrice" size="16px" color="#000000"></wd-text>
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
      </wd-card>

      <wd-card class="cardno">
        <view class="py-2">
          <view class="flex justify-left items-center mb-1">
            <wd-text text="订单备注" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              :text="orderInfo.orderNote ? orderInfo.orderNote : '无备注'"
              size="14px"
              color="#333333"
              custom-class="ml-2"
            ></wd-text>
          </view>
        </view>
      </wd-card>
      <wd-card class="cardno">
        <view class="py-2">
          <view class="flex justify-between items-center mb-1">
            <view class="flex justify-left items-center" style="width: calc(100% - 35px)">
              <wd-text text="订单编号" size="14px" color="#777777" custom-class="tit"></wd-text>
              <view class="ml-2 over2">{{ orderInfo.orderId }}</view>
            </view>
            <view class="tit2" @click="copy(orderInfo.orderId)">复制</view>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="下单时间" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              :text="orderInfo.orderTime"
              size="14px"
              color="#333333"
              custom-class="ml-2"
            ></wd-text>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="配送方式" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              v-if="orderInfo.deliveryMode === 0"
              text="快递配送"
              size="14px"
              color="#333333"
              custom-class="ml-2"
            ></wd-text>
            <wd-text
              v-if="orderInfo.deliveryMode === 1"
              text="上门自提"
              size="14px"
              color="#333333"
              custom-class="ml-2"
            ></wd-text>
            <wd-text
              v-if="orderInfo.deliveryMode === 2"
              text="同城配送"
              size="14px"
              color="#333333"
              custom-class="ml-2"
            ></wd-text>
          </view>
        </view>
      </wd-card>

      <wd-card class="cardno">
        <view class="py-2">
          <view class="flex justify-between items-center mb-1">
            <wd-text text="运费" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              :text="'￥' + orderInfo.deliveryAmount"
              size="14px"
              color="#333333"
              class=""
            ></wd-text>
          </view>
          <view class="flex justify-between items-center mb-1">
            <wd-text text="商品总价" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              :text="'￥' + orderInfo.orderTotalFee"
              size="14px"
              color="#333333"
              class=""
            ></wd-text>
          </view>
          <view class="flex justify-between items-center mb-1">
            <wd-text text="优惠券" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              :text="'￥' + orderInfo.couponAmount"
              size="14px"
              color="#333333"
              class=""
            ></wd-text>
          </view>
          <view class="flex justify-end items-center my-3">
            <wd-text text="总计：" size="14px" color="#000000"></wd-text>
            <wd-text text="￥" size="14px" font-bold color="#d04b55" custom-class="ml-1"></wd-text>
            <wd-text
              :text="orderInfo.orderActualAmount"
              size="18px"
              font-bold
              color="#d04b55"
              class=""
            ></wd-text>
          </view>
        </view>
      </wd-card>

      <view class="mt-8 mx-4">
        <view class="mb-20px">
          <wd-button block :round="false" @click="goPay" v-if="!dispay" custom-class="duihuanBtn">
            立即支付
          </wd-button>
          <wd-button block :round="false" disabled v-else type="info">订单失效</wd-button>
        </view>
      </view>
    </view>
    <!--    <wd-overlay :show="showPop" @click="showPop = false"/>-->
    <wd-action-sheet v-model="showPop" @close="closePop" title="取消订单">
      <!--  <wd-popup v-model="showPop" position="bottom" closable @close="closePop">-->
      <view class="px-4">
        <view class="pb-4">
          <wd-text text="请选择取消原因" size="14px" color="#777777"></wd-text>
        </view>

        <wd-radio-group v-model="chooseIndex" shape="dot" @change="Choose" checked-color="#f44d24">
          <wd-radio :value="1">不想要了</wd-radio>
          <wd-radio :value="2">信息填错，重新下单</wd-radio>
          <wd-radio :value="3">卖家缺货</wd-radio>
          <wd-radio :value="4">物流原因</wd-radio>
          <wd-radio :value="5">其他原因</wd-radio>
        </wd-radio-group>

        <wd-button type="warning" custom-class="duihuanBtn   mt-4 " @click="closePop">
          确定
        </wd-button>
      </view>

      <!--  </wd-popup>-->
    </wd-action-sheet>
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  position: relative;
  background: #f3f4f6;
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

:deep(.duihuanBtn) {
  width: 100% !important;
  color: #ffffff;
  background: #f44d24 !important;
}

:deep(.is-checked .wd-radio__shape) {
  background-color: #f44d24 !important;
  border-color: #f44d24 !important;
}

:deep(.time) {
  font-size: 14px;
  color: #e3832a !important;
}

:deep(.tit) {
  width: 4rem;
  margin-right: 5px;
}

:deep(.tit2) {
  width: 30px;
  margin-left: 5px;
  font-size: 14px;
  color: #777777;
}

:deep(.over2) {
  flex: 1;
  width: 100%;
  overflow: hidden; //超出隐藏
  font-size: 14px;
  color: #333333;
  text-overflow: ellipsis; //溢出显示省略号
  white-space: nowrap; //不折行
}
</style>

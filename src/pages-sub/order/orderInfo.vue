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
const {
  sendOrderInfo,
  sendOrderList,
  sendchangeOrderStatus,
  updateOrderBeanStatusById,
  sendOrderUpdate,
  sendRefund,
  sendRefundRequest,
  sendRefundReview,
} = orderInter()
const paging = ref(null)
const chooseIndex = ref<number>(0)
const chooseIndexTK = ref<number>(0)

const title = ref('订单详情')

const orderInfo = ref({})
const shopDetails = ref({})

const showPop = ref(false)
const showPopTK = ref(false)
const orderID = ref('')

function openPop(e) {
  showPop.value = true
}

function openPopTK(e) {
  showPopTK.value = true
}

const time = ref<number>(108000)
const dispay = ref(false)
const canList = ref(['不想要了', '信息填错，重新下单', '卖家缺货', '物流原因', '其他原因'])
const canListTK = ref(['不想要了', '信息填错，重新下单', '卖家缺货', '物流原因', '其他原因'])

function closePop() {
  showPop.value = false
}

function closePopTK() {
  showPopTK.value = false
}

function Choose(index) {
  chooseIndex.value = index.value
}

function ChooseTK(index) {
  chooseIndexTK.value = index.value
}

function timefinish() {
  dispay.value = true
  sendchangeOrderStatus({ orderId: orderInfo.value.orderId }).then((res) => {
    uni.redirectTo({ url: '/pages-sub/order/orderList' })
  })
}

function cancal() {
  sendchangeOrderStatus({
    orderId: orderInfo.value.orderId,
    note: canList.value[chooseIndex.value],
  }).then((res) => {
    closePop()
    // uni.redirectTo({ url: '/pages-sub/order/orderList' })
    uni.redirectTo({ url: '/pages-sub/order/orderInfo?id=' + orderInfo.value.orderId })
  })
}

async function goPay() {
  if (dispay.value) {
    // toast.warning('订单已失效！')
    uni.showToast({
      title: '订单已失效',
    })
  } else {
    const sysOrderItemBeans = JSON.parse(JSON.stringify(orderInfo.value.sysOrderItemBeans))
    orderInfo.value = await sendOrderUpdate({ orderId: orderInfo.value.orderId })
    orderInfo.value.sysOrderItemBeans = sysOrderItemBeans
    orderID.value = orderInfo.value.orderId
    const params = {
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
  // 这里是请求数据
  const da = { orderId: id }
  orderInfo.value = await sendOrderInfo(da)

  time.value = new Date(orderInfo.value.orderTime).getTime() + 1000 * 60 * 31 - new Date().getTime()
  if (orderInfo.value.status === 1 && time.value <= 0) {
    // 修改订单状态
    await sendchangeOrderStatus({ orderId: id, note: '' }).then((res) => {
      uni.redirectTo({ url: '/pages-sub/order/orderList' })
    })
  }

  if (orderInfo.value.shopId) {
    await getShopDetails(orderInfo.value.shopId)
  }
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

function goshop() {
  routeTo({ url: '/pages-sub/shopManager/shopHome', data: { id: orderInfo.value.shopId } })
}

function goback(url, e) {
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

function goLogistics(orderId) {
  routeTo({ url: '/pages-sub/order/logistic', data: { id: orderId } })
}

function goEvaluate(orderId) {
  routeTo({ url: '/pages-sub/shopManager/addEvaluate', data: { id: orderId } })
}

function goRefund(orderId, type) {
  uni.showModal({
    title: '退款确认',
    content: '您确定要申请退款吗',
    success: async function (res) {
      if (res.confirm) {
        const da = {
          orderId,
          note: canListTK.value[chooseIndexTK.value],
          refundMethod: 1,
        }
        const date = await sendRefundRequest(da)

        if (date) {
          showPopTK.value = false
          routeTo({ url: '/pages-sub/order/orderInfo', data: { id: orderId } })
        } else {
          uni.showToast({
            title: '申请失败',
            duration: 2000,
          })
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
function gotickets(orderId) {
  routeTo({ url: '/pages-sub/order/tickets', data: { id: orderId } })
}

function call(Phone) {
  if (Phone) {
    uni.makePhoneCall({
      phoneNumber: Phone,
    })
  }
}

function gosure(orderId, status) {
  const data = { orderId, status }
  updateOrderBeanStatusById(data).then((res) => {
    uni.redirectTo({ url: '/pages-sub/order/orderInfo', query: { id: orderId } })
  })
}

onLoad(async (options) => {
  showPop.value = options.showPop ? options.showPop : false
  showPopTK.value = options.showPopTK ? options.showPopTK : false
  orderID.value = options.id

  // getInfo(options.id)
})

onShow(async (options) => {
  if (orderID.value) {
    await getInfo(orderID.value)
  }
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen pt-4 pb-4">
    <view class="tabTool w-screen">
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-center items-center flex-col" v-if="orderInfo.status === 1">
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
      <view v-else-if="orderInfo.status === 10" class="flex justify-center items-center flex-col">
        <wd-text
          text="等待发货"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text
            text="订单商品将尽快发出，请您耐心等待"
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view v-else-if="orderInfo.status === 11" class="flex justify-center items-center flex-col">
        <wd-text
          text="等待收货"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text
            text="订单商品运输中，请您耐心等待"
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view v-else-if="orderInfo.status === 2" class="flex justify-center items-center flex-col">
        <wd-text
          text="交易完成"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view v-else-if="orderInfo.status === 22" class="flex justify-center items-center flex-col">
        <wd-text
          text="退款成功"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view v-else-if="orderInfo.status === 23" class="flex justify-center items-center flex-col">
        <wd-text
          text="退款失败"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view v-else-if="orderInfo.status === 3" class="flex justify-center items-center flex-col">
        <wd-text
          text="订单取消"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view
        v-else-if="orderInfo.status === 25 || orderInfo.status === 20"
        class="flex justify-center items-center flex-col"
      >
        <wd-text
          text="申请仅退款"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view v-else class="flex justify-center items-center flex-col">
        <wd-text
          text="交易关闭"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view class="mt-4">
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
      </view>
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
              v-else-if="orderInfo.status === 25 || orderInfo.status === 20"
              text="申请仅退款"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text
              v-else-if="orderInfo.status === 23"
              text="退款失败"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text
              v-else-if="orderInfo.status === 22"
              text="退款成功"
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
            <wd-text
              v-else-if="orderInfo.status === 3"
              text="已取消"
              size="14px"
              color="#e3832a"
              class=""
            ></wd-text>
            <wd-text v-else text="已完成" size="14px" color="#e3832a" class=""></wd-text>
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

      <wd-card class="cardno" v-if="orderInfo.merchantAuditStatus === '1'">
        <view class="py-2">
          <view class="flex justify-left items-center mb-1">
            <wd-text text="申请退款:" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text text="申请拒绝" size="14px" color="#333333" custom-class="ml-2"></wd-text>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="拒绝原因" size="14px" color="#777777" custom-class="tit"></wd-text>
            <wd-text
              :text="orderInfo.merchantAuditNote"
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
              :text="removeT(orderInfo.orderTime)"
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

      <view class="mt-8 mx-4 pb-80px">
        <view class="mb-20px">
          <template v-if="orderInfo.status == 1">
            <wd-button block :round="false" @click="goPay" v-if="!dispay" custom-class="duihuanBtn">
              立即支付
            </wd-button>
            <wd-button block plain type="info" :round="false" v-else custom-class="duihuanBtn2">
              订单失效
            </wd-button>
          </template>
          <template v-else-if="orderInfo.status == 2">
            <wd-button
              size="small"
              block
              type="info "
              custom-class="inline-block  mb-2"
              style="width: 5rem"
              @click="call(orderInfo.shopPhone)"
            >
              联系商家
            </wd-button>
            <wd-button
              size="small"
              block
              type="info"
              custom-class="inline-block  mb-2"
              style="width: 5rem"
              @click="gotickets(orderInfo.orderId)"
            >
              平台介入
            </wd-button>
            <wd-button
              block
              :round="false"
              @click="goEvaluate(orderInfo.orderId)"
              custom-class="duihuanBtn  mb-2"
            >
              去评价
            </wd-button>
          </template>
          <template v-else-if="orderInfo.status == 10">
            <wd-button
              block
              plain
              type="info"
              custom-class="inline-block mb-2"
              style="width: 5rem"
              @click="goRefund(orderInfo.orderId)"
            >
              {{ orderInfo.merchantAuditStatus === '1' ? '再次申请退款' : '申请退款' }}
            </wd-button>
          </template>
          <template v-else-if="orderInfo.status == 11">
            <wd-button
              block
              type="warning"
              custom-class="inline-block mb-2"
              style="width: 5rem"
              @click="goNext(orderInfo.orderId)"
            >
              确认收货
            </wd-button>
            <wd-button
              block
              plain
              type="info"
              custom-class="inline-block mb-2"
              style="width: 5rem"
              @click="goRefund(orderInfo.orderId)"
            >
              {{ orderInfo.merchantAuditStatus === '1' ? '再次申请退款' : '申请退款' }}
            </wd-button>
          </template>
          <template v-else></template>
        </view>
      </view>
    </view>

    <wd-action-sheet v-model="showPop" v-if="showPop" @close="closePop" title="取消订单">
      <view class="px-4">
        <view class="pb-4">
          <wd-text text="请选择取消原因" size="14px" color="#777777"></wd-text>
        </view>

        <wd-radio-group v-model="chooseIndex" shape="dot" @change="Choose" checked-color="#f44d24">
          <wd-radio :value="index" v-for="(it, index) in canList" :key="index">{{ it }}</wd-radio>
        </wd-radio-group>

        <wd-button type="warning" custom-class="duihuanBtn   mt-4 " @click="cancal">确定</wd-button>
      </view>
    </wd-action-sheet>

    <wd-action-sheet v-model="showPopTK" v-if="showPopTK" @close="closePopTK" title="申请退款">
      <view class="px-4">
        <view class="pb-4">
          <wd-text text="请选择退款原因" size="14px" color="#777777"></wd-text>
        </view>

        <wd-radio-group
          v-model="chooseIndexTK"
          shape="dot"
          @change="Choose"
          checked-color="#f44d24"
        >
          <wd-radio :value="index" v-for="(it, index) in canListTK" :key="index">{{ it }}</wd-radio>
        </wd-radio-group>

        <wd-button
          type="warning"
          custom-class="duihuanBtn   mt-4 "
          @click="goRefund(orderInfo.orderId)"
        >
          确定
        </wd-button>
      </view>
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

:deep(.duihuanBtn2) {
  width: 100% !important;
  color: #ffffff;
  background: #f44d24 !important;
  opacity: 0.5;
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
:deep(.tabTool) {
  height: 100%;
  overflow: auto;
}
</style>

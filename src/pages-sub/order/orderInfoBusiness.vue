<route lang="json5" type="page">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo, removeT } from '@/utils'
import orderInter from './utils/orderInter'
import { getShopInfo } from '@/service/api/shop'
import { openEmbeddedMiniProgram } from '@/utils/uniapi'
import { useToast } from 'wot-design-uni/index'
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import morentouxiang from '@/pages-sub/shopManager/static/shoukuanma.png'

const toast = useToast()
const {
  sendOrderInfo,
  sendOrderList,
  sendchangeOrderStatus,
  updateOrderBeanStatusById,
  sendOrderUpdate,
  sendRefund,
  sendRefundReview,
  sendPostList,
  sendPostInfo,
  sendhuifu,
} = orderInter()
const paging = ref(null)
const chooseIndex = ref<number>(0)

const title = ref('订单详情')

const orderInfo = ref({})
const shopDetails = ref({})

const showPop = ref(false)
const orderID = ref('')
const HFval = ref('')

function openPop(e) {
  showPop.value = true
}

const time = ref<number>(108000)
const postNumber = ref('')
const postType = ref('')
const postTypeName = ref('')
const Columns = ref([])
const auditNote = ref('')

const canList = ref(['不想要了', '信息填错，重新下单', '卖家缺货', '物流原因', '其他原因'])

function closePop() {
  showPop.value = false
}

function Choose(index) {
  chooseIndex.value = index.value
}

function submitPostInfo(orderId) {
  if (postNumber.value === '') {
    toast.warning('请输入物流单号')
  } else if (postType.value === '') {
    toast.warning('请选择物流公司')
  } else {
    const da = {
      orderId: orderInfo.value.orderId,
      sendAddressName: '',
      waybillVO: {
        addSource: 0,
        deliveryId: postType.value,
        deliveryName: postTypeName.value,
        customRemark: '',
        waybillId: postNumber.value,
        type: 2,
      },
    }
    sendPostInfo(da).then((e: any) => {
      if (e) {
        toast.success('发货成功')
      } else {
        toast.success(e.msg)
      }
      routeTo({
        url: '/pages-sub/order/orderInfoBusiness',
        data: { id: orderId },
        navType: NAVIGATE_TYPE.REDIRECT_TO,
      })
    })
  }
}

function timefinish() {
  dispay.value = true
  sendchangeOrderStatus({ orderId: orderInfo.value.orderId }).then((res) => {
    uni.redirectTo({ url: '/pages-sub/order/orderList' })
  })
}

function goInfoQX(orderId, note = '') {
  uni.showModal({
    title: '取消确认',
    content: '您确定要取消订单吗',
    success: async function (res) {
      if (res.confirm) {
        const da = {
          orderId,
          note,
        }
        const date = await sendchangeOrderStatus(da)
        if (date.errCode === 'SUCCESS') {
          routeTo({
            url: '/pages-sub/order/orderInfoBusiness',
            data: { id: orderId },
            navType: NAVIGATE_TYPE.REDIRECT_TO,
          })
        } else {
          uni.showToast({
            title: date.errMsg,
            duration: 2000,
          })
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
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

  time.value = new Date(orderInfo.value.orderTime).getTime() + 1000 * 60 * 30 - new Date().getTime()
  if (orderInfo.value.status === 1 && time.value <= 0) {
    // 修改订单状态
    await sendchangeOrderStatus({ orderId: id, note: '' }).then((res) => {
      uni.redirectTo({ url: '/pages-sub/order/orderList' })
    })
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
  routeTo({ url: '/pages-sub/order/logistics', data: { id: orderId } })
}

function handleConfirm(e) {
  postTypeName.value = e.selectedItems.deliveryId
  postType.value = e.selectedItems.bizId
}

function submitHF(orderId) {
  // product/app/evaluation/reply
  if (HFval.value === '') {
    toast.warning('请输入回复内容')
  } else {
    const da = {
      evaluationId: orderInfo.value.productEvaluationList[0].id,
      replyContent: HFval.value,
    }
    sendhuifu(da).then((e: any) => {
      if (e) {
        toast.success('回复成功')
      } else {
        toast.success(e.msg)
      }
      routeTo({
        url: '/pages-sub/order/orderInfoBusiness',
        data: { id: orderId },
        navType: NAVIGATE_TYPE.REDIRECT_TO,
      })
    })
  }
}

function goTk(orderId) {
  uni.showModal({
    title: '退款确认',
    content: '您确定要退款吗',
    success: async function (res) {
      if (res.confirm) {
        const da = {
          orderId,
          auditStatus: 0,
          auditNote: '同意',
        }
        const date: any = await sendRefundReview(da)
        if (date) {
          const da2 = {
            orderId,
            note: '',
          }
          await sendRefund(da2)
          uni.showToast({
            title: '退款成功！',
            duration: 2000,
          })
          routeTo({
            url: '/pages-sub/order/orderInfoBusiness',
            data: { id: orderId },
            navType: NAVIGATE_TYPE.REDIRECT_TO,
          })
        } else {
          uni.showToast({
            title: date.errMsg,
            duration: 2000,
          })
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

function goRefund(orderId, note = '') {
  uni.showModal({
    title: '退款确认',
    content: '您确定要申请退款吗',
    success: async function (res) {
      if (res.confirm) {
        const da = {
          orderId,
          note,
        }
        const date = await sendRefund(da)
        if (date.errCode === 'SUCCESS') {
          routeTo({
            url: '/pages-sub/order/orderInfoBusiness',
            data: { id: orderId },
            navType: NAVIGATE_TYPE.REDIRECT_TO,
          })
        } else {
          uni.showToast({
            title: date.errMsg,
            duration: 2000,
          })
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

function gosure(orderId, status) {
  const data = { orderId, status }
  updateOrderBeanStatusById(data).then((res) => {
    routeTo({
      url: '/pages-sub/order/orderInfoBusiness',
      data: { id: orderId },
      navType: NAVIGATE_TYPE.REDIRECT_TO,
    })
  })
}

function refuse(orderId) {
  if (auditNote.value === '') {
    uni.showToast({
      title: '请填写理由',
      duration: 2000,
      icon: 'none',
    })
  } else {
    uni.showModal({
      title: '拒绝确认',
      content: '您确定要拒绝退款吗',
      success: async function (res) {
        if (res.confirm) {
          const da = {
            orderId,
            auditStatus: 1,
            auditNote: auditNote.value,
          }

          sendRefundReview(da).then((res) => {
            routeTo({
              url: '/pages-sub/order/orderInfoBusiness',
              data: { id: orderId },
              navType: NAVIGATE_TYPE.REDIRECT_TO,
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  }
}

onLoad(async (options) => {
  showPop.value = options.showPop ? options.showPop : false
  orderID.value = options.id
  Columns.value = await sendPostList(options.id)
})

onShow(async (options) => {
  if (orderID.value) {
    await getInfo(orderID.value)
  }
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen pt-4 pb-4">
    <view class="tabTool w-screen pageBoxBg">
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-center flex-col" v-if="orderInfo.status === 1">
        <wd-text
          text="待付款"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center mt-1 mb-2">
          <wd-text
            text="买家将在一天内付款，预期订单将被取消，释放商品库存"
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view v-else-if="orderInfo.status === 10" class="flex justify-center items-center flex-col">
        <wd-text
          text="待发货"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view v-else-if="orderInfo.status === 11" class="flex justify-center items-center flex-col">
        <wd-text
          text="待收货"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text text="预计7天内到货" size="14px" color="#777777" custom-class="ml-1"></wd-text>
        </view>
      </view>
      <view
        v-else-if="orderInfo.status === 25 || orderInfo.status === 20"
        class="flex justify-center items-center flex-col"
      >
        <wd-text
          text="仅退款"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>
      <view v-else-if="orderInfo.status === 26" class="flex justify-center items-center flex-col">
        <wd-text
          text="退货退款"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
      </view>

      <view v-else-if="orderInfo.status === 2" class="flex justify-center items-center flex-col">
        <wd-text
          text="已完成"
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
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text
            v-if="orderInfo.orderTime"
            :text="
              orderInfo.orderTime.slice(0, 10) +
              ' ' +
              orderInfo.orderTime.slice(11, 19) +
              '订单已完成退款'
            "
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view v-else-if="orderInfo.status === 23" class="flex justify-center items-center flex-col">
        <wd-text
          text="退款失败"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text
            v-if="orderInfo.orderTime"
            :text="
              orderInfo.orderTime.slice(0, 10) +
              ' ' +
              orderInfo.orderTime.slice(11, 19) +
              '订单已完成退款失败'
            "
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view v-else-if="orderInfo.status === 3" class="flex justify-center items-center flex-col">
        <wd-text
          text="订单取消"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text
            v-if="orderInfo.orderTime"
            :text="
              orderInfo.orderTime.slice(0, 10) +
              ' ' +
              orderInfo.orderTime.slice(11, 19) +
              '订单已完成取消'
            "
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view v-else class="flex justify-center items-center flex-col">
        <wd-text
          text="订单关闭"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text
            v-if="orderInfo.orderTime"
            :text="
              orderInfo.orderTime.slice(0, 10) +
              ' ' +
              orderInfo.orderTime.slice(11, 19) +
              '订单已关闭'
            "
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
        </view>
      </view>
      <view class="mt-4">
        <wd-card class="cardno mt-4">
          <view class="flex justify-between items-center py-2">
            <view class="flex justify-left items-center">
              <view class="flex justify-left items-start flex-col ml-1">
                <wd-text
                  :text="orderInfo.receiverAddress"
                  size="14px"
                  color="#777777"
                  custom-class="mt-1"
                ></wd-text>
                <wd-text
                  :text="orderInfo.receiverName + ' ' + orderInfo.receiverTel"
                  size="14px"
                  color="#333333"
                  custom-class="font-bold mt-2"
                ></wd-text>
              </view>
            </view>
          </view>
        </wd-card>
      </view>
      <wd-card>
        <view class="bottomline">
          <view v-for="(it, ind) in orderInfo.sysOrderItemBeans" :key="ind">
            <view class="flex justify-between items-center mt-2 mb-4">
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
                    custom-class="ml-1 nums"
                  ></wd-text>
                </view>
              </view>
            </view>
          </view>

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
        </view>
        <view class="py-2">
          <view class="flex justify-between items-center mb-1">
            <view class="flex justify-left items-center" style="width: calc(100% - 35px)">
              <wd-text text="用户付款" size="14px" color="#777777" custom-class="tit"></wd-text>
              <view class="ml-2 over2">￥{{ orderInfo.orderActualAmount }}</view>
            </view>
          </view>
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

      <!--      <wd-card class="cardno">-->
      <!--        <view class="py-2">-->
      <!--          <view class="flex justify-between items-center mb-1">-->
      <!--            <wd-text text="运费" size="14px" color="#777777" custom-class="tit"></wd-text>-->
      <!--            <wd-text-->
      <!--              :text="'￥' + orderInfo.deliveryAmount"-->
      <!--              size="14px"-->
      <!--              color="#333333"-->
      <!--              class=""-->
      <!--            ></wd-text>-->
      <!--          </view>-->
      <!--          <view class="flex justify-between items-center mb-1">-->
      <!--            <wd-text text="商品总价" size="14px" color="#777777" custom-class="tit"></wd-text>-->
      <!--            <wd-text-->
      <!--              :text="'￥' + orderInfo.orderTotalFee"-->
      <!--              size="14px"-->
      <!--              color="#333333"-->
      <!--              class=""-->
      <!--            ></wd-text>-->
      <!--          </view>-->
      <!--          <view class="flex justify-between items-center mb-1">-->
      <!--            <wd-text text="优惠券" size="14px" color="#777777" custom-class="tit"></wd-text>-->
      <!--            <wd-text-->
      <!--              :text="'￥' + orderInfo.couponAmount"-->
      <!--              size="14px"-->
      <!--              color="#333333"-->
      <!--              class=""-->
      <!--            ></wd-text>-->
      <!--          </view>-->
      <!--          <view class="flex justify-end items-center my-3">-->
      <!--            <wd-text text="总计：" size="14px" color="#000000"></wd-text>-->
      <!--            <wd-text text="￥" size="14px" font-bold color="#d04b55" custom-class="ml-1"></wd-text>-->
      <!--            <wd-text-->
      <!--              :text="orderInfo.orderActualAmount"-->
      <!--              size="18px"-->
      <!--              font-bold-->
      <!--              color="#d04b55"-->
      <!--              class=""-->
      <!--            ></wd-text>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </wd-card>-->

      <wd-card class="cardno mt-4" v-if="orderInfo.status === 10">
        <view class="flex py-2 flex-col">
          <wd-text text="寄件物流" size="14px" bold color="#333" custom-class="mt-1"></wd-text>

          <view class="flex justify-left items-center mt-2 bottomline">
            <wd-text text="物流单号" size="14px" color="#777777" custom-class="mr-2"></wd-text>
            <wd-input
              v-model.trim="postNumber"
              no-border
              placeholder="请输入物流单号"
              custom-class="F1 p2"
            />
          </view>
          <view class="flex justify-left items-center">
            <wd-text text="物流公司" size="14px" color="#777777" custom-class="mr-2"></wd-text>

            <wd-picker
              custom-class="F1 p2"
              placeholder="请选择物流公司"
              :columns="Columns"
              value-key="bizId"
              label-key="deliveryId"
              v-model="postType"
              @confirm="handleConfirm"
            />
          </view>
        </view>
      </wd-card>

      <wd-card class="cardno mt-4" v-if="orderInfo.status === 2">
        <view class="flex py-2 flex-col">
          <view class="flex mt-10px mb-10px" v-if="orderInfo.productEvaluationList">
            <wd-img :width="45" :height="45" :src="morentouxiang" round></wd-img>
            <view class="flex-1 overflow-hidden ml-10px">
              <view class="w-full flex items-center justify-between">
                <view>
                  <wd-text
                    :text="
                      orderInfo.productEvaluationList[0].userNickname
                        ? orderInfo.productEvaluationList[0].userNickname
                        : '匿名用户'
                    "
                    bold
                    color="#333"
                  ></wd-text>
                </view>
              </view>
              <view class="text my-2">
                {{ orderInfo.productEvaluationList[0].evaluationContent }}
              </view>
              <wd-img
                :width="100"
                :height="100"
                radius="3"
                :src="orderInfo.productEvaluationList[0].evaluationImg"
              />
            </view>
          </view>
        </view>
        <view class="flex py-2 flex-col">
          <wd-text text="回复买家" size="14px" bold color="#333" custom-class=" mb-1"></wd-text>

          <view v-if="orderInfo.productEvaluationList[0].replyList?.length > 0">
            {{ orderInfo.productEvaluationList[0].replyList[0].replyContent }}
          </view>

          <textarea v-else v-model.trim="HFval" placeholder="请填写评价" class="liuyan" />
        </view>
      </wd-card>

      <wd-card
        class="cardno mt-4"
        v-if="(orderInfo.status === 25 || orderInfo.status === 20) && orderInfo.note"
      >
        <view class="flex py-2 flex-col">
          <wd-text text="申请理由" size="14px" bold color="#333" custom-class=" mb-1"></wd-text>
          <wd-text :text="orderInfo.note" size="14px" color="#333" custom-class=" mb-1"></wd-text>
        </view>
      </wd-card>
      <wd-card class="cardno mt-4" v-if="orderInfo.status === 25 || orderInfo.status === 20">
        <view class="flex py-2 flex-col">
          <wd-text text="操作理由" size="14px" bold color="#333" custom-class=" mb-1"></wd-text>

          <textarea v-model.trim="auditNote" placeholder="请填写同意/拒绝理由" class="liuyan" />
        </view>
      </wd-card>

      <view class="mt-8 mx-4 pb-80px">
        <view class="mb-20px">
          <!--          <wd-button block :round="false" custom-class="mb-4" @click="submitHF(orderInfo.orderId)">-->
          <!--            确认回复-->
          <!--          </wd-button>-->
          <template v-if="orderInfo.status === 1">
            <wd-button block plain :round="false" @click="goInfoQX(orderInfo.orderId)">
              取消订单
            </wd-button>
          </template>
          <template v-else-if="orderInfo.status === 10">
            <wd-button
              block
              :round="false"
              @click="submitPostInfo(orderInfo.orderId)"
              custom-class="mb-2"
            >
              确认发货
            </wd-button>
            <wd-button block plain :round="false" @click="goInfoQX(orderInfo.orderId)">
              取消订单
            </wd-button>
          </template>
          <template v-else-if="orderInfo.status === 11">
            <wd-button block plain :round="false" @click="goLogistics(orderInfo.orderId)">
              查看物流
            </wd-button>
          </template>

          <template v-else-if="orderInfo.status === 25 || orderInfo.status === 20">
            <wd-button custom-class="mb-2" block :round="false" @click="goTk(orderInfo.orderId)">
              确认退款
            </wd-button>
            <wd-button
              type="error"
              custom-class="mb-2"
              block
              :round="false"
              @click="refuse(orderInfo.orderId)"
            >
              拒绝退款
            </wd-button>
            <wd-button
              custom-class="mb-2"
              block
              plain
              :round="false"
              @click="goLogistics(orderInfo.orderId)"
            >
              查看物流
            </wd-button>
          </template>
          <template v-else-if="orderInfo.status === 2">
            <wd-button
              block
              :round="false"
              v-if="orderInfo.productEvaluationList[0].replyList?.length === 0"
              custom-class="mb-2"
              @click="submitHF(orderInfo.orderId)"
            >
              确认回复
            </wd-button>
          </template>
          <template v-else></template>
        </view>
      </view>
    </view>
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

.bottomline {
  border-bottom: 1px solid #efefef;
}

.topline {
  border-top: 1px solid #efefef;
}

:deep(.nums) {
  padding: 3px 5px;
  font-weight: bold;
  border: 1px solid #999;
  border-radius: 4px;
}

:deep(.F1) {
  flex: 1;
}

:deep(.wd-picker__cell) {
  padding: 0 !important;
}

.liuyan {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 10px;
  color: #333;
  background: #f9f9f9;
  border-radius: 5px;
}
</style>

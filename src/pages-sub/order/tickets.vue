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
import { useToast, useMessage } from 'wot-design-uni/index'
import { removeT, routeTo } from '@/utils'
import { useUserStore } from '@/store'

const toast = useToast()

const { submitTickets, sendOrderInfo } = orderInter()

const title = ref('平台介入')

const orderInfo = ref({})
const orderID = ref('')

const ticketsInfo = ref({
  reason: '',
  reasonInd: 0,
  description: '',
  imageListstr: '',
  phone: '',
})

const userStore = useUserStore()
const imageList = ref([])
const time = ref<number>(108000)
const reasonList = [
  { value: 1, label: '虚假发货' },
  { value: 2, label: '卖家拒绝开发票' },
  { value: 3, label: '不发货/拒绝发货' },
  {
    value: 4,
    label: '其他',
  },
]

const message = useMessage()

function submit() {
  if (ticketsInfo.value.description === '') {
    uni.showToast({
      title: '请填写问题描述',
      duration: 2000,
      icon: 'none',
    })
  } else if (ticketsInfo.value.phone === '') {
    uni.showToast({
      title: '请填写联系方式',
      duration: 2000,
      icon: 'none',
    })
  } else {
    const da = {
      orderId: orderID.value,
      reasonType: ticketsInfo.value.reasonInd + 1,
      interfereContent: ticketsInfo.value.description,
      voucherUrl: ticketsInfo.value.imageListstr,
      createPhone: ticketsInfo.value.phone,
      userId: userStore.userInfo.userDId,
    }

    submitTickets(da).then((res) => {
      message
        .alert({
          msg: '已收到您的反馈，平台将在1-3工作日联系您!',
          title: '提示',
        })
        .then(() => {
          uni.redirectTo({ url: '/pages-sub/order/orderList?tabsVal=2' })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }
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
  ticketsInfo.value.phone = orderInfo.value.receiverTel
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

function handleConfirm(e) {
  ticketsInfo.value.reasonInd = e.value
}

onLoad(async (options) => {
  orderID.value = options.id
  if (orderID.value) {
    await getInfo(orderID.value)
    // if () {
    //   message.alert({
    //     msg: '已收到您的反馈，平台将在1-3工作日联系您!',
    //     title: '提示'
    //   })
    // } else if () {
    //   message.alert({
    //     msg: '您有一条平台介入工单正在处理中，我们会全力加快处理进度。',
    //     title: '提示'
    //   })
    // }
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
                  v-model="ticketsInfo.reason"
                  @confirm="handleConfirm"
                />

                <!--                <view>{{ ticketsInfo.reason }}</view>-->
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
                  v-model.trim="ticketsInfo.description"
                  placeholder="请填问题描述"
                />
                <!--                <view>{{ ticketsInfo.description }}</view>-->
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
              <!--              <wd-img :width="100" :height="100" radius="7" :src="ticketsInfo.imageListstr"/>-->
            </view>
          </view>
          <view class="border"></view>
          <view class="my-2">
            <view class="mb-1">
              <wd-text text="联系方式" color="#333" size="16" bold></wd-text>
            </view>
            <view>
              <wd-cell-group>
                <wd-input v-model.trim="ticketsInfo.phone" placeholder="请输入联系电话" no-border />
                <!--                <view>{{ ticketsInfo.phone }}</view>-->
              </wd-cell-group>
            </view>
          </view>
        </wd-card>
      </view>
    </view>

    <view class="px-10px py-10px fixed bottom-0 left-0 right-0 bg-#fff safe-area-after">
      <wd-button block :round="false" @click="submit(ticketsInfo)">提 交</wd-button>
    </view>

    <wd-message-box />
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  position: relative;
  background-image: linear-gradient(#daebfd, #f3f4f6);
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

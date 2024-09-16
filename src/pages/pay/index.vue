<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getWxPay } from '@/service/api/shop'
import pays from '@/static/images/pay/pays.png'
import { useSystemStore } from '@/store'
import { useRequestPayment } from '@/utils/uniapi'
import { useRequest } from 'alova/client'
import { useMessage } from 'wot-design-uni'
const message = useMessage()
const store = useSystemStore()
const inValue = ref<any>() // 输入框的值
const actualPrice = ref(0)
const merchantId = ref('')
actualPrice.value = inValue.value
const flog = ref(false)

const show = ref(true)
const messData = ref([
  {
    title: '订单信息',
    value: '中国雄安集团数字城市科技有限公司',
    isLink: false,
  },
  {
    title: '订单号',
    value: 'IRUE8575757848488',
    isLink: false,
  },
])

const payStatus = ref(false)
const payData = ref([
  {
    title: '订单信息',
    value: '中国雄安集团数字城市科技有限公司',
    isLink: false,
  },
  {
    title: '订单号',
    value: 'IRUE8575757848488',
    isLink: false,
  },
])
const payListInfo = ref()

// 查询订单信息
const { send: sendPay } = useRequest((data) => getWxPay(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

async function getOrderMess() {
  const params = {
    totalAmount: 1, // actualPrice.value, // 总金额
    merchantId: '1833701004270182401', // 商户Id
    openId: store.opendId, // 用户子标识 // 'o9c597VL1g5NaeyE4bolz1PKs2SA',
  }
  console.log('🥪', params)
  const data: any = await sendPay(params)
  console.log('订单数据[data]:', data)
  if (data.errCode === 'SUCCESS') {
    payListInfo.value = data
    payData.value[0].value = data.orderInformation
    payData.value[1].value = data.merOrderId
    await useRequestPayment(payListInfo.value)
  } else {
    message
      .alert({
        msg: data.errMsg,
        title: '支付提示',
        closeOnClickModal: false,
      })
      .then(() => {
        closeBack()
      })
  }
}
onLoad(async () => {
  // useSystemFig()
})

onShow(async (options) => {
  const data = uni.getEnterOptionsSync()
  console.log('传入的数据:', data)
  try {
    // inValue.value = data.referrerInfo.extraData.invoice
    // actualPrice.value = data.referrerInfo.extraData.actualPrice
    // merchantId.value = data.referrerInfo.extraData.merchantId

    // await useRequestPayment()

    setTimeout(async () => {
      getOrderMess()
    }, 100)
  } catch (error) {}
})
const closeBack = () => {
  console.log('点击返回, 关闭弹窗 ,返回上一页面携带数据')
  uni.navigateBackMiniProgram({
    extraData: {
      data1: 'test',
    },
    success(res) {
      console.log('🍮[res]:', res)
      // 返回成功
    },
  })
}
</script>

<template>
  <dy-navbar leftTitle="付款" left></dy-navbar>

  <!--  -->

  <wd-popup
    v-model="show"
    :close-on-click-modal="false"
    custom-style="height: 500px;"
    custom-class="custom-class-popup"
    lock-scroll
    position="bottom"
    :safe-area-inset-bottom="true"
  >
    <view class="text-center py-15px">数城云收银</view>
    <!-- 待支付 -->
    <view v-if="!payStatus">
      <view>
        <view class="text-center text-40px font-semibold">
          <text class="text-30px mt-5px mr-5px">¥</text>
          <text>{{ actualPrice }}</text>
        </view>
        <view
          class="mt-10px font-400 text-#999 text-20px text-center bg-#F1F0EE px-20px py-5px mx-auto max-w-30% rounded-500 line-through"
        >
          {{ inValue }}
        </view>
      </view>
      <view class="mt-10px">
        <wd-cell-group>
          <wd-cell
            v-for="(item, index) in messData"
            :key="index"
            title-width="20%"
            custom-class="custom-class-cell"
          >
            <template #title>
              <view class="text-#999 text-14px">
                {{ item.title }}
              </view>
            </template>

            <view class="text-#000 text-14px">{{ item.value }}</view>
          </wd-cell>
        </wd-cell-group>
      </view>
      <view class="mt-30px fixed bottom-40px left-0 w-full z-99999">
        <view class="mb-10px px-20px">
          <wd-button type="text" block :round="false" plain hairline @click="closeBack">
            返回商家
          </wd-button>
        </view>
      </view>
    </view>

    <!-- 支付后显示 -->
    <view v-else>
      <view class="flex justify-center">
        <wd-img :src="pays" width="172" height="140"></wd-img>
      </view>

      <view class="mt-10px">
        <wd-cell-group>
          <wd-cell
            v-for="(item, index) in payData"
            :key="index"
            title-width="20%"
            custom-class="custom-class-cell"
          >
            <template #title>
              <view class="text-#999 text-14px">
                {{ item.title }}
              </view>
            </template>
            <view class="text-#000 text-14px">{{ item.isLink ? '¥' : '' }} {{ item.value }}</view>
          </wd-cell>
        </wd-cell-group>
      </view>

      <view class="mt-30px fixed bottom-40px left-0 w-full z-99">
        <view class="mb-10px px-20px">
          <wd-button type="text" block :round="false" plain hairline @click="closeBack">
            返回商家
          </wd-button>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped>
//
:deep(.custom-class-popup) {
  @apply overflow-hidden rounded-t-20px px-20px;
}
:deep(.custom-class-cell) {
  @apply mx-[-10px]!;
}
:deep(.custom-input-class) {
  @apply text-26px! font-600!;
}
</style>

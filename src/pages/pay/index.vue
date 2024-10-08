<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getWxPay, getWxPay2 } from '@/service/api/shop'
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
const couponId = ref('')
const orderId = ref('')
const PayType = ref('scan')

actualPrice.value = inValue.value
const payFlog = ref(false)

const show = ref(true)

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

const { send: sendPay2 } = useRequest((data) => getWxPay2(data), {
  immediate: false,
  loading: false,
  initialData: {},
})

async function getOrderMess() {
  try {
    let data: any
    const params2 = {
      orderId: orderId.value,
      openId: store.opendId, // 用户子标识 // 'o9c597VL1g5NaeyE4bolz1PKs2SA',
    }
    if (PayType.value === 'order') {
      data = await sendPay2(params2)
    } else {
      const params = {
        actualAmount: actualPrice.value, // 实际支付金额
        totalAmount: inValue.value, // 总金额
        merchantId: merchantId.value, // '1833701004270182401', // 商户Id
        openId: store.opendId, // 用户子标识 // 'o9c597VL1g5NaeyE4bolz1PKs2SA',
        couponId: couponId.value, //
      }
      data = await sendPay(params)
    }
    if (data.errCode === 'SUCCESS') {
      payListInfo.value = data
      payData.value[0].value = data.orderInformation
      payData.value[1].value = data.merOrderId
      payFlog.value = true
      const payRes: any = await useRequestPayment(payListInfo.value)
      console.log('🍦[payRes]:', payRes)
      if (payRes.errMsg === 'requestPayment:ok') {
        payStatus.value = true
      }
    } else {
      message
        .alert({
          msg: data.errMsg,
          title: '提示',
          closeOnClickModal: false,
        })
        .then(() => {
          closeBack(2)
        })
    }
  } catch (error) {
    console.log('支付出错:', error)
    message
      .alert({
        msg: error.errMsg ? '支付(失败/取消)了!' : '支付信息查询失败,请重试!',
        title: '提示',
        closeOnClickModal: false,
      })
      .then(() => {
        closeBack(2)
      })
  }
}

onLoad(async () => {
  // useSystemFig()
})

onShow(async (options) => {
  const data = uni.getEnterOptionsSync()
  console.log('页面进入=======传入的数据:', data)
  PayType.value = data.referrerInfo?.extraData?.payType // 支付类型
  orderId.value = data.referrerInfo?.extraData?.orderId
  inValue.value = data.referrerInfo?.extraData?.invoice
  actualPrice.value = data.referrerInfo?.extraData?.actualPrice
  merchantId.value = data.referrerInfo?.extraData?.merchantId
  couponId.value = data.referrerInfo?.extraData?.couponId
  // 支付状态false 携带支付
  if (!payFlog.value && data.referrerInfo?.extraData?.payStatus === 1) {
    await getOrderMess()
  }
})
const closeBack = (flog = 1) => {
  console.log('点击返回, 关闭弹窗 ,返回上一页面携带数据')
  uni.navigateBackMiniProgram({
    extraData: {
      back: flog,
    },
    success(res) {
      console.log('🍮[res]:', res)
      // 返回成功
    },
  })
  // 关闭当前小程序
  uni.exitMiniProgram({
    success(res) {
      console.log('🍷', res)
    }, // 接口调用成功的回调函数
    fail(res) {
      console.log('🌮', res)
    },
  })
}
onUnload(() => {
  closeBack()
})
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
          v-if="inValue"
          class="mt-10px font-400 text-#999 text-20px text-center bg-#F1F0EE px-20px py-5px mx-auto max-w-30% rounded-500 line-through"
        >
          {{ inValue }}
        </view>
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

            <view class="text-#000 text-14px">{{ item.value }}</view>
          </wd-cell>
        </wd-cell-group>
      </view>
      <view class="mt-30px fixed bottom-40px left-0 w-full z-99999">
        <view class="mb-10px px-20px">
          <wd-button type="text" block :round="false" plain hairline @click="closeBack">
            返回首页
          </wd-button>
        </view>
      </view>
    </view>

    <!-- 支付后显示 -->
    <view v-else>
      <view class="flex justify-center">
        <wd-transition :show="payStatus" name="zoom-in">
          <wd-img :src="pays" width="172" height="140"></wd-img>
        </wd-transition>
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
            返回首页
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

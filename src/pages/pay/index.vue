<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import pays from '@/static/images/pay/pays.png'
const inValue = ref<any>() // 输入框的值

const actualPrice = ref(0)
actualPrice.value = inValue.value

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
  {
    title: '优惠券',
    isLink: true,
    value: 0,
  },
])

const yhList = ref([
  {
    title: '平台',
    detile: '满100减30',
    value: 30,
    isLink: false,
    type: 1, // 满减
  },
  {
    title: '商家',
    detile: '8折券',
    value: 0.8,
    isLink: false,
    type: 2, //  折扣
  },
])

actualPrice.value = inValue.value
const activeIndex = ref<number>()
const cyhqje = ref()

const payStatus = ref(false)
const payData = ref([
  {
    title: '支付金额',
    value: '20.00',
    isLink: true,
  },
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

onLoad(() => {
  uni.getEnterOptionsSync()
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
      <view class="mt-30px">
        <view class="mb-20px">
          <wd-button block :round="false">立即支付</wd-button>
        </view>
        <view class="mb-10px">
          <wd-button type="text" block :round="false" plain hairline>返回商家</wd-button>
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

      <view class="mt-30px">
        <view class="">
          <wd-button block :round="false">返回商家</wd-button>
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

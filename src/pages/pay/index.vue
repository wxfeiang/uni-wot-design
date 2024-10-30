<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getShopDetail } from '@/service/api/shop'
import { getPayCouponUserPhone } from '@/service/api/userMessage'
import { useUserStore } from '@/store'
import { openEmbeddedMiniProgram } from '@/utils/uniapi'
import { useRequest } from 'alova/client'
import qs from 'qs'
import { useMessage } from 'wot-design-uni'
import { couponProps, shopDetilProps } from './utils/types'
const userStore = useUserStore()

const message = useMessage()
const inValue = ref<any>() // 输入框的值
const visible = ref(false)
const maxlength = ref(11)
const type = ref('digit')
const actualPrice = ref(0)
actualPrice.value = inValue.value

const onInput = (key: string) => {
  switch (key) {
    case '.':
      if (inValue.value && !inValue.value.includes('.')) {
        inValue.value = `${inValue.value}${key}`
      }
      break
    default:
      if (!inValue.value.includes('.')) {
        switch (type.value) {
          case 'digit':
            inValue.value =
              inValue.value.length < maxlength.value ? `${inValue.value}${key}` : inValue.value
            break
          case 'password':
            inValue.value =
              inValue.value.length < maxlength.value ? `${inValue.value}${key}` : inValue.value
            break
          default:
            break
        }
      } else {
        const parts = inValue.value.split('.')
        if (parts[1].length < 2) {
          inValue.value = `${inValue.value}${key}`
        }
      }
      break
  }
}

const onDelete = () => {
  inValue.value = inValue.value.slice(0, -1)
}
function goback() {
  uni.navigateBack()
}
// 查询可用优惠券
const { send: sendYhq, data: yhList } = useRequest(
  (data) => getPayCouponUserPhone<couponProps[]>(data),
  {
    immediate: false,
    loading: false,
    initialData: [],
  },
)

const closeText = computed(() => {
  return inValue.value && inValue.value > 0 ? '付款' : '关闭'
})
const show = ref(false)
const onClose = async () => {
  if (inValue.value && inValue.value > 0) {
    const parts = inValue.value.split('.')
    if (!parts[1]?.length) {
      inValue.value = `${inValue.value * 1}.00`
    }
    console.log('🌽', inValue.value)
    show.value = true
    // TODO:  查询后台当前金额可以用的优惠券
    const params = {
      orderAmount: inValue.value * 1,
    }
    console.log('🍦[params]:', params)
    try {
      const data = await sendYhq(params)
      if (!yhList && !yhList.value.length) {
        goPay()
      }
      yhList.value = data
      itmeClick(yhList.value[0], 0)
    } catch (error) {
      yhList.value = []
      actualPrice.value = inValue.value
      goPay()
    }
  }
}

// 处理优惠券显示
const remarks = ref('')
const messData = ref([
  {
    title: '优惠金额',
    isLink: true,
    value: 0,
  },
])

const collapse = ref(true)

const openYh = () => {
  collapse.value = !collapse.value
}

const activeIndex = ref<number>()
const cyhqje = ref() //  优惠金额
const sjyhje = ref(0) // 实际优惠金额

function itmeClick(item: couponProps, index) {
  if (activeIndex.value === index) {
    activeIndex.value = -1
    cyhqje.value = ''
    actualPrice.value = inValue.value * 1
    sjyhje.value = 0
  } else {
    activeIndex.value = index
    // cyhqje.value = yhList.value[activeIndex.value].value
    cyhqje.value = item.couponName
    if (item.couponType === 1) {
      sjyhje.value = item.couponPrice * 1
      const value = Number((inValue.value * 1 - item.couponPrice * 1).toFixed(2))
      actualPrice.value = value < 0 ? 0 : value
    }
    if (item.couponType === 3) {
      actualPrice.value = Number((inValue.value * (item.couponPrice * 1)).toFixed(2))
      sjyhje.value = Number((inValue.value * 1 - actualPrice.value).toFixed(2))
    }
  }

  // 根据index  做优惠计算
}

const popClose = () => {
  activeIndex.value = -1
}
//  查询商户信息
const { send: sendShopDetail, data: shopMessage } = useRequest(
  (data) => getShopDetail<shopDetilProps>(data),
  {
    immediate: false,
    loading: false,
    initialData: [],
  },
)
async function goPay() {
  if (inValue.value <= 0) {
    message.alert({
      msg: '金额不能小于或等于0',
      title: '提示',
      closeOnClickModal: false,
    })
    return
  }

  const params = {
    userId: userStore.userInfo.userDId,
    invoice: inValue.value, // 订单金额
    actualPrice: actualPrice.value, // 实际支付金额
    merchantId: shopMessage.value.merchantId,
    couponId: yhList.value[activeIndex.value]?.couponId ?? '',
    receiveId: yhList.value[activeIndex.value]?.receiveId ?? '',
    payStatus: 1,
    payType: 'scan',
  }
  console.log('🍩========>', params)
  await openEmbeddedMiniProgram('/pages/pay/index', { ...params })
}

const urlData = ref()
onLoad(async (options) => {
  urlData.value = qs.parse(decodeURIComponent(options.url) || options.url)
  console.log('地址数据======', urlData.value)
  try {
    await sendShopDetail({
      shopId: '1835238852856737794', // urlData.value.merchantId
    }) //
    // const shopdata: any =
    // console.log('🥒[shopMessage.value]:', JSON.stringify(shopdata))
    // shopMessage.value = shopdata
  } catch (error) {
    console.log('🍢[error]:', error)
    message
      .alert({
        msg: '查询店铺数据异常,无法支付!',
        title: '提示',
        closeOnClickModal: false,
      })
      .then((res) => {
        uni.navigateBack()
      })
  }

  // 获取到进入页面的所有信息
})
onShow(async () => {
  const data = uni.getEnterOptionsSync()
  console.log('onShow进入获取数据[data]:', data)
  // 2 可以继续支付
  if (data.referrerInfo?.extraData?.back === 1) {
    console.log('🦐')
    //  上一个页面返回的 返回
    uni.navigateBack()
  }
})
</script>

<template>
  <dy-navbar leftTitle="付款" left></dy-navbar>
  <view class="px-10px py-20px bg-#f5f5f5">
    <view class="flex justify-between items-center">
      <view>
        <view class="text-18px color-#000">付款给商家</view>
        <view class="text-14px color-#999999 mt-4px">
          {{ shopMessage.merchantName }}
        </view>
      </view>

      <view>
        <wd-img width="58px" height="58px" radius="7px" :src="shopMessage.shopPicture"></wd-img>
      </view>
    </view>
  </view>

  <view class="pt-20px bg-#f5f5f5">
    <view class="bg-#fff rounded-t-30px overflow-hidden">
      <view class="px-20px pt-20px">
        <view class="my-10px text-18px">付款金额</view>
        <wd-input
          type="text"
          v-model="inValue"
          placeholder="请输入付款金额"
          use-prefix-slot
          size="large"
          @click="visible = true"
          readonly
          custom-input-class="custom-input-class"
          :maxlength="11"
        >
          <template #prefix>
            <view class="24px color-#000 font-semibold">￥</view>
          </template>
        </wd-input>

        <wd-number-keyboard
          v-model:visible="visible"
          mode="custom"
          extra-key="."
          :close-text="closeText"
          @close="onClose"
          @input="onInput"
          @delete="onDelete"
          :maxlength="maxlength"
        ></wd-number-keyboard>
        <!-- <view class="text-14px color-#2D69EF my-10px">备注</view>
      <wd-textarea v-model="remarks" placeholder="" /> -->
      </view>
      <view class="px-20px mt-20px" v-if="show">
        <view class="mt-10px max-height-200px overflow-hidden" v-if="yhList && yhList.length > 0">
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
              <view
                class="text-#FF0000 text-16px flex items-center justify-end gap-5px"
                v-if="item.isLink"
                @click="openYh"
              >
                <view v-if="cyhqje">¥</view>
                <text>
                  {{ sjyhje }}
                </text>

                <view :class="collapse ? 'rotate-90' : ''">
                  <wd-icon name="arrow-right" size="14px" color="#999" />
                </view>
              </view>
              <view class="text-#000 text-14px" v-else>{{ item.value }}</view>
            </wd-cell>
          </wd-cell-group>
          <view v-if="collapse">
            <view
              class="flex justify-between items-center px-20px py-4px bg-#EEF7FF rounded-4px mb-6px"
              v-for="(item, index) in yhList"
              :key="index"
              @click="itmeClick(item, index)"
              :class="activeIndex == index ? 'bd-1px_#9FD2FF' : ''"
            >
              <view class="color-#7887A8 text-14px flex items-center gap-5px">
                <view class="w-20px">
                  <wd-icon
                    name="check-circle-filled"
                    size="18px"
                    v-if="activeIndex == index"
                    :color="activeIndex == index ? '#2D69EF' : ''"
                  ></wd-icon>
                </view>
                <text>{{ item.couponName }}</text>
              </view>
              <view class="color-#2D69EF text-14px" v-if="item.couponType === 1">
                ¥ {{ item.couponPrice }}
              </view>
              <view class="color-#2D69EF text-14px" v-if="item.couponType === 3">
                {{ item.couponPrice * 10 }} 折
              </view>
            </view>
          </view>
        </view>
        <view class="mt-8">
          <view class="mb-20px">
            <wd-button block :round="false" @click="goPay">立即支付</wd-button>
          </view>
          <view class="mb-10px">
            <wd-button type="text" block :round="false" plain hairline @click="goback">
              返回首页
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!--  -->

  <!--  <wd-popup
    v-model="show"
    :close-on-click-modal="false"
    closable
    custom-style="height: 500px;"
    custom-class="custom-class-popup"
    lock-scroll
    position="bottom"
    :safe-area-inset-bottom="true"
    @close="popClose"
  >
    <view class="text-center py-15px">数城云收银</view>
    <!~~ 待支付 ~~>
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
            <view
              class="text-#FF0000 text-16px flex items-center justify-end gap-5px"
              v-if="item.isLink"
              @click="openYh"
            >
              <view v-if="cyhqje">
                ¥
                <text>
                  {{ cyhqje }}
                </text>
              </view>

              <view :class="collapse ? 'rotate-90' : ''">
                <wd-icon name="arrow-right" size="14px" color="#999" />
              </view>
            </view>
            <view class="text-#000 text-14px" v-else>{{ item.value }}</view>
          </wd-cell>
        </wd-cell-group>

        <view v-if="collapse">
          <view
            class="flex justify-between items-center px-20px py-4px bg-#EEF7FF rounded-4px mb-6px"
            v-for="(item, index) in yhList"
            :key="index"
            @click="itmeClick(item, index)"
            :class="activeIndex == index ? 'bd-1px_#9FD2FF' : ''"
          >
            <view class="color-#7887A8 text-14px flex items-center gap-5px">
              <view class="w-20px">
                <wd-icon
                  name="check-circle-filled"
                  size="18px"
                  v-if="activeIndex == index"
                  :color="activeIndex == index ? '#2D69EF' : ''"
                ></wd-icon>
              </view>
              <text>{{ item.title }}</text>
            </view>
            <view class="color-#2D69EF text-14px">{{ item.detile }}</view>
          </view>
        </view>
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

    <!~~ 支付后显示 ~~>
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
  </wd-popup>-->
</template>
<style>
/* page {
  background: #f5f5f5;
} */
</style>

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

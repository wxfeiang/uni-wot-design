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
const closeText = computed(() => {
  return inValue.value && inValue.value > 0 ? '付款' : '关闭'
})
const show = ref(false)
const onClose = () => {
  if (inValue.value && inValue.value > 0) {
    const parts = inValue.value.split('.')
    if (!parts[1]?.length) {
      inValue.value = `${inValue.value * 1}.00`
    }
    show.value = true
    // TODO:  查询后台当前金额可以用的优惠券

    itmeClick(yhList.value[0], 0)
  }
}
const remarks = ref('')

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

const collapse = ref(true)

const openYh = () => {
  collapse.value = !collapse.value
}

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
function itmeClick(item, index) {
  if (activeIndex.value === index) {
    activeIndex.value = -1
    cyhqje.value = ''
    actualPrice.value = inValue.value * 1
  } else {
    activeIndex.value = index
    cyhqje.value = yhList.value[activeIndex.value].value
    if (item.type === 1) {
      const value = inValue.value * 1 - item.value * 1
      actualPrice.value = value < 0 ? 0 : value
    }
    if (item.type === 2) {
      actualPrice.value = Number((inValue.value * (item.value * 1)).toFixed(2))
    }
  }

  // 根据index  做优惠计算
}
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
const popClose = () => {
  activeIndex.value = -1
}
</script>

<template>
  <dy-navbar leftTitle="付款" left></dy-navbar>
  <view class="px-10px py-20px bg-#f5f5f5">
    <view class="flex justify-between items-center">
      <view>
        <view class="text-18px color-#000">付款给商家</view>
        <view class="text-14px color-#999999 mt-4px">文文跑江湖的店</view>
      </view>

      <view>
        <wd-img
          width="58px"
          height="58px"
          radius="7px"
          src="https://img0.baidu.com/it/u=123020064,1503144048&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
        ></wd-img>
      </view>
    </view>
  </view>

  <view class="rounded-t-20px overflow-hidden bg-#fff mt-20px">
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

      <view class="text-14px color-#2D69EF my-10px">备注</view>
      <wd-textarea v-model="remarks" placeholder="" />
    </view>
  </view>

  <!--  -->

  <wd-popup
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

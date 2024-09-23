<script lang="ts" setup>
import { pathToBase64 } from 'image-tools'
import bg from '../../static/images/coupon/items.png'
import status3 from '../../static/images/coupon/status3.png'
import { conponListProps } from '../utils/types'
import userCoupon from '../utils/userCoupon'
const { sendReceiveCoupon } = userCoupon()

defineOptions({
  name: 'couponLine',
})
const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const props = defineProps({
  data: {
    type: Object as PropType<conponListProps>,
    default: () => ({}),
  },
})
const topbgBase64 = ref('')

const open = ref(false)
const showDetil = () => {
  open.value = !open.value
}

const statusCoupopnList = ref([
  {
    statsSrc: status3,
    btnText: '已核销',
    btnShow: true,
  },
])
// 券3种状态
const statusCoupopn = computed(() => {
  return statusCoupopnList.value[0]
})
// 优惠券背景状态
const statusBg = computed(() => {
  return props.data.couponStatus === 3 || props.data.couponStatus === 0
})
// 平台券，商家券判断条件
const sourceStu = computed(() => {
  return props.data.type === 1
})

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
const url = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/0791669c-1691-416f-bc2f-1523986a55e9WechatIMG248.jpg',
)
</script>

<template>
  <view
    class="bg-no-repeat h-96px relative pr-10px box-border rounded-10px bg-#fff/20"
    :class="statusBg ? '' : 'grayscale opacity-80'"
  >
    <view class="flex justify-between items-center">
      <view
        class="text-center w-100px h-96px py-10px box-border bg-#fff"
        :style="`background-image: url(${url});background-size: 100px 100% `"
      >
        <view class="py-10px">立减</view>
        <view class="color-#FF4345 font-bold text-32px">
          <text class="text-14px mr-5px">¥</text>
          <text>20</text>
        </view>
      </view>
      <view class="flex-1 pl-10px text-12px py-10px">
        <view class="text-16px">20元无门槛优惠券红包</view>
        <view>
          <view>核销人:张三</view>
          <view>核销时间: 2024-09-09 12:00:00</view>
          <view>使用人员: 张三</view>
        </view>
      </view>
      <view class="absolute top-30px right-2% z-99">
        <wd-img :src="statusCoupopn.statsSrc" :width="60" :height="53" />
      </view>

      <!-- <view class="flex flex-col justify-between">
        <view class="color-#fff text-22px">{{ props.data.couponName }}</view>
        <view class="color-#FFC4A6 text-12px">
          有效期:
          {{
            props.data.couponBeginDate.slice(0, 10) + ' 至 ' + props.data.couponEndDate.slice(0, 10)
          }}
        </view>
        <view v-if="sourceStu" class="color-#FFC4A6 text-12px">仅雄安一卡通支付使用</view>
        <view class="flex justify-between items-center mt-10px">
          <view
            class="px-15px py-2px rounded-100 bd-1px_#fff color-#fff text-12px"
            v-if="statusCoupopn.btnShow"

          >
            {{ statusCoupopn.btnText }}
          </view>
          <view class="color-#FFF6DA text-12px flex items-center" @click="showDetil">
            查看使用说明
            <wd-icon name="fill-arrow-down" color="#fff" size="16px"></wd-icon>
          </view>
        </view>
      </view>
      <view class="flex flex-col justify-around pt-15px items-end gap-10px">
        <view class="text-32px color-#FF4345">
          <text v-if="props.data.couponType != 3">¥</text>
          <text>
            {{
              props.data.couponType == 3
                ? props.data.couponPrice * 10 + '折券'
                : props.data.couponPrice
            }}
          </text>
        </view>
        <view class="text-12px color-#666">
          {{ '满' + props.data.couponFillPrice + '元可用' }}
        </view>
      </view> -->
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

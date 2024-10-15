<script lang="ts" setup>
import { routeTo } from '@/utils'
import { Toast } from '@/utils/uniapi/prompt'
import { pathToBase64 } from 'image-tools'
import bg from '../../static/images/coupon/items.png'
import status1 from '../../static/images/coupon/status1.png'
import status2 from '../../static/images/coupon/status2.png'
import { conponListProps } from '../utils/types'
import userCoupon from '../utils/userCoupon'
const { sendReceiveCoupon } = userCoupon()
const readUseOnly = ref('仅雄安一卡通支付使用')
defineOptions({
  name: 'couponList',
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
    statsSrc: '',
    btnText: '去使用',
    btnShow: false,
  },
  {
    statsSrc: status1,
    btnText: '已使用',
    btnShow: false,
  },
  {
    statsSrc: status2,
    btnText: '已过期',
    btnShow: false,
  },
  {
    statsSrc: '',
    btnText: '领取',
    btnShow: true,
  },
])
// 券3种状态
const statusCoupopn = computed(() => {
  return statusCoupopnList.value[props.data.couponStatus ?? 3]
})
// 优惠券背景状态
const statusBg = computed(() => {
  return props.data.couponStatus === 3 || props.data.couponStatus === 0
})
// 平台券，商家券判断条件
const sourceStu = computed(() => {
  return props.data.type === 1
})
const handleReceive = async (item) => {
  if (props.data.couponStatus === 0) {
    // 去使用
    // type：2商品卷3线下核销卷
    // coupon_scop：4全部商品，5指定商品
    if (props.data.type === 3) {
      // 展示优惠券码
      const data = {
        couponCode: props.data.couponCode,
      }
      routeTo({ url: '/pages-sub/marketManager/coupon/coupDeil', data })
    } else {
      // 商城跳转
      // routeTo({ url: '/pages-sub/serveMassage/workGuide/index' })
      Toast('功能开发中...')
    }
  } else {
    const params = {
      couponId: props.data.couponId,
    }
    try {
      const data: any = await sendReceiveCoupon(params)
      if (data === true) {
        emit('refresh')
        setTimeout(() => {
          Toast('领取成功')
        }, 50)
      }
    } catch (error) {}
  }
}
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(bg)
})
const url = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/0791669c-1691-416f-bc2f-1523986a55e9WechatIMG248.jpg',
)
</script>

<template>
  <view class="px-20px my-10px">
    <view
      class="relative box-border rounded-10px bg-#FFFFFF bg"
      :class="statusBg ? '' : 'grayscale opacity-50'"
    >
      <view class="flex gap-10px">
        <view
          class="flex flex-col item-content justify-center gap-10px h-106px w-116px bg-no-repeat"
          :style="`background-image: url(${url});background-size:  100% `"
        >
          <view class="color-#FF4345 text-center">
            <view class="text-14px">
              {{
                props.data.couponFillPrice > 0
                  ? '满' + props.data.couponFillPrice + '元可用'
                  : '无门槛'
              }}
            </view>
          </view>
          <view class="color-#FF4345 flex items-end px-15px justify-between">
            <view class="text-50px text-center flex-1">
              {{
                props.data.couponType == 3 ? props.data.couponPrice * 10 : props.data.couponPrice
              }}
            </view>
            <view class="w-18px text-14px">
              {{ props.data.couponType == 3 ? '折' : '¥' }}
            </view>
          </view>
        </view>
        <view class="flex flex-col justify-between">
          <view class="text-22px">{{ props.data.couponName }}</view>
          <view class="text-12px">
            有效期:
            {{
              // props.data.couponBeginDate.slice(0, 10) + ' 至 ' + props.data.couponEndDate.slice(0, 10)
              props.data.couponReceiveBeginDate.slice(0, 10) +
              ' 至 ' +
              props.data.couponReceiveEndDate.slice(0, 10)
            }}
          </view>
          <view v-if="sourceStu" class="text-12px">{{ readUseOnly }}</view>
          <view class="flex justify-between items-center mt-10px">
            <view class="color-#FF4345 text-12px flex items-center" @click="showDetil">
              查看使用说明
              <wd-icon name="fill-arrow-down" color="#FF4345" size="16px"></wd-icon>
            </view>
            <view
              class="px-15px py-2px rounded-100 bd-1px_#fff color-#fff text-12px"
              v-if="statusCoupopn.btnShow"
              @click="handleReceive(props.data)"
            >
              {{ statusCoupopn.btnText }}领取
            </view>
          </view>
        </view>
      </view>
      <view class="absolute top-30px right-25% z-99">
        <wd-img :src="statusCoupopn.statsSrc" :width="66" :height="66" />
      </view>
      <!-- 详情显示 -->
      <view :class="open ? 'block' : 'hidden'">
        <view class="px-20px">
          <view class="p-10px bg-#FFE8E3 color-#FF4345 text-12px line-height-20px">
            <view v-if="props.data.couponReceiveBeginDate">
              领取时间:
              {{
                props.data.couponReceiveBeginDate?.slice(0, 10) +
                ' 至 ' +
                props.data.couponReceiveEndDate?.slice(0, 10)
              }}
            </view>
            <view>
              有效期:
              {{
                props.data.couponBeginDate.slice(0, 10) +
                ' 至 ' +
                props.data.couponEndDate.slice(0, 10)
              }}
            </view>
            <view>优惠内容: {{ '满 ' + props.data.couponFillPrice + ' 元可用' }}</view>
            <view v-if="props.data.type === 3">线下进店展码核销</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bg {
  box-shadow: 4px 0px 10px 1px rgba(0, 0, 0, 0.11);
}
</style>

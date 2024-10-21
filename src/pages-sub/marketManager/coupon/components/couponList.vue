<script lang="ts" setup>
import { removeT, routeTo } from '@/utils'

import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { useUserStore } from '@/store'
import { Toast } from '@/utils/uniapi/prompt'
import { storeToRefs } from 'pinia'
import status1 from '../../static/images/coupon/status1.png'
import status2 from '../../static/images/coupon/status2.png'
import { conponListProps } from '../utils/types'
import userCoupon from '../utils/userCoupon'
const { sendReceiveCoupon } = userCoupon()

const { isLogined, userInfo } = storeToRefs(useUserStore())
defineOptions({
  name: 'couponList',
})
const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'share'): void
}>()

const props = defineProps({
  data: {
    type: Object as PropType<conponListProps>,
    default: () => ({}),
  },
  detil: {
    type: Boolean,
    default: true,
  },
  actionShow: {
    type: Boolean,
    default: true,
  },
  isShadow: {
    type: Boolean,
    default: true,
  },
  isShare: {
    type: Boolean,
    default: false,
  },
  isMain: {
    type: Boolean,
    default: false,
  },
})

const open = ref(false)
const showDetil = () => {
  open.value = !open.value
}

const statusCoupopnList = ref([
  {
    statsSrc: '',
    btnText: '去使用',
    btnShow: true,
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

const couponTypeText = computed(() => {
  let text = ''
  if (props.data.type === 1) {
    text = '仅雄安一卡通支付使用'
  } else if (props.data.type === 2) {
    text = '仅雄安一卡通平台商城使用'
  } else if (props.data.type === 3) {
    text = '仅雄安一卡通平台线下商户扫码核销'
  }
  return text
})
// 券3种状态
const statusCoupopn = computed(() => {
  return statusCoupopnList.value[props.data.couponStatus ?? 3]
})
// 平台券，商家券判断条件
const sourceStu = computed(() => {
  return props.data.type === 1
})
const statusBg = computed(() => {
  return props.data.couponStatus === 3 || props.data.couponStatus === 0
})
const handleReceive = async (item) => {
  console.log('🍸', props.data)
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
      routeTo({ url: '/pages/shop/index', navType: NAVIGATE_TYPE.SWITCH_TAB })
      // Toast('功能开发中...')
    }
  } else {
    console.log('🍕', props.data)
    const params = {
      couponId: props.data.couponId,
    }
    try {
      const data: any = await sendReceiveCoupon(params)
      console.log('🍊[data]:', data)
      if (data === true) {
        emit('refresh')
        setTimeout(() => {
          Toast('领取成功')
        }, 50)
      }
    } catch (error) {
      console.log('🍈[error]:', error)
    }
  }
}
const toDetil = () => {
  const data = {
    couponCode: props.data.couponCode,
    isMain: props.isMain ? 1 : 0,
    couponId: props.data.couponId,
  }
  routeTo({ url: '/pages-sub/marketManager/coupon/coupDeil', data })
}

const url = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/0791669c-1691-416f-bc2f-1523986a55e9WechatIMG248.jpg',
)
const share = () => {
  emit('share')
}
const changeDate = (data: string) => {
  if (!data) return false
  if (data.indexOf('9999') > -1 || data.indexOf('0000') > -1) {
    return '永久有效'
  } else {
    return false
  }
}
</script>

<template>
  <view class="px-15px my-15px">
    <view
      class="relative box-border rounded-10px bg-#F7F7F7"
      :class="{ 'grayscale-95 opacity-80': !statusBg, isShadow: props.actionShow }"
      @click="props.detil ? toDetil() : ''"
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
            <view class="text-30px text-center flex-1">
              {{
                props.data.couponType == 3 ? props.data.couponPrice * 10 : props.data.couponPrice
              }}
            </view>
            <view class="w-18px text-16px text-center">
              {{ props.data.couponType == 3 ? '折' : '¥' }}
            </view>
          </view>
        </view>
        <view class="flex flex-col justify-center flex-1 pr-10px box-border py-3px gap-4px">
          <!--  :class="!sourceStu ? 'gap-8px' : 'gap-4px'" -->
          <view class="text-16px color-#000">{{ props.data.couponName }}</view>
          <view class="text-12px color-#999">
            <view class="">
              有效期:
              <template v-if="changeDate(props.data.couponBeginDate)">
                {{ changeDate(props.data.couponBeginDate) }}
              </template>
              <template v-else>
                {{
                  removeT(props.data.couponBeginDate) + ' 至 ' + removeT(props.data.couponEndDate)
                }}
              </template>
            </view>
            <view class="text-12px">{{ couponTypeText }}</view>
          </view>

          <view class="flex justify-between items-center" v-if="props.actionShow">
            <view class="color-#FF4345 text-12px flex items-center" @click.stop="showDetil">
              查看使用说明
              <wd-icon name="fill-arrow-down" color="#FF4345" size="16px"></wd-icon>
            </view>
            <view
              class="px-15px py-2px rounded-full bd-1px_#FF4345 color-#FF4345 text-12px"
              @click.stop="handleReceive(props.data)"
              v-if="statusCoupopn.btnShow"
            >
              {{ statusCoupopn.btnText }}
            </view>
          </view>
        </view>
      </view>
      <view class="absolute top-50% mt-[-33px] right-10px z-99" v-if="!statusBg">
        <wd-img :src="statusCoupopn.statsSrc" :width="66" :height="66" />
      </view>
      <!-- 详情显示1 -->
      <view :class="open ? 'block' : 'hidden'" class="mx-[-20px] mb-[-10px] bg-#fff">
        <view class="px-30px">
          <view class="p-10px bg-#FFE8E3 color-#FF4345 text-12px line-height-20px">
            <view v-if="props.data.couponReceiveBeginDate">
              领取时间:
              {{
                removeT(props.data.couponReceiveBeginDate) +
                ' 至 ' +
                removeT(props.data.couponReceiveEndDate)
              }}
            </view>
            <view>
              有效期:
              <template v-if="changeDate(props.data.couponBeginDate)">
                {{ changeDate(props.data.couponBeginDate) }}
              </template>
              <template v-else>
                {{
                  removeT(props.data.couponBeginDate) + ' 至 ' + removeT(props.data.couponEndDate)
                }}
              </template>
            </view>
            <view>优惠内容: {{ '满 ' + props.data.couponFillPrice + ' 元可用' }}</view>
            <view v-if="props.data.type === 3">线下进店展码核销</view>
          </view>
        </view>
      </view>
      <!-- 分享按钮 -->
      <view
        class="py-6px px-10px absolute top-0 right-0 z-99 bg-#FFEEEE rounded-bl-20px"
        v-if="statusBg && props.isShare && isLogined"
      >
        <view class="flex justify-center items-center gap-5px" @click.stop="share">
          <wd-icon name="share" size="12px" color="#FF4345"></wd-icon>
          <text class="color-#FF4345 text-12px">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.isShadow {
  box-shadow: 4px 0px 10px 1px rgba(0, 0, 0, 0.11);
}
</style>

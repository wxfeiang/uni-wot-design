<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
import { pathToBase64 } from 'image-tools'
import { storeToRefs } from 'pinia'
import { useMessage, useToast } from 'wot-design-uni'
import isapply from '../../static/images/mine/isapply.png'
import imgUrl from '../../static/images/mine/mine-bg.png'
import vipbg from '../../static/images/mine/vip.png'

import daifahuo from '../../static/images/mine/daifahuo.png'
import daifukuan from '../../static/images/mine/daifukuan.png'
import daishouhuo from '../../static/images/mine/daishouhuo.png'
import shouho from '../../static/images/mine/shouho.png'
import yiwancheng from '../../static/images/mine/yiwancheng.png'

import useInfo from './hooks/useInfo'
const { navTop } = useNav()

const anvter = ref(
  'https://img1.baidu.com/it/u=2223092495,2890927007&fm=253&fmt=auto&app=138&f=PNG?w=304&h=304',
)
const anvter2 = ref(
  'https://img0.baidu.com/it/u=2264664417,2109988758&fm=253&fmt=auto&app=138&f=PNG?w=265&h=265',
)
const anvter1 = ref(
  'https://img2.baidu.com/it/u=3064118432,511138708&fm=253&fmt=auto&app=138&f=PNG?w=400&h=400',
)
const { setInfo, LogOut, loading, serveList } = useInfo()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
function login() {
  routeTo({ url: '/pages/login/index' })
}
const toast = useToast()
function logoutCimfirm() {
  message
    .confirm({
      msg: '确定退出系统吗？',
      title: '提示',
    })
    .then(() => {
      LogOut()
    })
}

const topAction = ref([
  {
    text: '余额',
    number: 0,
    type: 'sacn',
  },
  {
    text: '积分',
    number: 0,
  },
  {
    text: '优惠券',
    number: 0,
  },
  {
    text: '银行卡',
    type: 'card',
    number: 0,
  },
])

function actionTop(item: any) {
  // message.alert('功能开发中，敬请期待!...')
  toast.show('功能开发中，敬请期待!...')
}

const vipbgBase64 = ref()
const bgUrlBase64 = ref()
const applyBase64 = ref()
onLoad(async () => {
  // 设置背景图片
  vipbgBase64.value = await pathToBase64(vipbg)
  bgUrlBase64.value = await pathToBase64(imgUrl)
  applyBase64.value = await pathToBase64(isapply)
})
const orderList = ref([
  {
    title: '全部订单',
    icon: daifukuan,
    url: '/pages/order/index',
  },
  {
    title: '待付款',
    icon: daifahuo,
    url: '/pages/order/index',
  },
  {
    title: '待发货',
    icon: daishouhuo,
    url: '/pages/order/index',
  },
  {
    title: '待收货',
    icon: yiwancheng,
    url: '/pages/order/index',
  },
  {
    title: '退换/售后',
    icon: shouho,
    url: '/pages/order/index',
  },
])
const orderGuild = () => {
  console.log('🍎')
}

const acton = (item) => {
  if (item.url) {
    routeTo({ url: '/pages-sub/system/sysconfig/index' })
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}

const sexAnvter = () => {
  if (userInfo.value.sex === '1') {
    anvter.value = anvter1.value
  } else if (userInfo.value.sex === '2') {
    anvter.value = anvter2.value
  }
}
onMounted(() => {
  sexAnvter()
})
</script>

<template>
  <view
    class="py-10px imgUrl"
    :style="`padding-top:${navTop}px ;background-image: url(${bgUrlBase64})`"
  >
    <view class="px-10px">
      <view class="flex justify-between items-center">
        <view class="flex items-center gap-20px">
          <template v-if="isLogined">
            <view class="flex gap-15px items-center">
              <view>
                <view class="p-5px rounded-50% size-64px">
                  <wd-img :width="60" :height="60" :src="anvter" round />
                </view>
                <view
                  v-if="isLogined"
                  :style="` background-image: url(${applyBase64})`"
                  class="font-size-10px w-50px h-18px text-center line-height-20px bg mx-auto mt-[-10px] relative z-1 px-10px"
                >
                  {{ userInfo.cardType === '3' ? '已申领' : '未申领' }}
                </view>
              </view>
              <view>
                <view class="font-size-20px font-medium">
                  {{ isLogined ? userInfo.userName : '未登录' }}
                </view>
                <view
                  v-if="isLogined"
                  :style="`background-image: url(${vipbgBase64})`"
                  class="w-53px h-18px font-size-10px color-#c75008 text-center line-height-20px bg mt-10px pl-10px"
                >
                  普通会员
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <view class="p-10px bg-#fff rounded-50% size-60px">
              <wd-img :width="60" :height="60" :src="anvter" round />
            </view>
            <view @click="login" class="flex gap-5px">
              <view class="font-bold color-#fff">未登录</view>
            </view>
          </template>
        </view>
        <view
          class="qiandao flex items-center gap-5px justify-center line-height-32px color-#fff font-size-14px"
          @click="acton"
        >
          <i class="iconfont xa-jinbi2 text-20px"></i>
          <text>签到</text>
        </view>
      </view>
    </view>

    <view class="p-10px flex justify-between mt-20px">
      <view
        v-for="(item, index) in topAction"
        :key="index"
        class="w-20% text-center"
        @click="actionTop(item)"
      >
        <view class="mt-4px text-18px">{{ item.number }}</view>
        <view class="text-12px mt-10px">{{ item.text }}</view>
      </view>
    </view>
  </view>

  <view class="p-10px" v-if="false">
    <view class="p-10px rounded-10px overflow-hidden bg-#fff">
      <dy-title title="我的订单" more @moreClick="orderGuild"></dy-title>
      <view class="pt-20px flex justify-between">
        <view
          v-for="(item, index) in orderList"
          :key="index"
          class="w-20% text-center"
          @click="acton"
        >
          <image class="size-22px" :src="item.icon" />
          <view class="text-12px mt-10px">{{ item.title }}</view>
        </view>
      </view>
    </view>
  </view>
  <view class="px-10px">
    <view class="p-10px rounded-10px overflow-hidden bg-#fff">
      <dy-title title="功能服务"></dy-title>
      <view class="p-10px flex flex-wrap">
        <view
          v-for="(item, index) in serveList"
          :key="index"
          class="w-24% text-center mb-20px pt-10px"
          @click="acton(item)"
        >
          <image class="size-26px" :src="item.icon" />
          <view class="text-12px mt-10px">{{ item.title }}</view>
        </view>
      </view>
    </view>
  </view>

  <view class="fixed bottom-80rpx left-0 right-0">
    <view class="px-10" v-if="isLogined">
      <wd-button block plain @click="logoutCimfirm">退出登录</wd-button>
    </view>

    <view class="px-10" v-else>
      <wd-button block plain hairline @click="login">立即登录</wd-button>
    </view>
  </view>
</template>

<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.dy-bg {
  background: rgb(204 204 204 / 0.5);
}
.qiandao {
  width: 82px;
  height: 32px;
  background: linear-gradient(270deg, #5faffb, #3177f6);
  border-radius: 19px;
}

.bg {
  background-repeat: no-repeat;
  background-size: contain;
}
</style>

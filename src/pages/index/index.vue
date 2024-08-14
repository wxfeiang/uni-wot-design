<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import chuxing from '@/static/images/index/chuxing.png'
import topbg from '@/static/images/index/indetxop_bg.png'
import qiabao from '@/static/images/index/qiabao.png'
import saoyisao from '@/static/images/index/saoyisao.png'
import xianxing from '@/static/images/index/xianxing.png'

import boche from '@/static/images/index/boche.png'
import jiaofeitong from '@/static/images/index/jiaofeitong.png'
import more from '@/static/images/index/more.png'
import shebao from '@/static/images/index/shebao.png'
import shop from '@/static/images/index/shop.png'
import tushu from '@/static/images/index/tushu.png'
import zhenxuan from '@/static/images/index/zhenxuan.png'

import banner from '@/static/images/index/banner.png'
import banner2 from '@/static/images/index/banner2.png'

import butie from '@/static/images/index/butie.png'
import jiaotong from '@/static/images/index/jiaotong.png'
import jingxiongtong from '@/static/images/index/jingxiongtong.png'
import kanbing from '@/static/images/index/kanbing.png'
import tushujieyue from '@/static/images/index/tushujieyue.png'
import xiaofei from '@/static/images/index/xiaofei.png'
import zhanma from '@/static/images/index/zhanma.png'
import zhenwu from '@/static/images/index/zhenwu.png'

import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { routeTo } from '@/utils'
import PLATFORM from '@/utils/platform'
import { useScancode } from '@/utils/uniapi'
import { useMessage } from 'wot-design-uni'

import { useBaseStore } from '@/store/modules/base'
import useIndex from './hooks/useIndex'
const message = useMessage()
const basestore = useBaseStore()

const { messageData, messageClick, sendMessageList } = useIndex()

defineOptions({
  name: 'Index',
})
const { safeAreaInsets } = uni.getSystemInfoSync()

// H5 的情况下要 -44

const topAction = ref([
  {
    icon: saoyisao,
    text: '扫一扫',
    type: 'sacn',
  },
  {
    icon: xianxing,
    text: '收付款',
  },
  {
    icon: chuxing,
    text: '出行',
  },
  {
    icon: qiabao,
    text: '卡服务',
    type: 'card',
    url: '/pages/serve/index',
    active: 1,
  },
])

function actionTop(item: any) {
  if (item.type === 'sacn') {
    useScancode()
  }
  if (item.type === 'card') {
    console.log('🍚[item]:', item)

    basestore.active = item.active
    routeTo({
      url: item.url,

      navType: NAVIGATE_TYPE.SWITCH_TAB,
    })
  } else {
    message.alert('功能开发中，敬请期待!...')
  }
}

const mainData = ref([
  {
    title: '社保查询',
    type: 'card',
    icon: shebao,
  },
  {
    title: '雄安缴费通',
    type: 'order',
    icon: jiaofeitong,
  },
  {
    title: '停车交费',
    type: 'star',
    icon: boche,
  },
  {
    title: '雄安甄选',
    type: 'coupon',
    icon: zhenxuan,
  },
  {
    title: '图书借阅',
    type: 'coupon',
    icon: tushu,
  },
  {
    title: '金融超市',
    type: 'coupon',
    icon: shop,
  },
  {
    title: '更多',
    icon: more,
    type: 'card',
    url: '/pages/serve/index',
    active: 1,
  },
])

const swiperList = ref([banner])

function swiperClick() {
  console.log('🍏')
  message.alert('功能开发中，敬请期待!...')
  // routeTo({ url: '/pages-sub/serveMain/index' })
}

function toBusinessOutlets() {
  routeTo({ url: '/pages-sub/serveMassage/businessOutlets/index' })
}

const serveList = ref([
  {
    title: '校园服务',
    url: zhenwu,
    color: '#8f533a',
  },
  {
    title: '校园服务',
    url: jiaotong,
    color: '#219974',
  },
  {
    title: '看病就医',
    url: kanbing,
    color: '#396183',
  },
  {
    title: '展码入园',
    url: zhanma,
    color: '#219974',
  },
  {
    title: '京雄通',
    url: jingxiongtong,
    color: '#3b3a9d',
  },
  {
    title: '图书借阅',
    url: tushujieyue,
    color: '#8f533a',
  },

  {
    title: '补贴发放',
    url: butie,
    color: '#8f533a',
  },
  {
    title: '消费购物',
    url: xiaofei,
    color: '#3b3a9d',
  },
])
function serveClick(item?: any) {
  if (item.title === 'more') {
    routeTo({
      url: item.url,

      navType: NAVIGATE_TYPE.SWITCH_TAB,
    })
  } else {
    message.alert('功能开发中，敬请期待!...')
  }

  // routeTo({ url: '/pages-sub/serveMain/index' })
}
function messageGuild() {
  routeTo({ url: '/pages-sub/serveMassage/messageList/index' })
}

function serveGuild() {
  routeTo({ url: '/pages-sub/serveMassage/workGuide/index' })
}

const navTop = ref(safeAreaInsets.top + 40)
onMounted(() => {
  if (PLATFORM.isH5) {
    navTop.value = navTop.value - 44
  }
  // sendMessageList({
  // page: 1,
  //   size: 2,
  // })
})

// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
const navbg = ref('nav_show')
onPageScroll((e) => {
  if (e.scrollTop > 50) {
    navbg.value = 'nav_hide'
  } else {
    navbg.value = 'nav_show'
  }
})
</script>
<template>
  <!-- 顶部 -->
  <view class="pb-20px bg-size-100 relative">
    <wd-navbar
      safeAreaInsetTop
      placeholder
      fixed
      :custom-class="navbg"
      :bordered="false"
    ></wd-navbar>
    <wd-sticky :offset-top="navTop">
      <view class="w-100vw">
        <wd-search
          placeholder-left
          placeholder="请输入关键词搜索"
          hide-cancel
          disabled
          :custom-class="navbg"
          @click="serveClick"
        />
      </view>
    </wd-sticky>
    <view class="p-10px flex justify-between">
      <view
        v-for="(item, index) in topAction"
        :key="index"
        class="w-20% text-center color-#fff"
        @click="actionTop(item)"
      >
        <wd-img :width="26" :height="26" :src="item.icon" />
        <view class="mt-4px text-12px">{{ item.text }}</view>
      </view>
    </view>
    <view class="absolute top-0 left-0 right-0 size-full z-[-1]">
      <wd-img :width="160" :height="90" :src="topbg" custom-class="custom-class-img" />
    </view>
  </view>

  <!-- 入口类表 -->

  <view class="mt-[-10px] overflow-hidden rounded-t-10px p-10px bg-#fff">
    <wd-grid :column="4" clickable>
      <wd-grid-item
        use-icon-slot
        use-text-slot
        v-for="(item, index) in mainData"
        :key="index"
        custom-class="grid-item"
        @itemclick="serveClick(item)"
      >
        <template #icon>
          <image class="wh-42px rounded-10px" :src="item.icon" />
        </template>
        <template #text>
          <view class="text-center mt-10px">{{ item.title }}</view>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>

  <!-- 消息 -->
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="px-20px py-10px">
    <dy-title title="消息专区" more @moreClick="messageGuild"></dy-title>
    <wd-cell-group>
      <wd-cell
        v-for="(item, index) in messageData.data.data.content.slice(0, 2)"
        :key="index"
        :to="item.url"
        title-width="280px"
        custom-class="cell-item"
        clickable
        @click="messageClick(item)"
      >
        <template #title>
          <view class="flex">
            <view class="w-50px relative">
              <wd-tag type="danger" color="#e48370" bg-color="#f5f5f5">消息</wd-tag>
              <view
                v-if="true"
                class="absolute top-4px left-[-2px] wh-5px rounded-50% bg-red"
              ></view>
            </view>
            <view class="truncate-1">{{ item.articleTitle }}</view>
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
  </view>
  <!-- 广告位 -->
  <view class="py-10px bg-#f5f5f5 h-120px">
    <wd-swiper
      :list="swiperList"
      autoplay
      :current="0"
      :height="120"
      :indicator="false"
      @click="swiperClick"
      customClass="swiper_box"
    ></wd-swiper>
    <!-- <wd-img :width="70" :height="120" :src="banner" custom-class="custom-class-img" /> -->
  </view>

  <!-- 服务专区 -->
  <view class="px-20px py-10px">
    <dy-title title="服务专区"></dy-title>
    <view>
      <scroll-view scroll-x class="whitespace-nowrap py-10px w-100% pr-20px">
        <view
          class="inline-block w-160px h-90px mr-10px box-border rounded-4px bg-no-repeat! relative"
          v-for="(item, index) in serveList"
          :key="index"
          @click="serveClick(item)"
        >
          <wd-img :width="160" :height="90" :src="item.url" custom-class="custom-class-img" />
          <view class="size-full absolute top-0 left-0">
            <view
              class="font-bold color-white font-size-16px line-height-40px px-10px"
              :style="`color: ${item.color}`"
            >
              {{ item.title }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
  <!-- 办事指南 -->
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="px-20px py-10px">
    <dy-title title="办事指南" more @moreClick="serveGuild"></dy-title>
    <view class="p-10px h-120px relative">
      <wd-img :width="100" :height="120" :src="banner2" custom-class="custom-class-img" />
      <view class="size-full absolute top-0 left-0 text-center pt-40px">
        <view class="color-#2d62c1 font-size-20px font-400 line-height-30px">服务网点</view>
        <view class="mt-10px">
          <wd-button black @click="toBusinessOutlets">一键查询</wd-button>
        </view>
      </view>
    </view>
  </view>
  <view class="pl-20px">
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in messageData.data.data.content.slice(1, 5)"
        :key="index"
        :to="item.url"
        clickable
        custom-class="cell-item"
        @click="messageClick(item)"
      >
        <template #title>
          <view class="truncate-1 color-#000">{{ item.articleTitle }}</view>
        </template>

        <view class="truncate-1 color-#999">{{ item.updateTime }}</view>
      </wd-cell>
    </wd-cell-group>
  </view>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
</template>

<style>
:deep(.nav_show) {
  @apply bg-transparent!;
}
:deep(.nav_hide) {
  @apply bg-#4689fd!;
}
/* .bg-size-100 {
  background-size: 100% !important;
} */
:deep(.swiper_box .wd-swiper__track) {
  @apply px-20px!;
}
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}
:deep(.cell-item) {
  @apply pl-0!;
}

:deep(.custom-class-img) {
  @apply size-full!;
}
</style>

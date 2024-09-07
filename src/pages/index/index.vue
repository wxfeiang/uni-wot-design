<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  needLogin: true,
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

import banner2 from '@/static/images/index/banner2.png'

import butie from '@/static/images/index/butie.png'
import jiaotong from '@/static/images/index/jiaotong.png'
import jingxiongtong from '@/static/images/index/jingxiongtong.png'
import kanbing from '@/static/images/index/kanbing.png'
import tushujieyue from '@/static/images/index/tushujieyue.png'
import xiaofei from '@/static/images/index/xiaofei.png'
import zhanma from '@/static/images/index/zhanma.png'
import zhenwu from '@/static/images/index/zhenwu.png'

import zhenwufuwu from '@/static/images/index/1.png'
import jiaotongchuxing from '@/static/images/index/2.png'
import jiyyigouyao from '@/static/images/index/3.png'
import daiyufafang from '@/static/images/index/4.png'
import jinrongruwu from '@/static/images/index/5.png'
import wenhuatiyan from '@/static/images/index/6.png'
import lvyouguanguang from '@/static/images/index/7.png'
import jinxonghutong from '@/static/images/index/8.png'

import { ref } from 'vue'

import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { routeTo } from '@/utils'
import PLATFORM from '@/utils/platform'
import { useScancode } from '@/utils/uniapi'
import { useMessage } from 'wot-design-uni'

import { useBaseStore } from '@/store/modules/base'
import { bannerProps } from './utils/types'
const message = useMessage()
const basestore = useBaseStore()
const bannerUrl = 'http://47.99.93.97/v1/'

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
    message.alert('服务开发中...')
  }
}

const mainData = ref([
  {
    title: '社保查询',
    icon: 'card',
    url: shebao,
  },
  {
    title: '雄安缴费通',
    icon: 'order',
    url: jiaofeitong,
  },
  {
    title: '雄安乐伯',
    icon: 'star',
    url: boche,
  },
  {
    title: '雄安甄选',
    icon: 'coupon',
    url: zhenxuan,
  },
  {
    title: '图书借阅',
    icon: 'coupon',
    url: tushu,
  },
  {
    title: '金融超市',
    icon: 'coupon',
    url: shop,
  },
  {
    title: '更多',
    icon: 'coupon',
    url: more,
  },
])

const msg = ref([
  {
    title: '消息',
    content: '一卡通要上岸了,一卡通要上岸了,一卡通要上岸了',
    isRead: false,
    url: '',
  },
  {
    title: '消息',
    isRead: true,
    content: '一卡通要上岸了,一卡通要上岸了,一卡通要上岸了',
    url: '',
  },
])

const swiperList = ref<bannerProps[]>([
  {
    id: '1',
    path: '/pages-sub/serveMain/cardApplyType',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl + 'public/uploads/image/1725172090859-99aee48d-2b43-4956-9430-73f201586f40.png',
    type: 'h5',
  },
  {
    id: '2',
    path: 'https://mp.weixin.qq.com/s/C8X3gjrs1Jr_M6n31C98RA',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl + 'public/uploads/image/1725172128186-2ab9df4e-54db-4228-ab3a-f93f5a9c7f59.png',
    type: 'h5',
  },
  {
    id: '3',
    path: 'https://mp.weixin.qq.com/s/Zgq5vECtrgkwv1vNI1DNpw',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl + 'public/uploads/image/1725172156390-21e78f8b-2791-4cc1-b8ff-1b01c015058e.png',
    type: 'h5',
  },
])
const current = ref<number>(0)
function swiperClick(data) {
  const { item } = data
  console.log('🍵[item]:', item)

  routeTo({ url: '/pages-sub/webView/index', data: { url: item.path, showType: item.type } })
}

function toBusinessOutlets() {
  console.log('🍏')
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
function serveClick(item: any) {
  message.alert('服务开发中...')

  // routeTo({ url: '/pages-sub/serveMain/index' })
}

function serveGuild() {
  routeTo({ url: '/pages-sub/serveMassage/workGuide/index' })
}

const serviceArea = ref([
  {
    title: '政务服务',
    icon: zhenwufuwu,
    bgcolor: 'linear-gradient( 180deg, #FFE8E8 0%, #FFCCCC 100%);',
    iconbg: '#D84D4C',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016016',
  },
  {
    title: '交通出行',
    icon: jiaotongchuxing,
    bgcolor: 'linear-gradient( 180deg, #F2FBF8 0%, #E6F8F0 100%);',
    iconbg: '#78CEA8',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016010',
  },
  {
    title: '就医购药',
    icon: jiyyigouyao,
    bgcolor: 'linear-gradient( 180deg, #D1F2FF 0%, #E2F1FF 100%);',
    iconbg: '#46ABFF',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016013',
  },
  {
    title: '待遇发放',
    icon: daiyufafang,
    bgcolor: 'linear-gradient( 180deg, #FEFCF4 0%, #FFE3CE 100%);',
    iconbg: '#FC9559',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016009 ',
  },
  {
    title: '金融服务',
    icon: jinrongruwu,
    bgcolor: 'linear-gradient( 180deg, #FEFCF1 0%, #FFEA98 100%);',
    iconbg: '#F1C63A',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016011',
  },
  {
    title: '文化体验',
    icon: wenhuatiyan,
    bgcolor: 'linear-gradient( 180deg, #EFF4FE 0%, #CAE4FD 100%);',
    iconbg: '#2994FF',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016015',
  },
  {
    title: '旅游观光',
    icon: lvyouguanguang,
    bgcolor: 'linear-gradient( 180deg, #FEEEEF 0%, #FDC9C9 100%);',
    iconbg: '#F24848',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016014',
  },
  {
    title: '京雄互通',
    icon: jinxonghutong,
    bgcolor: 'linear-gradient( 180deg, #D8DAFF 0%, #DDE0FA 100%);',
    iconbg: '#5339FF',
    path: '/pages-sub/serveMassage/serviceArea/index',
    id: '1710488285782016012',
  },
])

const navTop = ref(safeAreaInsets.top + 40)
onMounted(() => {
  if (PLATFORM.isH5) {
    navTop.value = navTop.value - 44
  }
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
        @itemclick="swiperClick"
      >
        <template #icon>
          <image class="wh-42px rounded-10px" :src="item.url" />
        </template>
        <template #text>
          <view class="text-center mt-10px">{{ item.title }}</view>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>

  <!-- 消息 -->
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="pl-20px py-10px">
    <dy-title title="消息专区"></dy-title>
    <wd-cell-group>
      <wd-cell
        v-for="(item, index) in msg"
        :key="index"
        is-link
        :to="item.url"
        title-width="280px"
        custom-class="cell-item"
      >
        <template #title>
          <view class="flex">
            <view class="w-50px relative">
              <wd-tag type="danger" color="#e48370" bg-color="#f5f5f5">{{ item.title }}</wd-tag>
              <view
                v-if="item.isRead"
                class="absolute top-4px left-[-2px] wh-5px rounded-50% bg-red"
              ></view>
            </view>
            <view class="truncate-1">{{ item.content }}</view>
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
  </view>
  <!-- 广告位 -->
  <view class="py-10px bg-#f5f5f5 swiper">
    <wd-swiper
      :list="swiperList"
      :autoplay="false"
      :current="0"
      :height="120"
      @click="swiperClick"
      :indicator="{ type: 'dots-bar' }"
      custom-indicator-class="custom-indicator-class"
      value-key="image"
      imageMode="scaleToFill"
    ></wd-swiper>
  </view>

  <!-- 服务专区 -->
  <view class="px-10px py-10px">
    <dy-title title="服务专区"></dy-title>
    <view class="flex gap-10px flex-wrap justify-between">
      <view
        class="relative w-22.5% h-80px overflow-hidden rounded-7px"
        :style="`background:${item.bgcolor}`"
        v-for="(item, index) in serviceArea"
        :key="index"
      >
        <view class="text-center text-14px my-10px">{{ item.title }}</view>
        <view class="pl-10px">
          <wd-img :src="item.icon" width="34" height="34"></wd-img>
        </view>

        <view
          class="absolute bottom-0 right-0 w-18px h-18px text-center rounded-tl-7px"
          :style="`background: ${item.iconbg}`"
        >
          <wd-icon name="chevron-right" size="14px" color="#fff"></wd-icon>
        </view>
      </view>
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
      <wd-cell v-for="(item, index) in msg" :key="index" :to="item.url" custom-class="cell-item">
        <template #title>
          <view class="truncate-1 color-#000">{{ item.content }}</view>
        </template>

        <view class="truncate-1 color-#999">2020-02-24</view>
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

.swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #fff;
  --wot-swiper-nav-dot-active-color: #4d80f0;
}

.bg-size-100 {
  background-size: 100% !important;
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

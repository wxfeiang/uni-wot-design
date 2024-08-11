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

import jiaotong from '@/static/images/index/jiaotong.png'
import zhenwu from '@/static/images/index/zhenwu.png'

import { routeTo } from '@/utils'
import PLATFORM from '@/utils/platform'
import { useScancode } from '@/utils/uniapi'
import { useMessage } from 'wot-design-uni'
const message = useMessage()

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
  },
])

function actionTop(item: any) {
  if (item.type) {
    useScancode()
  } else {
    message.alert('服务开发中...')
  }
}

const cardUrl = ref('https://cdn.uviewui.com/uview/demo/upload/positive.png')

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

const swiperList = ref([banner, banner2])
const current = ref<number>(0)
function swiperClick() {
  console.log('🍏')
  routeTo({ url: '/pages-sub/serveMain/index' })
}

function toBusinessOutlets() {
  console.log('🍏')
  routeTo({ url: '/pages-sub/serveMassage/businessOutlets/index' })
}

const serveList = ref([
  {
    title: '校园服务',
    url: zhenwu,
    color: '#1890ff',
  },
  {
    title: '校园服务',
    url: jiaotong,
    color: 'green',
  },
  {
    title: '看病就医',
    url: jiaotong,
    color: 'red',
  },
])
function serveClick(item: any) {
  message.alert('服务开发中...')

  // routeTo({ url: '/pages-sub/serveMain/index' })
}

function serveGuild() {
  routeTo({ url: '/pages-sub/serveMassage/workGuide/index' })
}

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
  <view class="bg-blue pb-20px">
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
  <view class="px-20px py-10px bg-#f5f5f5 h-120px">
    <wd-swiper
      :list="swiperList"
      autoplay
      :current="0"
      :height="120"
      :indicator="false"
      @click="swiperClick"
    ></wd-swiper>
  </view>

  <!-- 服务专区 -->
  <view class="px-20px py-10px">
    <dy-title title="服务专区"></dy-title>
    <view>
      <scroll-view scroll-x class="whitespace-nowrap py-10px w-100% pr-20px">
        <view
          class="inline-block w-160px h-90px mr-10px bg-cover! p-10px box-border rounded-4px"
          :style="`background:url(${item.url})`"
          v-for="(item, index) in serveList"
          :key="index"
          @click="serveClick(item)"
        >
          <view
            class="font-bold color-white font-size-16px line-height-40px"
            :style="`color: ${item.color}`"
          >
            {{ item.title }}
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
  <!-- 办事指南 -->
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="px-20px py-10px">
    <dy-title title="办事指南" more @moreClick="serveGuild"></dy-title>
    <view class="p-10px h-120px" @click="toBusinessOutlets">
      <wd-img :width="100" :height="120" :src="banner2" custom-class="custom-class-img" />
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
  @apply bg-blue!;
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

<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import bgTip from '@/static/images/index/bgTip.png'
import dzsbk from '@/static/images/index/dzsbk.png'
import indexbg from '@/static/images/index/indexbg.png'
import kfw from '@/static/images/index/kfw.png'
import msgicon from '@/static/images/index/msgicon.png'
import xabc from '@/static/images/index/xabc.png'
import xajft from '@/static/images/index/xajft.png'

import btnbg from '@/static/images/index/btnbg.png'
import znlogo from '@/static/images/index/znlogo.png'

import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { useBaseStore } from '@/store'
import { removeT, routeTo } from '@/utils'
import { openWxChart, useScancode } from '@/utils/uniapi'
import { pathToBase64 } from 'image-tools'
import { useToast } from 'wot-design-uni'
import { messProps } from './utils/types'
import useIndex from './utils/useIndex'

defineOptions({
  name: 'Index',
})

const { VITE_APP_LOGOTITLE } = import.meta.env

const basestore = useBaseStore()
const toast = useToast()

const { messageClick, sendMessageList, messageLoading, swiperList, serviceArea } = useIndex()

const topAction = ref([
  {
    icon: dzsbk,
    text: '电子社保卡',
    type: 'router',
    path: '/pages-sub/userManager/SocialSecurityCard/index',
  },
  {
    icon: xajft,
    text: '雄安缴费通',
    type: 'wxChart',
    appId: 'wx0f343dd3b89d6f07', // 填入目标小程序的 appId
    path: 'pages/index/index',
  },
  {
    icon: xabc,
    text: '雄安乐泊',
    type: 'wxChart',
    appId: 'wx6d1780b8d016147c', // 填入目标小程序的 appId
    path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
  },
  {
    icon: kfw,
    text: '卡服务',
    type: 'switchTab',
    path: '/pages/serve/index',
    active: 0,
  },
])

function actionTop(item: any) {
  if (item.type === 'sacn') {
    useScancode()
  } else if (item.type === 'wxChart') {
    openWxChart(item.appId, item.path)
  } else if (item.type === 'switchTab') {
    basestore.active = item.active
    routeTo({
      url: item.path,
      navType: NAVIGATE_TYPE.SWITCH_TAB,
    })
  } else if (item.type === 'router') {
    routeTo({
      url: item.path,
    })
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}

function swiperClick(data) {
  const { item } = data

  if (item.type === 'router') {
    routeTo({ url: item.path, data: { ...item.data } })
  } else {
    console.log('🍵[item]:', item)
    routeTo({
      url: '/pages-sub/webView/index',
      data: { type: item.id },
    })
  }
}
function serveClick(item) {
  routeTo({
    url: item.path,
    data: { type: item.id, title: item.title },
  })
}

function serveGuild() {
  routeTo({ url: '/pages-sub/serveMassage/workGuide/index' })
}
const toServhFor = () => {
  routeTo({ url: '/pages-sub/serveMassage/serchFor/index' })
}
function toBusinessOutlets() {
  routeTo({ url: '/pages-sub/serveMassage/businessOutlets/index' })
}

const mess1 = ref<messProps[]>([
  {
    articleId: '',
    createTime: '',
    createBy: '',
    articleTitle: '',
  },
])
const mess2 = ref<messProps[]>([{ articleId: '', createTime: '', createBy: '', articleTitle: '' }])

const topbgBase64 = ref('')
const btnbgBase64 = ref('')

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(indexbg)
  btnbgBase64.value = await pathToBase64(btnbg)
})
onMounted(async () => {
  const mess: any = await sendMessageList({
    number: 1,
    size: 50,
  })
  console.log('🍍', mess)
  mess1.value = mess.data.data.content.filter((i) => i.articleType === '0')
  mess2.value = mess.data.data.content.filter((i) => i.articleType === '1')
})

// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
const navbg = ref('nav_show')
onPageScroll((e) => {
  if (e.scrollTop > 30) {
    navbg.value = 'nav_hide'
  } else {
    navbg.value = 'nav_show'
  }
})
</script>
<template>
  <!-- 顶部 -->

  <view
    class="box-border h-310px relative bg-no-repeat bg-cover"
    :style="` background-image: url(${topbgBase64});background-size: 100% 99%`"
  >
    <wd-navbar safeAreaInsetTop placeholder :custom-class="navbg" fixed :bordered="false">
      <template #left>
        <view class="flex gap-10px items-center">
          <text class="line-height-44px text-18px color-#fff mt-5px">{{ VITE_APP_LOGOTITLE }}</text>
        </view>
      </template>
    </wd-navbar>
    <!-- <wd-sticky :offset-top="navTop"> -->
    <view class="w-100vw flex items-center justify-between gap-2px box-border" @click="toServhFor">
      <view class="flex-1 px-10px">
        <view
          class="flex justify-between items-center serch-bg px-10px py-10px color-#fff opacity-65"
        >
          <wd-icon name="search" size="16px"></wd-icon>
          <view class="text-left text-16px flex-1 px-10px">请输入搜索关键词</view>
          <view class="text-14px relative search-type">搜索</view>
        </view>
      </view>
    </view>
    <!-- </wd-sticky> -->
    <view class="pt-5px mt-18px flex justify-between">
      <view
        v-for="(item, index) in topAction"
        :key="index"
        class="w-1/4 text-center color-#fff"
        @click="actionTop(item)"
      >
        <wd-img :width="50" :height="50" :src="item.icon" />
        <view class="mt-4px text-14px">{{ item.text }}</view>
      </view>
    </view>
    <view class="flex justify-center absolute bottom-6px w-full">
      <wd-img :width="207" :height="44" :src="bgTip" />
    </view>
  </view>

  <!-- 消息 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="px-10px">
    <view
      class="h-40px bg-#F1F3FF rounded-6px flex items-center overflow-hidden pr-10px"
      @click="messageClick(mess1[0])"
    >
      <view class="w-60px h-full mr-10px msg flex pl-10px box-border items-center">
        <wd-badge is-dot>
          <wd-img :width="20" :height="20" :src="msgicon" />
        </wd-badge>
      </view>
      <wd-skeleton
        :custom-style="{ width: '100%' }"
        animation="flashed"
        :loading="messageLoading || !mess1[0]"
        :row-col="[{ width: '100%', height: '20px' }]"
      >
        <view class="flex-1 color-#666 truncate-1 text-14px">{{ mess1[0]?.articleTitle }}</view>
      </wd-skeleton>
    </view>
  </view>

  <!-- 广告位 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="py-3px h-135px swiper mx-[-2px]">
    <wd-swiper
      :list="swiperList"
      :autoplay="true"
      :current="0"
      :height="135"
      @click="swiperClick"
      :indicator="{ type: 'dots-bar' }"
      custom-indicator-class="custom-indicator-class"
      value-key="image"
      imageMode="scaleToFill"
    ></wd-swiper>
  </view>

  <!-- 服务专区 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="px-10px">
    <dy-title title="服务专区" bottom></dy-title>
    <view class="flex gap-10px flex-wrap justify-between">
      <view
        class="relative w-22.5% h-80px overflow-hidden rounded-7px"
        :style="`background:${item.bgcolor}`"
        v-for="(item, index) in serviceArea"
        :key="index"
        @click="serveClick(item)"
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
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="px-10px">
    <dy-title title="办事指南" more="查看更多" @moreClick="serveGuild" bottom></dy-title>
    <view class="p-12px relative zhbg">
      <view class="flex gap-20px justify-around items-center">
        <wd-img :width="140" :height="52" :src="znlogo" />
        <view
          class="flex gap-10px text-16px color-#fff items-center bg-cover w-153px h-38px justify-center"
          :style="` background-image: url(${btnbgBase64})`"
          @click="toBusinessOutlets"
        >
          <wd-icon name="search" size="16px"></wd-icon>
          <view>网点一键查询</view>
        </view>
      </view>

      <view class="p-15px mt-16px zn-item" @click="messageClick(mess2[0])">
        <view style="display: flex">
          <wd-skeleton
            :custom-style="{ width: '100%' }"
            animation="flashed"
            theme="text"
            :loading="messageLoading || !mess2[0]"
            :row="2"
          >
            <view class="color-#333 truncate-1">{{ mess2[0].articleTitle }}</view>
            <view class="flex gap-20px color-#888 text-14px mt-10px">
              <view>日期：{{ removeT(mess2[0].createTime) }}</view>
              <view>
                <!-- <wd-icon name="browse" size="14px"></wd-icon>
                {{ mess2[0].createBy }}次 -->
              </view>
            </view>
          </wd-skeleton>
        </view>
      </view>
    </view>
  </view>
  <wd-gap height="15" bg-color="#fff"></wd-gap>
</template>

<style>
:deep(.nav_show) {
  @apply bg-transparent!;
}
:deep(.nav_hide) {
  @apply bg-#2B66ED!;
}

.serch-bg {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 6px 6px 6px 6px;
}
.search-type::after {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: -10px;
  width: 1px;
  content: '';
  background: rgba(255, 255, 255, 0.65);
}
.msg {
  background: linear-gradient(-74deg, transparent 10px, #2d69ef 0) top right;
}
.zhbg {
  height: 179px;
  background: linear-gradient(180deg, #c0dcff 0%, #f5f9fe 100%);
  border-radius: 6px 6px 6px 6px;
}
.zn-item {
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0px 0px 13px 1px rgba(12, 86, 182, 0.16);
}
.swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #fff;
  --wot-swiper-nav-dot-active-color: #4d80f0;
}
</style>

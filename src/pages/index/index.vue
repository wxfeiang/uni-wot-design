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
import bgTip from '@/static/images/index/bgTip.png'
import bszlicon from '@/static/images/index/bszlicon.png'
import cjwticon from '@/static/images/index/cjwticon.png'
import fwwdicon from '@/static/images/index/fwwdicon.png'

import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { useBaseStore } from '@/store'
import { useUserStore } from '@/store/user'
import { routeTo, sceneResult } from '@/utils'
import { openWxChart, useScancode } from '@/utils/uniapi'
import { storeToRefs } from 'pinia'
import { useMessage, useToast } from 'wot-design-uni'
import { messProps } from './utils/types'
import useIndex from './utils/useIndex'

const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
defineOptions({
  name: 'Index',
})

const { VITE_APP_LOGOTITLE } = import.meta.env

const basestore = useBaseStore()
const toast = useToast()

const {
  messageClick,
  sendMessageList,
  messageData,
  messageLoading,
  serviceArea,
  topAction,
  specialTypeskeleton,
  sendGetSpecialTypeList,
  specialTypeList,
  specialTypeLoading,
  sendSwiperList,
  swiperListData,
  swiperListLoading,
} = useIndex()

async function actionTop2(item: any) {
  if (item.specialJumpType === 'WX') {
    openWxChart(item.appId, item.path)
  } else if (item.specialJumpType === 'H5') {
    if (!item.specialJump) {
      toast.show('功能开发中，敬请期待!...')
    } else {
      if (item.specialJump.indexOf('/pages/serve/index') > -1) {
        return routeTo({ url: item.specialJump, navType: NAVIGATE_TYPE.SWITCH_TAB })
      }
      return routeTo({ url: item.specialJump, navType: NAVIGATE_TYPE.NAVIGATE_TO })
    }
  }
}

async function actionTop(item: any) {
  if (item.type === 'sacn') {
    const resData: any = await useScancode({ onlyFromCamera: true })

    const { status, url } = sceneResult(resData)
    if (status) {
      routeTo({
        url: '/pages/pay/index',
        data: { url },
      })
    } else {
      message.alert({
        msg: '未识别到二维码内容',
        title: '提示',
      })
    }
  } else if (item.type === 'wxChart') {
    openWxChart(item.appId, item.path)
  } else if (item.type === 'switchTab') {
    basestore.setActive(item.active)
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
  if (item.shopHdType === 1) {
    routeTo({ url: item.appUrl, data: { ...item.data } })
  } else if (item.shopHdType === 0) {
    routeTo({
      url: '/pages-sub/webView/index',
      data: {
        type: item.shopHdId,
        showType: item.lineType === '1' ? 'webView' : 'banner',
        url: item.linkUrl,
      },
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

const toServhFor = (type) => {
  routeTo({ url: '/pages-sub/serveMassage/serchFor/index', data: { type } })
}

function toBusinessOutlets() {
  routeTo({ url: '/pages-sub/serveMassage/businessOutlets/index' })
}

function toMessage() {
  routeTo({ url: '/pages-sub/serveMassage/messageList/index' })
}

function toMessageItem(e) {
  const { index } = e
  messageClick(mess1.value[index])
}

const mess1 = ref<messProps[]>([])
const mess2 = ref<messProps[]>([])

const topbgBase64 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/3ce4fcc4-5f4e-4acd-a3e5-238085a09388j95TiPFo8STT8ed4b7daa361d320ff446f49a4aa7467.png',
)
const bszlbg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/7042a1ab-7ecd-4d04-b133-318373b867f1bslbg.png',
)
const fwwdbg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/f04c66e4-56d5-4d4b-95dd-dac4135de0c3fwwdbg.png',
)
const cjwtbg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/a8ce20f6-474c-4b81-9481-6de668f27abbcjwtbg.png',
)
const tzxxbg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/838fb3d9-1010-49dd-9901-a255c5b33135tzxx_bg.png',
)
const topAction2 = ref<any>([])

// 获取消息

onShow(async () => {
  await sendGetSpecialTypeList()
  topAction2.value = specialTypeList.value

  await sendMessageList({
    page: 1,
    size: 50,
  })
  await sendSwiperList({
    page: 1,
    size: 10,
    location: 1,
  })
  mess1.value = messageData.value.content.filter((i) => i.articleType === '0').slice(0, 5)
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
    class="box-border h-290px relative bg-no-repeat bg-cover"
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
    <view
      class="w-100vw flex items-center justify-between gap-2px box-border"
      @click="toServhFor(0)"
    >
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
  <view class="px-20px pt-10px">
    <wd-skeleton :row-col="specialTypeskeleton" :loading="specialTypeLoading" animation="flashed">
      <view class="grid grid-cols-5">
        <view
          class="flex flex-col items-center"
          v-for="(item, index) in topAction2"
          :key="index"
          @click="actionTop2(item)"
        >
          <view>
            <wd-img :src="item.specialIcon" width="45" height="45"></wd-img>
          </view>
          <view class="text-12px mt-3px text-center">
            {{ item.specialName }}
          </view>
        </view>
      </view>
    </wd-skeleton>
  </view>

  <!-- 消息 -->

  <wd-gap height="10" bg-color="#F2F3F7"></wd-gap>
  <view class="px-15px">
    <view class="h-40px bg-#fff rounded-6px flex items-center overflow-hidden pr-10px relative">
      <view class="flex box-border pl-10px">
        <wd-badge :is-dot="false">
          <view
            class="w-64px text-#2D69EF text-12px box-border px-5px py-2px rounded-4px text-center"
            :style="`background-image: url(${tzxxbg}); background-size: 100%`"
          >
            消息通知
          </view>
        </wd-badge>
      </view>
      <view class="flex-1 pl-10px">
        <wd-skeleton
          animation="flashed"
          :loading="messageLoading || mess1.length < 1"
          :row-col="[{ width: '80%', height: '20px' }]"
        >
          <wd-notice-bar
            custom-class="custom-class-noticebar"
            direction="vertical"
            :delay="3"
            @click="toMessageItem"
            :text="mess1.map((item) => item.articleTitle + '...')"
          />
        </wd-skeleton>
      </view>

      <view
        @click.stop="toMessage"
        class="absolute right-0px top-0 h-100% flex justify-center items-center w-30px"
      >
        <wd-icon name="arrow-right" size="16px" color="#888"></wd-icon>
      </view>
    </view>
  </view>

  <!-- 广告位 -->
  <wd-gap height="10" bg-color="#F2F3F7"></wd-gap>
  <view class="py-3px h-135px swiper px-15px">
    <wd-skeleton
      animation="flashed"
      :row-col="[{ width: '100%', height: '135px' }]"
      :loading="swiperListLoading"
    >
      <wd-swiper
        :list="swiperListData!.content"
        :autoplay="true"
        :current="0"
        :height="135"
        @click="swiperClick"
        :indicator="{ type: 'dots-bar' }"
        custom-indicator-class="custom-indicator-class"
        customClass="custom-class-swiper"
        value-key="shopHdBanner"
        imageMode="scaleToFill"
      ></wd-swiper>
    </wd-skeleton>
  </view>

  <!-- 服务专区 -->
  <wd-gap height="10" bg-color="#F2F3F7"></wd-gap>
  <view class="px-10px">
    <view class="p-12px pb-3px bg-#fff rounded-6px">
      <dy-title title="服务专区" bottom></dy-title>
      <scroll-view scroll-x class="navscroll pb-10px">
        <view class="flex overflow-x-auto gap-10px w-200%">
          <view
            class="flex flex-col h-100px overflow-hidden w-80px bg-no-repeat box-border"
            v-for="(item, index) in serviceArea"
            :key="index"
            @click="serveClick(item)"
            :style="`background-image: url(${item.bgimg}); background-size: 100% `"
          >
            <view class="text-center text-14px line-height-20px mt-10px color-#4B78DC font-600">
              {{ item.title }}
            </view>

            <view class="mt-5px ml-10px mr-auto">
              <wd-img
                :src="item.texticon"
                :width="item.width ?? '59'"
                :height="item.height ?? '21'"
              ></wd-img>
            </view>
            <view class="w-13px h-3px bg-#4B78DC rounded-3px ml-10px mr-auto"></view>
          </view>
        </view>
      </scroll-view>
      <view class="w-50px h-4px bg-#D1DBF0 rounded-3px mx-auto"></view>
    </view>
  </view>
  <!-- 关注公众号 -->
  <view class="px-10px">
    <dy-wxguanzhu customClass="bg-#fff"></dy-wxguanzhu>
  </view>
  <!-- 办事指南 -->
  <wd-gap height="10" bg-color="#F2F3F7"></wd-gap>
  <view class="px-10px">
    <view class="p-10px rounded-6px bg-#fff">
      <view class="flex gap-10px justify-between">
        <view
          class="w-40% box-border p-15px bg-no-repeat box-border"
          @click="serveGuild"
          :style="`background-image: url(${bszlbg}); background-size: 100% 110%;`"
        >
          <view class="text-16px font-600 color-#374A7B">办事指南</view>
          <view class="color-#859ABE text-10px my-10px">如何快速了解一卡通,如何申领,如何使用</view>
          <view class="bb-2px_#374A7B w-30px"></view>

          <view class="mt-20px flex justify-end">
            <wd-img :src="bszlicon" width="43" height="43"></wd-img>
          </view>
        </view>
        <view class="w-60% flex flex-col justify-between gap-10px">
          <view
            class="bg-no-repeat box-border py-15px pl-15px pr-10px flex justify-between"
            :style="`background-image: url(${fwwdbg}); background-size: 100% 130%;`"
            @click="toBusinessOutlets"
          >
            <view>
              <view class="text-16px font-600 color-#DF3636">网点查询</view>
              <view class="color-#C9AAAA text-10px my-10px">查询附近社保业务办理网点</view>
              <view class="bb-2px_#DF3636 w-30px"></view>
            </view>

            <view class="self-end">
              <wd-img :src="fwwdicon" width="43" height="43"></wd-img>
            </view>
          </view>
          <view
            class="bg-no-repeat box-border py-15px pl-15px pr-10px flex justify-between"
            :style="`background-image: url(${cjwtbg}); background-size: 100% 130%;`"
            @click="toServhFor(7)"
          >
            <view class>
              <view class="text-16px font-600 color-#EC5E0C">常见问题</view>
              <view class="color-#D2B783 text-10px my-10px">快速答疑</view>
              <view class="bb-2px_#EC5E0C w-30px"></view>
            </view>

            <view class="self-end">
              <wd-img :src="cjwticon" width="43" height="43"></wd-img>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <wd-gap height="10" bg-color="#F2F3F7"></wd-gap>
</template>
<style>
page {
  background: #f2f3f7;
}
</style>
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
.swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24 rpx;
  --wot-swiper-nav-dot-color: #fff;
  --wot-swiper-nav-dot-active-color: #4d80f0;
}

:deep(.custom-class-noticebar) {
  @apply p-0! bg-transparent!  color-#333! text-14px! w-60vw overflow-hidden truncate-1!;
}
:deep(.custom-class-swiper) {
  @apply rounded-4px! overflow-hidden!;
}
</style>

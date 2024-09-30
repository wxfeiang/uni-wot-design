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
import bgTip from '@/static/images/index/bgTip.png'
import btnbg from '@/static/images/index/btnbg.png'
import indexbg from '@/static/images/index/indexbg.png'
import msgicon from '@/static/images/index/msgicon.png'
import znbg from '@/static/images/index/znbg.png'
import znlogo from '@/static/images/index/znlogo.png'
import logo from '@/static/images/logo.png'

import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { useBaseStore } from '@/store'
import { removeT, routeTo, sceneResult } from '@/utils'
import { openWxChart, useScancode } from '@/utils/uniapi'
import { pathToBase64 } from 'image-tools'
import { useMessage, useToast } from 'wot-design-uni'
import { messProps } from './utils/types'
import useIndex from './utils/useIndex'

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
  messageLoading,
  swiperList,
  serviceArea,
  topAction,
  topAction2,
} = useIndex()

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

  if (item.type === 'router') {
    routeTo({ url: item.path, data: { ...item.data } })
  } else {
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

function toMessage() {
  routeTo({ url: '/pages-sub/serveMassage/messageList/index' })
}

function toMessageItem(e) {
  const { index } = e

  messageClick(mess1.value[index])
}

const mess1 = ref<messProps[]>([])
const mess2 = ref<messProps[]>([])

const topbgBase64 = ref('')
const btnbgBase64 = ref('')
const znbgBase64 = ref('')

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(indexbg)
  btnbgBase64.value = await pathToBase64(btnbg)
  znbgBase64.value = await pathToBase64(znbg)
})
onMounted(async () => {
  const mess: any = await sendMessageList({
    page: 1,
    size: 50,
  })
  mess1.value = mess.data.data.content.filter((i) => i.articleType === '0').slice(0, 5)

  mess2.value = mess.data.data.content.filter((i) => i.articleType === '1').slice(0, 3)
})

const closeAdFlog = ref(true)
const closeAd = () => {
  closeAdFlog.value = false
}

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
  <view class="px-20px">
    <view class="flex justify-between items-center">
      <view
        class="w-22% flex flex-col items-center py-10px"
        v-for="(item, index) in topAction2"
        :key="index"
        @click="actionTop(item)"
      >
        <view>
          <wd-img :src="item.icon" width="45" height="45"></wd-img>
        </view>

        <view class="text-12px mt-10px text-center">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>

  <!-- 消息 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="px-15px">
    <view class="h-40px bg-#F1F3FF rounded-6px flex items-center overflow-hidden pr-10px relative">
      <view class="w-53px h-full bg-#D6E6F9 mr-10px flex box-border pl-12px pt-10px rounded-r-full">
        <wd-badge :is-dot="false">
          <wd-img :width="20" :height="20" :src="msgicon" />
        </wd-badge>
      </view>
      <view class="flex-1">
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
        class="absolute right-0 top-0 pl-15px pr-10px py-3px color-#fff text-12px bg-#2D69EF rounded-bl-11px"
      >
        更多
      </view>
    </view>
  </view>

  <!-- 广告位 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="py-3px h-135px swiper px-15px">
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

  <view v-if="closeAdFlog">
    <wd-gap height="15" bg-color="#fff"></wd-gap>
    <view class="px-15px">
      <view
        class="flex justify-between items-center p-10px bd-1px_solid_#FFE8C6 bg-#FFF6E9 relative rounded-4px gap-10px pr-30px"
      >
        <view>
          <wd-img :src="logo" height="40" width="40"></wd-img>
        </view>
        <view class="flex-1">
          <view class="text-14px">关注雄安一卡通公众号</view>
          <view class="color-#B1B1B1 text-12px mt-5px">雄安新区社会保障卡一卡通服务</view>
        </view>
        <view class="px-10px py-3px color-#fff text-12px bg-#FF8902 rounded-1000">立即关注</view>
        <view class="absolute top-0 right-0" @click="closeAd">
          <wd-icon name="close-circle" size="22px" color="#E4C29C"></wd-icon>
        </view>
      </view>
    </view>
  </view>
  <!-- 服务专区 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="px-15px">
    <view class="bsbg p-10px">
      <dy-title title="服务专区" bottom></dy-title>
      <view class="flex gap-10px flex-wrap justify-between mx-[-10px]">
        <view
          class="flex justify-between w-48.5% h-60px items-center overflow-hidden rounded-7px bg-#EBF3FE"
          v-for="(item, index) in serviceArea"
          :key="index"
          @click="serveClick(item)"
        >
          <view class="flex-1 text-center text-14px my-10px">
            {{ item.title }}
          </view>
          <view class="px-10px">
            <wd-img :src="item.icon" width="53" height="54"></wd-img>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 办事指南 -->
  <wd-gap height="15" bg-color="#fff"></wd-gap>
  <view class="px-15px">
    <view class="bsbg p-10px">
      <dy-title title="办事指南" more="查看更多" @moreClick="serveGuild" bottom></dy-title>
      <view class="mx-[-10px] relative">
        <view
          class="h-84px flex justify-center items-center rounded-6px bgzn1 bg-no-repeat"
          :style="`background-image: url(${znbgBase64});background-size: 100%`"
        >
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
        </view>
        <view
          class="p-15px pb-20px mt-16px zn-item"
          v-for="(item, index) in mess2"
          :key="index"
          @click="messageClick(item)"
        >
          <view style="display: flex">
            <wd-skeleton
              :custom-style="{ width: '100%' }"
              animation="flashed"
              theme="text"
              :loading="messageLoading || mess2.length < 1"
              :row="2"
            >
              <view class="color-#333 truncate-1">{{ item.articleTitle }}</view>
              <view class="flex gap-20px color-#888 text-14px mt-10px">
                <view>日期：{{ removeT(item.createTime) }}</view>
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
  </view>
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
.bsbg {
  background: linear-gradient(189deg, #e7f1ff 0%, #feffff 16%, #ffffff 100%);
  border-radius: 6px;
}

.bgzn1 {
  background-color: linear-gradient(180deg, #d1e6ff 0%, #e6f4ff 100%);
}

.zn-item {
  background: #f2f5f7;
  border-radius: 6px;
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
</style>

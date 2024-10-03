<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '商城',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import searchicon from '@/static/images/shop/search.png'
import caricon from '@/static/images/shop/shopcar.png'
import bgjifen from '@/static/images/shop/bgjifen.png'
import jifen from '@/static/images/shop/jifen.png'
import quanbg from '@/static/images/shop/quanbg.png'
import quan from '@/static/images/shop/quan.png'
import led from '@/static/images/shop/led.png'
import tuijian from '@/static/images/shop/tuijian.png'
import { pathToBase64 } from 'image-tools'

import { getGoodList } from '@/service/api/shop'

import { routeTo } from '@/utils'
import useUserOrder from './utils/userOrder'

const { sendGetActivityList: getActivityList } = useUserOrder()
const pageOption = ref<PageOption>({ page: 1, size: 10, bannerFlag: 1 })
const swiperList = ref<IActivityBanner[]>([])
const current = ref(0)
const handleClick = (e: { item: IActivityBanner }) => {
  gopath('/pages-sub/homeManager/action', { id: e.item.itemId })
}

const paging = ref(null)
const goodList = ref([])
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
const topbgBase64 = ref('')
const searchIcon = ref('')
const carIcon = ref('')

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

const goCar = () => {
  uni.navigateTo({
    url: '/pages/shop/shopCar',
  })
}

const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    const res: any = await getGoodList({
      page: pageNo,
      size: pageSize,
      status: 1,
    })
    res.content.forEach((el) => {
      el.rotationUrl = JSON.parse(el.rotationUrl).map((item) => item.data)
    })
    console.log('商城列表', res.content)
    paging.value.complete(res.content)
    // paging.value.complete([])
  } catch {
    paging.value.complete(false)
  }
}
onShow(async () => {
  // getLsit()
  const { content = [] } = await getActivityList(pageOption.value)
  swiperList.value = content
})
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(indexbg)
  searchIcon.value = await pathToBase64(searchicon)
  carIcon.value = await pathToBase64(caricon)
})

// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
</script>
<template>
  <z-paging ref="paging" v-model="goodList" @query="getLsit">
    <!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
    <!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
    <template #top>
      <view
        class="box-border h-153px fixed pos-top-none bg-no-repeat bg-cover z-999"
        :style="` background-image: url(${topbgBase64});background-size: 100% 99%`"
      >
        <wd-navbar safeAreaInsetTop placeholder custom-class="nav_custom" :bordered="false">
          <template #left>
            <view class="flex gap-10px items-center">
              <text class="line-height-44px text-18px color-#fff mt-5px">
                {{ VITE_APP_LOGOTITLE }}
              </text>
            </view>
          </template>
        </wd-navbar>

        <!-- <wd-sticky :offset-top="navTop"> -->
        <view class="w-100vw flex items-center justify-center gap-2px box-border m-t-10px">
          <view class="pl-10px pr-2px flex items-center search pos-relative">
            <wd-img :width="17" :height="18" :src="searchIcon" />
            <input
              class="uni-input m-l-10px flex-1"
              confirm-type="search"
              placeholder="请输入搜索关键词"
              @focus="routeTo({ url: '/pages/shop/goodsSearch' })"
            />
            <view class="searchbtn">搜索</view>
          </view>
          <view class="caricon" @click="goCar">
            <wd-img :width="30" :height="28" :src="carIcon" />
          </view>
        </view>
        <!-- </wd-sticky> -->
      </view>
      <view class="w-full p-10px pt-153px box-border banner">
        <!-- <wd-img
          width="100%"
          :height="150"
          src="https://oss.xay.xacloudy.cn/images/2024-09/ed5ce984-0c3d-4b97-b96f-9c7600646fe4banner.png"
          @click="gopath('/pages-sub/homeManager/action?id=3')"
        /> -->
        <wd-swiper
          :list="swiperList"
          autoplay
          v-model:current="current"
          value-key="shopHdBanner"
          :indicator="{ type: 'dots-bar' }"
          :display-multiple-items="0"
          @click="handleClick"
        ></wd-swiper>
        <div class="w-full mt-10px flex justify-between">
          <div
            class="pos-relative"
            @click="gopath('/pages-sub/marketManager/IntegralMarket/IntegralMarket/list')"
          >
            <wd-img :width="174" :height="76" :src="bgjifen" />
            <wd-img :width="80" :height="80" :src="jifen" custom-class="img" />
            <view class="pos-absolute left-87px top-18px">
              <view class="font-size-16px" style="color: #e22525">积分商城</view>
              <view class="font-size-12px" style="color: #6e6e6e">福利来袭</view>
            </view>
          </div>
          <div class="pos-relative" @click="gopath('/pages-sub/marketManager/coupon/index')">
            <wd-img :width="174" :height="76" :src="quanbg" />
            <wd-img :width="80" :height="80" :src="quan" custom-class="img" />
            <view class="pos-absolute left-87px top-18px">
              <view class="font-size-16px" style="color: #8839b6">领券中心</view>
              <view class="font-size-12px" style="color: #6e6e6e">优惠多多</view>
            </view>
          </div>
        </div>
      </view>
    </template>

    <view class="list py-10px">
      <view class="flex px-18px box-border mb-16px">
        <wd-img :width="28" :height="28" :src="led" />
        <wd-img :width="80" :height="30" :src="tuijian" custom-class="ml-2px" />
      </view>
      <view class="grid grid-cols-2 gap-row-15px gap-col-13px px-15px box-border">
        <view
          class="flex flex-col border-rd-6px overflow-hidden w-175px bg-white pb-5px"
          v-for="item in goodList"
          :key="item.spuId"
          @click="gopath('/pages/shop/shopInfo', { id: item.spuId })"
        >
          <wd-img :width="175" :height="160" :src="item.rotationUrl[0]" />
          <view class="w-155px name my-10px m-auto">
            {{ item.spuName }}
          </view>
          <view>
            <text style="margin-left: 10px; font-size: 12px; color: #f44d24">￥</text>
            <text style="font-size: 18px; font-weight: 600; color: #f44d24">
              {{ item.sellPrice }}
            </text>
            <text style="margin-left: 8px; font-size: 12px; color: #999999">
              已售{{ item.salesVolume }}件
            </text>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style>
.main-title-color {
  color: #d14328;
}

:deep(.nav_custom) {
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent !important;
}

.search {
  box-sizing: border-box;
  width: 308px;
  height: 35px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;
}

.img {
  position: absolute !important;
  bottom: 6px;
  left: 7px;
}

.searchbtn {
  width: 57px;
  line-height: 31px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 20px 20px 20px 20px;
}

.caricon {
  position: relative;
  margin-left: 16px;
}

.name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.banner {
  background: #f7f7f7;
}
/*.caricon::after {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  right: 0;*/
/*  width: 12px;*/
/*  height: 12px;*/
/*  content: '';*/
/*  background-color: #ff0707;*/
/*  border: 1px solid #ffffff;*/
/*  border-radius: 50px;*/
/*}*/

.list {
  /*min-height: calc(100vh - 417px);*/
  background: #f7f7f7;
}

:deep(.zp-empty-view-center) {
  background: #f7f7f7;
}

:deep(.z-paging-content) {
  background: #f7f7f7;
}

:deep(.wd-tabs__nav) {
  color: #fff;
  background: transparent !important;
}
</style>

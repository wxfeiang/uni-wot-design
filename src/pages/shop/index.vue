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

import nav0 from '../../static/images/shop/shop_nav0.png'
import nav1 from '../../static/images/shop/shop_nav1.png'
import nav2 from '../../static/images/shop/shop_nav2.png'
import nav3 from '../../static/images/shop/shop_nav3.png'
import nav4 from '../../static/images/shop/shop_nav4.png'
import nav5 from '../../static/images/shop/shop_nav5.png'

import nav6 from '../../static/images/shop/shop_nav6.png'
import nav7 from '../../static/images/shop/shop_nav7.png'
import nav8 from '../../static/images/shop/shop_nav8.jpg'
import nav9 from '../../static/images/shop/shop_nav9.jpg'
import { pathToBase64 } from 'image-tools'

import { getGoodList, getGoodListByType } from '@/service/api/shop'

import { routeTo } from '@/utils'
import useUserOrder from './utils/userOrder'

const { sendGetActivityList: getActivityList } = useUserOrder()
const pageOption = ref<PageOption>({
  page: 1,
  size: 10,
  bannerFlag: 1,
})
const swiperList = ref<IActivityBanner[]>([])
const current = ref(0)
const navList = ref([
  {
    icon: nav1,
    name: '热销商品',
    path: '/pages-sub/shopManager/shopList?type=1',
  },
  {
    icon: nav2,
    name: '人气榜单',
    path: '/pages-sub/shopManager/shopList?type=2',
  },
  {
    icon: nav3,
    name: '新品上市',
    path: '/pages-sub/shopManager/shopList?type=3',
  },
  {
    icon: nav4,
    name: '热荐好物',
    path: '/pages-sub/shopManager/shopList?type=4',
  },
  {
    icon: nav5,
    name: '积分商城',
    path: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/list',
  },
])

const navListType = ref({})

const handleClick = (e: { item: IActivityBanner }) => {
  gopath('/pages-sub/homeManager/action', { id: e.item.itemId })
}

const paging = ref(null)
const goodList = ref([])
const actCode = ref('')
const actLabel = ref('精选好物')
const goodListType = ref([{ name: '全部', code: '' }])
const goodListZY = ref([])

const TypeList = ref([])
const LabelList = ref([])

const { navTop } = useNav()
const searchIcon = ref('')
const { VITE_APP_LOGOTITLE } = import.meta.env
const topbgBase64 = ref('')
const carIcon = ref('')

function gopath(url, e) {
  routeTo({
    url,
    data: e,
  })
}

function chooseCode(code) {
  actCode.value = code
  getTypeLsit()
}

function chooseLabel(code) {
  actLabel.value = code
  getLabelLsit()
}

function goCar() {
  uni.navigateTo({
    url: '/pages-sub/homeManager/shopCar',
  })
}

async function getLsitBytype() {
  const res: any = await getGoodListByType({
    pcode: 0,
    type: 0,
  })

  goodListType.value = res
  actCode.value = goodListType.value[0].code
  getTypeLsit()
  console.log(navListType.value)
}

async function getLabelLsit() {
  const res: any = await getGoodList({
    page: 1,
    size: 20,
    status: 1,
    labelName: actLabel.value,
  })

  LabelList.value = res.content
  console.log(navListType.value)
}

async function getTypeLsit() {
  const res: any = await getGoodList({
    page: 1,
    size: 4,
    status: 1,
    firstCategoryId: actCode.value,
  })

  TypeList.value = res.content
  console.log(navListType.value)
}

async function getLsitZY() {
  const res: any = await getGoodList({
    page: 1,
    size: 3,
    status: 1,
  })
  res.content.forEach((e) => {
    e.skuUrl = JSON.parse(e.skuUrl).data
  })

  goodListZY.value = res.content
  console.log(navListType.value)
}

async function getLsit(pageNo: number, pageSize: number) {
  try {
    const res: any = await getGoodList({
      page: 1,
      size: 20,
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

// /product/manage/itemCategory/categoryList
const getUrl = (str) => {
  console.log(str)
  if (str) {
    return JSON.parse(str)[0].data
  } else {
    return ''
  }
}
onPageScroll((e) => {})

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(indexbg)
  searchIcon.value = await pathToBase64(searchicon)
  carIcon.value = await pathToBase64(caricon)
  getLsitZY()
  getLabelLsit()
  getLsitBytype()
  const { content = [] } = await getActivityList(pageOption.value)
  swiperList.value = content
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
              @focus="routeTo({ url: '/pages-sub/homeManager/chooseAndBuy' })"
            />
            <view class="searchbtn">搜索</view>
          </view>
          <view class="caricon" @click="goCar">
            <wd-img :width="30" :height="28" :src="carIcon" />
          </view>
        </view>
        <!-- </wd-sticky> -->
      </view>
    </template>
    <view class="w-full pt-150px box-border banner">
      <!-- <wd-img
        width="100%"
        :height="150"
        src="https://oss.xay.xacloudy.cn/images/2024-09/ed5ce984-0c3d-4b97-b96f-9c7600646fe4banner.png"
        @click="gopath('/pages-sub/homeManager/action?id=3')"
      /> -->
      <wd-swiper
        :list="swiperList"
        autoplay
        loop
        height="135px"
        v-model:current="current"
        value-key="shopHdBanner"
        :indicator="{ type: 'dots-bar' }"
        :display-multiple-items="0"
        @click="handleClick"
      ></wd-swiper>

      <view class="w-full px-4 pt-4 pb-1 flex justify-between box-border items-center pos-relative">
        <view
          v-for="(item, ind) in navList"
          :key="ind"
          class="p-1 box-border pos-relative flex justify-center items-center flex-col"
          @click="gopath(item.path)"
        >
          <wd-img :width="50" :height="50" :src="item.icon" />

          <wd-text
            :text="item.name"
            size="12px"
            color="#000"
            custom-class="my-1 float-left"
          ></wd-text>
        </view>
      </view>
      <view class="px-4">
        <wd-img
          width="100%"
          mode="widthFix"
          :src="nav6"
          @click="gopath('/pages-sub/marketManager/coupon/index')"
        />
      </view>

      <view class="px-4 py-2">
        <view class="box-border pos-relative flex justify-between items-center">
          <view class="box-border overflow-hidden w-1/2 pr-4px">
            <view
              class="bg1 pt-2 px-2 border-rd-5px"
              @click="gopath('/pages-sub/shopManager/shopList?type=5')"
            >
              <view>
                <view class="box-border pos-relative flex justify-between items-center mb-1">
                  <wd-img width="45%" mode="widthFix" :src="nav0"></wd-img>
                  <wd-img width="38%" mode="widthFix" :src="nav7"></wd-img>
                </view>

                <view class="uni-margin-wrap" style="overflow: hidden; border-radius: 5px">
                  <swiper
                    class="swiper"
                    circular
                    vertical
                    indicator-dots
                    autoplay
                    :interval="3000"
                    indicator-color="#f5dcd6"
                    indicator-active-color="#ce5133"
                  >
                    <swiper-item v-for="(item, index) in goodListZY" :key="index">
                      <view class="swiper-item w-full flex justify-between">
                        <wd-img
                          width="35%"
                          height="100%"
                          mode="aspectFill"
                          :src="getUrl(item.saleUrl)"
                          radius="4"
                        ></wd-img>
                        <view
                          class="w-full flex flex-col justify-between items-center overflow-hidden box-border pos-relative"
                          style="width: 62%; height: 100%"
                        >
                          <view class="w-full overflow-hidden box-border pos-relative">
                            <wd-text
                              :text="item.spuName"
                              size="14px"
                              :lines="2"
                              color="#000"
                              custom-class="my-1 "
                              custom-style="word-break: break-all;"
                            ></wd-text>
                          </view>
                          <view class="flex w-full justify-between items-center">
                            <wd-text
                              :text="'￥' + item.sellPrice"
                              size="16px"
                              color="#f44d24"
                              custom-class="mr-1"
                            ></wd-text>
                            <wd-text
                              :text="'￥' + item.originalPrice"
                              size="12px"
                              decoration="line-through"
                              color="#999"
                              custom-class="mr-2"
                            ></wd-text>
                          </view>
                        </view>
                      </view>
                    </swiper-item>
                  </swiper>
                </view>
              </view>
            </view>
          </view>
          <view class="box-border w-1/2 pl-4px rightBox">
            <view
              class="pos-relative flex flex-col justify-between items-center h-full"
              style="font-size: 0"
            >
              <wd-img
                width="100%"
                height="48%"
                mode="scaleToFill"
                :src="nav8"
                radius="4"
                @click="gopath('/pages-sub/shopManager/shopList?type=7')"
              />

              <wd-img
                width="100%"
                height="48%"
                mode="scaleToFill"
                :src="nav9"
                radius="4"
                @click="gopath('/pages-sub/shopManager/shopList?type=6')"
              />
            </view>
          </view>
        </view>
      </view>

      <view class="pr-4 box-border pos-relative pt-2 bg-#f7f7f7" style="width: 100vw">
        <view class="box-border pos-relative flex justify-between items-start">
          <view
            class="flex z-0"
            style="
              width: calc(100% - 90px);
              overflow-x: hidden;
              overflow-x: auto;
              white-space: nowrap;
            "
          >
            <view class="box-border pos-relative flex justify-left items-center pr-4">
              <view
                class="ml-4 py-1 navType"
                style="font-size: 14px; color: #666"
                @click="chooseCode(it.code)"
                v-for="(it, index) in goodListType"
                :key="index"
              >
                <view class="navType" :class="actCode === it.code ? 'act' : ''">{{ it.name }}</view>
              </view>
            </view>
          </view>
          <view class="box-border absolute right-0 overflow-hidden z-10 showmore">
            <view
              class="py-1 justify-right items-right overflow-hidden"
              style="padding-bottom: 10px; font-size: 14px"
              @click="gopath('/pages-sub/shopManager/shopCategory')"
            >
              <wd-text
                text="全部分类"
                size="14px"
                color="#333"
                custom-class="ml-1   float-right "
                custom-style=" padding-bottom: 10px;"
              ></wd-text>
              <wd-icon
                name="bulletpoint"
                size="22px"
                custom-class="float-right "
                custom-style=" padding-bottom: 10px;"
              >
                全部分类
              </wd-icon>
            </view>
          </view>
        </view>
      </view>

      <view class="pt-15px grid grid-cols-2 gap-row-15px gap-col-13px px-15px box-border">
        <view
          class="flex flex-col border-rd-6px overflow-hidden bg-white pb-5px"
          v-for="item in TypeList"
          :key="item.spuId"
          @click="routeTo({ url: '/pages-sub/homeManager/shopInfo', data: { id: item.spuId } })"
        >
          <wd-img width="100%" :height="160" :src="getUrl(item.saleUrl)" />

          <view class="w-155px name listname mt-10px mb-5px m-auto float-left">
            <text class="ZYtag" v-if="item.shopName === '数城科技'">自营</text>
            {{ item.spuName }}
          </view>

          <view>
            <text style="margin-left: 10px; font-size: 12px; color: #f44d24">￥</text>
            <text style="font-size: 18px; font-weight: 600; color: #f44d24">
              {{ item.sellPrice }}
            </text>
            <text style="margin-left: 8px; font-size: 12px; color: #999999">
              已售{{ item.frequently }}件
            </text>
          </view>
        </view>
      </view>

      <wd-sticky :offset-top="150">
        <view class="pt-4 bg-#f7f7f7" style="width: 100vw">
          <view class="box-border pos-relative flex justify-between items-center px-4">
            <view
              class="box-border pos-relative flex-col justify-center items-center"
              @click="chooseLabel('精选好物')"
            >
              <view class="nav3b" :class="actLabel === '精选好物' ? 'act' : ''">精选好物</view>
              <view class="nav3s" :class="actLabel === '精选好物' ? 'act' : ''">超值抢购</view>
            </view>
            <view class="line"></view>
            <view
              class="box-border pos-relative flex-col justify-center items-center"
              @click="chooseLabel('当季热卖')"
            >
              <view class="nav3b" :class="actLabel === '当季热卖' ? 'act' : ''">当季热卖</view>
              <view class="nav3s" :class="actLabel === '当季热卖' ? 'act' : ''">种类多样</view>
            </view>
            <view class="line"></view>
            <view
              class="box-border pos-relative flex-col justify-center items-center"
              @click="chooseLabel('美味开吃')"
            >
              <view class="nav3b" :class="actLabel === '美味开吃' ? 'act' : ''">美味开吃</view>
              <view class="nav3s" :class="actLabel === '美味开吃' ? 'act' : ''">吃货必备</view>
            </view>
            <view class="line"></view>
            <view
              class="box-border pos-relative flex-col justify-center items-center"
              @click="chooseLabel('日用好物')"
            >
              <view class="nav3b" :class="actLabel === '日用好物' ? 'act' : ''">日用好物</view>
              <view class="nav3s" :class="actLabel === '日用好物' ? 'act' : ''">多买多省</view>
            </view>
          </view>
        </view>
      </wd-sticky>

      <view class="w-full p-14px box-border">
        <view
          class="flex w-full p-10px box-border mb-10px bg-#fff border-rd-6px"
          v-for="item in LabelList"
          :key="item.spuId"
        >
          <wd-img :width="86" :height="86" :src="getUrl(item.saleUrl)" />
          <div class="flex-1 ml-15px flex flex-col justify-between">
            <view class="w-full name listname float-left">
              <text class="ZYtag" v-if="item.shopName === '数城科技'">自营</text>
              {{ item.spuName }}
            </view>

            <view class="flex justify-between">
              <view>
                <text style="font-size: 12px; color: #f44d24">￥</text>
                <text style="font-size: 18px; font-weight: 600; color: #f44d24">
                  {{ item.sellPrice }}
                </text>

                <wd-text
                  text="￥22"
                  size="12px"
                  color="#999999"
                  decoration="line-through"
                  custom-class="ml-10px"
                ></wd-text>
              </view>
              <view
                class="w-65px h-24px bg-#f64e25 flex items-center justify-center border-rd-50px color-#fff"
                style="font-size: 12px"
                @click="
                  routeTo({ url: '/pages-sub/homeManager/shopInfo', data: { id: item.spuId } })
                "
              >
                去购买
              </view>
            </view>
          </div>
        </view>
      </view>

      <!--      <div class="w-full p-4 mt-10px flex justify-between box-border pos-relative">-->
      <!--        <div-->
      <!--          class="pos-relative"-->
      <!--          style="width: calc(50% - 16rpx)"-->
      <!--          @click="gopath('/pages-sub/marketManager/IntegralMarket/IntegralMarket/list')"-->
      <!--        >-->
      <!--          <wd-img width="100%" :height="76" :src="bgjifen"/>-->
      <!--          <wd-img :width="80" :height="80" :src="jifen" custom-class="img"/>-->
      <!--          <view class="pos-absolute left-87px top-18px">-->
      <!--            <view class="font-size-16px" style="color: #e22525">积分商城</view>-->
      <!--            <view class="font-size-12px" style="color: #6e6e6e">福利来袭</view>-->
      <!--          </view>-->
      <!--        </div>-->
      <!--        <div-->
      <!--          class="pos-relative"-->
      <!--          style="width: calc(50% - 16rpx)"-->
      <!--          @click="gopath('/pages-sub/marketManager/coupon/index')"-->
      <!--        >-->
      <!--          <wd-img width="100%" :height="76" :src="quanbg"/>-->
      <!--          <wd-img :width="80" :height="80" :src="quan" custom-class="img"/>-->
      <!--          <view class="pos-absolute left-87px top-18px">-->
      <!--            <view class="font-size-16px" style="color: #8839b6">领券中心</view>-->
      <!--            <view class="font-size-12px" style="color: #6e6e6e">优惠多多</view>-->
      <!--          </view>-->
      <!--        </div>-->
      <!--      </div>-->
    </view>

    <!--    <view class="list py-10px p-4 pos-relative">-->
    <!--      <view class="flex px-18px box-border mb-16px">-->
    <!--        <wd-img :width="28" :height="28" :src="led"/>-->
    <!--        <wd-img :width="80" :height="30" :src="tuijian" custom-class="ml-2px"/>-->
    <!--      </view>-->
    <!--      <view class="grid grid-cols-2 gap-row-16px gap-col-16px box-border pos-relative">-->
    <!--        <view-->
    <!--          class="flex flex-col border-rd-6px overflow-hidden bg-white pb-5px"-->
    <!--          v-for="item in goodList"-->
    <!--          :key="item.spuId"-->
    <!--          @click="gopath('/pages-sub/homeManager/shopInfo', { id: item.spuId })"-->
    <!--        >-->
    <!--          <wd-img :width="175" :height="160" :src="item.rotationUrl[0]"/>-->
    <!--          <view class="w-155px name my-10px m-auto">-->
    <!--            {{ item.spuName }}-->
    <!--          </view>-->
    <!--          <view>-->
    <!--            <text style="margin-left: 10px; font-size: 12px; color: #f44d24">￥</text>-->
    <!--            <text style="font-size: 18px; font-weight: 600; color: #f44d24">-->
    <!--              {{ item.sellPrice }}-->
    <!--            </text>-->
    <!--            <text-->
    <!--              style="margin-left: 8px; font-size: 12px; color: #999999"-->
    <!--              v-if="item.frequently > 0"-->
    <!--            >-->
    <!--              已售{{ item.frequently }}件-->
    <!--            </text>-->
    <!--          </view>-->
    <!--        </view>-->
    <!--      </view>-->
    <!--    </view>-->
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

.bg1 {
  height: 100%;
  background-image: linear-gradient(#f9dfe4, #fff);
}

.swiper {
  position: relative;
  width: 100%;
  height: 100px;
}

.swiper-item {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

:deep(.uni-swiper-dots) {
  margin-right: -5px;
  transform: scale(0.5);
}

.rightBox {
  position: absolute;
  right: 0;
  height: 100%;
}

.line {
  width: 1px;
  height: 30px;
  background: #eaeaea;
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
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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

.ZYtag {
  padding: 2px 5px;
  margin-top: -1px;
  margin-right: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  background: #f54e24;
  border-radius: 3px;
}

:deep(.wd-tabs__nav) {
  color: #fff;
  background: transparent !important;
}

:deep(.wd-swiper__track) {
  box-sizing: border-box;
  margin-top: 1rem;
  border-radius: 0 !important;
}

:deep(.wd-swiper__item) {
  box-sizing: border-box;
  padding: 0 1rem !important;
}

:deep(.wd-swiper__image) {
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 8px !important;
}

.nav3b {
  font-size: 16px;
  line-height: 24px;
  color: #333;
  text-align: center;
}

.nav3s {
  position: relative;
  padding-bottom: 10px;
  font-size: 12px;
  line-height: 18px;
  color: #666;
  text-align: center;
}

.nav3s.act,
.nav3b.act {
  color: #f44d24 !important;
}

.navType.act {
  position: relative;
  font-size: 16px;
  color: #f44d24 !important;
  transition: all 0.3s;
}

.navType {
  padding-bottom: 10px;
  transition: all 0.3s;
}

.navType.act:before {
  position: absolute;
  bottom: 2px;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 10px;
  content: '';
  background-image: url('../../static/images/shop/shop_icon.png');
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 30px 25px;
  transition: all 0.3s;
}

.nav3s.act:before {
  position: absolute;
  bottom: 2px;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 10px;
  content: '';
  background-image: url('../../static/images/shop/shop_icon.png');
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 30px 25px;
  transition: all 0.3s;
}

.showmore {
  width: 120px;
  background-image: linear-gradient(
    -90deg,
    #f7f7f7,
    #f7f7f7,
    #f7f7f7,
    #f7f7f7,
    rgba(255, 255, 255, 0)
  );
}
.listname {
  height: 48px;
  line-height: 24px;
}
</style>

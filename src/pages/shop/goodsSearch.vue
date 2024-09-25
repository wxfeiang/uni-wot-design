<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  needLogin: true,
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
import matrix from '@/static/images/shop/matrix.png'
import screen from '@/static/images/shop/screen.png'
import { pathToBase64 } from 'image-tools'
import { goodsSearch } from '@/service/api/shop'

defineOptions({
  name: 'Index',
})

const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
const topbgBase64 = ref('')
const searchIcon = ref('')
const carIcon = ref('')
const paging = ref(null)
const goodList = ref([])

const isGrid = ref(true)
const showSearch = ref(true)
onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(indexbg)
  searchIcon.value = await pathToBase64(searchicon)
  carIcon.value = await pathToBase64(caricon)
})
const option1 = ref<Record<string, any>>([
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1 },
  { label: '活动商品', value: 2 },
])
const option2 = ref<Record<string, any>>([
  { label: '综合', value: 0 },
  { label: '销量', value: 1 },
  { label: '上架时间', value: 2 },
])
function changeGrid() {
  isGrid.value = !isGrid.value
}

const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    const res: any = await goodsSearch({
      current: pageNo,
      size: pageSize,
      spuName: '',
      brandId: '',
      shopId: '',
      sellPriceMin: '',
      sellPriceMax: '',
    })
    res.content.forEach((el) => {
      el.rotationUrl = JSON.parse(el.rotationUrl).map((item) => item.data)
    })
    console.log('商城列表', res.content)

    paging.value.complete(res.content)
  } catch {
    console.log('????')
    paging.value.complete(false)
  }
}
function changeSearch() {
  showSearch.value = true
}
function handleChange1({ value }) {
  console.log(value)
}
function handleChange2({ value }) {
  console.log(value)
}
// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
</script>
<template>
  <view
    class="box-border h-153px fixed pos-top-none bg-no-repeat bg-cover z-999"
    :style="` background-image: url(${topbgBase64});background-size: 100% 99%`"
  >
    <wd-navbar safeAreaInsetTop placeholder custom-class="nav_custom" :bordered="false">
      <template #left>
        <view class="flex gap-10px items-center">
          <text class="line-height-44px text-18px color-#fff mt-5px">{{ VITE_APP_LOGOTITLE }}</text>
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
        />
        <view class="searchbtn">搜索</view>
      </view>
      <view class="caricon">
        <wd-img :width="30" :height="28" :src="carIcon" />
      </view>
    </view>
    <!-- </wd-sticky> -->
  </view>

  <view class="w-full box-border flex pos-fixed z-999 pos-top-151px">
    <view style="display: flex; flex: 1; text-align: center; background: #fff">
      <wd-drop-menu style="flex: 1; min-width: 0">
        <wd-drop-menu-item
          v-model="value1"
          title="销量"
          :options="option"
          @change="handleChange1"
          icon-size="0"
        />
      </wd-drop-menu>
      <wd-drop-menu style="flex: 1; min-width: 0">
        <wd-drop-menu-item
          v-model="value1"
          title="上架时间"
          :options="option"
          @change="handleChange1"
          icon-size="0"
        />
      </wd-drop-menu>
      <view style="flex: 1">
        <wd-sort-button v-model="value2" title="价格" @change="handleChange2" />
      </view>
    </view>
    <view class="right flex items-center px-10px bg-white z-999">
      <wd-img :width="23" :height="23" :src="matrix" @click="changeGrid" />
      <view class="px-5px">| 筛选</view>
      <wd-img :width="23" :height="23" :src="screen" @click="changeSearch" />
    </view>
  </view>
  <!-- 商品列表 -->
  <z-paging ref="paging" v-model="goodList" @query="getLsit" class="list">
    <view
      v-if="isGrid"
      class="pt-15px grid grid-cols-2 gap-row-15px gap-col-13px px-15px box-border"
    >
      <view class="flex flex-col border-rd-6px overflow-hidden w-175px bg-white pb-5px">
        <wd-img :width="175" :height="160" :src="topbgBase64" />
        <view class="w-155px name my-10px m-auto">
          赵州雪梨干泡水赵雪雪梨干无硫赵州雪梨干泡水赵雪雪梨干无硫河北石家庄...河北石家庄...
        </view>
        <view>
          <text style="margin-left: 10px; font-size: 12px; color: #f44d24">￥</text>
          <text style="font-size: 18px; font-weight: 600; color: #f44d24">58.8</text>
          <text style="margin-left: 8px; font-size: 12px; color: #999999">已售2353件</text>
        </view>
      </view>
    </view>

    <view v-else class="w-full p-14px box-border">
      <view class="flex w-full h-100px p-7px box-border mb-10px bg-white border-rd-6px">
        <wd-img :width="86" :height="86" :src="topbgBase64" />
        <div class="flex-1 ml-15px flex flex-col justify-between">
          <view class="w-full name">
            赵州雪梨干泡水赵雪雪梨干无硫赵州雪梨干泡水赵雪雪梨干无硫河北石家庄...河北石家庄...
          </view>
          <view class="flex justify-between">
            <view>
              <text style="font-size: 12px; color: #f44d24">￥</text>
              <text style="font-size: 18px; font-weight: 600; color: #f44d24">58.8</text>
            </view>
            <text style="margin-left: 8px; font-size: 12px; color: #999999">已售2353件</text>
          </view>
        </div>
      </view>
    </view>
  </z-paging>

  <!-- 筛选弹窗 -->
  <wd-popup
    v-model="showSearch"
    lock-scroll
    position="right"
    custom-style="width:307px;padding:215px 15px 15px;box-sizing:border-box;"
    @close="handleClose"
  >
    <view class="price">
      <div class="title">价格区间</div>
      <view class="flex items-center mt-20px">
        <wd-input
          type="number"
          size="large"
          v-model="value"
          placeholder="最低价"
          no-border
          custom-class="input-style"
          custom-input-class="min-input"
        />
        <view class="h-full mx-10px">—</view>
        <wd-input
          type="number"
          size="large"
          v-model="value"
          placeholder="最高价"
          no-border
          custom-class="input-style"
          custom-input-class="min-input"
        />
      </view>
    </view>
    <view class="mt-30px">
      <view class="title">品牌</view>
      <view class="mt-20px grid grid-cols-3 gap-row-9px gap-col-7px">
        <view class="w-86px border-rd-17px brand active">品牌名称</view>
      </view>
    </view>
    <view class="mt-30px">
      <view class="title">分类</view>
      <view class="mt-20px grid grid-cols-3 gap-row-9px gap-col-7px">
        <view class="w-86px border-rd-17px brand active">品牌名称</view>
      </view>
    </view>
    <view class="mt-30px">
      <view class="title">店铺</view>
      <view class="mt-20px grid grid-cols-3 gap-row-9px gap-col-7px">
        <view class="w-86px border-rd-17px brand active">品牌名称</view>
      </view>
    </view>
    <view class="mt-50px flex items-center justify-center">
      <view class="reset">重置</view>
      <view class="submit ml-24px">确认</view>
    </view>
  </wd-popup>
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

.input-style {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 122px;
  height: 33px;
  padding: 0 10px !important;
  background: #f6f6f8 !important;
  border-radius: 17px !important;
}

.min-input {
  text-align: center;
}

.search {
  box-sizing: border-box;
  width: 308px;
  height: 35px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;
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

.right {
  color: #6c6c6c;
}

.caricon::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  content: '';
  background-color: #ff0707;
  border: 1px solid #ffffff;
  border-radius: 50px;
}

.list {
  min-height: calc(100vh - 201px);
  margin-top: 201px;
  background: #f7f7f7;
}

.brand {
  overflow: hidden;
  line-height: 33px;
  color: #999999;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #f6f6f8;
}

.active {
  color: #f44d24;
  background: #fff1ed;
}

.reset,
.submit {
  width: 111px;
  line-height: 40px;
  text-align: center;
  border-radius: 6px 6px 6px 6px;
}

.reset {
  color: #f44d24;
  background: #fff1ed;
}

.submit {
  color: #fff;
  background: #f44d24;
}

:deep(.wd-tabs__nav) {
  color: #fff;
  background: transparent !important;
}
</style>

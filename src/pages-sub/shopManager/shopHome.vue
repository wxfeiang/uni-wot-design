<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  needLogin: true,
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'
import { addUserShop, delUserShop, getUserShopList, goodsSearch } from '@/service/api/shop'
import { routeTo } from '@/utils'

const isFollow = ref(false)
const topbgBase64 = ref('')
const paging = ref(null)
const goodList = ref([])
const sort = reactive({
  pullTimeOrder: 1, // 上架时间排序
  salesVolumeOrder: 1, // 销量排序
  priceOrder: 1, // 价格排序
})
const model = reactive({
  pullTimeOrder: 1, // 上架时间排序
  salesVolumeOrder: 1, // 销量排序
  priceOrder: 1, // 价格排序
  shopId: '', // 店铺id
})
const fllowShop = () => {
  if (isFollow.value) {
    delUserShop({ idList: [model.shopId] }).then((res) => {
      console.log('取消关注店铺', res)
      getFollowList()
    })
  } else {
    addUserShop({ shopId: model.shopId }).then((res) => {
      console.log('关注店铺', res)
      getFollowList()
    })
  }
}
const getFollowList = async () => {
  const res: any = await getUserShopList({})
  if (res.find((it) => it.shopInfo.id === model.shopId)) {
    isFollow.value = true
  } else {
    isFollow.value = false
  }
  console.log('关注店铺列表', res, isFollow.value)
}
const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    const res: any = await goodsSearch({
      current: pageNo,
      size: pageSize,
      ...model,
    })
    res.content.forEach((el) => {
      el.saleUrl = JSON.parse(el.saleUrl)[0].data
    })
    paging.value.complete(res.content)
  } catch {
    paging.value.complete(false)
  }
}

function handleChange(val, type) {
  model[type] = val === 1 ? 1 : 2
  paging.value.reload()
}
onLoad(async (options) => {
  model.shopId = options.id
  getFollowList()
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-full p-15px box-border bg-#F3F4F6">
    <view class="flex w-full p-15px box-border bg-white border-rd-10px overflow-hidden">
      <wd-img :width="57" :height="57" :src="topbgBase64" round />
      <view class="ml-10px flex-1 overflow-hidden">
        <view class="w-full flex items-center justify-between">
          <view class="name">店铺名店铺名称店铺名称店铺名称店铺名称称</view>
          <view v-if="!isFollow" class="guanzhu" @click="fllowShop">+关注</view>
          <view v-else class="quxiao" @click="fllowShop">已关注</view>
        </view>
        <view class="w-full flex items-center">
          <view class="mr-5px" style="font-size: 14px; color: #999999">地址地址</view>
          <wd-icon name="location" size="16px" color="#999999"></wd-icon>
        </view>
        <view class="w-full flex items-center">
          <view class="mr-5px" style="font-size: 14px; color: #999999">电话</view>
          <wd-icon name="call" size="16px" color="#999999"></wd-icon>
        </view>
      </view>
    </view>
  </view>
  <view style="display: flex; text-align: center; background: #fff">
    <view style="flex: 1">
      <wd-sort-button
        v-model="sort.salesVolumeOrder"
        title="销量"
        @change="handleChange($event, 'salesVolumeOrder')"
      />
    </view>
    <view style="flex: 1">
      <wd-sort-button
        v-model="sort.pullTimeOrder"
        title="上架时间"
        @change="handleChange($event, 'pullTimeOrder')"
      />
    </view>
    <view style="flex: 1">
      <wd-sort-button
        v-model="sort.priceOrder"
        title="价格"
        @change="handleChange($event, 'priceOrder')"
      />
    </view>
  </view>
  <z-paging
    ref="paging"
    v-model="goodList"
    @query="getLsit"
    :paging-style="{
      'box-sizing': 'border-box',
      width: '100%',
      height: 'calc(100vh - 200px)',
      'margin-top': '171px',
      padding: '0 15px 15px',
      'background-color': '#ffffff',
    }"
  >
    <view
      class="flex w-full h-100px p-7px box-border mb-10px bg-white border-rd-6px"
      @click="routeTo({ url: '/pages/shop/shopInfo', data: { id: item.spuId } })"
      v-for="item in goodList"
      :key="item.spuId"
    >
      <wd-img :width="86" :height="86" :src="item.saleUrl" radius="5px" />
      <view class="flex-1 ml-15px flex flex-col justify-between overflow-hidden">
        <view class="w-full name">
          {{ item.spuName }}
        </view>
        <view class="flex justify-between">
          <view>
            <text style="font-size: 12px; color: #f44d24">￥</text>
            <text style="font-size: 18px; font-weight: 600; color: #f44d24">
              {{ item.sellPrice }}
            </text>
          </view>
          <text style="margin-left: 8px; font-size: 12px; color: #999999">
            已售{{ item.salesVolume }}件
          </text>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style>
.quan {
  box-sizing: border-box;
  width: 90px;
  padding: 4px;
  margin-left: 5px;
  color: #f44d24;
  text-align: center;
  background: #ffece8;
  border-radius: 2px 2px 2px 2px;
}

.quxiao {
  width: 60px;
  font-size: 14px;
  line-height: 25px;
  color: #b0b0b0;
  text-align: center;
  background: #ececec;
  border-radius: 6px 6px 6px 6px;
}

.guanzhu {
  width: 60px;
  font-size: 14px;
  line-height: 25px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 6px 6px 6px 6px;
}

.name {
  width: 100%;
  overflow: hidden;
  font-weight: 600;
  color: #333333;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:deep(.is-active::after) {
  display: none;
}
</style>

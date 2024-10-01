<route lang="json5" type="page">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'
import {
  addUserShop,
  delUserShop,
  getUserShopList,
  getShopInfo,
  getShopGoods,
  getShopDetail,
} from '@/service/api/shop'
import { routeTo } from '@/utils'

const isFollow = ref(false)
const topbgBase64 = ref('')
const paging = ref(null)
const shopDetails = ref({})
const goodList = ref([])
const sort = reactive({
  putPullTime: 1, // 上架时间排序
  salesVolume: 1, // 销量排序
  sellPrice: 1, // 价格排序
})
const model = reactive({
  putPullTime: '', // 上架时间排序
  salesVolume: '', // 销量排序
  sellPrice: '', // 价格排序
  shopId: '', // 店铺id
})
const fllowShop = () => {
  if (isFollow.value) {
    delUserShop({ idList: [model.shopId] }).then((res) => {
      console.log('取消关注店铺', res)
      getShopDetails()
    })
  } else {
    addUserShop({ shopId: model.shopId }).then((res) => {
      console.log('关注店铺', res)
      getShopDetails()
    })
  }
}
const getShopDetails = () => {
  getShopInfo({ shopId: model.shopId }).then((res) => {
    shopDetails.value = res
    isFollow.value = res.operation === 1
    console.log('res', shopDetails.value)
  })
}

const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    const res: any = await getShopGoods({
      current: pageNo,
      size: pageSize,
      ...model,
    })
    res.forEach((el) => {
      el.saleUrl = JSON.parse(el.saleUrl)[0].data
    })
    paging.value.complete(res)
    // paging.value.complete([])
  } catch {
    paging.value.complete(false)
  }
}

function resetSeach() {
  model.putPullTime = ''
  model.salesVolume = ''
  model.sellPrice = ''
  sort.putPullTime = 1
  sort.salesVolume = 1
  sort.sellPrice = 1
}

function handleChange(val, type) {
  resetSeach()

  model[type] = val.value === 1 ? 'asc' : 'desc'
  sort[type] = val.value

  console.log('sort', sort)
  paging.value.reload()
}

onLoad(async (options) => {
  model.shopId = options.id
  console.log('model', model)

  getShopDetails()

  // 设置背景图片
})
</script>
<template>
  <z-paging ref="paging" v-model="goodList" @query="getLsit" class="w-screen h-screen">
    <template #top>
      <dy-navbar leftTitle="商家" left></dy-navbar>
      <view class="w-full p-15px box-border bg-#F3F4F6">
        <view class="flex w-full p-15px box-border bg-white border-rd-10px overflow-hidden">
          <wd-img :width="57" :height="57" :src="shopDetails.shopAvatar" round />
          <view class="ml-10px flex-1 overflow-hidden">
            <view class="w-full flex items-center justify-between">
              <view class="name">
                {{ shopDetails.name }}
              </view>
              <view v-if="!isFollow" class="guanzhu" @click="fllowShop">+关注</view>
              <view v-else class="quxiao" @click="fllowShop">已关注</view>
            </view>
            <view class="w-full flex items-center">
              <view class="mr-5px" style="font-size: 14px; color: #999999">
                {{ shopDetails.address }}
              </view>
              <wd-icon name="location" size="16px" color="#999999"></wd-icon>
            </view>
            <view class="w-full flex items-center">
              <view class="mr-5px" style="font-size: 14px; color: #999999">
                {{ shopDetails.shopPhone }}
              </view>
              <wd-icon name="call" size="16px" color="#999999"></wd-icon>
            </view>
          </view>
        </view>
      </view>
      <view style="display: flex; text-align: center; background: #fff">
        <view style="flex: 1">
          <wd-sort-button
            v-model="sort.salesVolume"
            title="销量"
            @change="handleChange($event, 'salesVolume')"
          />
        </view>
        <view style="flex: 1">
          <wd-sort-button
            v-model="sort.putPullTime"
            title="上架时间"
            @change="handleChange($event, 'putPullTime')"
          />
        </view>
        <view style="flex: 1">
          <wd-sort-button
            v-model="sort.sellPrice"
            title="价格"
            @change="handleChange($event, 'sellPrice')"
          />
        </view>
      </view>
    </template>
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
:deep(.z-paging-content) {
  background: #f3f4f6;
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

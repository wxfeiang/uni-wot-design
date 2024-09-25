<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import { useUserStore } from '@/store'
import shangdian from '@/static/images/shop/shangdian.png'
import kefu from '@/static/images/shop/kefu.png'
import gouwuche from '@/static/images/shop/gouwuche.png'
import fenxiang from '@/static/images/shop/fenxiang.png'
import shoucang from '@/static/images/shop/shoucang.png'
import duihao from '@/static/images/shop/duihao.png'
import shoucang1 from '@/static/images/shop/shoucang1.png'
import { getGoodDetails, favoritesList, userFavorites, unUserFavorites } from '@/service/api/shop'
import vkDataGoodsSkuPopup from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue'

const userStore = useUserStore()
const current = ref<number>(0)
const title = ref('商品详情')
const isFavor = ref(false)
let details = reactive({})
const favorList = ref([])
// 是否打开SKU弹窗
const skuKey = ref(false)
// SKU弹窗模式
const skuMode = ref(1)
// 后端返回的商品信息
let goodsInfo = reactive<any>({
  _id: '001',
  name: 'iphone11',
  goods_thumb:
    'https://img14.360buyimg.com/n0/jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg',
  sku_list: [
    {
      _id: '001',
      goods_id: '001',
      goods_name: 'iphone11',
      image:
        'https://img14.360buyimg.com/n0/jfs/t1/79668/22/9987/159271/5d780915Ebf9bf3f4/6a1b2703a9ed8737.jpg',
      price: 19800,
      sku_name_arr: ['红色', '128G', '公开版'],
      stock: 1000,
    },
    {
      _id: '002',
      goods_id: '001',
      goods_name: 'iphone11',
      image:
        'https://img14.360buyimg.com/n0/jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg',
      price: 9800,
      sku_name_arr: ['白色', '256G', '公开版'],
      stock: 100,
    },
    {
      _id: '003',
      goods_id: '001',
      goods_name: 'iphone11',
      image:
        'https://img14.360buyimg.com/n0/jfs/t1/79668/22/9987/159271/5d780915Ebf9bf3f4/6a1b2703a9ed8737.jpg',
      price: 19800,
      sku_name_arr: ['红色', '256G', '公开版'],
      stock: 1,
    },
  ],
  specList: [
    {
      name: '颜色',
      list: [{ name: '红色' }, { name: '黑色' }, { name: '白色' }],
    },
    {
      name: '内存',
      list: [{ name: '128G' }, { name: '256G' }],
    },
    {
      name: '版本',
      list: [{ name: '公开版' }, { name: '非公开版' }],
    },
  ],
})
const formatGoodsInfo = (arr: Array<any>) => {
  let specList = []
  const obj = JSON.parse(arr[0].skuName)
  specList = Object.keys(obj)
  goodsInfo = {
    _id: details.spuId,
    name: details.spuName,
    goods_thumb: JSON.parse(details.saleUrl)[0],
    sku_list: arr.map((item, index) => {
      return {
        _id: item.id, // SKU ID
        goods_id: details.spuId, // 商品ID
        goods_name: details.spuName, // 商品名称
        // SKU头像
        image: JSON.parse(details.skuUrl)[index],
        price: 999, // SKU 价格
        sku_name_arr: Object.values(JSON.parse(item.skuName)), // 该SKU由哪些规格组成（规格是有顺序的，需要与specList的数组顺序对应）
        stock: item.stock,
      }
    }),
    specList: specList.map((it, idx) => {
      return {
        name: it, // 规格名称
        list: arr.map((item) => {
          return {
            name: JSON.parse(item.skuName)[it],
          }
        }),
      }
    }),
  }
  console.log('goodsInfo', goodsInfo)
}
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

const getDetails = (spuId: number) => {
  getGoodDetails({
    spuId: 14943,
  }).then((res: any) => {
    res.rotationUrl = JSON.parse(res.rotationUrl).map((item) => item.data)
    res.remarkUrl = JSON.parse(res.remarkUrl).map((item) => item.data)
    details = res
    console.log('res', details)
    formatGoodsInfo(res.skuList)
  })
}
const foverGoods = async (spuId: number) => {
  if (!userStore.isLogined) {
    routeTo({ url: '/pages/login/index' })
  } else {
    if (isFavor.value) {
      const res = await unUserFavorites({
        productSpuIds: [14943],
      })
      console.log('收藏', res)
    } else {
      const res = await userFavorites({
        productSpuId: 14943,
      })
      console.log('取消收藏', res)
    }
  }
}
const getFavoritesList = async () => {
  const res = await favoritesList({
    current: 1,
    size: 9999,
  })
  favorList.value = res.content.map((i) => i.spuId)
  isFavor.value = favorList.value.includes(details.spuId)
  console.log('收藏列表', res, favorList.value)
}
const openSkuPopup = () => {
  goodsInfo = {}
}
const onCloseSkuPopup = () => {}
const addCart = () => {}
onShow(() => {
  if (userStore.isLogined) {
    getFavoritesList()
  }
})
onLoad(async (options) => {
  // await getList()
  console.log('options', options, userStore.isLogined)
  getDetails(options.id)
})
</script>

<template>
  <view class="pageBoxBg w-screen pos-relative">
    <dy-navbar :leftTitle="title" left style="background: transparent"></dy-navbar>
    <wd-swiper
      :list="details.rotationUrl"
      autoplay
      v-model:current="current"
      @click="handleClick"
      height="400px"
      customStyle="border-radius: 0"
      @change="onChange"
    ></wd-swiper>
    <view
      class="bg-#F5F6F8 w-full pos-absolute p-20px box-border overflow-hidden p-b-100px"
      style="top: 420px; border-radius: 20px 20px 0 0"
    >
      <view class="w-full flex justify-between items-center">
        <view class="flex items-center">
          <wd-text text="￥" color="#F44D24" size="16px"></wd-text>
          <wd-text :text="details?.skuList[0].sellPrice" color="#F44D24" size="25px"></wd-text>
          <view class="w-133px line-height-35px bg-#F44D24 text-center ml-10px border-rd-50px">
            <wd-text text="券后价" color="#FFF" size="14px"></wd-text>
            <wd-text text="￥" color="#fff" size="10px"></wd-text>
            <wd-text text="29.9" color="#fff" size="18px"></wd-text>
          </view>
        </view>
        <wd-text :text="`已售${details.salesVolume}`" color="#F44D24" size="14px"></wd-text>
      </view>

      <view class="w-full text-cut-line2 mt-10px font-600">
        {{ details.spuName }}
      </view>

      <view class="mt-10px flex items-center color-#999999">
        <view class="mr-20px" @click="foverGoods">
          <wd-img :width="16" :height="16" :src="shoucang"></wd-img>
          <!-- <wd-img :width="16" :height="16" :src="shoucang1"></wd-img> -->
          <text class="ml-5px">收藏</text>
        </view>
        <view>
          <wd-img :width="16" :height="16" :src="fenxiang"></wd-img>
          <text class="ml-5px">分享</text>
        </view>
      </view>

      <view class="w-full bg-white p-15px box-border flex items-center border-rd-10px mt-10px">
        <view>配送</view>
        <view class="flex items-center color-#999 ml-15px">
          <wd-img :width="16" :height="16" :src="duihao"></wd-img>
          <text class="ml-5px">快递配送</text>
        </view>
        <view class="flex items-center color-#999 ml-15px">
          <wd-img :width="16" :height="16" :src="duihao"></wd-img>
          <text class="ml-5px">到店自提</text>
        </view>
      </view>

      <view class="w-full bg-white p-15px box-border border-rd-10px mt-10px">
        <view>评价（200+）</view>
        <view class="flex mt-10px">
          <wd-img
            :width="45"
            :height="45"
            src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
            round
          ></wd-img>
          <view class="flex-1 overflow-hidden ml-10px">
            <view class="w-full flex items-center justify-between">
              <view>
                <wd-text text="用户姓名" bold color="#333"></wd-text>
                <wd-text
                  text="已购"
                  size="12px"
                  color="#999"
                  custom-style="margin:0 10px;"
                ></wd-text>
                <wd-text text="60" size="12px" color="#999"></wd-text>
              </view>
              <wd-text text="9天前" size="12px" color="#999"></wd-text>
            </view>
            <view class="text">
              评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价
            </view>
          </view>
        </view>
        <view
          class="color-#999 w-full pt-5px flex items-center justify-center mt-10px"
          style="border-top: 1px solid #eee"
        >
          <text>查看全部评价</text>
          <wd-icon name="arrow-right" size="20px"></wd-icon>
        </view>
      </view>

      <view class="w-full bg-white p-15px box-border border-rd-10px mt-10px">
        <view class="font-600 mb-10px">商品详情</view>
        <wd-img
          width="100%"
          mode="widthFix"
          v-for="i in details.remarkUrl"
          :src="i"
          :key="i"
        ></wd-img>
      </view>
    </view>

    <view
      class="w-full p-15px bg-white box-border flex items-center justify-between pos-fixed pos-bottom-none"
    >
      <view class="flex w-1/3 justify-between">
        <view class="flex flex-col item-center justify-center">
          <wd-img :width="30" height="30" :src="shangdian"></wd-img>
          <wd-text text="进店" color="#666666" size="12px"></wd-text>
        </view>
        <view class="flex flex-col item-center justify-center">
          <wd-img :width="30" height="30" :src="kefu"></wd-img>
          <wd-text text="客服" color="#666666" size="12px"></wd-text>
        </view>
        <view class="flex flex-col item-center justify-center">
          <wd-img :width="30" height="30" :src="gouwuche"></wd-img>
          <wd-text text="购物车" color="#666666" size="12px"></wd-text>
        </view>
      </view>
      <view
        class="flex-1 flex items-center ml-20px line-height-40px border-rd-50px overflow-hidden"
      >
        <view class="w-3/7 text-center bg-#FEF2F2 color-#F44D24 font-size-15px">加入购物车</view>
        <view
          class="w-4/7 text-center bg-#F44D24 color-#FFFFFF font-size-15px"
          @click="skuKey = true"
        >
          立即购买
        </view>
        <!-- <view class="w-4/7 text-center bg-#F44D24 color-#FFFFFF font-size-14px">券后价格￥5000.9</view> -->
      </view>
    </view>

    <vk-data-goods-sku-popup
      ref="skuPopup"
      v-model="skuKey"
      border-radius="20"
      :z-index="990"
      :localdata="goodsInfo"
      :mode="skuMode"
      @open="onOpenSkuPopup"
      @close="onCloseSkuPopup"
      @add-cart="addCart"
      @buy-now="buyNow"
    ></vk-data-goods-sku-popup>
  </view>
</template>
<style lang="scss" scoped>
.pageBoxBg {
  min-height: 100vh;
  background: #f3f4f6;
}

.text-cut-line2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.text {
  overflow: hidden;
  color: #333333;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

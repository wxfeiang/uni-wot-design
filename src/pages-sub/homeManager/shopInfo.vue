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
import morentouxiang from '@/pages-sub/shopManager/static/shoukuanma.png'

import {
  getGoodDetails,
  favoritesList,
  userFavorites,
  unUserFavorites,
  addCart,
} from '@/service/api/shop'
import vkDataGoodsSkuPopup from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue'
import { Toast, Modal } from '@/utils/uniapi/prompt'

const userStore = useUserStore()
const current = ref<number>(0)
const title = ref('商品详情')
const isFavor = ref(false)
const details = reactive<any>({})
const favorList = ref([])
// 是否打开SKU弹窗
const skuKey = ref(false)
// SKU弹窗模式
const skuMode = ref(1)
// 后端返回的商品信息
let goodsInfo = reactive<any>({})

const showSku = (val: number) => {
  skuKey.value = true
  skuMode.value = val
}
const service = () => {
  if (details.shopPhone) {
    uni.makePhoneCall({
      phoneNumber: details.shopPhone ? details.shopPhone : '',
    })
  }
}
const formatGoodsInfo = (arr: Array<any>) => {
  const obj = JSON.parse(arr[0].skuName)
  const specList = Object.keys(obj)
  goodsInfo = {
    _id: details.spuId,
    name: details.spuName,
    goods_thumb: JSON.parse(details.saleUrl)[0].data,
    sku_list: arr.map((item, index) => {
      return {
        _id: item.id, // SKU ID
        goods_id: details.spuId, // 商品ID
        goods_name: details.spuName, // 商品名称
        // SKU头像
        image: details.skuUrl[0],
        // TODO
        price: item.sellPrice, // SKU 价格
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
const getDetails = (spuId: number) => {
  getGoodDetails({
    spuId,
  }).then((res: any) => {
    res.rotationUrl = JSON.parse(res.rotationUrl).map((item) => item.data)
    res.remarkUrl = JSON.parse(res.remarkUrl).map((item) => item.data)
    res.skuUrl = JSON.parse(res.skuUrl).map((item) => item.data)
    res.evaList.forEach((el) => {
      el.userNickname = el.userNickname || '匿名用户'
      el.evaluationContent = el.evaluationContent || '该用户没有填写评价'
    })
    Object.assign(details, res)
    console.log('res', res)
    formatGoodsInfo(res.skuList)
  })
}
const foverGoods = async () => {
  if (!userStore.isLogined) {
    Modal({ title: '提示', content: '您还没有登录，请先登录？' }).then((res: any) => {
      if (res.confirm) {
        routeTo({ url: '/pages/login/index' })
      }
    })
  } else {
    if (isFavor.value) {
      const res = await unUserFavorites({
        productSpuIds: details.spuId,
      })
      Toast('取消收藏成功')
      console.log('取消收藏', res)
    } else {
      const res = await userFavorites({
        productSpuId: details.spuId,
      })
      console.log('收藏', res)
      Toast('收藏成功')
    }
    getFavoritesList()
  }
}
const getFavoritesList = async () => {
  const res: any = await favoritesList({
    current: 1,
    size: 9999,
  })
  favorList.value = res.content.map((i) => i.spuId)
  isFavor.value = favorList.value.includes(details.spuId)
  console.log('收藏列表', res, favorList.value)
}
const buyNow = (val: any) => {
  console.log('提交订单', val)
  const { shopId, shopName, shopAvatar } = details

  const obj = [
    {
      shopId,
      shopName,
      shopAvatar,
      receiveAddrId: '', // 收货地址Id
      deliveryAmount: Number((val.buy_num * val.price).toFixed(2)), // 订单金额
      deliveryMode: 0, // 配送方式  0: 快递配送 ,1: 上门自提 ,2: 同城配送
      orderNote: '', // 订单备注
      receiveId: '', // 收货人Id
      couponId: '', // 优惠券ID
      orderResource: 2, //  订单来源 1web  2 小程序

      payShopListReqVo: [
        {
          spuId: val.goods_id,
          skuId: val._id,
          image: val.image,
          skuName: val.sku_name_arr.join(','),
          spuNum: val.buy_num,
          spuName: val.goods_name,
          price: val.price,
        },
      ],
    },
  ]
  routeTo({
    url: '/pages-sub/homeManager/order?obj=' + JSON.stringify(obj),
  })
}
const addCar = (val: any) => {
  console.log('加入购物车', val, userStore.userInfo)
  if (userStore.isLogined) {
    const obj = {
      customerId: userStore.userInfo.userDId,
      shopId: details.shopId,
      skuId: val._id,
      itemNum: val.buy_num,
      spuType: details.spuType,
      spuId: val.goods_id,
      shopAvatar: details.shopAvatar,
    }
    addCart(obj).then((res) => {
      console.log('添加购物车', res)
      Toast('添加购物车成功')
      skuKey.value = false
    })
  } else {
    Modal({ title: '提示', content: '您还没有登录，请先登录？' }).then((res: any) => {
      if (res.confirm) {
        routeTo({ url: '/pages/login/index' })
      }
    })
  }
}

const getday = (sDate1: any) => {
  const sDate2 = new Date()

  const Y = sDate2.getFullYear() + '-'
  const M =
    (sDate2.getMonth() + 1 < 10 ? '0' + (sDate2.getMonth() + 1) : sDate2.getMonth() + 1) + '-'
  const D = sDate2.getDate() < 10 ? '0' + sDate2.getDate() : sDate2.getDate()

  const oDate2 = new Date(sDate1).getTime() // 转换为yyyy-MM-dd格式
  const oDate1 = new Date(Y + M + D).getTime() // 转换为yyyy-MM-dd格式

  const iDays = Math.abs(oDate2 - oDate1) / 1000 / 60 / 60 / 24 // 把相差的毫秒数转换为天数
  if (parseInt(iDays) <= 0) return 0
  else {
    return parseInt(iDays)
  } // 返回相差天数
}

onShow(() => {
  if (userStore.isLogined) {
    getFavoritesList()
  }
})
const goList = () => {
  if (details.evaList.length <= 3) {
    routeTo({ url: `/pages-sub/shopManager/evaluateList?details=${details.spuId}` })
  }
}
onLoad(async (options) => {
  // await getList()
  console.log('options', options, userStore.isLogined)
  getDetails(options.id)
})
onShareAppMessage((options) => {
  const pageList = getCurrentPages<any>()
  return {
    title: details.spuName ? details.spuName : '商品',
    path: pageList[pageList.length - 1].$page.fullPath,
    imageUrl: details.rotationUrl[0],
  }
})
onShareTimeline(() => {
  const pageList = getCurrentPages<any>()
  return {
    title: details.spuName ? details.spuName : '商品',
    path: pageList[pageList.length - 1].$page.fullPath,
    imageUrl: details.rotationUrl[0],
  }
})
</script>

<template>
  <view class="pageBoxBg w-screen pos-relative">
    <dy-navbar :leftTitle="title" left style="background: transparent"></dy-navbar>
    <wd-swiper
      :list="details.rotationUrl"
      value-key="data"
      autoplay
      v-model:current="current"
      height="400px"
      customStyle="border-radius: 0"
    ></wd-swiper>
    <view
      class="bg-#F5F6F8 w-full pos-absolute p-20px box-border overflow-hidden p-b-100px"
      style="top: 420px; border-radius: 20px 20px 0 0"
    >
      <view class="w-full flex justify-between items-center">
        <view class="flex items-center">
          <wd-text text="￥" color="#F44D24" size="16px"></wd-text>
          <wd-text
            :text="details.skuList ? details.skuList[0].sellPrice : 0"
            color="#F44D24"
            size="25px"
          ></wd-text>
          <!-- <view class="w-133px line-height-35px bg-#F44D24 text-center ml-10px border-rd-50px">
            <wd-text text="券后价" color="#FFF" size="14px"></wd-text>
            <wd-text text="￥" color="#fff" size="10px"></wd-text>
            <wd-text
              :text="details.skuList ? details.skuList[0].settlementPrice : 0"
              color="#fff"
              size="18px"
            ></wd-text>
          </view> -->
        </view>
        <wd-text :text="`已售${details.salesVolume}`" color="#F44D24" size="14px"></wd-text>
      </view>

      <view class="w-full text-cut-line2 mt-10px font-600">
        {{ details.spuName }}
      </view>

      <view class="mt-10px flex items-center justify-left color-#999999">
        <button class="btn mr-20px" @click="foverGoods">
          <wd-img v-if="!isFavor" :width="16" :height="16" :src="shoucang"></wd-img>
          <wd-img v-else :width="16" :height="16" :src="shoucang1"></wd-img>
          <text class="ml-5px">收藏</text>
        </button>
        <button class="btn" open-type="share">
          <wd-img :width="16" :height="16" :src="fenxiang"></wd-img>
          <text class="ml-5px">分享</text>
        </button>
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

      <view class="w-full bg-white p-15px box-border border-rd-10px mt-10px" v-if="details.evaList">
        <view>评价（{{ details.evaList ? details.evaList.length : 0 }}）</view>
        <!-- 只显示3条 截取评价列表数据3条就行 -->
        <view
          class="flex mt-10px mb-10px"
          v-for="i in details.evaList.slice(0, 3)"
          :key="i.id"
          @click="goList"
        >
          <wd-img :width="45" :height="45" :src="morentouxiang" round></wd-img>
          <view class="flex-1 overflow-hidden ml-10px">
            <view class="w-full flex items-center justify-between">
              <view>
                <wd-text :text="i.userNickname" bold color="#333"></wd-text>

                <wd-text
                  :text="i.specification"
                  size="12px"
                  color="#999"
                  custom-class="ml-20px"
                ></wd-text>
              </view>
              <wd-text
                :text="`${getday(i.evaluationTime.slice(0, 10))}天前`"
                size="12px"
                color="#999"
              ></wd-text>
            </view>
            <view class="text">
              {{ i.evaluationContent }}
            </view>
          </view>
        </view>
        <view
          v-if="details.evaList.length > 3"
          class="color-#999 w-full pt-5px flex items-center justify-center mt-10px"
          style="border-top: 1px solid #eee"
          @click="routeTo({ url: `/pages-sub/shopManager/evaluateList?details=${details.spuId}` })"
        >
          <text>查看全部评价</text>
          <wd-icon name="arrow-right" size="20px"></wd-icon>
        </view>
      </view>

      <view class="w-full bg-white p-15px box-border border-rd-10px mt-10px">
        <view class="font-600 mb-10px">商品详情</view>
        <template v-if="details && details.remarkUrl">
          <wd-img
            width="100%"
            mode="widthFix"
            v-for="i in details.remarkUrl"
            :src="i"
            :key="i"
          ></wd-img>
        </template>
      </view>
    </view>

    <view
      class="w-full p-15px bg-white box-border flex items-center justify-between pos-fixed pos-bottom-none"
    >
      <view class="flex w-2/5 justify-between pl-10px">
        <view
          class="flex flex-col item-center justify-center"
          @click="routeTo({ url: '/pages-sub/shopManager/shopHome', data: { id: details.shopId } })"
        >
          <wd-img :width="30" height="30" :src="shangdian"></wd-img>
          <wd-text text="进店" color="#666666" size="12px" custom-class="texts"></wd-text>
        </view>
        <view
          class="flex flex-col item-center justify-center"
          @click="service"
          v-if="details.shopPhone"
        >
          <wd-img :width="30" height="30" :src="kefu"></wd-img>
          <wd-text text="客服" color="#666666" size="12px" custom-class="texts"></wd-text>
        </view>
        <view
          class="flex flex-col item-center justify-center"
          @click="routeTo({ url: '/pages-sub/homeManager/shopCar' })"
        >
          <wd-img :width="30" height="30" :src="gouwuche"></wd-img>
          <wd-text text="购物车" color="#666666" size="12px" custom-class="texts"></wd-text>
        </view>
      </view>
      <view
        class="flex-1 flex items-center ml-10px line-height-40px border-rd-50px overflow-hidden"
      >
        <view
          class="w-full text-center bg-#FEF2F2 color-#F44D24 font-size-15px w-1/2"
          @click="showSku(2)"
        >
          加入购物车
        </view>
        <view
          class="w-full text-center bg-#F44D24 color-#FFFFFF font-size-15px w-1/2"
          @click="showSku(3)"
        >
          立即购买
        </view>
        <!-- <view class="w-4/7 text-center bg-#F44D24 color-#FFFFFF font-size-14px">券后价格￥5000.9</view> -->
      </view>
    </view>

    <vk-data-goods-sku-popup
      :amount-type="0"
      ref="skuPopup"
      v-model="skuKey"
      border-radius="20"
      :z-index="990"
      :localdata="goodsInfo"
      :mode="skuMode"
      @add-cart="addCar"
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

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 16px;
  color: #777777;
}

:deep(.texts) {
  display: inline-block;
  min-width: 30px;
  text-align: center;
}
</style>

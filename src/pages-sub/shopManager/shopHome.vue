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
import { addUserShop, delUserShop, getShopGoods, getShopInfo } from '@/service/api/shop'
import { useUserStore } from '@/store'
import { routeTo } from '@/utils'
import { Modal } from '@/utils/uniapi/prompt'
import shopIcon from '../../static/images/shop/shop_nav20.png'

const userStore = useUserStore()

const isFollow = ref(false)
const topbgBase64 = ref('')
const paging = ref(null)
const shopDetails: any = ref({})
const goodList = ref([])
const sort = reactive({
  putPullTime: 1, // 上架时间排序
  frequently: 1, // 销量排序
  sellPrice: 1, // 价格排序
})
const model = reactive({
  putPullTime: '', // 上架时间排序
  frequently: '', // 销量排序
  sellPrice: '', // 价格排序
  shopId: '', // 店铺id
})
const fllowShop = () => {
  if (!userStore.isLogined) {
    Modal({ title: '提示', content: '您还没有登录，请先登录？' }).then((res: any) => {
      if (res.confirm) {
        routeTo({ url: '/pages/login/index' })
      }
    })
  } else {
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
}
const getShopDetails = () => {
  getShopInfo({ shopId: model.shopId }).then((res: any) => {
    shopDetails.value = res
    isFollow.value = res.operation === 1
  })
}
const getlocation = () => {
  // const { lat, lon } = shopDetails.value
  // uni.openLocation({
  //   latitude: Number(lat),
  //   longitude: Number(lon),
  //   name: 'name',
  //   address: '详细说明',
  //   success: function () {
  //     console.log('success')
  //   },
  //   fail: function (res) {
  //     console.log(res)
  //   },
  // })
}
const call = () => {
  console.log('打电话', shopDetails.value.shopPhone)
  if (shopDetails.value.shopPhone) {
    uni.makePhoneCall({
      phoneNumber: shopDetails.value.shopPhone ? shopDetails.value.shopPhone : '',
    })
  }
}
const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    const res: any = await getShopGoods({
      current: pageNo,
      size: pageSize,
      ...model,
    })
    res.content.forEach((el) => {
      el.saleUrl = JSON.parse(el.rotationUrl).data
    })
    paging.value.complete(res.content)
    // paging.value.complete([])
  } catch {
    paging.value.complete(false)
  }
}

function resetSeach() {
  model.putPullTime = ''
  model.frequently = ''
  model.sellPrice = ''
  sort.putPullTime = 1
  sort.frequently = 1
  sort.sellPrice = 1
}

function handleChange(val, type) {
  resetSeach()

  model[type] = val.value === 1 ? 'asc' : 'desc'
  sort[type] = val.value

  console.log('sort', sort)
  paging.value.reload()
}

function getTagList() {
  const taglist = [
    '五星好评',
    '即将售罄',
    '复购最高',
    '优惠降价',
    '历史低价',
    '本月畅销',
    '同款低价',
    '平台好店',
    '五星好评',
    '即将售罄',
  ]
  const r1 = (Math.random() * 10).toFixed(0)
  const r2 = (Math.random() * 7.99).toFixed(0)
  const r3 = (Math.random() * 7.99).toFixed(0)
  const list = []
  if (r1 % 2 === 0) {
    list.push(taglist[r2])
  } else {
    list.push(taglist[r2])
    if (r2 !== r3) {
      list.push(taglist[r3])
    }
  }
  return list
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
      <dy-navbar leftTitle="店铺" left></dy-navbar>

      <view class="pt-4 px-4 box-border">
        <view
          style="
            height: 22px;
            padding: 5px 15px;
            background: #ffffff;
            border: 1px solid #e9e9e9;
            border-radius: 23px 23px 23px 23px;
          "
          class="rounded-3xl px-4 text-left overflow-hidden flex justify-left items-center"
        >
          <input class="text-14px flex" style="flex: 1" placeholder="请输入搜索关键词" />
          <wd-icon name="search" size="16px" custom-class="ml-1 " color="#777777"></wd-icon>
        </view>
      </view>

      <view class="w-full p-15px box-border bg-#F3F4F6">
        <view class="w-full pt-5px box-border bg-#3A3A3A border-rd-10px overflow-hidden">
          <view class="flex justify-between items-center px-4 pb-5px">
            <view class="flex justify-left items-center">
              <view class="color-#FFDEB2 font-14px mr-1" style="font-size: 12px">
                {{ shopDetails.address }}
              </view>
              <wd-icon name="location" size="12px" color="#FFDEB2"></wd-icon>
            </view>
            <view class="flex justify-right items-center" @click="call">
              <view class="color-#FFDEB2 mr-1" style="font-size: 14px">客服</view>
              <wd-img :width="20" :height="20" :src="shopIcon" />
            </view>
          </view>
          <view
            class="flex items-center w-full p-15px box-border bg-white border-rd-8px overflow-hidden"
          >
            <!--            <view :class="shopDetails.name === '数城科技' ? 'ZYtag' : 'ZYtag'">-->
            <view>
              <wd-img :width="57" :height="57" :src="shopDetails.shopAvatar" round />
            </view>
            <view class="ml-10px flex-1 overflow-hidden">
              <view class="w-full flex items-center justify-between">
                <view class="name">
                  {{ shopDetails.name }}
                </view>
                <view v-if="!isFollow" class="guanzhu" @click="fllowShop">+关注</view>
                <view v-else class="quxiao" @click="fllowShop">已关注</view>
              </view>
              <view class="w-full flex items-center" @click="getlocation">
                <view class="mr-5px" style="font-size: 14px; color: #999999">
                  粉丝：{{ shopDetails.shopFansCount }}
                </view>
              </view>
              <!--              <view class="w-full flex items-center" @click="call">-->
              <!--                <view class="mr-5px" style="font-size: 14px; color: #999999">-->
              <!--                  电话： {{ shopDetails.shopPhone }}-->
              <!--                </view>-->
              <!--                <wd-icon name="call" size="16px" color="#999999"></wd-icon>-->
              <!--              </view>-->
            </view>
          </view>
        </view>
      </view>
      <view style="display: flex; text-align: center; background: #fff">
        <view style="flex: 1">
          <wd-sort-button
            v-model="sort.frequently"
            title="销量"
            @change="handleChange($event, 'frequently')"
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
      class="flex w-full px-4 py-2 box-border bg-white border-rd-6px"
      @click="routeTo({ url: '/pages-sub/homeManager/shopInfo', data: { id: item.spuId } })"
      v-for="item in goodList"
      :key="item.spuId"
    >
      <wd-img :width="100" :height="100" :src="item.saleUrl" radius="5px" />

      <view
        class="flex-1 ml-15px py-2 flex flex-col justify-between overflow-hidden box-border"
        style="height: 100px"
      >
        <view>
          <view class="w-full name">
            {{ item.spuName }}
          </view>
          <view class="w-full flex my-5px">
            <view
              v-for="(it, ind) in getTagList()"
              :key="ind"
              class="bg-#FFF0EC border-rd-3px px-5px color-#DF7D65 font-size-10px line-height-15px mr-4px"
            >
              {{ it }}
            </view>
          </view>
        </view>

        <view class="flex justify-between">
          <view>
            <text style="font-size: 12px; color: #f44d24">￥</text>
            <text style="font-size: 18px; font-weight: 600; color: #f44d24">
              {{ item.sellPrice }}
            </text>
          </view>
          <text
            style="margin-left: 8px; font-size: 12px; color: #999999"
            v-if="item.frequently > 0"
          >
            已售{{ item.frequently }}件
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
  width: 80px;
  font-size: 14px;
  line-height: 25px;
  color: #b0b0b0;
  text-align: center;
  background: #ececec;
  border-radius: 13px;
}

.guanzhu {
  width: 80px;
  font-size: 14px;
  line-height: 25px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 13px;
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

.ZYtag {
  position: relative;
}

.ZYtag:after {
  position: absolute;
  bottom: 0;
  left: 15%;
  z-index: 10;
  display: inline-block;
  width: 70%;
  padding: 2px 0px;
  margin-top: -1px;
  margin-right: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  color: #f54e24;
  text-align: center;
  content: '自营';
  background: #ffdad3;
  border-radius: 5px;
  opacity: 0.95;
}
</style>

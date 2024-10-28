<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',

  style: {
    navigationBarTitleText: '我的收藏',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'
import { favoritesList, unUserFavorites, delUserShop, getUserShopList } from '@/service/api/shop'
import { Toast } from '@/utils/uniapi/prompt'
import { routeTo } from '@/utils'

const isManage = ref(false)
const topbgBase64 = ref('')
const arrList = ref([])
const allCheck = ref(false)
const paging = ref(null)
const goodList = ref([])
const showGoods = ref(true)
const tab = ref<number>(0)
const goodsNum = ref(0)
const shopNum = ref(0)
const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    if (showGoods.value) {
      const res: any = await favoritesList({
        current: pageNo,
        size: pageSize,
      })
      res.content.forEach((el) => {
        el.rotationUrl = JSON.parse(el.rotationUrl).map((item) => item.data)
        el.isCheck = false
      })
      goodsNum.value = res.totalElements
      paging.value.complete(res.content)
    } else {
      const res: any = await getUserShopList({
        current: pageNo,
        size: pageSize,
      })
      const arr = res.map((it) => {
        it.isCheck = false
        return it
      })
      console.log('关注店铺', res)
      shopNum.value = arr.length
      paging.value.complete(arr)
    }

    // paging.value.complete([])
  } catch {
    paging.value.complete(false)
  }
}

const getShopNum = () => {
  getUserShopList({
    current: 1,
    size: 10,
  }).then((res) => {
    console.log('ressss', res)
    shopNum.value = res.length
  })
}
const delFoverShop = (id = '') => {
  const idList = id ? [id] : arrList.value

  delUserShop({ idList }).then((res) => {
    Toast('取消收藏成功')
    paging.value.reload()
  })
}

const handleChangeAll = ({ value }) => {
  if (value) {
    goodList.value.forEach((it) => {
      it.isCheck = true
    })
    if (showGoods.value) {
      arrList.value = goodList.value.map((it) => it.spuId)
    } else {
      arrList.value = goodList.value.map((it) => it.shopBean.id)
    }
    console.log('arrList.value', arrList.value)
  } else {
    goodList.value.forEach((it) => {
      it.isCheck = false
    })
    arrList.value.length = 0
  }
}
const handleChange2 = ({ value }, id) => {
  arrList.value.length = 0
  if (value) {
    arrList.value.push(id)
  } else {
    const idx = arrList.value.indexOf(id)
    arrList.value.splice(idx, 1)
  }
  if (arrList.value.length === goodList.value.length) {
    allCheck.value = true
  } else {
    allCheck.value = false
  }
  console.log('arrList.value', arrList.value)
}
const handleChange = ({ value }, id) => {
  arrList.value.length = 0
  if (value) {
    arrList.value.push(id)
  } else {
    const idx = arrList.value.indexOf(id)
    arrList.value.splice(idx, 1)
  }
  if (arrList.value.length === goodList.value.length) {
    allCheck.value = true
  }
  console.log('arrList.value', arrList.value)
}
const delFoverGoods = () => {
  if (showGoods.value) {
    unUserFavorites({ productSpuIds: arrList.value }).then((res) => {
      Toast('取消收藏成功')
      paging.value.reload()
    })
  } else {
    delFoverShop()
  }
}
const tabChange = ({ index, name }) => {
  console.log(index, name)
  showGoods.value = index === 0
  goodList.value.length = 0
  arrList.value.length = 0
  allCheck.value = false
  goodList.value.forEach((it) => {
    it.isCheck = false
  })
  paging.value.reload()
}
const toString = (val: string) => {
  return JSON.parse(val)
}
onShow(() => {
  getShopNum()
})
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <z-paging
    ref="paging"
    v-model="goodList"
    @query="getLsit"
    class="list"
    :class="isManage ? ' pb-80px' : ''"
  >
    <view class="w-full font-600 flex items-center justify-between box-border bg-white pr-15px">
      <view class="w-2/3">
        <wd-tabs v-model="tab" @click="tabChange">
          <block>
            <wd-tab :title="`收藏商品·${goodsNum}`"></wd-tab>
            <wd-tab :title="`关注店铺·${shopNum}`"></wd-tab>
          </block>
        </wd-tabs>
      </view>
      <!-- <view class="line-height-50px">商品数量（{{ goodList.length }}）</view> -->
      <view @click="isManage = !isManage">{{ isManage ? '退出管理' : '管理' }}</view>
    </view>

    <view v-if="showGoods" class="p-15px">
      <view
        class="bg-white border-rd-10px p-15px box-border w-full mb-10px"
        v-for="item in goodList"
        :key="item.spuId"
      >
        <view class="w-full flex">
          <view class="flex items-center mr-20px" v-if="isManage">
            <wd-checkbox
              v-model="item.isCheck"
              @change="handleChange($event, item.spuId)"
            ></wd-checkbox>
          </view>
          <view
            class="flex flex-1 overflow-hidden"
            @click="routeTo({ url: '/pages-sub/homeManager/shopInfo', data: { id: item.spuId } })"
          >
            <wd-img
              :width="105"
              :height="105"
              :src="toString(item.saleUrl)[0].data"
              custom-class="img"
            />
            <view class="ml-15px flex-1 flex flex-col justify-between overflow-hidden">
              <view class="name mb-10px">{{ item.spuName }} {{ item.spuName }}</view>

              <view class="w-full flex">
                <view class="flex items-center" style="font-weight: 600; color: #f44d24">
                  <text style="font-size: 14px">￥</text>
                  <text style="font-size: 18px">{{ item.sellPrice }}</text>
                </view>
                <!-- <view class="mingxi flex items-baseline">
              <text>券后价</text>
              <text class="font-size-8px font-600 ml-5px">￥</text>
              <text class="font-size-14px font-600">{{item.sellPrice}}</text>
            </view> -->
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="w-full p-15px box-border">
      <view
        class="bg-white border-rd-10px p-15px box-border w-full mb-10px overflow-hidden"
        v-for="item in goodList"
        :key="item.spuId"
      >
        <view class="w-full flex">
          <view class="flex flex-col justify-center items-center mr-20px" v-if="isManage">
            <wd-checkbox
              v-model="item.isCheck"
              @change="handleChange2($event, item.shopBean.id)"
            ></wd-checkbox>
          </view>

          <view
            class="flex-1 flex overflow-hidden"
            @click="
              routeTo({ url: '/pages-sub/shopManager/shopHome', data: { id: item.shopBean.id } })
            "
          >
            <wd-img
              :width="80"
              :height="80"
              :src="item.shopInfo.businessLicenseUrl"
              custom-class="img"
            />
            <view class="ml-15px flex-1 flex flex-col justify-between overflow-hidden">
              <view class="w-full mb-10px fw-600 flex justify-between items-center">
                <view class="name flex-1">{{ item.shopInfo.name }}</view>
                <view
                  @click.stop="delFoverShop(item.shopBean.id)"
                  class="w-60px fw-400 h-25px line-height-25px font-size-14px text-center border-rd-6px bg-#FFF3F0 color-#F44D24"
                >
                  取关
                </view>
              </view>
              <view class="w-full flex items-center">
                <wd-text :text="`地址：${item.shopInfo.address}`" :lines="1" size="14px"></wd-text>
                <wd-icon
                  name="location"
                  size="14px"
                  color="#535F7B"
                  custom-class="ml-5px"
                ></wd-icon>
              </view>
              <view class="w-full flex items-center">
                <wd-text :text="`电话：${item.shopInfo.phone}`" :lines="1" size="14px"></wd-text>
                <wd-icon name="call" size="14px" color="#535F7B" custom-class="ml-5px"></wd-icon>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>

  <!-- <view class="flex flex-col items-center justify-center mt-140px">
      <wd-img :width="246" :height="168"
        src='https://oss.xay.xacloudy.cn/images/2024-09/cdc42a2e-06d9-4981-9691-56c4bb873d28未标题-1.png'></wd-img>
      <view class='mt-32px'>暂无数据！</view>
    </view> -->

  <view
    v-if="isManage"
    class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center"
  >
    <wd-checkbox v-model="allCheck" @change="handleChangeAll">全选</wd-checkbox>
    <view class="flex items-center">
      <view class="flex items-center">共计{{ arrList.length }}件</view>
      <view class="submit" @click="delFoverGoods">删除</view>
    </view>
  </view>
</template>

<style>
.submit {
  width: 103px;
  margin-left: 20px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 6px 6px 6px 6px;
}

.list {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 50px);
  margin-top: 50px;
  background-color: rgb(244, 246, 248);
  /*background-color: #f5f6f8;*/
}

.mingxi {
  padding: 2px 5px;
  margin-left: 10px;
  font-size: 12px;
  color: #f44d24;
  background: #ffece8;
  border-radius: 2px 2px 2px 2px;
}

.img {
  overflow: hidden !important;
  border-radius: 5px;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.num {
  width: 25px;
  line-height: 25px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 5px 5px 5px 5px;
}
</style>

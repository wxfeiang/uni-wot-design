<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  needLogin: true,
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
import { favoritesList, unUserFavorites } from '@/service/api/shop'


const isManage = ref(false)
const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env

const paging = ref(null)
let goodList = ref([])
const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    let res: any = await favoritesList({
      current: pageNo,
      size: pageSize,
    })
    res.content.forEach(el => {
      el.rotationUrl = JSON.parse(el.rotationUrl).map(item => item.data)
    });
    console.log('收藏列表', res.content)

    paging.value.complete(res.content)
  } catch {
    paging.value.complete(false)
  }
}
const toString = (val: string) => {
  return JSON.parse(val)
}
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-full font-600 flex items-center justify-between px-20px box-border">
    <view class="line-height-50px">商品数量（{{ goodList.length }}）</view>
    <view @click="isManage = !isManage">管理</view>
  </view>
  <z-paging ref="paging" v-model="goodList" @query="getLsit" class="list"
    :class="isManage ? 'p-15px pb-80px' : 'p-15px'">
    <view class="bg-white border-rd-10px p-15px box-border w-full mb-10px" v-for="item in goodList" :key='item.spuId'>
      <view class="w-full flex">
        <view class="flex items-center">
          <wd-checkbox v-if="isManage" v-model="value" @change="handleChange"></wd-checkbox>
        </view>
        <wd-img :width="105" :height="105" :src="toString(item.saleUrl)[0]" custom-class="img" />
        <view class="ml-15px flex-1 flex flex-col justify-between">
          <view class="w-190px">
            <view class="name mb-10px">{{ item.spuName }}</view>
            <!-- <view style="font-size: 14px; color: #757575">灰色</view> -->
          </view>

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


  </z-paging>


  <!-- <view class="flex flex-col items-center justify-center mt-140px">
      <wd-img :width="246" :height="168"
        src='https://oss.xay.xacloudy.cn/images/2024-09/cdc42a2e-06d9-4981-9691-56c4bb873d28未标题-1.png'></wd-img>
      <view class='mt-32px'>暂无数据！</view>
    </view> -->

  <view v-if="isManage"
    class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center">
    <wd-checkbox v-model="value" @change="handleChange">全选</wd-checkbox>
    <view class="flex items-center">
      <view class="flex items-center">共计2件</view>
      <view class="submit">删除</view>
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
  background-color: #f5f6f8;
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

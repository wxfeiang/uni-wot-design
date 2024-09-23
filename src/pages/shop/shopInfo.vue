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
import shangdian from '@/static/images/shop/shangdian.png'
import kefu from '@/static/images/shop/kefu.png'
import gouwuche from '@/static/images/shop/gouwuche.png'
import fenxiang from '@/static/images/shop/fenxiang.png'
import shoucang from '@/static/images/shop/shoucang.png'
import duihao from '@/static/images/shop/duihao.png'
import shoucang1 from '@/static/images/shop/shoucang1.png'

const current = ref<number>(0)
const title = ref('商品详情')
const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

onLoad(async (options) => {
  // await getList()
  console.log('options', options)
})
</script>

<template>
  <view class="pageBoxBg w-screen pos-relative">
    <dy-navbar :leftTitle="title" left style="background: transparent"></dy-navbar>
    <wd-swiper :list="swiperList" autoplay v-model:current="current" @click="handleClick" height="400px"
      customStyle="border-radius: 0" @change="onChange"></wd-swiper>
    <view class="bg-#F5F6F8 w-full pos-absolute p-20px box-border overflow-hidden"
      style="top: 420px; border-radius: 20px 20px 0 0">
      <view class="w-full flex justify-between items-center">
        <view class="flex items-center">
          <wd-text text="￥" color="#F44D24" size="16px"></wd-text>
          <wd-text text="75" color="#F44D24" size="25px"></wd-text>
          <view class="w-133px line-height-35px bg-#F44D24 text-center ml-10px border-rd-50px">
            <wd-text text="券后价" color="#FFF" size="14px"></wd-text>
            <wd-text text="￥" color="#fff" size="10px"></wd-text>
            <wd-text text="29.9" color="#fff" size="18px"></wd-text>
          </view>
        </view>
        <wd-text text="已售300" color="#F44D24" size="14px"></wd-text>
      </view>

      <view class="w-full text-cut-line2 mt-10px font-600">
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
      </view>

      <view class="mt-10px flex items-center color-#999999">
        <view class="mr-20px">
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
          <wd-img :width="45" :height="45"
            src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg" round></wd-img>
          <view class="flex-1 overflow-hidden ml-10px">
            <view class="w-full flex items-center justify-between">
              <view>
                <wd-text text="用户姓名" bold color="#333"></wd-text>
                <wd-text text="已购" size="12px" color="#999" custom-style="margin:0 10px;"></wd-text>
                <wd-text text="60" size="12px" color="#999"></wd-text>
              </view>
              <wd-text text="9天前" size="12px" color="#999"></wd-text>
            </view>
            <view class="text">
              评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价
            </view>
          </view>
        </view>
        <view class="color-#999 w-full pt-5px flex items-center justify-center mt-10px"
          style="border-top: 1px solid #eee">
          <text>查看全部评价</text>
          <wd-icon name="arrow-right" size="20px"></wd-icon>
        </view>
      </view>

      <view class="w-full bg-white p-15px box-border border-rd-10px mt-10px">
        <view class="font-600 mb-10px">商品详情</view>
        <wd-img width="100%" mode="widthFix"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg"></wd-img>
      </view>
    </view>
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

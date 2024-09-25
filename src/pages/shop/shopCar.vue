<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationBarTitleText: '购物车',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'

import { shopCarList } from '@/service/api/shop'

const isManage = ref(false)
const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-full font-600 flex items-center justify-between px-20px box-border">
    <view class="line-height-50px">购物车数量</view>
    <view>
      <text style="margin-right: 10px; color: #f44d24" v-if="isManage">删除</text>
      <text @click="isManage = !isManage">管理</text>
    </view>
  </view>

  <view class="list">
    <view class="bg-white border-rd-10px p-15px box-border w-full">
      <div class="flex items-center">
        <wd-checkbox v-model="value" @change="handleChange"></wd-checkbox>
        <view>店铺名称</view>
        <wd-icon name="arrow-right" size="20px" color=""></wd-icon>
      </div>

      <view class="w-full mt-15px flex">
        <view class="flex items-center">
          <wd-checkbox v-model="value" @change="handleChange"></wd-checkbox>
        </view>
        <wd-img :width="105" :height="105" :src="topbgBase64" custom-class="img" />
        <view class="ml-15px flex-1 flex flex-col justify-between">
          <view class="w-190px name">overflow-hiddenhiddenhiddenhiddenhiddenhidden</view>
          <view style="font-size: 14px; color: #757575">灰色</view>
          <view class="w-full">
            <wd-tag color="#FAA21E" bg-color="#FF6609" plain>7天无理由退货</wd-tag>
            <wd-tag color="#FAA21E" bg-color="#FF6609" plain style="margin-left: 10px">
              运费险
            </wd-tag>
          </view>
          <view class="w-full flex justify-between">
            <view class="flex items-center" style="font-weight: 600; color: #f44d24">
              <text style="font-size: 14px">￥</text>
              <text style="font-size: 18px">0</text>
            </view>
            <view class="num">x1</view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- <view class="flex flex-col items-center justify-center mt-140px">
    <wd-img :width="246" :height="168"
      src='https://oss.xay.xacloudy.cn/images/2024-09/cdc42a2e-06d9-4981-9691-56c4bb873d28未标题-1.png'></wd-img>
    <view class='mt-32px'>暂无数据！</view>
  </view> -->

  <view
    v-if="!isManage"
    class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center"
  >
    <wd-checkbox v-model="value" @change="handleChange">全选</wd-checkbox>
    <view class="flex items-center">
      <view class="flex items-center">
        合计：
        <view style="color: #f44d24">
          <text style="font-size: 14px">￥</text>
          <text style="font-size: 20px">0</text>
        </view>
      </view>
      <view class="submit">结算（3）</view>
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
  padding: 15px;
  padding-bottom: 80px;
  overflow-y: auto;
  background-color: #f5f6f8;
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

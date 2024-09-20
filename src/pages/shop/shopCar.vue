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
defineOptions({
  name: 'Index',
})

const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-full text-center position-relative font-600 line-height-40px">
    购物车数量
    <view style="left: 50%; background-color: #fb2549; transform: translate(-50%)"
      class="position-absolute w-35px h-3px border-rd-3px pos-bottom-none"></view>
  </view>

  <view class="list">
    <view class="bg-white border-rd-10px p-15px box-border w-full">
      <div class="flex items-center">
        <wd-checkbox v-model="value" @change="handleChange"></wd-checkbox>
        <view>店铺名称</view>
        <wd-icon name="arrow-right" size="20px" color=""></wd-icon>
      </div>

      <view class="w-full mt-15px flex">
        <wd-checkbox v-model="value" @change="handleChange" style="align-self: center"></wd-checkbox>
        <wd-img :width="105" :height="105" :src="topbgBase64" custom-image="img" />
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

  <view class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center">
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
  height: calc(100vh - 160px);
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f6f8;
}

.img {
  overflow: hidden;
  border-radius: 5px !important;
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

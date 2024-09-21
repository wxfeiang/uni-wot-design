<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
  {
    layout: 'default',
    needLogin: true,
    style: {
      navigationBarTitleText: '确认订单',
      backgroundColor: '#F3F4F6',
      navigationBarBackgroundColor: '#F3F4F6',
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
const disCount = ref(false)
const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-full p-20px box-border bg-#F3F4F6">
    <view class="flex w-full p-15px box-border bg-white border-rd-10px overflow-hidden">
      <wd-img :width="57" :height="57" :src="topbgBase64" round />
      <view class="ml-10px flex-1  overflow-hidden">
        <view class="w-full flex items-center justify-between">
          <view class="name">店铺名店铺名称店铺名称店铺名称店铺名称称</view>
          <!-- <view class="guanzhu">+关注</view> -->
          <view class="quxiao">已关注</view>
        </view>
        <view class="w-full flex items-center">
          <view class="mr-5px" style="font-size: 14px;color: #999999">地址地址</view>
          <wd-icon name="location" size="16px" color="#999999"></wd-icon>
        </view>
        <view class="w-full flex items-center">
          <view class="mr-5px" style="font-size: 14px;color: #999999">电话</view>
          <wd-icon name="call" size="16px" color="#999999"></wd-icon>
        </view>
      </view>
    </view>
  </view>

  <view class="list">
    <view style="display: flex;  text-align: center; background: #fff">
      <wd-drop-menu style="flex: 1; min-width: 0">
        <wd-drop-menu-item v-model="value1" title="销量" :options="option" @change="handleChange1" icon-size="0" />
      </wd-drop-menu>
      <wd-drop-menu style="flex: 1; min-width: 0">
        <wd-drop-menu-item v-model="value1" title="上架时间" :options="option" @change="handleChange1" icon-size="0" />
      </wd-drop-menu>
      <view style="flex: 1">
        <wd-sort-button v-model="value2" title="价格" @change="handleChange2" />
      </view>
    </view>
    <view class="flex w-full h-100px p-7px box-border mb-10px bg-white border-rd-6px">
      <wd-img :width="86" :height="86" :src="topbgBase64" custom-image="img" />
      <div class="flex-1 ml-15px flex flex-col justify-between overflow-hidden">
        <view class="w-full name">
          赵州雪梨干泡水赵雪雪梨干无硫赵州雪梨干泡水赵雪雪梨干无硫河北石家庄...河北石家庄...
        </view>
        <view class="flex justify-between">
          <view>
            <text style="font-size: 12px; color: #f44d24">￥</text>
            <text style="font-size: 18px; font-weight: 600; color: #f44d24">58.8</text>
          </view>
          <text style="margin-left: 8px; font-size: 12px; color: #999999">已售2353件</text>
        </view>
      </div>
    </view>
  </view>



</template>

<style>
.list {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 133px);
  padding: 0 15px 15px;
  overflow-y: auto;
  background-color: #ffffff;
}

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

.img {
  overflow: hidden;
  border-radius: 5px;
}

.quxiao {
  width: 60px;
  font-size: 14px;
  line-height: 25px;
  color: #B0B0B0;
  text-align: center;
  background: #ECECEC;
  border-radius: 6px 6px 6px 6px;
}

.guanzhu {
  width: 60px;
  font-size: 14px;
  line-height: 25px;
  color: #fff;
  text-align: center;
  background: #F44D24;
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
</style>
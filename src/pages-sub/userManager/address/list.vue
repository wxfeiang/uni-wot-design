<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '收货地址',
    backgroundColor: '#ffffff',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'

const value = ref(true)
const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-100vw h-100vh bg-#F7F7F7 p-20px box-border overflow-y-auto pb-100px">
    <view class="border-rd-7px bg-white p-15px box-border mb-15px">
      <view>张三 18794578345</view>
      <view class="w-full my-10px add-detail">
        雁园街道雁兴路3100号附近基业豪庭雁园街道雁兴路3100号附近基业豪庭雁园街道雁兴路3100号附近基业豪庭雁园街道雁兴路3100号附近基业豪庭
      </view>
      <view class="w-full flex justify-between items-center">
        <wd-checkbox v-model="value" size="large" checked-color="#f44d24">设为默认</wd-checkbox>
        <view style="color: #666666">
          <wd-icon name="edit-1" size="20px" style="margin-right: 3px"></wd-icon>
          编辑
          <wd-icon name="delete" size="20px" style="margin-right: 3px; margin-left: 10px"></wd-icon>
          删除
        </view>
      </view>
    </view>
    <view class="submit">新增收货地址</view>
  </view>
</template>

<style>
.add-detail {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.submit {
  position: fixed;
  bottom: 40px;
  left: 50%;
  width: 70vw;
  line-height: 50px;
  color: #fff;
  text-align: center;
  background-color: #f44d24;
  border-radius: 50px;
  transform: translate(-50%);
}
</style>

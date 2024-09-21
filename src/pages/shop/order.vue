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
const model = reactive({
  value1: '',
  value2: '',
})
const disCount = ref(false)
let isExtract = ref(false)
const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>


  <view class="list">
    <view class="bg-white border-rd-5px">

      <view class="border-rd-7px bg-white p-13px pb-0 box-border">
        <view style="width: 100%; font-size: 14px; color: #888888" class="add-detail">
          甘肃省 兰州市 城关区 雁南街道
        </view>
        <view class="w-full flex items-center justify-between my-3px">
          <view class="flex-1 add-detail">
            雁园街道雁兴路3100号附近基业豪庭雁园街道雁兴路3100号附近基业豪庭
          </view>
          <wd-icon name="arrow-right" size="22px" color="#000"></wd-icon>
        </view>
        <view style="font-size: 14px">张三 18794578345</view>
      </view>

      <view>
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
            <wd-input label="提货人姓名" label-width="100px" prop="value1" clearable v-model="model.value1"
              placeholder="请输入提货人姓名" :rules="[{ required: true, message: '请输入提货人姓名' }]" />
            <wd-input label="提货人手机号" label-width="100px" prop="value2" clearable v-model="model.value2"
              placeholder="请输入提货人手机号" :rules="[{ required: true, message: '请填写提货人手机号' }]" />
          </wd-cell-group>
        </wd-form>
      </view>

      <view class=" border-rd-10px p-15px box-border w-full">
        <div class="flex items-center">
          <wd-img :width="25" :height="25" :src="topbgBase64" custom-image="img" />
          <view class="ml-12px" style="color: #333333">店铺名称</view>
        </div>

        <view class="w-full mt-15px flex">
          <wd-img :width="105" :height="105" :src="topbgBase64" custom-image="img" />
          <view class="ml-15px flex-1 flex flex-col justify-between overflow-hidden">
            <view class="w-210px name">overflow-hiddenhiddenhiddenhiddenhiddenhidden</view>
            <view style="font-size: 14px; color: #757575">灰色</view>
            <view class="w-full">
              <wd-tag color="#FAA21E" bg-color="#FF6609" plain>7天无理由退货</wd-tag>
              <wd-tag color="#FAA21E" bg-color="#FF6609" plain style="margin-left: 10px">
                运费险
              </wd-tag>
            </view>
            <view class="w-full flex justify-between">
              <view class="flex items-center" style="font-weight: 600">
                <text style="font-size: 14px">￥</text>
                <text style="font-size: 18px">0</text>
                <view class="quan">
                  <text style="margin-right: 5px; font-size: 10px">券后价</text>
                  <text style="font-size: 8px; font-weight: 600">￥</text>
                  <text style="font-size: 16px; font-weight: 600">19.9</text>
                </view>
              </view>
              <view class="num">x1</view>
            </view>
          </view>
        </view>
        <view class="w-full flex justify-between items-center mt-15px">
          <view class="mr-50px">优惠券</view>
          <view style="color:#777777 ;">暂无可用优惠券</view>
        </view>
        <view class="w-full flex justify-between items-center mt-15px">
          <view class="mr-50px">实际支付</view>
          <view class="color-#F44D24" style="font-size: 16px">
            <text>￥66.9</text>
          </view>
        </view>
        <view class="w-full flex justify-between items-center mt-15px">
          <view class="mr-50px">配送方式</view>
          <view class="flex items-center">
            <text class="mr-5px">上门自提</text>
            <wd-icon name="arrow-right" size="20px"></wd-icon>
          </view>
        </view>
        <view class="w-full flex justify-between items-center mt-15px">
          <view class="mr-50px">自提点</view>
          <view>
            <wd-icon name="location" size="16px" color="#999999"></wd-icon>
            <text class="mr-5px">asdasd</text>
            <wd-icon name="arrow-right" size="20px"></wd-icon>
          </view>
        </view>
        <view class="w-full flex justify-between items-center mt-15px">
          <view class="mr-50px">备注留言</view>
          <wd-input type="text" v-model="value" placeholder="无备注" no-border custom-input-class="inp" style="flex: 1" />
        </view>
      </view>
    </view>

  </view>

  <view class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center ">
    <view class="flex flex-col" @click="disCount = true">
      <view style="color: #f44d24" class="font-600">
        <text style="font-size: 14px">￥</text>
        <text style="font-size: 20px">2129</text>
      </view>
      <view class="mingxi flex items-center">
        <text>已优惠￥55.34 明细</text>
        <wd-icon name="arrow-up" size="22px"></wd-icon>
      </view>
    </view>
    <view class="submit">提交订单</view>
  </view>

  <!-- 券明细 -->
  <wd-popup v-model="disCount" lock-scroll position="bottom"
    custom-style="padding:18px 15px;box-sizing:border-box;border-radius:20px 20px 0 0;bottom:80px;">
    <view class="font-600 mb-20px">优惠明细</view>
    <view class="font-600 mb-20px w-full flex items-center justify-between">
      <text>合计优惠</text>
      <view>
        <text style="font-size: 14px">￥</text>
        <text style="font-size: 20px">66.9</text>
      </view>
    </view>

    <view>
      <view class="w-full flex items-center justify-between">
        <view style="color: #777777">· 优贝朵服装</view>
        <view style="color: #f44d24">
          <text>-</text>
          <text style="font-size: 14px">￥</text>
          <text style="font-size: 18px">2129</text>
        </view>
      </view>
      <view class="pl-15px mt-12px w-full flex">
        <wd-img :width="66" :height="66" :src="topbgBase64" custom-class="img" />
        <view class="self-end ml-10px flex items-center">
          <view class="jian flex items-center justify-center mr-5px">满100减20</view>
          <view style="font-size: 12px; color: #777777">共减￥20</view>
        </view>
      </view>
    </view>
  </wd-popup>
  <!-- 提货 -->
  <wd-popup v-model="isExtract" lock-scroll position="bottom"
    custom-style="padding:18px 15px;box-sizing:border-box;border-radius:20px 20px 0 0;">
    <view class="font-600 mb-20px">选择自提点</view>
    <view style="width: 100%;max-height: 60vh;overflow-y: auto;">
      <view class="flex w-full mb-15px">
        <view style="align-self: center">
          <wd-checkbox v-model="value" @change="handleChange"></wd-checkbox>
        </view>
        <view class="flex-1 overflow-hidden">
          <view class="name w-full overflow-hidden">地址地址地址地址</view>
          <view class="name w-full overflow-hidden mt-5px">
            <wd-icon name="location" size="16px" color="#999999"></wd-icon>
            <text style="font-size: 14px;color: #999999;">地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址</text>
          </view>
        </view>
      </view>
    </view>
    <view class="address-submit">确定</view>
  </wd-popup>
</template>

<style>
.address {
  box-sizing: border-box;
  padding: 14px;
  background-color: #f3f4f6;
}

.add-detail {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.address-submit {
  width: 343px;
  height: 40px;
  margin: 20px auto;
  color: #fff;
  text-align: center;
  background: #F44D24;
  border-radius: 5px 5px 5px 5px;
}

.submit {
  width: 103px;
  margin-left: 20px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 6px 6px 6px 6px;
}

.inp {
  text-align: right !important;
}

.mingxi {
  font-size: 12px;
  color: #f44d24;
}

.list {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0 15px 15px;
  overflow-y: auto;
  background-color: #f5f6f8;
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

.jian {
  width: 67px;
  height: 20px;
  font-size: 10px;
  color: #f44d24;
  background: #ffece8;
  border-radius: 2px 2px 2px 2px;
}
</style>

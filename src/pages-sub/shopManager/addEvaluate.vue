<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',

  style: {
    navigationBarTitleText: '评价',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import { routeTo } from '@/utils'
import shoukuanma from './static/shoukuanma.png'

const action = ref('https://ftf.jd.com/api/uploadImg')
const value = ref(3)
const text = ref('')
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
  },
])
const changeText = (type: number) => {
  switch (type) {
    case 1:
      text.value += text.value.trim() === '' ? '配件问题：' : '\n配件问题：'
      break
    case 2:
      text.value += text.value.trim() === '' ? '包装品质：' : '\n包装品质：'
      break
    case 3:
      text.value += text.value.trim() === '' ? '外观品相：' : '\n外观品相：'
      break
    case 4:
      text.value += text.value.trim() === '' ? '触摸手感：' : '\n触摸手感：'
      break
    default:
      break
  }
}
const handleChange = () => {}
onLoad(async () => {})
</script>
<template>
  <view class="w-full h-100vh flex flex-col bg-#F3F4F8 box-border">
    <view class="flex-1 my-12px mx-12px overscroll-y-auto">
      <!-- 商品信息 -->
      <view class="bg-white w-full p-12px box-border border-rd-10px mb-10px">
        <view>
          <wd-text text="订单编号：" color="#333333" size="12px"></wd-text>
          <wd-text text="PT76252538993444" color="#333333" size="12px"></wd-text>
        </view>
        <view class="w-full flex mt-12px">
          <wd-img :src="shoukuanma" :width="100" :height="100" radius="5px"></wd-img>
          <view class="ml-12px flex-1 flex flex-col justify-between">
            <view>
              <wd-text text="商品名称" :lines="2" size="14px" color="#333333"></wd-text>
              <view class="w-full flex items-center justify-between mt-5px">
                <wd-text text="商品规格" size="12px" color="#999999"></wd-text>
                <wd-text text="x1" size="12px" color="#999999"></wd-text>
              </view>
            </view>
            <view class="w-full flex items-center justify-end">
              <wd-text text="金额：" size="12px" color="#333333"></wd-text>
              <wd-text text="￥" size="12px" color="#EA4455"></wd-text>
              <wd-text text="9999" size="16px" bold color="#EA4455"></wd-text>
            </view>
          </view>
        </view>
      </view>

      <!-- 上传  -->
      <view class="bg-white w-full p-12px box-border border-rd-10px mb-10px">
        <wd-upload
          accept="media"
          multiple
          :file-list="fileList"
          :action="action"
          @change="handleChange"
          custom-evoke-class="w-full h-full"
        >
          <view class="w-full h-full flex flex-col item-center justify-center">
            <wd-icon
              name="camera"
              size="30px"
              color="#333333"
              custom-class="mb-15px text-center"
            ></wd-icon>
            <wd-text
              text="添加视频/图片"
              color="#333333"
              bold
              size="14px"
              custom-class="text-center"
            ></wd-text>
          </view>
        </wd-upload>
      </view>
      <!-- 评价 -->
      <view class="bg-white w-full p-12px box-border border-rd-10px mb-10px">
        <view class="w-full flex justify-between">
          <view
            class="w-80px line-height-28px color-#999999 bg-#F6F6F6 font-size-14px text-center border-rd-50px"
            style="border: 1px dotted #999"
            @click="changeText(1)"
          >
            配件问题
          </view>
          <view
            class="w-80px line-height-28px color-#999999 bg-#F6F6F6 font-size-14px text-center border-rd-50px"
            style="border: 1px dotted #999"
            @click="changeText(2)"
          >
            包装品质
          </view>
          <view
            class="w-80px line-height-28px color-#999999 bg-#F6F6F6 font-size-14px text-center border-rd-50px"
            style="border: 1px dotted #999"
            @click="changeText(3)"
          >
            外观品相
          </view>
          <view
            class="w-80px line-height-28px color-#999999 bg-#F6F6F6 font-size-14px text-center border-rd-50px"
            style="border: 1px dotted #999"
            @click="changeText(4)"
          >
            触摸手感
          </view>
        </view>
        <wd-textarea
          v-model="text"
          placeholder="展开说说对商品的想法吧…"
          :placeholder-color="'#999999'"
          :maxlength="200"
          :show-word-limit="true"
          no-border
        />
      </view>
      <!-- 评分 -->
      <view class="bg-white w-full p-12px box-border border-rd-10px">
        <view class="w-full flex">
          <wd-text text="商品评价" color="#000000" bold size="14px"></wd-text>
          <wd-rate v-model="value" @change="handleChange" size="14px" custom-class="ml-12px" />
        </view>
        <view class="w-full flex my-10px">
          <wd-text text="物流服务" color="#000000" bold size="14px"></wd-text>
          <wd-rate v-model="value" @change="handleChange" size="14px" custom-class="ml-12px" />
        </view>
        <view class="w-full flex">
          <wd-text text="服务态度" color="#000000" bold size="14px"></wd-text>
          <wd-rate v-model="value" @change="handleChange" size="14px" custom-class="ml-12px" />
        </view>
      </view>
    </view>

    <view class="w-full bg-white h-56px px-12px py-6px box-border">
      <view
        class="w-full h-full color-white bg-#F54F25 border-rd-50px flex items-center justify-center font-600"
      >
        发布
      </view>
    </view>
  </view>
</template>

<style></style>

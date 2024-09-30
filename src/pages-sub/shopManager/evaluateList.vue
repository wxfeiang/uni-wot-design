<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',

  style: {
    navigationBarTitleText: '全部评价',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import { routeTo } from '@/utils'
import shoukuanma from './static/shoukuanma.png'

const paging = ref(null)
const goodList = ref([])
const num = ref(3)
const content = ref('评价内容评价内容评价内容评价内容评价内容评价内容评价内容')
const tabIndex = ref(0)

const filterData = (type: number) => {
  console.log(type)
  tabIndex.value = type
  // paging.value.reload()
}
const getLsit = async () => {
  // try {
  //   const res: any = await shopCarList({
  //     customerId: userStore.userInfo.userDId,
  //     current: 1,
  //     size: 10,
  //   })
  //   paging.value.complete(res)
  // } catch {
  //   console.log('????')
  //   paging.value.complete(false)
  // }
}
onLoad(async () => {})
</script>
<template>
  <z-paging
    ref="paging"
    v-model="goodList"
    @query="getLsit"
    :paging-style="{
      'box-sizing': 'border-box',
      padding: '15px',
      'background-color': '#F3F4F8',
    }"
  >
    <view class="bg-white w-full p-10px box-border" style="border-radius: 10px 10px 0 0">
      <view class="mb-10px">
        <wd-text text="评分" color="#999999" size="14px"></wd-text>
        <wd-text text="99%" color="#F54F25" size="14px"></wd-text>
        <wd-text text="好评" color="#999999" size="14px"></wd-text>
      </view>
      <view class="flex items-center justify-between">
        <!--  -->
        <view
          class="w-62px line-height-30px text-center font-size-14px border-rd-5px"
          @click="filterData(0)"
          :class="tabIndex === 0 ? 'bg-#F54F25 color-#ffffff' : 'bg-#F3F4F8 color-#666666'"
        >
          全部
        </view>
        <view
          class="w-62px line-height-30px text-center font-size-14px border-rd-5px"
          @click="filterData(1)"
          :class="tabIndex === 1 ? 'bg-#F54F25 color-#ffffff' : 'bg-#F3F4F8 color-#666666'"
        >
          最新
        </view>
        <view
          class="w-62px line-height-30px text-center font-size-14px border-rd-5px"
          @click="filterData(2)"
          :class="tabIndex === 2 ? 'bg-#F54F25 color-#ffffff' : 'bg-#F3F4F8 color-#666666'"
        >
          有图
        </view>
        <view
          class="w-62px line-height-30px text-center font-size-14px border-rd-5px"
          @click="filterData(3)"
          :class="tabIndex === 3 ? 'bg-#F54F25 color-#ffffff' : 'bg-#F3F4F8 color-#666666'"
        >
          好评
        </view>
        <view
          class="w-62px line-height-30px text-center font-size-14px border-rd-5px"
          @click="filterData(4)"
          :class="tabIndex === 4 ? 'bg-#F54F25 color-#ffffff' : 'bg-#F3F4F8 color-#666666'"
        >
          差评
        </view>
      </view>
    </view>

    <!-- 评价列表 -->
    <view class="w-full bg-white" style="border-radius: 0 0 10px 10px">
      <view class="flex p-10px box-border" v-for="i in 10" :key="i">
        <wd-img :src="shoukuanma" :width="28" :height="28" round></wd-img>
        <view class="flex-1 ml-8px">
          <view>
            <view class="w-full flex items-center justify-between">
              <view>
                <wd-text text="用户昵称" color="#000000" size="14px" bold></wd-text>
                <wd-text
                  text="已购 60片"
                  color="#9C9DAD"
                  size="14px"
                  custom-class="ml-28px"
                ></wd-text>
              </view>
              <wd-text text="2024/09/03 12.22" color="#CCCCCC" size="14px"></wd-text>
            </view>
          </view>
          <wd-rate v-model="num" readonly size="14px" />
          <view class="mt-10px">
            <wd-text :text="content" color="#000000" size="14px"></wd-text>
            <view class="mt-10px flex flex-warp">
              <wd-img
                :width="90"
                :height="90"
                :src="shoukuanma"
                custom-class="mr-10px"
                mode="aspectFill"
              />
              <wd-img
                :width="90"
                :height="90"
                :src="shoukuanma"
                custom-class="mr-10px"
                mode="aspectFill"
              />
              <wd-img
                :width="90"
                :height="90"
                :src="shoukuanma"
                custom-class="mr-10px"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style></style>

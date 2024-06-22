<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '考试',
  },
}
</route>
<template>
  <wd-swiper
    :list="swiperList"
    autoplay
    :current="0"
    @click="handleClick"
    @change="onChange"
    height="120"
  ></wd-swiper>

  <view class="bg-white mt-1">
    <wd-tabs v-model="tab" swipeable>
      <template v-for="(item, index) in list" :key="index">
        <wd-tab :title="item.name" class="border-b-1px">
          <wd-row :gutter="10">
            <wd-col :span="8">
              <view v-for="(c, j) in item.conter.left" :key="j" class="py-15px">
                <view class="mx-auto text-center">
                  <wd-img :width="40" :height="40" round :src="c.icon" />
                </view>
                <view class="text-center text-xs">{{ c.name }}</view>
              </view>
            </wd-col>
            <wd-col :span="8">
              <view class="flex flex-col mt-50px">
                <view v-for="(c, j) in item.conter.center" :key="j">
                  <view class="mx-auto text-center py-10px mt-25px">
                    <wd-img :width="60" :height="60" round :src="c.icon" />
                  </view>
                </view>
              </view>
            </wd-col>
            <wd-col :span="8">
              <view v-for="(c, j) in item.conter.left" :key="j" class="py-15px">
                <view class="mx-auto text-center">
                  <wd-img :width="40" :height="40" round :src="c.icon" />
                </view>
                <view class="text-center text-xs">{{ c.name }}</view>
              </view>
            </wd-col>
          </wd-row>
        </wd-tab>
      </template>
    </wd-tabs>
  </view>
  <wd-gap bg-color="#4D80F0"></wd-gap>
</template>

<script lang="ts" setup>
import { routeTo } from '@/utils'

const tab = ref<number>(0)
const swiperList = ref([
  'https://unpkg.com/wot-design-uni-assets/redpanda.jpg',
  'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
  'https://unpkg.com/wot-design-uni-assets/panda.jpg',
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://unpkg.com/wot-design-uni-assets/meng.jpg',
])

const list = ref([
  {
    name: '科目一',
    value: 1,
    conter: {
      left: [
        {
          name: 'vip课程',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '专项练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '图标练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '新规',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
      center: [
        {
          name: '顺序练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '模拟考试',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
      right: [
        {
          name: '精简题库',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '随机练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '错题',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '排行',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
    },
  },
  {
    name: '科目四',
    value: 2,
    conter: {
      left: [
        {
          name: '课程',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '专项练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '图标练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '新规',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
      center: [
        {
          name: '顺序练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '模拟考试',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
      right: [
        {
          name: '精简题库',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '随机练习',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '错题',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '排行',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
    },
  },
])

function handleClick(e) {
  console.log(e)
  routeTo({ url: '/pages-sub/examination/index', data: { cMode: 1 } })
}
function onChange(e) {
  console.log(e)
}
defineOptions({
  name: 'Home',
})
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>

<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '考试类目',
  },
}
</route>

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
          icon: 'dy-icon-vip1',
        },
        {
          name: '专项练习',
          value: 1,
          icon: 'dy-icon-zhuanxianglianxi',
        },
        {
          name: '图标练习',
          value: 1,
          icon: 'dy-icon-cuotishoucang',
        },
        {
          name: '新规',
          value: 1,
          icon: 'dy-icon-a-weibiaoti-2_huaban1',
        },
      ],
      center: [
        {
          name: '顺序练习',
          color: 'bg-blue',
          sName: '13/3000',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '模拟考试',
          sName: '仿真冲刺',
          color: 'bg-teal',
          value: 0,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
      right: [
        {
          name: '精简题库',
          value: 1,
          icon: 'dy-icon-tiku',
        },
        {
          name: '随机练习',
          value: 1,
          icon: 'dy-icon-icon-suijilianxi',
        },
        {
          name: '错题',
          value: 1,
          icon: 'dy-icon-cuotishoucang',
        },
        {
          name: '排行',
          value: 1,
          icon: 'dy-icon-paihangbang',
        },
      ],
    },
  },
  {
    name: '科目四',
    value: 1,
    conter: {
      left: [
        {
          name: 'vip课程',
          value: 1,
          icon: 'dy-icon-vip1',
        },
        {
          name: '专项练习',
          value: 1,
          icon: 'dy-icon-zhuanxianglianxi',
        },
        {
          name: '图标练习',
          value: 1,
          icon: 'dy-icon-cuotishoucang',
        },
        {
          name: '新规',
          value: 1,
          icon: 'dy-icon-a-weibiaoti-2_huaban1',
        },
      ],
      center: [
        {
          name: '顺序练习',
          color: 'bg-blue',
          sName: '13/3000',
          value: 1,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
        {
          name: '模拟考试',
          sName: '仿真冲刺',
          color: 'bg-teal',
          value: 0,
          icon: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
        },
      ],
      right: [
        {
          name: '精简题库',
          value: 1,
          icon: 'dy-icon-guanwang_kehuanli_qitakehu_yewutongdian_xiangyingzijinxintuoxinguiyaoqiu',
        },
        {
          name: '随机练习',
          value: 1,
          icon: 'dy-icon-icon-suijilianxi',
        },
        {
          name: '错题',
          value: 1,
          icon: 'dy-icon-cuotishoucang',
        },
        {
          name: '排行',
          value: 1,
          icon: 'dy-icon-paihangbang',
        },
      ],
    },
  },
])

function handleClick(e) {
  routeTo({ url: '/pages-sub/examination/index', data: { cMode: e } })
}
function login() {
  routeTo({ url: '/pages/login/index' })
}
function onChange(e) {
  console.log(e)
}
defineOptions({
  name: 'Home',
})
</script>
<template>
  <wd-swiper :list="swiperList" autoplay :current="0" @click="login" height="120"></wd-swiper>

  <view class="bg-white mt-1">
    <wd-tabs v-model="tab" swipeable>
      <template v-for="(item, index) in list" :key="index">
        <wd-tab :title="item.name">
          <view class="bd-1">
            <wd-row :gutter="10">
              <wd-col :span="8">
                <view v-for="(c, j) in item.conter.left" :key="j" class="py-15px">
                  <view class="mx-auto text-center" @click="handleClick(c.value)">
                    <i :class="`iconfont ${c.icon}`" class="text-30px"></i>
                  </view>
                  <view class="text-center text-xs leading-40px">{{ c.name }}</view>
                </view>
              </wd-col>
              <wd-col :span="8">
                <view class="flex flex-col justify-around gap-10 text-center mt-10">
                  <view v-for="(c, j) in item.conter.center" :key="j">
                    <view
                      class="flex flex-col gap-10px justify-center wh-100 mx-auto text-center py-10px box-border rounded-1000"
                      :class="c.color"
                      @click="handleClick(c.value)"
                    >
                      <view class="font-size-12px color-#fff">{{ c.sName }}</view>
                      <view class="font-size-14px color-#fff">{{ c.name }}</view>
                    </view>
                  </view>
                </view>
              </wd-col>
              <wd-col :span="8">
                <view v-for="(c, j) in item.conter.right" :key="j" class="py-15px">
                  <view class="mx-auto text-center" @click="handleClick(c.value)">
                    <i :class="`iconfont ${c.icon}`" class="text-30px"></i>
                  </view>
                  <view class="text-center text-xs leading-40px">{{ c.name }}</view>
                </view>
              </wd-col>
            </wd-row>
          </view>
        </wd-tab>
      </template>
    </wd-tabs>
  </view>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="pb-10px">
    <wd-cell-group title="学习讲堂" value="更多"></wd-cell-group>
    <scroll-view scroll-x class="whitespace-nowrap py-10px w-100% px-20px">
      <view class="inline-block w-160px h-90px bg-bluegray text-center rounded-4 mr-10px">
        <view class="font-bold color-white font-size-16px line-height-40px">安全教育知识</view>
      </view>
      <view class="inline-block w-160px h-90px bg-bluegray text-center rounded-4 mr-10px">
        <view class="font-bold color-white font-size-16px line-height-40px">安全教育知识</view>
      </view>
      <view class="inline-block w-160px h-90px bg-bluegray text-center rounded-4 mr-10px">
        <view class="font-bold color-white font-size-16px line-height-40px">安全教育知识</view>
      </view>
    </scroll-view>
  </view>

  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="py-10px text-center color-coolgray font-size-12px">技术支持: 甘肃数嘉年科技</view>
</template>
<style></style>

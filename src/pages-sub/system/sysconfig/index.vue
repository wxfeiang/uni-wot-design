<route lang="json5" type="page">
{
  needLogin: true,
  style: {
    navigationBarTitleText: '设置',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import about from '../static/images/about.png'
import shezhi from '../static/images/shezhi.png'
const setInfo = ref([
  {
    name: '小程序免密登录',
    icon: shezhi,
    islink: true,
    url: '/pages-sub/system/sysconfig/setting',
  },
  // {
  //   name: '隐私政策',
  //   icon: yinsi,
  //   islink: true,
  //   articleId: '111',
  //   url: '/pages-sub/webView/index',
  // },

  // {
  //   name: '用户协议',
  //   icon: yonghu,
  //   islink: true,
  //   articleId: '111',
  //   url: '/pages-sub/webView/index',
  // },
  {
    name: '关于我们',
    icon: about,
    value: 'v1.0.0',
    islink: false,
  },
])
const itemClick = (item: any) => {
  if (item.islink) {
    routeTo({
      url: item.url,
      data: { type: item.articleId },
    })
  }
}
</script>

<template>
  <view class="p-10px bg-#f5f5f5">
    <view class="rounded-10px overflow-hidden">
      <wd-cell-group border>
        <template v-for="(item, index) in setInfo" :key="index">
          <wd-cell :title="item.name" :is-link="item.islink" clickable @click="itemClick(item)">
            <template #icon v-if="item.icon">
              <view class="mr-10px">
                <wd-img width="24" height="24" :src="item.icon"></wd-img>
              </view>
            </template>
            <template #title v-if="item.name">
              <view class="color-#999">
                {{ item.name }}
              </view>
            </template>

            <view class="color-#999" v-if="item.value">
              {{ item.value }}
            </view>
          </wd-cell>
        </template>
      </wd-cell-group>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

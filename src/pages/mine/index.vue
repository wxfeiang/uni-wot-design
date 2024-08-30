<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import anvter from '@/static/images/mine/anvter.png'
import anvter1 from '@/static/images/mine/anvter1.png'
import imgUrl from '@/static/images/mine/bg.png'
import h0 from '@/static/images/mine/h0.png'
import h1 from '@/static/images/mine/h1.png'
import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
import { pathToBase64 } from 'image-tools'
import { storeToRefs } from 'pinia'
import { useMessage, useToast } from 'wot-design-uni'

import useInfo from './utils/useInfo'
const { VITE_APP_LOGOTITLE } = import.meta.env
const { navTop } = useNav()

const { LogOut, loading, serveList, serveClick } = useInfo()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
function login() {
  routeTo({ url: '/pages/login/index' })
}
const toast = useToast()
function logoutCimfirm() {
  message
    .confirm({
      msg: '确定退出系统吗？',
      title: '提示',
    })
    .then(() => {
      LogOut()
    })
}

const bgUrlBase64 = ref()

onLoad(async () => {
  // 设置背景图片
  bgUrlBase64.value = await pathToBase64(imgUrl)
})

const acton = (item) => {
  if (item.url) {
    routeTo({ url: '/pages-sub/system/sysconfig/index' })
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}
</script>

<template>
  <view
    class="px-15px box-border bg-cover h-235px"
    :style="`padding-top:${navTop}px ;background-image: url(${bgUrlBase64})`"
  >
    <view>{{ VITE_APP_LOGOTITLE }}</view>
    <view class="mt-35px">
      <view class="flex justify-between items-center">
        <view class="flex items-center gap-20px">
          <template v-if="isLogined">
            <view class="flex gap-15px items-center">
              <view>
                <view class="p-5px rounded-50% size-64px">
                  <wd-img :width="60" :height="60" :src="anvter1" round />
                </view>

                <view
                  class="flex items-center mt-[-15px] relative z-9 pl-10px"
                  v-if="userInfo.cardType === '3'"
                >
                  <wd-img :src="h1" width="22" height="18"></wd-img>
                  <view
                    class="color-#fff text-10px text-center h-bg rounded-100 px-10px ml-[-10px] mt-2px"
                  >
                    已申领
                  </view>
                </view>
                <view class="flex items-center mt-[-15px] relative z-9 pl-10px" v-else>
                  <wd-img :src="h0" width="22" height="18"></wd-img>
                  <view
                    class="color-#fff text-10px text-center bg-#ccc rounded-100 px-10px ml-[-10px] mt-2px"
                  >
                    未申领
                  </view>
                </view>
              </view>
              <view>
                <view class="font-size-20px font-medium">
                  {{ isLogined ? userInfo.userName : '立即登录' }}
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <view class="p-10px bg-#fff rounded-50% size-60px">
              <wd-img :width="60" :height="60" :src="anvter" round />
            </view>
            <view @click="login" class="flex gap-5px">
              <view class="font-bold color-#fff">立即登录</view>
            </view>
          </template>
        </view>
        <view
          class="qiandao flex items-center gap-5px justify-center line-height-32px color-#fff font-size-14px"
          @click="acton"
        >
          <i class="iconfont xa-jinbi2 text-20px"></i>
          <text>签到</text>
        </view>
      </view>
    </view>
  </view>
  <view class="bg-#fff overflow-hidden bg-cell mt-[-20px] py-10px">
    <view class="px-5px">
      <wd-cell-group border>
        <wd-cell
          :is-link="item.islink"
          custom-class="custom-class-mine-cell"
          v-for="(item, index) in serveList"
          :key="index"
          clickable
          @click="serveClick(item)"
        >
          <template #icon>
            <wd-img :src="item.icon" width="28" height="28px"></wd-img>
          </template>
          <template #title>
            <view class="ml-10px">{{ item.title }}</view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
  <view class="fixed bottom-55px left-0 right-0">
    <view class="px-10" v-if="isLogined">
      <wd-button block plain @click="logoutCimfirm" custom-class="custom-class-mine-login">
        退出登录
      </wd-button>
    </view>

    <view class="px-10" v-else>
      <wd-button block plain hairline @click="login" custom-class="custom-class-mine-login">
        立即登录
      </wd-button>
    </view>
  </view>
</template>

<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.dy-bg {
  background: rgb(204 204 204 / 0.5);
}
.qiandao {
  width: 82px;
  height: 32px;
  background: linear-gradient(270deg, #99c7f2 0%, #71a2fb 100%);
  border-radius: 19px;
}

.bg {
  background-repeat: no-repeat;
  background-size: contain;
}
.h-bg {
  background: linear-gradient(90deg, #a4e3fa 0%, #4bbefd 100%);
}
:deep(.custom-class-mine-login) {
  color: #fff !important;
  background: linear-gradient(90deg, #72c2fe 0%, #4055fe 100%) !important;
  border: none !important;
  border-radius: 6px !important;
}
.bg-cell {
  border-radius: 25px 25px 0 0;
  box-shadow: 0px -5px 10px 1px rgba(56, 113, 241, 0.11);
}
:deep(.custom-class-mine-cell) {
  .wd-cell__left {
    @apply items-center!;
  }
  .wd-cell__wrapper {
    @apply pr-5px!;
  }
}
</style>

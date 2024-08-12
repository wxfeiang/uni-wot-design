<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import useInfo from './hooks/useInfo'

import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'
const anvter = ref(
  'https://img.zcool.cn/community/01c39c5bada9dda8012099c89a96f0.jpg@1280w_1l_2o_100sh.jpg',
)
const { setInfo, LogOut, loading } = useInfo()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
function login() {
  routeTo({ url: '/pages/login/index' })
}
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
function topAction() {
  console.log('🍬------')
}

const { safeAreaInsets } = uni.getSystemInfoSync()

const navtop = ref(0)
navtop.value = safeAreaInsets.top + 44
console.log('🍏', navtop.value)
</script>
<template>
  <!-- 顶部 -->
  <view class="py-20px bg-#4689fd" :style="`padding-top:${navtop}px`">
    <view class="text-center color-#fff">我的</view>
    <view class="p-20px">
      <view class="flex items-center gap-15px">
        <template v-if="isLogined">
          <view class="p-5px bg-#fff rounded-50% size-70px">
            <wd-img :width="70" :height="70" :src="userInfo.avatar" round />
          </view>

          <view>
            <view class="font-bold color-#fff">{{ 'ss' }}</view>
          </view>
        </template>
        <template v-else>
          <view class="p-5px bg-#fff rounded-50% size-70px">
            <wd-img :width="70" :height="70" :src="anvter" round />
          </view>
          <view @click="login">
            <view class="font-bold color-#fff">未登录</view>
          </view>
        </template>
      </view>
    </view>
  </view>

  <wd-gap bg-color="#F3F7F8"></wd-gap>
  <view class="p-10px bg-#f5f5f5">
    <view class="rounded-10px overflow-hidden">
      <wd-cell-group border>
        <template v-for="(item, index) in setInfo" :key="index">
          <wd-cell :title="item.name" is-link>
            <template #icon v-if="item.icon">
              <view class="mr-10px">
                <wd-icon name="setting1" size="22px" color="#4689fd"></wd-icon>
              </view>
            </template>
            <view class="color-#999">
              {{ item.rightValue }}
            </view>
          </wd-cell>
        </template>
      </wd-cell-group>
    </view>
  </view>

  <wd-gap bg-color="#F3F7F8"></wd-gap>
  <template v-if="isLogined">
    <view class="px-10">
      <wd-button block :round="false" plain @click="logoutCimfirm">退出登录</wd-button>
    </view>
    <wd-gap bg-color="#F3F7F8"></wd-gap>
  </template>
  <template v-else>
    <view class="fixed bottom-10 left-0 right-0">
      <view class="px-10">
        <wd-button block :round="false" plain hairline @click="login">立即登录</wd-button>
      </view>
    </view>
  </template>
</template>

<style>
page {
  background: #f5f5f5;
}
</style>

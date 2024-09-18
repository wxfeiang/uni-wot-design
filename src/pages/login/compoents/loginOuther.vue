<script lang="ts" setup>
import sfz from '@/static/images/login/sfz.png'
import shuzi from '@/static/images/login/shuzi.png'
import useLogin from '../utils/useLogin'

const { shuziLogin, goSfzLogin } = useLogin()
</script>

<template>
  <view class="left-0 right-0">
    <wd-divider>更多登录方式</wd-divider>
    <view class="flex justify-center items-center gap-20px mt-10px">
      <view class="flex flex-col items-center">
        <wd-button type="text" size="large" custom-class="custom-class-ftn" @click="goSfzLogin">
          <wd-img width="33" height="33" :src="sfz"></wd-img>
        </wd-button>
        <view class="font-size-12px mt-5px color-#666">身份证登录</view>
      </view>
      <view class="flex flex-col items-center">
        <wd-button type="text" size="large" custom-class="custom-class-ftn" @click="shuziLogin">
          <wd-img width="33" height="33" :src="shuzi"></wd-img>
        </wd-button>
        <view class="font-size-12px mt-5px color-#666">数字身份</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useLogin from './utils/useLogin'
import { routeTo } from '@/utils'
const { model, rules, loading, toRegister } = useLogin()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')

function toLogin() {
  routeTo({ url: '/pages/login/index' })
}
</script>

<template>
  <view class="h-150px top pt-20px box-border">
    <view class="flex justify-center">
      <wd-img :width="100" :height="100" :src="logo" round enable-preview />
    </view>
  </view>
  <view class="px-30px py-10px mt-20px">
    <wd-form ref="form" :model="model">
      <view class="py-10px mb-10px">
        <view class="my-5px color-red">账号</view>
        <wd-input
          type="text"
          v-model="model.username"
          placeholder="手机号/邮箱"
          :rules="rules.username"
          prop="username"
        />
      </view>
      <view class="py-10px mb-20px">
        <view class="my-5px color-red">密码</view>
        <wd-input
          type="password"
          v-model="model.password"
          show-password
          placeholder="6-15数字字母组合密码"
          :rules="rules.password"
          prop="password"
        />
      </view>

      <view>
        <wd-button type="error" size="medium" @click="toRegister(form)" block :loading="loading">
          立 即 注 册
        </wd-button>
        <view class="mt-16px font-size-12px text-center color-coolgray">
          点击注册代表您阅读并同意了
          <text class="color-red">用户协议</text>
        </view>
      </view>

      <view class="fixed bottom-0 left-0 right-0 flex justify-center">
        <wd-button type="text">
          已有账号？
          <text class="color-red" @click="toLogin">去登录</text>
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped>
.top {
  clip-path: inset(0% 0% 10% 0% round 0% 0 44% 44%);
  background-image: linear-gradient(to bottom, rgb(235, 26, 22), rgb(247, 119, 110));
}
</style>

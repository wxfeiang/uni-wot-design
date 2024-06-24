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
const { toLogin, model, rules, loading } = useLogin()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')
</script>

<template>
  <view class="h-220px top pt-60px box-border">
    <view class="flex justify-center">
      <wd-img :width="100" :height="100" :src="logo" round enable-preview />
    </view>
  </view>
  <view class="px-30px py-10px mt-30px">
    <wd-form ref="form" :model="model">
      <view class="py-10px mb-20px">
        <view class="my-5px color-blue">账号</view>
        <wd-input
          type="text"
          v-model="model.username"
          placeholder="请输入用户名"
          :rules="rules.username"
          clearable
          prop="username"
        />
      </view>
      <view class="py-10px mb-20px">
        <view class="my-5px color-blue">密码</view>
        <wd-input
          type="password"
          v-model="model.password"
          show-password
          placeholder="请输入密码"
          :rules="rules.password"
          clearable
          prop="password"
        />
      </view>
      <view class="footer">
        <wd-button type="primary" size="large" @click="toLogin(form)" block :loading="loading">
          登 录
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped>
.top {
  clip-path: inset(0% 0% 2% 0% round 0% 0 50% 50%);
  background-image: linear-gradient(to bottom, rgb(110, 163, 247), rgb(22, 104, 235));
}
</style>
s

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
const { Login, model, rules, read } = useLogin()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')

const otherLogins = ref([
  {
    icon: 'i-carbon:logo-wechat',
    name: '微信',
    color: '#00c800',
  },
  {
    icon: 'fa6-brands:qq',
    name: 'QQ',
    color: '#4980ff',
  },
  {
    icon: 'i-carbon:email',
    name: '邮箱',
    color: '#e6162d',
  },
])
const bTitle = ref('在线考试')
const sTitle = ref('登录')
</script>
<template>
  <view class="h-40 top pt-8 box-border">
    <view class="flex justify-center">
      <wd-img :width="100" :height="100" :src="logo" round enable-preview />
    </view>
    <view>
      <view>{{ bTitle }}</view>
      <view>{{ sTitle }}</view>
    </view>
  </view>
  <view class="px-30px py-10px mt-4.5">
    <wd-form ref="form" :model="model">
      <view class="py-10px mb-2">
        <view class="my-5px color-#000000">账号</view>
        <wd-input
          type="text"
          v-model="model.username"
          placeholder="请输入手机号/邮箱"
          :rules="rules.username"
          prop="username"
        />
      </view>
      <view class="py-2 mb-5">
        <view class="my-5px color-#000000">密码</view>
        <wd-input
          type="text"
          v-model="model.password"
          show-password
          placeholder="请输入密码"
          :rules="rules.password"
          prop="password"
        />
      </view>

      <view>
        <wd-button type="primary" size="medium" @click="Login(form)" block>登 录</wd-button>

        <view class="mt-10px">
          <view class="">
            <wd-checkbox v-model="read" prop="read" custom-label-class="label-class">
              已阅读并同意
              <text class="color-#336EFD">《在线考试及相关授权》</text>
              <text class="color-#336EFD">《在线考试及相关授权》</text>
            </wd-checkbox>
          </view>
        </view>
      </view>
    </wd-form>

    <view class="mt-8">
      <wd-divider>更多登录方式</wd-divider>
      <view class="flex justify-center items-center mt-20px gap-10px">
        <view
          v-for="(item, index) in otherLogins"
          :key="index"
          :class="item.icon"
          class="color-#336EFD font-size-20px"
        />
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
:deep(.label-class),
:deep(.text-btn) {
  font-size: 12px !important;
  color: #999 !important;
}
</style>

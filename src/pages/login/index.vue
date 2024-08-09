<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
    'mp-alipay': {
      transparentTitle: 'always',
      titlePenetrate: 'YES',
    },
  },
}
</route>
<script lang="ts" setup>
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { routeTo } from '@/utils'
import useLogin from './utils/useLogin'
const { Login, model, rules, read } = useLogin()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')

const to = () => {
  routeTo({ url: '/pages/aa/index', navType: NAVIGATE_TYPE.NAVIGATE_TO })
}

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
const toRegister = () => {
  console.log('🍯')
}
</script>
<template>
  <view class="h-40 top pt-8 box-border">
    <view class="flex justify-center">
      <wd-img :width="100" :height="100" :src="logo" round enable-preview />
    </view>
  </view>
  <view class="px-30px py-10px mt-4.5">
    <wd-form ref="form" :model="model">
      <view class="py-10px mb-2">
        <view class="my-5px color-blue">账号</view>
        <wd-input
          type="text"
          v-model="model.na"
          placeholder="请输入手机号/邮箱"
          :rules="rules.na"
          prop="na"
        />
      </view>
      <view class="py-2 mb-5">
        <view class="my-5px color-blue">密码</view>
        <wd-input
          type="text"
          v-model="model.ps"
          show-password
          placeholder="请输入密码"
          :rules="rules.ps"
          prop="ps"
        />
      </view>
      <view class="py-2 mb-5">
        <view class="my-5px color-blue">验证码</view>
        <wd-input
          type="text"
          v-model="model.co"
          placeholder="请输入验证码"
          :rules="rules.co"
          use-suffix-slot
          prop="co"
          :maxlength="4"
        >
          <template #suffix>
            <dy-verify />
          </template>
        </wd-input>
      </view>

      <view>
        <wd-button type="primary" size="medium" @click="Login(form)" block>登 录</wd-button>
        <view class="mt-4 color-gray text-center font-size-12px">
          <wd-button type="text" custom-class="text-btn" @click="toRegister">立即注册</wd-button>
          <text class="mx-10px">|</text>
          <wd-button type="text" custom-class="text-btn">忘记密码</wd-button>
        </view>
      </view>

      <view class="mt-8">
        <wd-divider>其他登录方式</wd-divider>
        <view class="flex justify-center items-center mt-20px gap-10px">
          <view
            v-for="(item, index) in otherLogins"
            :key="index"
            :class="item.icon"
            class="color-#4d80f0 font-size-20px"
            @click="to"
          />
        </view>
      </view>

      <view class="fixed bottom-3 left-0 right-0">
        <view class="px-8 py-1">
          <wd-checkbox v-model="read" prop="read" custom-label-class="label-class">
            已阅读并同意
            <text class="color-#4d80f0">《在线考试及相关授权》</text>
          </wd-checkbox>
        </view>
      </view>
    </wd-form>
  </view>
</template>
<style lang="scss" scoped>
.top {
  clip-path: inset(0% 0% 10% 0% round 0% 0 44% 44%);
  background-image: linear-gradient(to bottom, rgb(22, 104, 235), rgb(110, 163, 247));
}
:deep(.label-class),
:deep(.text-btn) {
  font-size: 12px !important;
  color: #999 !important;
}
</style>

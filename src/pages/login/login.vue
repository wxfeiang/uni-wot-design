<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import bg0 from '@/static/images/login/bg1.png'
import bg1 from '@/static/images/login/bg2.png'
import logo from '@/static/images/login/logo.png'
import topbg from '@/static/images/login/topbg.png'
import { pathToBase64 } from 'image-tools'
import useLogin from './utils/useLogin'

const { Login, model, rules, read } = useLogin()
const form = ref(null)

const topbgBase64 = ref('')
const bg0Base64 = ref('')
const bg1Base64 = ref('')
const { safeAreaInsets } = uni.getSystemInfoSync()

const navtop = ref(0)
navtop.value = safeAreaInsets.top + 44

onLoad(async () => {
  // 设置背景图片
  topbgBase64.value = await pathToBase64(topbg)
  bg0Base64.value = await pathToBase64(bg0)
  bg1Base64.value = await pathToBase64(bg1)
})
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
const bTitle = ref('欢迎登录雄安一卡通')
const sTitle = ref('一卡在手，生活无忧')

const tbBg = ref(bg0)
const tab = ref<number>(0)
function tabChange(event) {
  if (event.index === 0) {
    tbBg.value = bg0
  } else {
    tbBg.value = bg1
  }
}
</script>
<template>
  <view
    class="h-285px bg-cover"
    :style="`padding-top:${navtop}px ;background-image: url(${topbgBase64})`"
  >
    <view class="flex justify-center">
      <wd-img :width="54" :height="54" :src="logo" round />
    </view>
    <view class="text-center mt-20px color-#fff">
      <view class="font-size-22px font-medium">{{ bTitle }}</view>
      <view class="font-size-14px mt-10px font-normal">{{ sTitle }}</view>
    </view>
  </view>
  <view class="h-500px bg-cover mt-[-50px]" :style="`background-image: url(${tbBg})`">
    <wd-tabs v-model="tab" custom-class="custom-class-tab" @change="tabChange">
      <wd-tab title="身份证登录">
        <view class="px-30px pt-20px">
          <wd-form ref="form" :model="model">
            <view class="py-10px mb-2">
              <view class="my-5px color-#000000">姓名</view>
              <wd-input
                type="text"
                v-model="model.username"
                placeholder="请输入手机号/邮箱"
                :rules="rules.username"
                prop="username"
              />
            </view>
            <view class="py-2 mb-5">
              <view class="my-5px color-#000000">身份证</view>
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
        </view>
      </wd-tab>
      <wd-tab title="验证码登录">
        <view class="px-30px pt-20px">
          <wd-form ref="form" :model="model">
            <view class="py-10px mb-2">
              <view class="my-5px color-#000000">手机号</view>
              <wd-input
                type="text"
                v-model="model.username"
                placeholder="请输入手机号/邮箱"
                :rules="rules.username"
                prop="username"
              />
            </view>
            <view class="py-2 mb-5">
              <view class="my-5px color-#000000">验证码</view>
              <wd-input
                type="text"
                v-model="model.password"
                show-password
                placeholder="请输入验证码"
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
        </view>
      </wd-tab>
    </wd-tabs>

    <view class="fixed bottom-60px left-0 right-0">
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
:deep(.custom-class-tab),
:deep(.wd-tabs__nav) {
  @apply bg-transparent!;
}
:deep(.wd-tabs__nav-item.is-active) {
  @apply color-#fff !important;
}
</style>

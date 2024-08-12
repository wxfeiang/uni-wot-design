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
const { Login, model, rules, read, loading } = useLogin()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')

const to = () => {
  routeTo({ url: '/pages/aa/index', navType: NAVIGATE_TYPE.NAVIGATE_TO })
}

function toAgereement(type) {
  routeTo({ url: '/pages-sub/components/webView/index', data: { type } })
}
function handleClickLeft() {
  uni.navigateBack()
}
</script>
<template>
  <view class="top">
    <wd-navbar
      safeAreaInsetTop
      rightDisabled
      placeholder
      leftArrow
      fixed
      :bordered="false"
      title="实名认证"
      custom-class="nav_bg"
    >
      <template #left>
        <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
      </template>
    </wd-navbar>
    <view class="mt-40px px-30px">
      <view class="color-#fff font-size-20px line-height-40px">登录实名认证</view>
      <view class="color-#f3f3f3 font-size-16px line-height-30px">提升账号安全,保障合法权益</view>
    </view>

    <view class="p-30px">
      <view class="pb-100px rounded-10px overflow-hidden bg-#fff">
        <view class="text-center line-height-50px bg-#f3f3f3f3">使用有效身份证件信息认证</view>
        <view class="py-10px bg-#fff">
          <wd-form ref="form" :model="model">
            <wd-cell-group border>
              <wd-input
                label="身份证号码:"
                label-width="100px"
                type="text"
                v-model="model.username"
                placeholder="请输入身份证号码"
                :rules="rules.username"
                prop="username"
                custom-input-class="custom-input-right"
                :maxlength="18"
                :mixlength="16"
              />

              <wd-input
                label="姓名:"
                label-width="100px"
                type="text"
                v-model="model.password"
                placeholder="请输入姓名"
                :rules="rules.password"
                prop="password"
                custom-input-class="custom-input-right"
              />
            </wd-cell-group>
          </wd-form>
        </view>
        <view class="mt-20px px-25px">
          <wd-button
            type="primary"
            :round="false"
            size="medium"
            @click="Login(form)"
            block
            :loading="loading"
          >
            查 询
          </wd-button>
        </view>
      </view>
    </view>
  </view>
</template>
<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.top {
  background-image: linear-gradient(to bottom, #4689fd, rgb(110, 163, 247));
}
:deep(.nav_bg) {
  background-color: #4689fd;
  .wd-navbar__title {
    color: var(--color-nav-text);
  }
  .wd-navbar__left {
    color: var(--color-nav-text);
  }
}
:deep(.label-class),
:deep(.text-btn) {
  font-size: 12px !important;
  color: #999 !important;
}
:deep(.wd-input__error-message),
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}
</style>

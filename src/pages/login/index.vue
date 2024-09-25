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
import logoTitle from '@/static/images/login/logoTitle.png'

import logo from '@/static/images/logo.png'
import { useMessage } from 'wot-design-uni'
import loginOuther from './components/loginOuther.vue'
import useLogin from './utils/useLogin'
const {
  Login,

  read,

  submitPhoneLogin,
  shuziLogin,
  getphonenumberLogin,
  goPhoneLogin,
  toAgreement,
} = useLogin()
const form = ref(null)
const form2 = ref(null)

const message = useMessage('wd-message-box-slot')

const unifiedLogin = (type: number, $event?: any) => {
  if (read.value) {
    readChange(type)
  } else {
    message.confirm({
      title: '提示',
    })
  }
}

function cancel() {
  message.close()
}
function getphonenumber(e) {
  cancel()
  read.value = true
  getphonenumberLogin(e)
}

const readChange = (type: number) => {
  if (type === 0) {
    Login(form.value)
  } else if (type === 1) {
    submitPhoneLogin(form2.value)
  } else if (type === 2) {
    shuziLogin()
  } else if (type === 3) {
    console.log('🥔 wxchart')
  }
}
</script>
<template>
  <view class="w-100vw h-100vh flex flex-col justify-around">
    <view class="mt-18%">
      <view class="flex justify-center">
        <wd-img :width="97" :height="97" :src="logo" round />
      </view>
      <view class="flex justify-center mt-20px">
        <wd-img :width="316" :height="54" :src="logoTitle" />
      </view>
      <view class="mt-30px">
        <view class="px-10 mt-20px">
          <wd-button
            v-if="read"
            block
            open-type="getPhoneNumber"
            @getphonenumber="getphonenumber"
            custom-class="custom-class-mine-login"
          >
            微信快捷登录
          </wd-button>
          <wd-button v-else block custom-class="custom-class-mine-login" @click="unifiedLogin(3)">
            微信快捷登录
          </wd-button>
        </view>

        <view class="px-10 mt-20px">
          <wd-button
            block
            plain
            hairline
            custom-class="custom-class-mine-login2"
            @click="goPhoneLogin"
          >
            手机验证码登录
          </wd-button>
        </view>
        <view class="px-10 mt-15px">
          <view class="flex gap-10px">
            <wd-checkbox v-model="read" prop="read" custom-label-class="label-class"></wd-checkbox>
            <view class="text-12px color-#A6A6A6">
              <text @click="read = !read">未注册账号验证后自动注册并登录，登录即表示 同意</text>
              <text
                class="color-#336EFD"
                @click.stop="toAgreement('1710488285782016005', '隐私政策')"
              >
                《隐私政策》、
              </text>
              <text
                class="color-#336EFD"
                @click.stop="toAgreement('1710488285782016006', '用户协议')"
              >
                《用户协议》
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <login-Outher></login-Outher>
  </view>

  <wd-message-box selector="wd-message-box-slot" custom-class="custom-class-mes">
    <view class="text-left">
      我已阅读并同意
      <text class="color-#336EFD" @click.stop="toAgreement('1710488285782016005', '隐私政策')">
        《隐私政策》
      </text>
      <text class="color-#336EFD" @click.stop="toAgreement('1710488285782016006', '用户协议')">
        《用户协议》
      </text>
    </view>
    <view class="flex justify-around items-center py-20px">
      <view class="flex-1">
        <wd-button type="info" @click="cancel">取消</wd-button>
      </view>
      <view class="flex-1">
        <wd-button open-type="getPhoneNumber" @getphonenumber="getphonenumber">我同意</wd-button>
      </view>
    </view>
  </wd-message-box>
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
:deep(.wd-tabs__nav-item) {
  @apply color-[#fff]! bg-#3177f6!;
}
:deep(.wd-tabs__nav-item.is-active) {
  @apply color-[#000]! bg-#fff!;
}
:deep(.wd-input) {
  @apply bg-transparent!;
}
:deep(.wd-tabs__line) {
  @apply hidden!;
}
:deep(.wd-img) {
  vertical-align: middle !important;
}
:deep(.custom-class-ftn) {
  margin: 0 !important;
}
:deep(.custom-class-mes) {
  .wd-message-box__actions {
    @apply hidden;
  }
}
</style>

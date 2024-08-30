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
import logo from '@/static/images/login/logo.png'
import logoTitle from '@/static/images/login/logoTitle.png'
import sfz from '@/static/images/login/sfz.png'
import shuzi from '@/static/images/login/shuzi.png'
import { routeTo } from '@/utils'
import { useMessage } from 'wot-design-uni'
import useLogin from './utils/useLogin'

const {
  Login,
  model,
  rules,
  read,
  model2,
  rules2,
  getCodeUrl,
  codeflog,
  submitPhoneCode,
  countdown,
  sending,
  submitPhoneLogin,
  shuziLogin,
  getphonenumber,
} = useLogin()
const form = ref(null)
const form2 = ref(null)
const { navTop } = useNav()

const bTitle = ref('欢迎登录雄安一卡通')
const sTitle = ref('一卡在手，生活无忧')

const tab = ref<number>(0)
function tabChange(event) {
  console.log('🥘[event]:', event)
  if (event.index === 0) {
    // tbBg.value = bg0
  } else {
    // tbBg.value = bg1
    getCodeUrl()
  }
}
const toAgreement = (articleId: string, title: string) => {
  console.log('🍤[item]:')
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: articleId, showTop: true, title },
  })
}
const message = useMessage('wd-message-box-slot')
const unifiedLogin = (type: number, $event?: any) => {
  if (read.value) {
    readChange(type)
  } else {
    message
      .confirm({
        title: '提示',
      })
      .then(() => {
        read.value = true
        readChange(type)
      })
      .catch((error) => {
        console.log(error)
        read.value = false
      })
  }
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
  <view class="bg-cover relative bg-#fff" :style="`padding-top:${navTop + 40}px`">
    <view class="flex justify-center">
      <wd-img :width="97" :height="97" :src="logo" round />
    </view>
    <view class="flex justify-center mt-20px">
      <wd-img :width="316" :height="54" :src="logoTitle" />
    </view>
  </view>

  <view class="mt-30px">
    <view class="px-10 mt-20px">
      <wd-button
        block
        open-type="getPhoneNumber"
        @getphonenumber="getphonenumber"
        custom-class="custom-class-mine-login"
      >
        微信快捷登录
      </wd-button>
    </view>

    <view class="px-10 mt-20px">
      <wd-button block plain hairline custom-class="custom-class-mine-login2">
        手机验证码登录
      </wd-button>
    </view>
    <view class="px-10 mt-15px">
      <view class="flex gap-10px">
        <wd-checkbox v-model="read" prop="read" custom-label-class="label-class"></wd-checkbox>
        <view class="text-12px color-#A6A6A6">
          <text @click="read = !read">未注册账号验证后自动注册并登录，登录即表示 同意</text>
          <text class="color-#336EFD" @click.stop="toAgreement('1710488285782016005', '隐私政策')">
            《隐私政策》、
          </text>
          <text class="color-#336EFD" @click.stop="toAgreement('1710488285782016006', '用户协议')">
            《用户协议》
          </text>
        </view>
      </view>
    </view>
  </view>

  <view class="fixed bottom-20px left-0 right-0">
    <wd-divider>更多登录方式</wd-divider>
    <view class="flex justify-center items-center gap-20px mt-10px">
      <view class="flex flex-col items-center">
        <wd-button
          type="text"
          size="large"
          custom-class="custom-class-ftn"
          @click="unifiedLogin(3)"
        >
          <wd-img width="33" height="33" :src="sfz"></wd-img>
        </wd-button>
        <view class="font-size-12px mt-[-5px] color-#666">身份证登录</view>
      </view>
      <view class="flex flex-col items-center">
        <wd-button type="text" size="large" custom-class="custom-class-ftn" @click="shuziLogin">
          <wd-img width="33" height="33" :src="shuzi"></wd-img>
        </wd-button>
        <view class="font-size-12px mt-[-5px] color-#666">数字身份</view>
      </view>
    </view>
  </view>
  <wd-message-box selector="wd-message-box-slot">
    <view class="text-left">
      我已阅读并同意
      <text class="color-#336EFD" @click.stop="toAgreement('1710488285782016005', '隐私政策')">
        《隐私政策》
      </text>
      <text class="color-#336EFD" @click.stop="toAgreement('1710488285782016006', '用户协议')">
        《用户协议》
      </text>
    </view>
  </wd-message-box>
</template>
<style lang="scss" scoped>
:deep(.custom-class-mine-login) {
  color: #fff !important;
  background: linear-gradient(90deg, #72c2fe 0%, #4055fe 100%) !important;
  border: none !important;
  border-radius: 6px !important;
}

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
</style>

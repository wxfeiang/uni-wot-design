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
import bg0 from '@/static/images/login/bg1.png'
import bg1 from '@/static/images/login/bg2.png'
import logo from '@/static/images/login/logo.png'
import shuzi from '@/static/images/login/shuzi.png'
import topbg from '@/static/images/login/topbg.png'
import weixin from '@/static/images/login/weixin.png'
import { routeTo } from '@/utils'
import { pathToBase64 } from 'image-tools'
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
])
const bTitle = ref('欢迎登录雄安一卡通')
const sTitle = ref('一卡在手，生活无忧')

const tbBg = ref(bg0)
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
  <view
    class="h-285rpx bg-cover relative"
    :style="`padding-top:${navtop}px ;background-image: url(${topbgBase64})`"
  >
    <view class="flex justify-center">
      <wd-img :width="54" :height="54" :src="logo" round />
    </view>
    <view class="text-center mt-20rpx color-#fff">
      <view class="font-size-22px font-medium">{{ bTitle }}</view>
      <view class="font-size-14px mt-10rpx font-normal">{{ sTitle }}</view>
    </view>
  </view>
  <!-- <view
    class="h-300rpx bg-cover mt-[-50rpx] relative z-10"
    :style="`background-image: url(${bg0})`"
    v-if="tab === 0"
  ></view>
  <view
    class="h-300rpx bg-cover mt-[-50rpx] relative z-10"
    :style="`background-image: url(${bg1})`"
    v-else
  ></view> -->

  <view class="h-300rpx bg-cover relative z-10">
    <wd-tabs v-model="tab" custom-class="custom-class-tab" @change="tabChange">
      <wd-tab title="身份证登录">
        <view class="px-30px pt-20px">
          <wd-form ref="form" :model="model">
            <view class="py-5px mb-2">
              <view class="my-2px color-#000000">姓名</view>
              <wd-input
                type="text"
                v-model="model.username"
                placeholder="请输入姓名"
                :rules="rules.username"
                prop="username"
              />
            </view>
            <view class="py-2 mb-5">
              <view class="my-2px color-#000000">身份证号</view>
              <wd-input
                type="text"
                v-model="model.password"
                placeholder="请输入身份证号"
                :rules="rules.password"
                prop="password"
              />
            </view>

            <view>
              <wd-button type="primary" size="medium" @click="unifiedLogin(0)" block>
                登 录
              </wd-button>

              <view class="mt-15px">
                <view class="">
                  <wd-checkbox v-model="read" prop="read" custom-label-class="label-class">
                    已阅读并同意
                    <text
                      class="color-#336EFD"
                      @click.stop="toAgreement('1710488285782016005', '隐私政策')"
                    >
                      《隐私政策》
                    </text>
                    <text
                      class="color-#336EFD"
                      @click.stop="toAgreement('1710488285782016006', '用户协议')"
                    >
                      《用户协议》
                    </text>
                  </wd-checkbox>
                </view>
              </view>
            </view>
          </wd-form>
        </view>
      </wd-tab>
      <wd-tab title="验证码登录">
        <view class="px-30px pt-15px">
          <wd-form ref="form2" :model="model2">
            <view class="py-5px mb-2">
              <view class="my-2px color-#000000">手机号</view>
              <wd-input
                type="text"
                v-model="model2.phone"
                placeholder="请输入手机号"
                :rules="rules2.phone"
                prop="phone"
              />
            </view>
            <view class="py-2 mb-2">
              <view class="my-2px color-#000000">验证码</view>
              <wd-input
                type="text"
                v-model="model2.imgcode"
                placeholder="请输入验证码"
                :rules="rules2.imgcode"
                use-suffix-slot
                prop="imgcode"
                :maxlength="4"
              >
                <template #suffix>
                  <dy-verify />
                </template>
              </wd-input>
            </view>

            <view class="py-2 mb-2">
              <view class="my-2px color-#000000">短信验证码</view>
              <wd-input
                type="text"
                v-model="model2.code"
                placeholder="请输入短信验证码"
                :rules="rules2.code"
                prop="code"
                :maxlength="6"
              >
                <template #suffix>
                  <wd-button
                    size="small"
                    plain
                    custom-class="button"
                    :round="false"
                    @click="submitPhoneCode(form2)"
                    :loading="sending"
                    :disabled="sending || countdown > 0"
                  >
                    {{
                      sending ? '发送中...' : countdown > 0 ? `${countdown}S后获取` : '获取验证码'
                    }}
                  </wd-button>
                </template>
              </wd-input>
            </view>

            <view>
              <wd-button type="primary" size="medium" @click="unifiedLogin(1)" block>
                登 录
              </wd-button>
              <view class="mt-15px">
                <view class="">
                  <wd-checkbox v-model="read" prop="read" custom-label-class="label-class">
                    已阅读并同意
                    <text
                      class="color-#336EFD"
                      @click.stop="toAgreement('1710488285782016005', '隐私政策')"
                    >
                      《隐私政策》
                    </text>
                    <text
                      class="color-#336EFD"
                      @click.stop="toAgreement('1710488285782016006', '用户协议')"
                    >
                      《用户协议》
                    </text>
                  </wd-checkbox>
                </view>
              </view>
            </view>
          </wd-form>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
  <view class="fixed bottom-20rpx left-0 right-0">
    <wd-divider>更多登录方式</wd-divider>
    <view class="flex justify-center items-center gap-40px">
      <view class="flex flex-col items-center">
        <wd-button
          type="text"
          @click="unifiedLogin(3)"
          custom-class="custom-class-ftn"
          v-if="!read"
        >
          <wd-img width="26" height="26" :src="weixin"></wd-img>
        </wd-button>

        <wd-button
          type="text"
          v-else
          open-type="getPhoneNumber"
          @getphonenumber="getphonenumber"
          custom-class="custom-class-ftn"
        >
          <wd-img width="26" height="26" :src="weixin"></wd-img>
        </wd-button>
        <view class="font-size-12px">微信</view>
      </view>
      <view class="flex flex-col items-center">
        <wd-button type="text" custom-class="custom-class-ftn" @click="shuziLogin">
          <view class="mr-5px">
            <wd-img width="26" height="26" :src="shuzi"></wd-img>
          </view>
        </wd-button>
        <view class="font-size-12px">数字身份</view>
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

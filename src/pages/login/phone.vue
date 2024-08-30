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
import phone from '@/static/images/login/phone.png'
import sfz from '@/static/images/login/sfz.png'
import shuzi from '@/static/images/login/shuzi.png'
import user from '@/static/images/login/user.png'
import yzm from '@/static/images/login/yzm.png'
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
  <view class="bg-cover relative bg-#fff" :style="`padding-top:${navTop + 30}px`">
    <view class="flex justify-center">
      <wd-img :width="97" :height="97" :src="logo" round />
    </view>
    <view class="flex justify-center mt-20px">
      <wd-img :width="316" :height="54" :src="logoTitle" />
    </view>
  </view>

  <view class="mt-30px">
    <view class="px-30px">
      <wd-form ref="form" :model="model2">
        <wd-cell-group>
          <wd-input
            label-width="100px"
            placeholder="请输入手机号码"
            type="text"
            v-model="model2.phone"
            :rules="rules2.phone"
            prop="phone"
            use-prefix-slot
            custom-class="custom-cell"
            no-border
            clearable
            :maxlength="11"
          >
            <template #prefix>
              <wd-img :src="phone" :width="32" :height="32"></wd-img>
            </template>
          </wd-input>

          <wd-input
            label-width="100px"
            type="text"
            v-model="model2.imgcode"
            placeholder="请输入图形码"
            :rules="rules2.imgcode"
            prop="imgcode"
            use-prefix-slot
            use-suffix-slot
            custom-class="custom-cell"
            no-border
            clearable
            :maxlength="4"
          >
            <template #prefix>
              <wd-img :src="user" :width="32" :height="32"></wd-img>
            </template>

            <template #suffix>
              <dy-verify />
            </template>
          </wd-input>
          <wd-input
            label-width="100px"
            type="text"
            v-model="model2.code"
            placeholder="请输入手机验证码"
            :rules="rules2.code"
            prop="password"
            use-prefix-slot
            use-suffix-slot
            custom-class="custom-cell"
            no-border
            clearable
            :maxlength="4"
          >
            <template #prefix>
              <wd-img :src="yzm" :width="32" :height="32"></wd-img>
            </template>
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
                {{ sending ? '发送中...' : countdown > 0 ? `${countdown}S后获取` : '获取验证码' }}
              </wd-button>
            </template>
          </wd-input>
        </wd-cell-group>
      </wd-form>
      <view class="mt-15px">
        <wd-button block custom-class="custom-class-mine-login">登录</wd-button>
      </view>
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

  <!-- <view class="bg-cover relative z-10">
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
  </view> -->
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
:deep(.custom-cell) {
  @apply bg-#f7f7f7! py-5px! px-5px rounded-6px mb-10px;
}
</style>

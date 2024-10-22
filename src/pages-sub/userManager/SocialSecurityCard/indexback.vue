<route lang="json5" type="page">
{
  layout: 'default',
  realNameAuthentication: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { getGenerate, getQrcodelnit } from '@/service/api/cardServe'
import logo from '@/static/images/sblogo.png'
import { useUserStore } from '@/store'
import { dataDesensitization, getBack, routeTo } from '@/utils'
import { usegetScreenBrightness, useSetKeepScreenOn, useSetScreenBrightness } from '@/utils/uniapi'
import { useRequest } from 'alova/client'
import { useMessage } from 'wot-design-uni'
import stkts from '../static/image/sbkts.png'
const { userInfo } = useUserStore()
const message = useMessage()

const opts = ref({
  lineColor: '#000000',
  fontSize: 20,
  width: 2,
  textMargin: 0,
  text: '',
  value: '',
  displayValue: false,
})
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)

const isNeedPwdValid = ref(false)

const cfig = ref()
cfig.value = {
  logoImage: logo,
  str: '',
  logoWidth: 60,
  logoHeight: 60,
  size: 440,
}

const logcation = ref('')
const user = ref({
  name: userInfo.cardName,
  shbzkh: userInfo.idCardNumber,
})
const show = ref(false)
const textArr = ref([
  '电子社保卡二维码用于身份认证和支付',
  '结算时向商家出示',
  '请不要将二维码及数字发送给他人',
])
const lingdu = ref(0)
const isShow = async () => {
  console.log('🥗')
  routeTo({
    url: '/pages-sub/userManager/SocialSecurityCard/barcode',
    data: { isNeedPwdValid: isNeedPwdValid.value, text: opts.value.text },
  })
  show.value = !show.value
}

const model = ref({
  // aac002: '321087197912280054',
  // aac003: '王冬',
  // deviceId: '',
  aac002: userInfo.idCardNumber,
  aac003: userInfo.cardName,
  deviceId: '',
})

//  验证是否有码
const { send: sendSignValid, loading: LoadingValid } = useRequest((data) => getQrcodelnit(data), {
  immediate: false,
  loading: false,
})
const { send: sendGenerate } = useRequest((data) => getGenerate(data), {
  immediate: false,
  loading: false,
})
const generateCode = async () => {
  countdown.resetTimer()
  try {
    const data: any = await sendGenerate(model.value)
    cfig.value.str = data.qrCode
    logcation.value = data.siRegionName
    opts.value.value = data.qrCode
    opts.value.text = data.qrCode
  } catch (error) {
    console.log('🦑[error]:', error)
  }
}

const countdown = useCountdown(60, (remainingSeconds) => {
  if (remainingSeconds === 0) {
    generateCode()
  }
})

onLoad(async () => {
  try {
    console.log('🎂', userInfo.cardName, model.value)
    const data: any = await sendSignValid(model.value)
    console.log('🍮[data]:', data)
    if (data?.isNeedPwdValid === '0') {
      isNeedPwdValid.value = true
      // 调用二维码展示
      generateCode()
    } else {
      message
        .alert({
          title: '提示',
          msg: data?.msg,
          closeOnClickModal: false,
        })
        .then((res) => {
          getBack()
        })
    }
  } catch (error) {
    message
      .alert({
        title: '提示',
        msg: error?.msg || '服务异常!',
        closeOnClickModal: false,
      })
      .then((res) => {
        getBack()
      })
  }
})
onMounted(async () => {
  lingdu.value = (await usegetScreenBrightness()) as number
  setTimeout(async () => {
    await useSetScreenBrightness(1)
    await useSetKeepScreenOn(true)
  }, 3000)
})
onUnmounted(async () => {
  await useSetKeepScreenOn(false)
  await useSetScreenBrightness(lingdu.value + 0.05)
})
const barodeClick = () => {
  show.value = !show.value
}
</script>

<template>
  <view v-if="!show">
    <view class="back">
      <dy-navbar leftTitle="电子社保卡" left isNavShow></dy-navbar>
      <view class="flex gap-5px items-center justify-center mt-15px">
        <view>
          <wd-img :src="logo" :width="38" :height="38"></wd-img>
        </view>
        <view class="color-#fff font-600">电子社保卡</view>
      </view>
      <view class="color-#fff mt-10px pl-30px line-height-30px">
        <view>姓名:{{ dataDesensitization(user.name, false, 'first') }}</view>
        <view>社会保障号码:{{ dataDesensitization(user.shbzkh, false, 'last') }}</view>
      </view>
      <view class="mt-10px mb-20px px-15px">
        <view class="bg-#fff pt-20px pb-5px rounded-10px overflow-hidden">
          <view class="flex justify-center flex-col items-center">
            <dy-barcode :width="636" :option="opts" @click="barodeClick"></dy-barcode>
            <view class="color-#999 text-14px mt-[-16px]">
              {{ dataDesensitization(opts.value, false, 'last') }}
            </view>
          </view>

          <view class="flex justify-center mt-10px flex-col items-center">
            <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
            <view>
              <text class="text-#999999 text-14px mr-10px">{{ countdown.seconds }}秒自动刷新</text>
              <wd-button type="text" @click="generateCode">手动刷新</wd-button>
            </view>
          </view>

          <view
            class="flex justify-between items-center text-14px color-#555 bt-1px_dashed_#E2E2E2 py-10px px-15px mt-20px"
          >
            <view>参保地</view>
            <view>
              {{ logcation }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 提示信息 -->
  <wd-overlay :show="show">
    <view class="size-full flex flex-col justify-center items-center bg-#fff">
      <wd-status-tip
        :image="stkts"
        :image-size="{
          height: 132,
          width: 224,
        }"
      />
      <view class="mt-20px">
        <view class="mt-10px text-center" v-for="(item, index) in textArr" :key="index">
          <wd-text :text="item" color="#555"></wd-text>
        </view>
      </view>
      <view class="mt-20px w-100% px-40px box-border">
        <wd-button type="primary" :round="false" @click="isShow" color="#2D69EF" block>
          我知道了
        </wd-button>
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.back {
  background: linear-gradient(to bottom, #2d69ef 40%, transparent 40%);
}
</style>

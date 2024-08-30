import { needLoginPages } from '../../../utils/index';
<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
// import { QRCode } from '@uni-ui/code-plugs'
// const qrcode = ref(null)
// const qar = ref({
//   // 所有属性配置示例
//   id: 'qrcode',
//   ctx: qrcode.value,
//   code: 'https://tmui.design/com/Barcode.html', // 必传
//   level: 4, // 纠错等级 0~4 默认4 非必传
//   type: 'none', // 码点 目前只支持 none 其它暂不支持 非必传
//   src: '/static/35.png', // 画布背景 非必传
//   padding: 10, // 二维码margin Number 单位rpx 默认0 非必传
//   border: {
//     // 非必传
//     color: ['#F27121', '#8A2387', '#1b82d2'], // 边框颜色支持渐变色 最多10种颜色 如果默认黑色此属性不需要传
//     opacity: 0.6, // 边框透明度 默认为1不透明 0~1
//     lineWidth: 6, // 边框宽度
//     degree: 15, // 边框圆角度数 默认5
//   },
//   text: {
//     // 二维码绘制文字 非必传
//     opacity: 1, // 文字透明度 默认不透明1  0~1 非必传
//     font: 'bold 20px system-ui', // 文字是否加粗 默认normal 20px system-ui 非必传
//     color: ['#000000'], // 文字颜色 多个颜色支持渐变色 默认黑色 非必传
//     content: '这是一个测试', // 文字内容
//   },
//   img: {
//     src: 'https://p6.itc.cn/q_70/images03/20230428/feaf395d51b441baaee78bd6e1dbdc78.png', // 图片地址
//     size: 40, // 图片大小
//     degree: 15, // 圆角大小 如果type为round生效
//     type: 'round', // 图片展示类型 默认none 可选值  round圆角  circle圆 如果为round 可以传入degree设置圆角大小 默认 5
//     color: '#ffffff', // 图片周围的白色边框
//     width: 8, // 图片周围白色边框的宽度 默认5
//   },

//   size: 460, // 二维码大小 Number 单位rpx 必传
// })
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import { usegetScreenBrightness, useSetScreenBrightness } from '@/utils/uniapi'
const opts = ref({
  lineColor: '#000000',
  fontSize: 20,
  width: 2,
  textMargin: 0,
  text: '1234567890657890',
  value: '1234567890657890',
  displayValue: false,
})
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
const str = ref<any>('')

const cfig = ref()
cfig.value = {
  logoImage: 'https://cdn.tmui.design/public/design/logoCir.png',
  str: str.value,
  logoWidth: 60,
  logoHeight: 60,
  size: 440,
}
const barcodeBg = ref(false)
const logcation = ref('北京市')
const user = ref({
  name: '张三',
  shbzkh: '1234567890657890',
})
const show = ref(false)
const textArr = ref([
  '电子社保卡二维码用于身份认证和支付',
  '结算时向商家出示',
  '请不要将二维码及数字发送给他人',
])
const lingdu = ref(0)
onMounted(async () => {
  lingdu.value = (await usegetScreenBrightness()) as number
  console.log('🍖[ lingdu.value]:', lingdu.value)

  useSetScreenBrightness(1)
})
onUnmounted(() => {
  useSetScreenBrightness(lingdu.value)
})
</script>

<template>
  <view v-if="!show">
    <view class="bg-#2D69EF h-280px">
      <view class="flex">
        <view>logout</view>
        <view>电子社保卡</view>
      </view>
      <view class="color-#fff">
        <view>姓名：{{ user.name }}</view>
        <view>社会保障卡号：{{ user.shbzkh }}</view>
      </view>
    </view>
    <view class="mt-[-120px] px-15px">
      <view class="bg-#fff pt-26px pb-5px rounded-10px overflow-hidden">
        <view class="flex justify-center flex-col items-center" @click="barcodeBg = true">
          <dy-barcode :width="636" :option="opts"></dy-barcode>
          <view class="color-#999 text-14px mt-[-16px]">{{ opts.value }}</view>
        </view>

        <view class="flex justify-center mt-20px flex-col items-center">
          <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
          <view>
            <text class="text-#999999 text-14px mr-10px">60秒自动刷新</text>
            <wd-button type="text">手动刷新</wd-button>
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
  <wd-overlay :show="barcodeBg">
    <view
      class="size-full flex flex-col justify-center items-center bg-#fff"
      @click="barcodeBg = false"
    >
      <view class="rotate-90">
        <dy-barcode :width="636" :option="opts"></dy-barcode>
        <view class="color-#999 text-14px mt-[-16px] text-center">{{ opts.value }}</view>
      </view>
    </view>
  </wd-overlay>
  <wd-overlay :show="show">
    <view class="size-full flex flex-col justify-center items-center bg-#fff">
      <wd-status-tip image="https://img.wot-design-uni.cn/static/1.jpg" />
      <view class="mt-20px">
        <view class="mt-10px text-center" v-for="(item, index) in textArr" :key="index">
          <wd-text :text="item" color="#555"></wd-text>
        </view>
      </view>
      <view class="mt-20px w-100% px-40px box-border">
        <wd-button type="primary" :round="false" @click="show = false" color="#2D69EF" block>
          我知道了
        </wd-button>
      </view>
    </view>
  </wd-overlay>
</template>

<style>
page {
  background: #f7f7f7;
}
</style>
<style lang="scss" scoped></style>

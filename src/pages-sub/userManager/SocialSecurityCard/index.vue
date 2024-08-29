import { needLoginPages } from '../../../utils/index';
<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationBarTitleText: '社保卡2',
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
const opts = ref({
  lineColor: '#000000',
  fontSize: 20,
  width: 2,
  text: '1234567890123456789',
})

// function findCan() {
//   QRCode(qar.value, (res) => {
//     console.log(res)
//   })
// }
// onMounted(() => {
//   findCan()
// })
</script>

<template>
  <!-- <view class="qrcode-view bg-#1890ff">
    <canvas canvas-id="qrcode" ref="qrcode" id="qrcode" style="width: 460rpx; height: 460rpx" />
  </view> -->
  <dy-barcode :width="636" :option="opts"></dy-barcode>
</template>

<style lang="scss" scoped>
//
</style>

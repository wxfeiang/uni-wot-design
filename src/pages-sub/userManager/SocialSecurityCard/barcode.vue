<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
    // 'mp-weixin': {
    //   pageOrientation: 'landscape', //横屏
    // },
  },
}
</route>

<script lang="ts" setup>
const opts = ref({})

const show = ref(false)
const rotate = ref(false)
onMounted(() => {
  setTimeout(() => {
    opts.value = {
      lineColor: '#000000',
      fontSize: 20,
      width: 2,
      textMargin: 0,
      text: '1234567890657890',
      value: '1234567890657890',
      displayValue: false,
      orientation: 'vertical', // 生成横向条形码
    }
    show.value = true
  }, 3000)
})
const barcodeBack = () => {
  // uni.navigateBack()
  rotate.value = true
}
</script>

<template>
  <!-- 横屏显示 -->
  <view class="w-100vw h-100vh fixed top-0 left-0 right-0 z-99999" v-if="show" @click="barcodeBack">
    <view class="flex flex-col justify-center items-center bg-#fff relative z-99">
      <view :class="rotate ? 'rotate-90' : ''">
        <dy-barcode :width="636" :option="opts"></dy-barcode>
        <view class="color-#999 text-14px mt-[-5px] text-center">{{ opts!.value }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

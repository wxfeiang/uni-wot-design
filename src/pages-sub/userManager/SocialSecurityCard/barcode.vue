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
const opts = ref({
  lineColor: '#000000',
  fontSize: 20,
  width: 2,
  textMargin: 0,
  text: '1234567890657890',
  value: '1234567890657890',
  displayValue: false,
})
const barcodeBack = () => {
  uni.navigateBack()
}
const rote = ref('')
const a = ref(1)
onMounted(() => {
  setInterval(() => {
    console.log('🍇>>>>>>>>>>>')
    rote.value = 'rotate-90'
  }, 3000)
})
</script>

<template>
  <!-- 横屏显示 -->
  <view
    class="w-100vw h-100vh fixed top-0 left-0 right-0 z-99999"
    :class="rote"
    @click="barcodeBack"
  >
    <view class="size-full flex flex-col justify-center items-center bg-#fff relative z-99">
      <view class="rotate-90">
        <dy-barcode :width="636" :option="opts"></dy-barcode>
        <view class="color-#999 text-14px mt-[-5px] text-center">{{ opts.value }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

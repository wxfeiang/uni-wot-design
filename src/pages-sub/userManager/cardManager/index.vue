<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
const mainData = ref([
  {
    name: '张三',
    idNumbers: '123456789012345678',
    idNumbersBack: '123456789012345678',
    type: '1',
    typeName: 'a',
    iconColse: true,
  },
  {
    name: '张三',
    idNumbers: '123456789012345678',
    idNumbersBack: '123456789012345678',
    type: '2',
    typeName: 'b',
    iconColse: true,
  },
  {
    name: '张三',
    idNumbers: '123456789012345678',
    idNumbersBack: '123456789012345678',
    type: '3',
    typeName: 'c',
    iconColse: true,
  },
])

// 初始化关闭的时候
mainData.value.forEach((item) => {
  item.idNumbers = item.idNumbers.replace(/(\d{1})\d{16}(\d{1})/, '$1************$2')
})
function close(item, index) {
  mainData.value[index].iconColse = !mainData.value[index].iconColse
  mainData.value[index].idNumbers = mainData.value[index].iconColse
    ? mainData.value[index].idNumbers.replace(/(\d{1})\d{16}(\d{1})/, '$1************$2')
    : mainData.value[index].idNumbersBack
}
</script>

<template>
  <dy-navbar leftTitle="身份卡包" left></dy-navbar>
  <wd-gap bg-color="#ffff"></wd-gap>
  <view class="px-15px">
    <view
      class="p-15px default_bg h-112px box-border mb-10px rounded-7px relative"
      v-for="(item, index) in mainData"
      :key="index"
      :class="`${item.typeName}_type`"
    >
      <view class="text-24px">{{ item.name }}</view>
      <view class="text-16px mt-10px">{{ item.idNumbers }}</view>

      <view
        class="absolute right-0 top-0 py-2px pl-15px pr-10px rounded-bl-15px color-#fff text-16px"
        :class="`${item.typeName}_bg_type`"
      >
        {{ item.typeName }} 类
      </view>
      <view @click="close(item, index)" class="absolute right-10px bottom-10px">
        <wd-icon
          :name="item.iconColse ? 'eye-close' : 'view'"
          size="20px"
          :color="item.iconColse ? '#5D5D5D' : '#FFC248'"
        ></wd-icon>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.default_bg {
  background: linear-gradient(311deg, #e0e0e0 0%, #bebebe 100%);
}
.a_type {
  @apply color-#E4C094;
}
.b_type {
  @apply color-#E96B16;
}
.c_type {
  @apply color-#000000;
}
.a_bg_type {
  background: linear-gradient(225deg, #220a01 0%, rgba(239, 187, 122, 0.62) 100%);
}
.b_bg_type {
  background: linear-gradient(225deg, #ff6600 0%, rgba(232, 188, 66, 0.87) 50%, #ff9800 100%);
}
.c_bg_type {
  background: linear-gradient(237deg, #4b4b4b 0%, rgba(195, 195, 195, 0.72) 50%, #696969 100%);
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true, // false 表示需要登录
  style: {
    navigationBarTitleText: 'ceshi 拦截',
  },
}
</route>

<script lang="ts" setup>
const cardUrl = 'https://cdn.uviewui.com/uview/demo/upload/positive.png'
const url = ref('public/uploads/image/1722994513452-5d9fdf30-37c4-409e-88ed-f1ad64a0a958.jpg')
const url2 = ref('') // ref('public/uploads/image/1722994513452-5d9fdf30-37c4-409e-88ed-f1ad64a0a958.jpg')
// const url = ref('')
const getdata = () => {
  console.log(url.value)
  console.log(url2.value)
}
const wotUpAttrs = {
  limit: 1,
  'custom-preview-class': 'custom-preview-class',
  'custom-evoke-class': 'custom-evoke-class',
  'custom-class': 'custom-class',
}
</script>

<template>
  <view class="bg-white p-10px">
    <dy-upload v-model="url" :limit="3"></dy-upload>
    <dy-upload v-model="url2" :limit="1" showFileDy :defaultAttrs="wotUpAttrs">
      <view class="custom-preview-class">
        <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-image" />
      </view>
    </dy-upload>
    <wd-button @click="getdata" class="mt-20px">取数据</wd-button>
  </view>
</template>

<style lang="scss" scoped>
:deep(.custom-class) {
  @apply w-80% mx-a bd-dashed_#1890ff rounded-10px;
}
:deep(.custom-evoke-class),
:deep(.custom-preview-class) {
  @apply w-full h-200px  m-0;
}
:deep(.custom-image) {
  @apply wh-full!;
  .custom-image {
    @apply rounded-10px;
  }
}
</style>

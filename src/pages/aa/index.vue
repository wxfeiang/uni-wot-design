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
const url = ref(
  'https://zhjia.net:8890/picture/ec-saas/20240808/13e7effe76844c168be1ac926317f4a3.jpg',
)
const { fileData, fData } = useFilePase(
  'privacy-bucket/20240808/06b2dceae01f4158b6e11f7055e25963.jpg',
)

const a = {
  b: 1,
  c: useFilePase('privacy-bucket/20240808/06b2dceae01f4158b6e11f7055e25963.jpg').fData,
}
console.log('🍟', a)

//  privacy-bucket/20240808/06b2dceae01f4158b6e11f7055e25963.jpg
const url2 = ref('') // ref('public/uploads/image/1722994513452-5d9fdf30-37c4-409e-88ed-f1ad64a0a958.jpg')
// const url = ref('')
const getdata = () => {
  console.log(url.value)
  console.log(url2.value)
  console.log('🥠=====', fileData.value, a)
}
const wotUpAttrs = {
  limit: 1,
  'custom-preview-class': 'custom-preview-class',
  'custom-evoke-class': 'custom-evoke-class',
  'custom-class': 'custom-class',
}

console.log('🍡[a >>>>>>>]:', fileData, '=====', fData.value)
</script>

<template>
  <view class="p-10px">
    ==== {{ fileData }}
    <dy-upload v-model="url" :limit="3"></dy-upload>
    <wd-gap bg-color="#4D80F0"></wd-gap>
    <dy-upload v-model="url2" :limit="1" showFileDy :defaultAttrs="wotUpAttrs">
      <view class="custom-preview-class">
        <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-class-img" />
      </view>
    </dy-upload>
    <wd-gap bg-color="#4D80F0"></wd-gap>
    <wd-button @click="getdata" class="mt-20px">取数据</wd-button>
    <image :src="fileData"></image>
    {{ a.c.value.data.data.data }}
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
:deep(.custom-class-img) {
  @apply wh-full! overflow-hidden rounded-10px;
}
</style>

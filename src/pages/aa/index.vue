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
//
// const url = ref('public/uploads/image/1722994513452-5d9fdf30-37c4-409e-88ed-f1ad64a0a958.jpg')
const url = ref('')
const getdata = () => {
  console.log(url.value)
}
const wotUpAttrs = {
  limit: 3,
}
</script>

<template>
  <view class="bg-white p-10px">
    <dy-upload v-model="url" :limit="3"></dy-upload>

    <wd-button @click="getdata">获取数据</wd-button>

    <!-- <wd-upload :file-list="url" :limit="5" action="https://ftf.jd.com/api/uploadImg">
      <wd-button>上传</wd-button>
    </wd-upload> -->
  </view>
</template>

<style lang="scss" scoped>
//
</style>

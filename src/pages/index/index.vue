<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
const url = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/6d08b080-456b-4ff6-9cff-01125b9038c7scindexhome.png',
)
</script>

<template>
  <view class="min-h-100vh">
    <image :src="url" mode="widthFix" class="w-100% h-100%"></image>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps({
  width: {
    style: Number,
    default: 100,
  },
  height: {
    style: Number,
    default: 100,
  },
  src: {
    style: String,
    default: '',
  },
  error: {
    style: String,
    default: '加载失败',
  },
})
</script>

<template>
  <wd-img :width="props.width" :height="props.height" :src="props.src" v-bind="$attrs">
    <template #error>
      <view class="error-wrap">ddd{{ props.error }}</view>
    </template>
    <template #loading>
      <view class="loading-wrap">
        <wd-loading />
      </view>
    </template>
  </wd-img>
</template>

<style lang="scss" scoped>
.error-wrap {
  width: 100%;
  height: 100%;
  line-height: 100px;
  color: white;
  text-align: center;
  background-color: #ccc;
}

.loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>

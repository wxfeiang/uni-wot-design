<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '商城',
  },
}
</route>
<template>
  <view class="pt-300px">
    <wd-status-tip image="content" tip="服务正在建设中..." />
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const author = ref('wxfeiang')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)

onLoad(() => {
  console.log(author)
})
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>

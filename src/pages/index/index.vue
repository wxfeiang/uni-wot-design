<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="bg-amber overflow-hidden pt-2 px-4">
    <view class="mt-12">
      <image src="/static/logo.svg" alt="" class="w-28 h-28 block mx-auto" />
    </view>
    <view class="text-center text-4xl main-title-color truncate text-#d14328">unibest</view>
    <view class="text-center text-2xl mt-2 mb-8">最好用的 uniapp 开发模板</view>

    <view class="text-justify max-w-100 m-auto text-4 indent mb-2 truncate-2 md-5">
      {{ description }}
    </view>
    <view class="text-center mt-8">
      当前平台是：
      <text class="text-green-500">{{ PLATFORM.platform }}</text>
    </view>
    <view class="text-center mt-4">
      模板分支是：
      <text class="text-green-500">base</text>
    </view>
    <wd-button type="error">危险按钮</wd-button>
    <wd-button type="success" @click="useSysLogin.login()" @getuserinfo="getuserinfo">
      测试登录
    </wd-button>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
const useSysLogin = useSyslogin()

defineOptions({
  name: 'Home',
})
const getuserinfo = (e: any) => {
  console.log(e)
}

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

<style></style>

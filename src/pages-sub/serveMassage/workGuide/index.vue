<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'
import { useMessage } from 'wot-design-uni'
const message = useMessage()

defineOptions({
  name: 'workGuide',
})
const { safeAreaInsets } = uni.getSystemInfoSync()

function handleClickLeft() {
  uni.navigateBack()
}
// H5 的情况下要 -44
const navTop = ref(safeAreaInsets.top + 40)
onMounted(() => {
  if (PLATFORM.isH5) {
    navTop.value = navTop.value - 44
  }
})

// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
const navbg = ref('nav_show')
onPageScroll((e) => {
  if (e.scrollTop > 50) {
    navbg.value = 'nav_hide'
  } else {
    navbg.value = 'nav_show'
  }
})
const paging = ref(null)
const dataList = ref([
  {
    title: '标题文字',
    label: '这里是文字描述这里是文字描述这里是文字描述',
    titleWidth: '200px',
    isLink: true,
  },
  {
    title: '标题文字',
    label: '这里是文字描述这里是文字描述这里是文字描述',
    titleWidth: '200px',
    isLink: true,
  },
])
const queryList = (pageNo, pageSize) => {
  // 调用接口获取数据

  paging.value.complete(dataList.value)
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #top>
      <!-- 顶部 -->
      <view class="bg-blue pb-10px">
        <wd-navbar
          safeAreaInsetTop
          placeholder
          fixed
          custom-class="navbg"
          :bordered="false"
          title="办事指南"
        >
          <template #left>
            <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
          </template>
        </wd-navbar>
        <wd-sticky :offset-top="navTop">
          <view class="w-100vw">
            <wd-search
              placeholder-left
              placeholder="请输入关键词搜索"
              hide-cancel
              :custom-class="navbg"
            />
          </view>
        </wd-sticky>
      </view>
    </template>

    <!-- leibiao  -->
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.title"
        :label="item.label"
        is-link
      />
    </wd-cell-group>
  </z-paging>

  <view>asdcas</view>
</template>

<style>
:deep(.nav_show) {
  @apply bg-transparent!;
}
:deep(.nav_bg) {
  background-color: var(--color-nav-bg);
  .wd-navbar__title {
    color: var(--color-nav-text);
  }
  .wd-navbar__left {
    color: var(--color-nav-text);
  }
}
</style>

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
    label: '您好，您提交的工单已被客服10086接单，请您耐心等待处理，如需了解工单情况。',
    titleWidth: '200px',
    isLink: true,
  },
  {
    title: '标题文字',
    label: '您好，您提交的工单已被客服10086接单，请您耐心等待处理，如需了解工单情况。',
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
        <wd-navbar safeAreaInsetTop placeholder fixed :custom-class="navbg" :bordered="false">
          <template #left>
            <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
          </template>
          <template #title>
            <text class="color-#fff">消息列表</text>
          </template>
        </wd-navbar>
      </view>
    </template>

    <!-- leibiao  -->
    <view v-for="(item, index) in dataList" :key="index">
      <wd-gap bg-color="#f5f5f5"></wd-gap>
      <wd-cell-group border use-slot>
        <template #title>
          <view>
            <wd-badge is-dot>
              <wd-button size="small" icon="notification" type="info" :round="false"></wd-button>
            </wd-badge>
            <text class="ml-5px">消息提醒</text>
          </view>
        </template>
        <template #value>
          <view class="flex items-center color-#999">
            <view>查看详情</view>
            <wd-icon name="arrow-right" size="12px"></wd-icon>
          </view>
        </template>
        <wd-cell title-width="370px">
          <template #label>
            <view class="truncate-2 color-#666">
              {{ item.label }}
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
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

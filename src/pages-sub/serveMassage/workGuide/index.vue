<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useNav from '@/hooks/useNav'
import useNews from './hooks/useGurid'

const { sendMessageList, messageClick } = useNews()
const { navTop } = useNav()

defineOptions({
  name: 'workGuide',
})
const { safeAreaInsets } = uni.getSystemInfoSync()

function handleClickLeft() {
  uni.navigateBack()
}

const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const data = {
    page: pageNo,
    size: pageSize,
    articleType: '1',
  }
  // 调用接口获取数据
  try {
    const a: any = await sendMessageList(data)
    console.log('🥠[a ]:', a.data.data.content)
    dataList.value = a.data.data.content

    paging.value.complete(dataList.value)
  } catch (error) {
    console.log('🥒[error]:', error)
    paging.value.complete(false)
  }
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList" :auto-show-system-loading="true">
    <template #top>
      <!-- 顶部 -->
      <view class="">
        <wd-navbar
          safeAreaInsetTop
          placeholder
          fixed
          custom-class="nav_bg"
          :bordered="false"
          title="办事指南"
        >
          <template #left>
            <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
          </template>
        </wd-navbar>
        <wd-sticky>
          <view class="w-100vw">
            <wd-search placeholder-left placeholder="请输入关键词搜索" hide-cancel />
          </view>
        </wd-sticky>
      </view>
    </template>

    <!-- leibiao  -->
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in dataList"
        :key="index"
        title-width="90%"
        is-link
        clickable
        @click="messageClick(item)"
      >
        <template #title>
          <view class="truncate-1">
            {{ item.articleTitle }}
          </view>
        </template>
        <template #label>
          <view class="truncate-2 color-#999">
            {{ item.articleTitle }}
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
  </z-paging>
</template>

<style lang="scss" scoped>
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

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
import useGurid from './hooks/useGurid'
console.log('🥘[useGurid]:', useGurid)

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
const { sendMessageList, messageClick } = useGurid()

const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const data = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    const resData = await sendMessageList(data)
    dataList.value = resData.data.data.content
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #top>
      <!-- 顶部 -->
      <view class="bg-#4689fd!">
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
        :title="item.articleTitle"
        :label="item.articleTitle"
        is-link
        clickable
        @click="messageClick(item)"
      />
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

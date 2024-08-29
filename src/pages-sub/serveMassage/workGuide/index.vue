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
import { useUserStore } from '@/store'
import PLATFORM from '@/utils/platform'
import { useMessage } from 'wot-design-uni'
import useIndex from './hooks/useIndex'
const message = useMessage()
const user = useUserStore()

const { epListData, sendLogin2 } = useIndex()

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

const dataList = ref([])
onMounted(() => {
  if (user.userInfo.token) {
    console.log('🍾==========')
    // 特定的情况下 被动调用的  :auto="false"
    queryList(0, 10)
  } else {
    console.log('🥪')
    paging.value.reload()
  }
})
const queryList = async (pageNo, pageSize) => {
  console.log('🍬[pageNo, pageSize]:', pageNo, pageSize)
  // 调用接口获取数据
  try {
    const a = await sendLogin2()

    dataList.value = a.data.data.list
    paging.value.complete(dataList.value)
  } catch (error) {
    console.log('🍋[error]:', error)
  }
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" :auto="false" @query="queryList">
    <template #top>
      <!-- 顶部 -->
      <view class="pb-10px">
        <wd-navbar safeAreaInsetTop placeholder fixed :custom-class="navbg" :bordered="false">
          <template #left>
            <wd-icon @click="handleClickLeft" name="arrow-left" size="22px"></wd-icon>
            <view class="">办事指南</view>
          </template>
        </wd-navbar>
      </view>
      <!-- <wd-button @click="paging.reload()">点击刷新</wd-button> -->
    </template>

    <!-- leibiao  -->
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.name"
        :label="item.idNumber"
        is-link
      />
    </wd-cell-group>
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

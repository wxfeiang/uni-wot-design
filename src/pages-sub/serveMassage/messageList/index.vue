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
import { useMessage } from 'wot-design-uni'

import { routeTo } from '@/utils'
import useNews from './hooks/useNews'
const message = useMessage()

const { messageData, sendMessageList, messageListData } = useNews()

defineOptions({
  name: 'workGuide',
})
const { safeAreaInsets } = uni.getSystemInfoSync()

function handleClickLeft() {
  uni.navigateBack()
}

const paging = ref(null)
const dataList = ref([
  {
    title: '标题文字',
    label: '您好，您提交的工单已被客服10086接单，请您耐心等待处理，如需了解工单情况。',
    titleWidth: '200px',
    isLink: true,
    isread: false,
  },
  {
    title: '标题文字',
    label: '您好，您提交的工单已被客服10086接单，请您耐心等待处理，如需了解工单情况。',
    titleWidth: '200px',
    isLink: true,
    isread: true,
  },
])
const queryList = async (pageNo, pageSize) => {
  const data = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    await sendMessageList(data)
    // console.log('🍛[resData]:', resData)
    paging.value.complete(messageListData)
  } catch (error) {
    console.log('🥒[error]:', error)
    paging.value.complete(false)
  }
}

const goDetil = (item) => {
  console.log('🍛[item]:', item)
  routeTo({
    url: '/pages-sub/components/webView/index',
    data: { type: item.articleId || '1700080380440236000' },
  })
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #top>
      <!-- 顶部 -->
      <view class="bg-blue pb-10px">
        <wd-navbar safeAreaInsetTop placeholder fixed custom-class="nav_bg" :bordered="false">
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
            <wd-badge :is-dot="item.isread">
              <wd-button size="small" icon="notification" type="info" :round="false"></wd-button>
            </wd-badge>
            <text class="ml-5px">消息提醒</text>
          </view>
        </template>
        <template #value>
          <view class="flex items-center color-#999" @click="goDetil(item)">
            <view>查看详情</view>
            <wd-icon name="arrow-right" size="12px"></wd-icon>
          </view>
        </template>
        <wd-cell title-width="300px">
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

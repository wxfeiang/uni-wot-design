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
import { useMessage } from 'wot-design-uni'

import useNews from './hooks/useNews'
const message = useMessage()

const { sendMessageList, messageClick } = useNews()

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
    articleType: '0',
  }
  // 调用接口获取数据
  try {
    const a = await sendMessageList(data)
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
      <dy-navbar leftTitle="消息列表" left></dy-navbar>
    </template>

    <!-- leibiao  -->
    <view v-for="(item, index) in dataList" :key="index">
      <wd-cell-group border use-slot>
        <template #title>
          <view>
            <wd-badge :is-dot="item.isread">
              <view class="px-3px t_bg rounded-2px">
                <wd-icon name="notification" />
              </view>
              <!-- <wd-button size="small" icon="notification" type="info" :round="false"></wd-button> -->
            </wd-badge>
            <text class="ml-5px">消息提醒</text>
          </view>
        </template>
        <template #value></template>
        <wd-cell clickable is-link @click="messageClick(item)">
          <template #title>
            <view class="truncate-1 color-#000">{{ item.articleTitle }}</view>
          </template>
          <view class="truncate-1 color-#999">查看详情</view>
        </wd-cell>
      </wd-cell-group>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
.t_bg {
  background: rgba($color: #ccc, $alpha: 0.2);
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

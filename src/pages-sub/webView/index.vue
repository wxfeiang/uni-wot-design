<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useWebview from './hooks/useWebview'
const { content, AarData, articleTitle, createTime } = useWebview()
const types = ref(null)
function handleClickLeft() {
  uni.navigateBack()
}

const remark = ref(null)
const showTop = ref(1)
const title = ref()
const showType = ref()
const webUrl = ref('')
onLoad((options) => {
  showType.value = options.showType
  if (showType.value === 'h5') {
    webUrl.value = decodeURIComponent(options.url)
  } else {
    types.value = options.type
    showTop.value = options.showTop
    title.value = options.title ? decodeURIComponent(options.title) : '详情'
    AarData(types.value)
  }
})
</script>

<template>
  <web-view :src="webUrl" v-if="showType === 'h5'"></web-view>
  <view class="" v-else>
    <dy-navbar :leftTitle="articleTitle" left></dy-navbar>
    <view class="mt-20px" v-if="!showTop">
      <view class="text-center line-height-30px">{{ articleTitle }}</view>
      <view class="text-center flex justify-center gap-20px mt-10px">
        <view class="text-center color-#999 font-size-12px line-height-20px">
          来源： {{ remark || '一卡通平台' }}
        </view>
        <view class="text-center color-#999 font-size-12px line-height-20px">
          发布时间：{{ createTime }}
        </view>
      </view>
    </view>
    <view class="p-20px">
      <dy-richtext :html="content"></dy-richtext>
    </view>
  </view>
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

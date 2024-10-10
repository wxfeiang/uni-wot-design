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
import { useUserStore } from '@/store'
import { removeT } from '@/utils'
import useWebview from './hooks/useWebview'
const { sedAarData, ArticleData, bannerDaata, getbanner, sendDetailUpdateRead, ReadData } =
  useWebview()
const userStore = useUserStore()

const types = ref(null)
function handleClickLeft() {
  uni.navigateBack()
}

const remark = ref(null)
const showTop = ref(1)
const title = ref()
const showType = ref()
const webUrl = ref('')
const cuurentData = ref({})
onLoad(async (options) => {
  console.log('🍑[options]=======:', options)
  showType.value = options.showType
  title.value = options.title ? decodeURIComponent(options.title) : '详情'
  if (showType.value === 'webView') {
    webUrl.value = decodeURIComponent(options.url)
  } else if (showType.value === 'banner') {
    const params: ActivityParams = {
      id: options.type,
      userDId: userStore.userInfo.userDId,
      userId: userStore.userInfo.userDId,
    }
    await getbanner(params)
    cuurentData.value = bannerDaata.value
  } else if (showType.value === 'message') {
    showTop.value = options.showTop
    await sendDetailUpdateRead({ id: options.type })
    cuurentData.value = ReadData.value
  } else {
    types.value = options.type
    showTop.value = options.showTop
    await sedAarData({ articleId: options.type })
    cuurentData.value = ArticleData.value
  }
})
</script>

<template>
  <web-view :src="webUrl" v-if="showType === 'webView'"></web-view>
  <view class="" v-else>
    <dy-navbar :leftTitle="title" left></dy-navbar>
    <view class="mt-20px" v-if="!showTop">
      <view class="text-center line-height-30px">
        {{ cuurentData.articleTitle || cuurentData.title }}
      </view>
      <view class="text-center flex justify-center gap-20px mt-10px">
        <view class="text-center color-#999 font-size-12px line-height-20px">
          来源： {{ remark || '一卡通平台' }}
        </view>
        <view class="text-center color-#999 font-size-12px line-height-20px">
          发布时间：{{ removeT(cuurentData.createTime) }}
        </view>
      </view>
    </view>
    <view class="p-20px">
      <dy-richtext :html="cuurentData.content || cuurentData.articleContent"></dy-richtext>
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

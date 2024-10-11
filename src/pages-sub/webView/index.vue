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
import { useBaseStore, useUserStore } from '@/store'
import { removeT } from '@/utils'
import useWebview from './hooks/useWebview'
const { sedAarData, ArticleData, bannerDaata, getbanner, sendDetailUpdateRead, ReadData } =
  useWebview()
const userStore = useUserStore()
const basestore = useBaseStore()
const types = ref(null)
function handleClickLeft() {
  uni.navigateBack()
}

const remark = ref(null)
const showTop = ref(1)
const title = ref()
const showType = ref()
const webUrl = ref('')
const cuurentData = ref<any>({})
onLoad(async (options) => {
  showType.value = options.showType
  showTop.value = options.showTop
  title.value = options.title ? decodeURIComponent(options.title) : '详情'
  if (showType.value === 'webView') {
    webUrl.value = decodeURIComponent(options.url)
  } else if (showType.value === 'banner') {
    await getbanner({ shopHdId: options.type })
    cuurentData.value = bannerDaata.value
  } else if (showType.value === 'message') {
    await sendDetailUpdateRead({ id: options.type })
    cuurentData.value = ReadData.value
  } else {
    types.value = options.type

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
        {{ cuurentData.articleTitle || cuurentData.title || cuurentData.shopHdTitle }}
      </view>
      <view class="text-center flex justify-center gap-20px mt-10px">
        <view class="text-center color-#999 font-size-12px line-height-20px">
          来源： {{ remark || '一卡通平台' }}
        </view>
        <view class="text-center color-#999 font-size-12px line-height-20px">
          发布时间：{{ removeT(cuurentData.createTime || cuurentData.shopHdStartT) }}
        </view>
      </view>
    </view>
    <view class="py-20px px-10px">
      <dy-richtext
        :html="cuurentData.content || cuurentData.articleContent || cuurentData.shopHdDesc"
      ></dy-richtext>
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

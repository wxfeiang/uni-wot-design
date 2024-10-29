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
const {
  sedAarData,
  ArticleData,
  bannerDaata,
  getbanner,
  sendDetailUpdateRead,
  ReadData,
  sendMessageRead,
} = useWebview()
const userStore = useUserStore()
const basestore = useBaseStore()
const types = ref(null)
function handleClickLeft() {
  uni.navigateBack()
}

const remark = ref(null)
const showTop = ref(1) // 是否显示顶部
const title = ref()
const showType = ref() // webView banner message
const webUrl = ref('')
const showTime = ref(true) // 是否显示时间
const cuurentData = ref<any>({})
onLoad(async (options) => {
  showType.value = options.showType
  showTop.value = options.showTop

  showTime.value = !options.showTime
  title.value = options.title ? decodeURIComponent(options.title) : '详情'
  if (showType.value === 'webView') {
    webUrl.value = decodeURIComponent(options.url)
  } else if (showType.value === 'banner') {
    await getbanner({ shopHdId: options.type })
    cuurentData.value = bannerDaata.value
  } else if (showType.value === 'message') {
    await sendDetailUpdateRead({ id: options.type })
    await sendMessageRead({ id: options.type, isRead: '1' })
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
    <view class="bg-#Ffff">
      <dy-navbar
        :leftTitle="title"
        left
        color="#000"
        custom-style="background-color: #fff"
      ></dy-navbar>
      <view class="pt-20px px-30px" v-if="!showTop">
        <view class="line-height-40px text-26px text-center pb-10px">
          {{ cuurentData.articleTitle || cuurentData.title || cuurentData.shopHdTitle }}
        </view>
        <view class="flex justify-center gap-20px bg-#F7F7F7 py-10px mx-[-30px]" v-if="showTime">
          <view class="text-center color-#999 font-size-12px line-height-20px">
            来源： {{ remark || '一卡通平台' }}
          </view>
          <view class="color-#999 font-size-12px line-height-20px">
            发布时间：{{
              removeT(cuurentData.createTime || cuurentData.shopHdStartT || cuurentData.sendTime)
            }}
          </view>
        </view>
      </view>
    </view>
    <view class="p-10px">
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

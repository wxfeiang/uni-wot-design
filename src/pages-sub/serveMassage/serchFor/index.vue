<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getSerchList } from '@/service/api/source'
import { useBaseStore } from '@/store'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
import { storeToRefs } from 'pinia'
import kong from '../static/images/kong.png'
const { historySearch } = storeToRefs(useBaseStore())
const serchListData = ref([])
const serchValue = ref('')
const flog = ref(false)
const cancel = () => {
  console.log('取消')
  serchValue.value = ''
  if (serchValue.value.length === 0) {
    serchListData.value = []
  }
}
const clear = () => {
  console.log('清除')

  if (serchValue.value.length === 0) {
    serchListData.value = []
  }
}

const {
  loading,
  send: sendSerchList,
  onSuccess: SerchListSucess,
} = useRequest((data) => getSerchList(data), {
  immediate: false,
  loading: false,
  initialData: [],
})

const search = async () => {
  if (serchValue.value.length === 0) {
    return
  }
  uni.showLoading({ title: '加载中' })
  // 发起请求
  try {
    const data: any = await sendSerchList({ articleTitle: serchValue.value })
    console.log('🥒[data]:', data)
    serchListData.value = data.data.data.content
    if (!serchListData.value.length) {
      console.log('🌯')
      flog.value = true
    }
    console.log(serchListData.value)
    useBaseStore().setHistorySearch(serchValue.value)
  } catch (error) {
    console.log('🍛[error]:', error)
  } finally {
    uni.hideLoading()
  }
}
const change = () => {
  console.log('改变')
  console.log('🥘====', serchValue.value)
  if (serchValue.value.length === 0) {
    serchListData.value = []
    flog.value = true
  } else {
    flog.value = false
  }
}
const cleatHistory = () => {
  console.log('清除历史')
  useBaseStore().clearHistorySearch()
}
const histortSerch = (item: string) => {
  // 跳转详情
  serchValue.value = item
  search()
}
const toDetile = (item: any) => {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}
</script>

<template>
  <dy-navbar leftTitle="搜索页" left></dy-navbar>
  <view class="p-10px">
    <view class="rounded-3px overflow-hidden bg-#C7C7C7/18 py-5px">
      <wd-search
        v-model="serchValue"
        maxlength="10"
        placeholder-left
        placeholder="请输入关键词检索"
        custom-class="custom-class-serch"
        @cancel="cancel"
        @clear="clear"
        @search="search"
        @change="change"
      >
        <template #suffix>
          <view class="color-#666 px-3px" @click="search" v-if="serchValue.length > 0">搜索</view>
          <view class="color-#666 px-3px" @click="cancel" v-else>取消</view>
        </template>
      </wd-search>
    </view>
  </view>

  <!-- content -->
  <view class="px-20px mt-10px" v-if="!loading || (serchListData && serchValue.length > 0)">
    <view
      class="flex gap-10px justify-between items-center text-16px bb-1px_dashed_#707070 py-10px border-#707070/20!"
      v-for="(item, index) in serchListData"
      :key="index"
      @click="toDetile(item)"
    >
      <wd-icon name="search" size="16px" color="#A7A7A7"></wd-icon>
      <view class="flex-1 text-16px truncate-1">{{ item.articleTitle }}</view>
      <wd-icon name="arrow-right" size="16px" color="#A7A7A7"></wd-icon>
    </view>
  </view>
  <view class="mt-30" v-if="serchListData.length === 0 && serchValue.length !== 0 && flog">
    <wd-status-tip
      :image="kong"
      :image-size="{
        height: 107,
        width: 190,
      }"
      tip="抱歉没有找到您想要搜索的内容"
    />
  </view>
  <!-- history -->
  <view class="px-20px mt-10px" v-if="historySearch && serchValue.length === 0">
    <view class="flex justify-between items-center">
      <view class="text-16px font-semibold">历史搜索</view>
      <view @click="cleatHistory">
        <wd-icon name="delete" size="16px"></wd-icon>
      </view>
    </view>
    <view>
      <view
        class="mt-5px text-16px color-#444 line-height-30px truncate-1"
        v-for="(item, index) in historySearch"
        :key="index"
        @click="histortSerch(item)"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.custom-class-serch) {
  @apply bg-transparent!;
  @apply p-0!;
  .wd-search__block {
    @apply rounded-0!;
  }
  .wd-search__cancel {
    @apply text-14px;
  }
}
</style>

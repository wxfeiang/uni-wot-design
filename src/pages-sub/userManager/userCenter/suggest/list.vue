<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import SugItem from './components/SugItem.vue'
import useSuggest from './utils/useSuggest'

const { sendAdvicelist } = useSuggest()

const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    const da: any = await sendAdvicelist(params)
    dataList.value = da.content
    paging.value.complete(dataList.value)
    // paging.value.complete([])
  } catch (error) {
    paging.value.complete(false)
  }
}

function toSuggest(e) {
  routeTo({ url: '/pages-sub/userManager/userCenter/suggest/suggest' })
}

function toDetil(item) {
  routeTo({
    url: '/pages-sub/userManager/userCenter/suggest/suggestDetil',
    data: { id: item.adviceId },
  })
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList" :auto-show-system-loading="true">
    <template #top>
      <view class="bg1">
        <!-- 顶部 -->
        <dy-navbar leftTitle="投诉与建议" left isNavShow color="#000"></dy-navbar>
      </view>
    </template>
    <view class="px-10px pt-10px dy-blue-bg2">
      <Sug-Item :dataList="dataList" @deitl="toDetil" />
    </view>
    <template #bottom>
      <!-- 底部 -->
      <view class="p-10px bg-#fff">
        <wd-button block :round="false" @click="toSuggest">我要反馈</wd-button>
      </view>
    </template>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.bg1) {
  background: #d6eafe !important;
}

:deep(.zp-paging-container) {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 40%, #f2f3f7 100%) !important;
}
</style>

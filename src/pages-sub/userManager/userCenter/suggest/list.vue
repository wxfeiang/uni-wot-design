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
import SugItem from './components/sugItem.vue'

const paging = ref(null)
const dataList = ref([
  {
    title: '签到',
    createTime: '2023-10-10 10:10:10',
    type: 1,
    id: 1,
  },
  {
    title: '转发',
    createTime: '2023-10-10 10:10:10',
    type: 2,
    id: 2,
  },
])
const queryList = async (pageNo, pageSize) => {
  const params = {
    number: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    // await sendMessageList(params)
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}

function toSuggest(e) {
  console.log('🍛', e)
  routeTo({ url: '/pages-sub/userManager/userCenter/suggest/suggest' })
}
function toDetil(e) {
  console.log('🍛', e)
  routeTo({ url: '/pages-sub/userManager/userCenter/suggest/suggestDetil' })
}
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="bg"
  >
    <template #top>
      <!-- 顶部 -->
      <dy-navbar leftTitle="投诉与建议" left isNavShow color="#000"></dy-navbar>
    </template>
    <view class="px-10px pt-10px">
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
.bg {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 50%);
}
:deep(.wd-cell-group),
:deep(.wd-cell-group__body) {
  @apply bg-transparent!;
}
:deep(.custom-class-cell) {
  @apply rounded-6px mb-10px overflow-hidden;
}
:deep(.wd-cell__wrapper) {
  @apply items-center!;
}
</style>

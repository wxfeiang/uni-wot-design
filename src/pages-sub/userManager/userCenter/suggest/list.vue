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
import useSuggest from './utils/useSuggest'
const { sendAdvicelist, advicelist } = useSuggest()

const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    await sendAdvicelist(params)
    paging.value.complete(advicelist.value.content)
  } catch (error) {
    paging.value.complete(false)
  }
}

function toSuggest(e) {
  routeTo({ url: '/pages-sub/userManager/userCenter/suggest/suggest' })
}
function toDetil(item) {
  console.log('🍛', item)
  routeTo({
    url: '/pages-sub/userManager/userCenter/suggest/suggestDetil',
    data: { id: item.adviceId },
  })
}
onShow(() => {
  paging.value.reload()
})
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="dy-blue-bg"
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

<style lang="scss" scoped></style>

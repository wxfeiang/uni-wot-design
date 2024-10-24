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
import { routeTo } from '@/utils'

import { useToast } from 'wot-design-uni'
import bgimg from '../static/images/jiaotong/bgimg.png'
import chengche from '../static/images/jiaotong/chengche.png'
import jiaofei from '../static/images/jiaotong/jiaofei.png'
import title from '../static/images/jiaotong/title.png'
import zhengce from '../static/images/jiaotong/zhengce.png'

const toast = useToast()

function toSuggest() {
  routeTo({ url: '/pages-sub/userManager/suggest/suggest' })
}

function toDetil(item) {
  routeTo({
    url: '/pages-sub/userManager/suggest/suggestDetil',
    data: { id: item.adviceId },
  })
}
const paging = ref(null)
const dataList = ref([
  {
    id: 1,
    title: '乘公交',
    btn: '去乘车',
    icon: chengche,
    type: 'router',
    path: '/pages-sub/userManager/transit/index',
  },
  {
    title: '乘车政策',
    btn: '查看详情',
    icon: zhengce,
    type: 'router',
    path: '/pages-sub/webView/index',
    id: '1710488285782016010',
  },
  {
    id: 1,
    title: '乘车缴费',
    btn: '去缴费',
    icon: jiaofei,
  },
])
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    // await sendAdvicelist(params)
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
const timeShow = ref(false)
const currentData = ref()
function timeClick(item) {
  currentData.value = item
  timeShow.value = true
}
function timeclose(e) {
  timeShow.value = false
}

async function btnClick(item) {
  if (item.type === 'router') {
    routeTo({
      url: item.path,
      data: { type: item.id, title: item.title },
    })
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :auto-show-system-loading="true"
    :safe-area-inset-bottom="true"
    :refresher-enabled="false"
    :loading-more-enabled="false"
    :show-loading-more-no-more-view="false"
  >
    <template #top>
      <!-- 顶部 -->
      <dy-navbar leftTitle="" left isNavShow color="#000"></dy-navbar>
      <view class="flex justify-around items-center px-10px">
        <wd-img :src="title" width="187" height="81"></wd-img>
        <wd-img :src="bgimg" width="174" height="174"></wd-img>
      </view>
    </template>
    <view class="px-10px pt-10px">
      <view
        class="px-10px py-3px bg-#fff rounded-5px mb-10px"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <view class="flex justify-between items-center py-10px">
          <wd-img :src="item.icon" width="50" height="50"></wd-img>
          <view class="text-16px font-600 mr-auto ml-15px">
            {{ item.title }}
          </view>
          <view
            class="rounded-4px px-10px py-3px text-center text-14px color-#2D69EF bg-#EFF4FF min-w-80px"
            @click="btnClick(item)"
          >
            {{ item.btn }}
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.z-paging-content) {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 40%, #f2f3f7 100%) !important;
}
:deep(.custom-class-pop) {
  @apply w-80%  rounded-10px;
}
</style>

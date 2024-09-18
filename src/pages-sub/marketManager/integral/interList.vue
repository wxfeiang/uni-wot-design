<route lang="json5">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { changeDict, removeT } from '@/utils'
import useInter from './utils/useInter'
const { sendMessageList } = useInter()

defineOptions({
  name: 'interList',
})
const tab = ref(0)
const tablist = ref([
  {
    index: 0,
    title: '全部',
  },
  {
    index: 1,
    title: '收入',
  },
  {
    index: 2,
    title: '支出',
  },
])
const typeList = ref([
  {
    label: '签到',
    value: 1,
  },
  {
    label: '转发',
    value: 2,
  },
  {
    label: '大转盘',
    value: 1,
  },
])
const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const params = {
    number: pageNo,
    size: pageSize,
    incomeExpenses: tab.value,
  }
  // 调用接口获取数据
  try {
    const data: any = await sendMessageList(params)
    dataList.value = data.content
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}

const changeTab = (e) => {
  tab.value = e.index
  paging.value.reload()
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList" :auto-show-system-loading="true">
    <template #top>
      <!-- 顶部 -->
      <dy-navbar leftTitle="我的积分明细" left></dy-navbar>
      <wd-tabs v-model="tab" @change="changeTab">
        <block v-for="item in tablist" :key="item.index">
          <wd-tab :title="item.title"></wd-tab>
        </block>
      </wd-tabs>
    </template>
    <view class="px-10px pt-10px">
      <wd-cell-group>
        <wd-cell
          v-for="(item, index) in dataList"
          :key="index"
          title-width="80%"
          clickable
          custom-class="custom-class-cell"
        >
          <template #title>
            <view class="truncate-1 text-16px">
              {{ changeDict(typeList, item.type * 1) }}
            </view>
          </template>
          <template #label>
            <view class="flex gap-20px color-#888 text-14px">
              <view>{{ removeT(item.createTime) }}</view>
            </view>
          </template>
          <view class="flex justify-center">
            <view
              :class="item.type === '1' ? 'color-#34d19d' : 'color-#fa4350'"
              class="text-16px font-bold"
            >
              {{ item.type === '1' ? '+' : '-' }} {{ item.inCome }}
            </view>
          </view>
        </wd-cell>
      </wd-cell-group>
    </view>
  </z-paging>
</template>

<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
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

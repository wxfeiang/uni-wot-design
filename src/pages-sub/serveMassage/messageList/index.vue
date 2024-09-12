<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useNews from './hooks/useNews'

const { sendMessageList, messageClick } = useNews()

defineOptions({
  name: 'messageList',
})

const tab = ref(0)
const tablist = ref([
  {
    index: 0,
    title: '全部',
  },
  {
    index: 1,
    title: '系统消息',
  },
  {
    index: 2,
    title: '服务通知',
  },
])
const paging = ref(null)
const dataList = ref([
  {
    title: '系统消息',
    isread: true,
    time: '2023-01-01 12:00:00',
    type: 0,
    center:
      '第二十七条 网络游戏上网出版前，必须向所在地省、自治区、直辖市出版行政主管部门提出申请，经审核同意后，报国家新闻出版广电总局审批。',
  },
  {
    title: '服务通知',
    isread: false,
    time: '2023-01-01 12:00:00',
    center: '',
    type: 1,
    data: [
      {
        label: '服务名称',
        value: '必须向所在地省、自治区、直辖市出版行政主管部门提出申',
      },
      {
        label: '服务名称',
        value: '9i34i9',
      },
      {
        label: '服务名称',
        value: '9i34i9',
      },
    ],
  },
])
const queryList = async (pageNo, pageSize) => {
  const data = {
    page: pageNo,
    size: pageSize,
    articleType: '0',
  }
  // 调用接口获取数据
  try {
    // const a = await sendMessageList(data)
    // console.log('🥠[a ]:', a.data.data.content)
    // dataList.value = a.data.data.content

    paging.value.complete(dataList.value)
  } catch (error) {
    console.log('🥒[error]:', error)
    paging.value.complete(false)
  }
}
const changeTab = (e) => {
  tab.value = e.index
  paging.value.reload()
}
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="bg-#F5F6F8"
  >
    <template #top>
      <!-- 顶部 -->
      <dy-navbar leftTitle="消息列表" left></dy-navbar>
      <wd-tabs v-model="tab" @change="changeTab">
        <block v-for="item in tablist" :key="item.index">
          <wd-tab :title="item.title"></wd-tab>
        </block>
      </wd-tabs>
      <wd-gap height="5" bg-color="#f5f5f5"></wd-gap>
    </template>

    <!-- leibiao  -->
    <view v-for="(item, index) in dataList" :key="index" class="px-15px">
      <view class="text-14px color-#999999 py-10px text-center mt-10px">
        {{ item.time }}
      </view>
      <view class="rounded-10px overflow-hidden">
        <wd-cell-group use-slot clickable border>
          <template #title>
            <view class="relative" @click="messageClick(item)">
              <view>
                <text class="ml-5px truncate-1">{{ item.title }}</text>
              </view>
              <view
                class="w-10px h-10px rounded-100 absolute top-[-2px] left-[-5px] bg-#E81010"
                v-if="item.isread"
              ></view>
            </view>
          </template>
          <template #value>
            <wd-icon
              name="arrow-right"
              size="12px"
              color="#BEBEBE"
              @click="messageClick(item)"
            ></wd-icon>
          </template>
          <wd-cell clickable title-width="100%">
            <template #label>
              <!-- 模版判断 -->
              <view class="truncate-5 color-#333" v-if="item.type == 0">{{ item.center }}</view>
              <view class="truncate-5 px-10px" v-if="item.type == 1">
                <view class="flex items-center gap-10px" v-for="(i, idx) in item.data" :key="idx">
                  <view class="color-#999 py-5px max-w-80px truncate-1">{{ i.label }}</view>
                  <view class="color-#000 py-5px truncate-1 flex-1">{{ i.value }}</view>
                </view>
              </view>
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
.t_bg {
  background: rgba($color: #ccc, $alpha: 0.2);
}
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

<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
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
import useNav from '@/hooks/useNav'
import { removeT } from '@/utils/index'
import useNews from './hooks/useGurid'

const { sendMessageList, messageClick } = useNews()
const { navTop } = useNav()

defineOptions({
  name: 'workGuide',
})
const { safeAreaInsets } = uni.getSystemInfoSync()

const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const data = {
    number: pageNo,
    size: pageSize,
    articleType: '6',
  }
  // 调用接口获取数据
  try {
    const a: any = await sendMessageList(data)
    dataList.value = a.data.data.content
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
</script>
<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList" :auto-show-system-loading="true">
    <template #top>
      <wd-navbar
        safeAreaInsetTop
        rightDisabled
        placeholder
        leftArrow
        fixed
        :bordered="false"
        :title="navTitle"
        custom-class="nav_bg"
      >
        <template #left>
          <wd-icon @click="handleClickLeft" name="arrow-left" size="22px" color="#fff"></wd-icon>
        </template>
      </wd-navbar>

      <!--      <dy-title :title="navTitle" customClass="custom-title"></dy-title>-->
    </template>
    <view class="px-10px">
      <!-- leibiao  -->
      <wd-cell-group>
        <wd-cell
          v-for="(item, index) in dataList"
          :key="index"
          title-width="100%"
          clickable
          @click="messageClick(item)"
          custom-class="custom-class-cell"
        >
          <template #title>
            <view class="truncate-1 text-16px">
              {{ item.articleTitle }}
            </view>
          </template>
          <template #label>
            <view class="flex gap-20px color-#888 text-14px">
              <view>日期：{{ removeT(item.createTime) }}</view>
              <!-- <view>
                <wd-icon name="browse" size="14px"></wd-icon>
                {{ item.createBy }}次
              </view> -->
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </z-paging>
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
:deep(.custom-class-cell) {
  background: linear-gradient(90deg, #e2f2ff 0%, #ffffff 100%);

  @apply rounded-6px my-10px;
}
</style>

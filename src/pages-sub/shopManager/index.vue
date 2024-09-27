<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import { serveListProps } from './utils/types'
import useShopServe from './utils/useShopServe'
const title = ref('商家服务')
// TODO: 背景图片
const bg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/5e5f50c4-1a63-4d6d-a59a-f1107adde334shopbg.png',
)

const { serveOrderList, dataList, serveList } = useShopServe()

const toContent = (item: serveListProps) => {
  routeTo({
    url: item.path,
  })
}
</script>
<template>
  <view
    class="bg-#f5f5f5 min-h-100vh bg-no-repeat"
    :style="`background-image: url(${bg});background-size: 100% 160px`"
  >
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    <view class="px-15px py-5px mt-15px">
      <view class="p-10px bg-#fff rounded-4px flex justify-between items-center gap-10px">
        <view
          class="w-1/4 flex flex-col items-center py-10px"
          v-for="(item, index) in serveOrderList"
          :key="index"
          @click="toContent(item)"
        >
          <wd-badge :modelValue="item.value">
            <view>
              <wd-img :src="item.icon" width="26" height="26"></wd-img>
            </view>
          </wd-badge>

          <view class="text-14px mt-10px">
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>
    <view class="px-15px py-5px">
      <view class="p-10px bg-#fff rounded-4px">
        <view class="py-10px font-600 text-16px">数据概览</view>
        <view class="flex justify-between flex-wrap items-center">
          <view
            class="w-1/3.2 bg-#F7F8FC bd-1px-#E8ECFF rounded-5px px-5px py-10px box-border mb-10px"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <view class="color-#7C8896 text-12px py-5px">{{ item.label }}</view>
            <view class="text-18px py-5px pl-10px">{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="px-15px py-5px">
      <view class="p-10px bg-#fff rounded-4px flex justify-start items-start gap-10px">
        <view
          class="w-1/4 flex flex-col items-center py-10px"
          v-for="(item, index) in serveList"
          :key="index"
          @click="toContent(item)"
        >
          <wd-badge :modelValue="item.value">
            <view>
              <wd-img :src="item.icon" width="38" height="38"></wd-img>
            </view>
          </wd-badge>

          <view class="text-13px mt-10px text-center">
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

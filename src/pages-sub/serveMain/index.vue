<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '卡管理kk',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'

const cardUrl = ref('https://cdn.uviewui.com/uview/demo/upload/positive.png')

const mainData = ref([
  {
    title: '社保查询',
    icon: 'card',
    url: cardUrl,
  },
  {
    title: '申请',
    icon: 'order',
    url: cardUrl,
  },
  {
    title: '雄安乐伯',
    icon: 'star',
    url: cardUrl,
  },
  {
    title: '雄安甄选',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '图书借阅',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '金融超市',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '更多',
    icon: 'coupon',
    url: cardUrl,
  },
])

function gridClick(item: any) {
  console.log('🍝')
  if (item.title === '申请') {
    routeTo({ url: '/pages-sub/serveMain/cardApplyType' })
  } else {
    routeTo({ url: '/pages-sub/serveMain/cardFromType' })
  }
}
</script>

<template>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="p-10px">
    <dy-title title="申领"></dy-title>
    <view class="overflow-hidden rounded-t-10px p-10px bg-#fff">
      <wd-grid :column="4" clickable>
        <wd-grid-item
          use-icon-slot
          use-text-slot
          v-for="(item, index) in mainData"
          :key="index"
          custom-class="grid-item"
          @itemclick="gridClick(item)"
        >
          <template #icon>
            <image class="wh-42px rounded-10px" :src="item.url" />
          </template>
          <template #text>
            <view class="text-center mt-10px">{{ item.title }}</view>
          </template>
        </wd-grid-item>
      </wd-grid>
    </view>
  </view>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="p-10px">
    <dy-title title="雄安一卡通服务"></dy-title>
    <view class="overflow-hidden rounded-t-10px p-10px bg-#fff">
      <wd-grid :column="4" clickable>
        <wd-grid-item
          use-icon-slot
          use-text-slot
          v-for="(item, index) in mainData"
          :key="index"
          custom-class="grid-item"
          @itemClick="gridClick(item)"
        >
          <template #icon>
            <image class="wh-42px rounded-10px" :src="item.url" />
          </template>
          <template #text>
            <view class="text-center mt-10px">{{ item.title }}</view>
          </template>
        </wd-grid-item>
      </wd-grid>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}
</style>

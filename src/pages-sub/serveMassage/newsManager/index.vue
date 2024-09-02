<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import orderImg from '../static/images/news/ddxx.png'
import sysImg from '../static/images/news/xtxx.png'
import payImg from '../static/images/news/zfxx.png'
const mainData = ref([
  {
    title: '系统消息',
    type: 'system',
    path: '',
    read: 5,
    icon: sysImg,
    label: '这是一条系统消息',
    time: '2020-2020-2020',
  },
  {
    title: '支付消息  ',
    type: 'pay',
    path: '',
    read: 5,
    icon: payImg,
    label: '这是一条系统消息',
    time: '2020-2020-2020',
  },
  {
    title: '订单消息',
    type: 'order',
    path: 'order',
    read: 1,
    icon: orderImg,
    label: '这是一条系统消息',
    time: '2020-2020-2020',
  },
])
</script>

<template>
  <dy-navbar leftTitle="消息列表" left></dy-navbar>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="px-15px">
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in mainData"
        :key="index"
        custom-class="cell-item"
        title-width="100%"
      >
        <template #icon>
          <view class="cell-icon mt-10px mr-10px">
            <wd-img :src="item.icon" :width="45" :height="45"></wd-img>
          </view>
        </template>
        <template #title>
          <view class="flex justify-between items-center mb-10px">
            <view class="truncate-1 color-#000 font-bold text-16px">{{ item.title }}</view>
            <view class="color-#A3A9B6 text-12px">{{ item.time }}</view>
          </view>
        </template>
        <template #label>
          <view class="flex">
            <view class="color-#999 truncate-1 flex-1">{{ item.label }}</view>
            <view
              v-if="item.read"
              class="size-20px bg-#E81010 rounded-50% text-center color-#fff text-12px line-height-20px"
            >
              {{ item.read }}
            </view>
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
  </view>
</template>

<style lang="scss" scoped>
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}
:deep(.cell-item) {
  @apply pl-0! b-b-amber! items-center;
}
</style>

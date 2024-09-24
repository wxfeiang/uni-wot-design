<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { SetClipboardData } from '@/utils/uniapi'
const title = ref('物流信息')
const logisticsData = ref({
  logisticsName: '申通快递',
  logisticsOrder: '1212323e',
  expressTracesRespVOS: [
    {
      status: '完成',
      acceptTime: '2022-11-22 10:30:00',
      acceptStation: '已签收',
    },
    {
      status: '',
      acceptTime: '2022-11-22 10:30:00',
      acceptStation: '已签收',
    },
  ],
})
// TODO: 对数据做反转
const active = ref(0)
</script>

<template>
  <dy-navbar :leftTitle="title" left></dy-navbar>
  <view v-if="!logisticsData?.expressTracesRespVOS">
    <wd-status-tip image="search" tip="暂无物流信息!" />
  </view>
  <view class="p-10px min-h-100vh bg-#f5f5f5" v-else>
    <view class="p-10px bg-white">
      <view class="flex justify-between items-center mb-10px">
        <view>
          {{ logisticsData.logisticsName }}
          <text class="color-#999 text-12px">{{ logisticsData.logisticsOrder }}</text>
        </view>
        <view>
          <wd-button type="text" block @click="SetClipboardData(logisticsData.logisticsOrder)">
            复制单号
          </wd-button>
        </view>
      </view>
      <view>
        <wd-steps :active="active" vertical dot>
          <wd-step v-for="(item, index) in logisticsData.expressTracesRespVOS" :key="index">
            <template #title>
              <view>{{ item.status }}</view>
            </template>
            <template #description>
              <view>{{ item.acceptStation }}</view>
              <view>{{ item.acceptTime }}</view>
            </template>
          </wd-step>
        </wd-steps>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

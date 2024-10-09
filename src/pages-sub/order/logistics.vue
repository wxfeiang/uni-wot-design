<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import orderInter from './utils/orderInter'

const { getLogistics } = orderInter()

const title = ref('物流信息')

// TODO: 对数据做反转
const active = ref(0)
const orderId = ref(0)
const logisticsData = ref({})

onLoad(async (options) => {
  orderId.value = options.id ? options.id : ''
  const data = await getLogistics({ orderId: orderId.value })
  logisticsData.value = data
})
</script>

<template>
  <dy-navbar :leftTitle="title" left></dy-navbar>
  <view v-if="!logisticsData?.stageList">
    <wd-status-tip image="search" tip="暂无物流信息!" />
  </view>
  <view class="p-10px min-h-100vh bg-#f5f5f5" v-else>
    <view class="p-10px bg-white">
      <view class="flex justify-between items-center mb-10px">
        <view>
          {{ logisticsData.deliveryName }}
          <text class="color-#999 text-12px">{{ logisticsData.waybillId }}</text>
        </view>
        <view>
          <wd-button type="text" block @click="SetClipboardData(logisticsData.logisticsOrder)">
            复制单号
          </wd-button>
        </view>
      </view>
      <view>
        <wd-steps :active="active" vertical dot>
          <wd-step v-for="(item, index) in logisticsData.stageList[0].pathItemList" :key="index">
            <template #title>
              <view>{{ item.status }}</view>
            </template>
            <template #description>
              <view>{{ item.actionMsg }}</view>
              <view>{{ item.actionTime }}</view>
            </template>
          </wd-step>
        </wd-steps>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

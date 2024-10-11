<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo, changeUrlJson } from '@/utils'
import useInter from './utils/useInter'
import quanbg from '../../static/images/integral/quanbg.png'

const title = ref('积分兑换记录')
const dataList = ref([])
const { sendPointsInfoRecordPage } = useInter()
const paging = ref(null)
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    const data: any = await sendPointsInfoRecordPage(params)
    console.log('兑换列表', data)
    paging.value.complete(data.content)
  } catch (error) {
    paging.value.complete(false)
  }
}
onLoad(async (option) => {})
</script>

<template>
  <view class="min-h-100vh bg-#f3f4f6">
    <dy-navbar :leftTitle="title" left isNavShow :placeholder="false" color="#000"></dy-navbar>
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      :paging-style="{ boxSizing: 'border-box', padding: '100px 16px 16px' }"
    >
      <view
        class="w-full bg-white border-rd-6px p-12px box-border mb-13px flex"
        v-for="it in dataList"
        :key="it.id"
        @click="
          routeTo({
            url: '/pages-sub/marketManager/IntegralMarket/IntegralMarket/virtualResult',
            data: { ...changeUrlJson(it) },
          })
        "
      >
        <view class="w-83px">
          <view class="pos-relative" v-if="it.goodSort === 4">
            <wd-img :width="83" :height="75" :src="quanbg"></wd-img>
            <view class="h-full w-full flex justify-center items-center pos-absolute pos-top-none">
              <wd-text :text="it.exchangeNotes" color="#FF4345" size="12px"></wd-text>
            </view>
          </view>
          <wd-img :width="83" :height="75" :src="it.goodImg" v-else></wd-img>
        </view>
        <view class="ml-10px flex-1 flex flex-col justify-between">
          <wd-text :text="it.goodName" bold :lines="2" color="#000" size="16px"></wd-text>
          <view class="w-full flex justify-between">
            <wd-text :text="it.exchangeTime" color="#999" size="12px"></wd-text>
            <view>
              <wd-text :text="it.coinPrice" color="#FF4345" bold size="18px"></wd-text>
              <wd-text text="积分 " color="#FF4345" size="12px"></wd-text>
            </view>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-navbar) {
  width: 100%;
  color: #ffffff !important;
  background-color: transparent !important;
}

:deep(.wd-navbar__title) {
  color: #ffffff !important;
}
</style>

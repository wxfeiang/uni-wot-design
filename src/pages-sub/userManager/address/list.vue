<route lang="json5">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import { routeTo } from '@/utils'
import useAddress from './utils/useAddress'
const { sendList } = useAddress()

const title = ref('收货地址')

const paging = ref(null)
const dataList = ref([
  {
    name: '张三',
    phone: '18794578345',
    address: '雁园街道雁兴路3100号附近基业豪庭',
    isDefault: true,
  },
  {
    name: '张三',
    phone: '18794578345',
    address: '雁园街道雁兴路3100号附近基业豪庭',
    isDefault: false,
  },
])
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    const data: any = await sendList(params)
    console.log('🍛[data]:', data)
    // dataList.value = data.content
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
function addAddress() {
  routeTo({
    url: '/pages-sub/userManager/address/editor',
    data: '',
  })
}
// 返回携带的参数
function selectAddress(item) {
  // TODO:本地存储
  // routeTo({
  //   url: '/pages-sub/userManager/address/editor',
  //   data: item,
  // })
}
function actioAddress(item, type) {
  routeTo({
    url: '/pages-sub/userManager/address/editor',
    data: {
      item,
      type,
    },
  })
}
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    class="bg-#f5f5f5"
    :refresher-enabled="false"
    :loading-more-enabled="false"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left></dy-navbar>
    </template>
    <view class="px-10px mt-10px">
      <view
        class="mb-10px rounded-8px overflow-hidden"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <wd-cell title-width="75%" center clickable @click="selectAddress(item)">
          <template #title>
            <view class="truncate-2 color-#000 flex! items-center gap-10px justify-start!">
              <view mark v-if="item.isDefault">
                <wd-tag type="danger">默认</wd-tag>
              </view>
              <text>
                {{ item.name }}
              </text>
              <text class="#999">
                {{ item.phone }}
              </text>
            </view>
          </template>
          <template #label>
            <view class="color-#999 truncate-2">地址: {{ item.address }}</view>
          </template>
          <view class="flex justify-between items-center gap-10px">
            <view
              class="rounded-full size-30px bg-#f5f5f5 text-center flex justify-center items-center"
              @click.stop="actioAddress(item, '1')"
            >
              <wd-icon name="edit-1" size="14px"></wd-icon>
            </view>
            <view
              class="rounded-full size-30px bg-#f5f5f5 text-center flex justify-center items-center"
              @click.stop="actioAddress(item, '2')"
            >
              <wd-icon name="delete" size="14px"></wd-icon>
            </view>
          </view>
        </wd-cell>
      </view>
    </view>

    <template #bottom>
      <view class="px-10 py-40px">
        <wd-button block custom-class="custom-class-mine-error" @click="addAddress">
          新增收货地址
        </wd-button>
      </view>
    </template>
  </z-paging>
</template>

<style></style>

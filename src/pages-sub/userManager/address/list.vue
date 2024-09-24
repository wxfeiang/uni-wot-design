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

const title = ref('收货地址')
const checkValue = ref(0)
const paging = ref(null)
const dataList = ref([
  {
    name: '张三',
    phone: '18794578345',
    address: '雁园街道雁兴路3100号附近基业豪庭',
    isDefault: false,
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
    // const data: any = await sendMessageList(params)
    // dataList.value = data.content as signInDetailRopos[]
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
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :auto-show-system-loading="true"
    class="bg-#f5f5f5"
  >
    <template #top>
      <dy-navbar :leftTitle="title" left></dy-navbar>
    </template>
    <view class="px-10px mt-10px">
      <view
        class="rounded-7px bg-white p-15px box-border mb-15px"
        v-for="(item, index) in dataList"
        :key="index"
        @click="selectAddress(item)"
      >
        <view>{{ item.name }} {{ item.phone }}</view>
        <view class="w-full my-10px truncate-2">{{ item.address }}</view>
        <view class="w-full flex justify-between items-center">
          <wd-checkbox v-model="item.isDefault" size="large" checked-color="#f44d24">
            设为默认
          </wd-checkbox>
          <view style="color: #666666">
            <wd-icon name="edit-1" size="16px" style="margin-right: 3px"></wd-icon>
            编辑
            <wd-icon
              name="delete"
              size="16px"
              style="margin-right: 3px; margin-left: 10px"
            ></wd-icon>
            删除
          </view>
        </view>
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

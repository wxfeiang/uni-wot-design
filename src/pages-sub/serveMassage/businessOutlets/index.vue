<route lang="json5" type="page">
{
  needLogin: true,
  style: {
    navigationBarTitleText: '服务网点',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>

<script lang="ts" setup>
import { useBaseStore } from '@/store'
import { getLocation } from '@/utils/uniapi'
import useBusinessOutlets from './hooks/businessOutlets'
const basestore = useBaseStore()
onLoad(async (options: any) => {
  const location = await getLocation()
  console.log('🍾[location]:', location)
  basestore.setLocation(location)
})

const { sendbranchesInfo, loading } = useBusinessOutlets()

function toPhone(e) {
  uni.makePhoneCall({
    phoneNumber: e.phone,
    fail: function (e) {},
  })
}
function toLocation(e) {
  uni.openLocation({
    latitude: e.dimension * 1,
    longitude: e.longitude * 1,
    name: e.name,
    address: e.address,
  })
}

const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  // const data = {
  //   page: pageNo,
  //   size: pageSize,
  //   articleType: '0',
  // }
  // 调用接口获取数据
  try {
    const res: any = await sendbranchesInfo()
    dataList.value = res.data.data
    paging.value.complete(dataList.value)
  } catch (error) {
    console.log('🥒[error]:', error)
    paging.value.complete(false)
  }
}
const changeDe = (data) => {
  const company = 'km'
  let num = '0'
  num = (data / 1000).toFixed(1)
  return num + company
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :refresher-enabled="false"
    :auto-show-system-loading="true"
  >
    <wd-gap bg-color="#f5f5f5"></wd-gap>
    <view class="p-10px">
      <!-- <dy-title title="服务网点" class="py-10px"></dy-title> -->
      <wd-cell-group border>
        <wd-cell
          v-for="(item, index) in dataList"
          :key="index"
          :to="item.url"
          custom-class="cell-item"
          title-width="60%"
        >
          <template #icon>
            <view
              class="cell-icon mt-10px mr-10px p-4px bg-blue size-20px color-#fff text-center rounded-4px"
            >
              {{ item.name[0] }}
            </view>
          </template>
          <template #title>
            <view class="truncate-1 color-#000">{{ item.name }}</view>
          </template>
          <template #label>
            <view class="color-#999 truncate-3">地址: {{ item.address }}</view>
          </template>

          <view class="pt-10px">
            <view class="color-#999">距离: {{ changeDe(item.distance) }}</view>
            <view class="flex gap-20px justify-end mt-4px">
              <view class="flex flex-col items-center" @click="toLocation(item)">
                <view class="i-carbon-location-heart-filled color-#999"></view>
                <view class="text-center color-#999">导航</view>
              </view>
              <view class="flex flex-col items-center" @click="toPhone(item)">
                <view class="i-carbon-phone-voice-filled color-#999"></view>
                <view class="text-center color-#999">电话</view>
              </view>
            </view>
          </view>
        </wd-cell>
      </wd-cell-group>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}
:deep(.cell-item) {
  @apply pl-0! b-b-amber! items-center;
}
</style>

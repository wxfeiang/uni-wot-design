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
import defaultImg from '@/static/images/logo.png'
import { useBaseStore } from '@/store'
import { getLocation } from '@/utils/uniapi'
import gdyh from '../static/images/businessOutlets/gdyh.png'
import gsyh from '../static/images/businessOutlets/gsyh.png'
import jsyh from '../static/images/businessOutlets/jsyh.png'
import jtyh from '../static/images/businessOutlets/jtyh.png'
import nyyh from '../static/images/businessOutlets/nyyh.png'
import zgyh from '../static/images/businessOutlets/zgyh.png'
import zxyh from '../static/images/businessOutlets/zxyh.png'
import useBusinessOutlets from './hooks/businessOutlets'
const baseStore = useBaseStore()
const bankLogoList = ref([
  {
    logo: gsyh,
    title: '工商银行',
  },
  {
    logo: jtyh,
    title: '交通银行',
  },
  {
    logo: jsyh,
    title: '建设银行',
  },
  {
    logo: zgyh,
    title: '中国银行',
  },
  {
    logo: nyyh,
    title: '农业银行',
  },
  {
    logo: gdyh,
    title: '招商银行',
  },

  {
    logo: zxyh,
    title: '中信银行',
  },
  {
    logo: '',
    title: '浦发银行',
  },
  {
    logo: '',
    title: '邮政储蓄银行',
  },
  {
    logo: '',
    title: '民生银行',
  },
])
function getLogo(data: string) {
  return bankLogoList.value.find((item) => data.indexOf(item.title) !== -1).logo ?? defaultImg
}
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
onMounted(async () => {
  location()
})
const location = async () => {
  try {
    const location = await getLocation()
    await baseStore.setLocation(location)
    paging.value.reload()
  } catch (error) {
    uni.showToast({ title: '定位失败', icon: 'none' })
    paging.value.reload()
  }
}

const queryList = async (pageNo, pageSize) => {
  // 调用接口获取数据
  try {
    const params = {
      number: pageNo,
      size: pageSize,
      yhdm: '',
      areaCode: '',
      isMail: '',
      longitude: baseStore.userLocation?.longitude?.toString(),
      dimension: baseStore.userLocation?.latitude?.toString(),
    }
    uni.showLoading({ title: '加载中' })
    const res: any = await sendbranchesInfo(params)
    dataList.value = res.data.data.content
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
  <!--     -->
  <!-- <view v-if="!baseStore.userLocation.longitude">
    <wd-status-tip image="search" tip="暂无网点信息" />
  </view> -->

  <z-paging
    ref="paging"
    v-model="dataList"
    :refresher-enabled="false"
    :loading-more-enabled="false"
    :auto-show-system-loading="true"
    @query="queryList"
    :auto="false"
  >
    <view>
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
              <view class="mt-10px mr-10px">
                <wd-img :src="getLogo(item.name)" :width="30" :height="30"></wd-img>
              </view>
            </template>
            <template #title>
              <view class="truncate-2 color-#000">{{ item.name }}</view>
            </template>
            <template #label>
              <view class="color-#999 truncate-2">地址: {{ item.address }}</view>
            </template>

            <view class="pt-10px">
              <view class="color-#999" v-if="item.distance">
                距离: {{ changeDe(item.distance) }}
              </view>
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

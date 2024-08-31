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
import { routeTo } from '@/utils'
import { useLocation } from '@/utils/uniapi'
import gdyh from '../static/images/businessOutlets/gdyh.png'
import gsyh from '../static/images/businessOutlets/gsyh.png'
import jsyh from '../static/images/businessOutlets/jsyh.png'
import jtyh from '../static/images/businessOutlets/jtyh.png'
import nyyh from '../static/images/businessOutlets/nyyh.png'
import zgyh from '../static/images/businessOutlets/zgyh.png'
import zxyh from '../static/images/businessOutlets/zxyh.png'

const cardUrl = ref('https://cdn.uviewui.com/uview/demo/upload/positive.png')
const banner = ref('../static/images/banner.png')

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

const mainData = ref([
  {
    title: '工商银行',
    icon: 'card',
    url: cardUrl,
    lable:
      '兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦',
    longitude: 103.834,
    latitude: 36.0613,
    distance: '120米',
    tel: '0931-1234567',
  },
  {
    title: '农业银行',
    icon: 'card',
    url: cardUrl,
    lable:
      '兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦',
    longitude: 103.834,
    latitude: 36.0613,
    distance: '120米',
    tel: '0931-1234567',
  },
  {
    title: '建设银行',
    icon: 'card',
    url: cardUrl,
    lable:
      '兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦',
    longitude: 103.834,
    latitude: 36.0613,
    distance: '120米',
    tel: '0931-1234567',
  },
  {
    title: '中国银行',

    icon: 'card',
    url: cardUrl,
    lable:
      '兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦',
    longitude: 103.834,
    latitude: 36.0613,
    distance: '120米',
    tel: '0931-1234567',
  },
  {
    title: '交通银行',
    icon: 'card',
    url: cardUrl,
    lable:
      '兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦',
    longitude: 103.834,
    latitude: 36.0613,
    distance: '120米',
    tel: '0931-1234567',
  },
])

function getLogo(data: string) {
  return bankLogoList.value.find((item) => data.indexOf(item.title) !== -1).logo
}

function gridClick(item: any) {
  console.log('🍝')
  if (item.title === '申请') {
    routeTo({ url: '/pages-sub/serveMain/cardApplyType' })
  } else {
    routeTo({ url: '/pages-sub/serveMain/cardFromType' })
  }
}

function toPhone(e) {
  uni.makePhoneCall({
    phoneNumber: '0931-1234567',
    fail: function (e) {
      console.log('🍥', e)
    },
  })
}
function toLocation(e) {
  uni.openLocation({
    latitude: e.latitude,
    longitude: e.longitude,
    name: e.title,
    address: e.lable,
  })
}
onMounted(async () => {
  console.log('🍝')
  const location = await useLocation()
  console.log('🍥[location]:', location)
})
</script>

<template>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="p-10px">
    <dy-title title="服务网点" class="py-10px"></dy-title>
    <image class="h-100px" :src="banner"></image>

    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in mainData"
        :key="index"
        :to="item.url"
        custom-class="cell-item"
        title-width="70%"
      >
        <template #icon>
          <view class="mt-10px mr-10px">
            <wd-img :src="getLogo(item.title)" :width="30" :height="30"></wd-img>
          </view>
        </template>
        <template #title>
          <view class="truncate-1 color-#000">{{ item.title }}</view>
        </template>
        <template #label>
          <view class="color-#999 truncate-3">地址: {{ item.lable }}</view>
        </template>

        <view class="pt-10px">
          <view class="truncate-1 color-#999">距离 : {{ item.distance }}</view>
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
</template>

<style lang="scss" scoped>
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}
:deep(.cell-item) {
  @apply pl-0! b-b-amber! items-center;
}
</style>

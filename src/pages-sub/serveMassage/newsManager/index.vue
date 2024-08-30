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

const cardUrl = ref('https://cdn.uviewui.com/uview/demo/upload/positive.png')
const banner = ref('../static/images/banner.png')

const mainData = ref([
  {
    title: '社保查询',
    icon: 'card',
    url: 'https://img0.baidu.com/it/u=3265037425,1108192406&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
    lable:
      '兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦兰州市城关区高欣大厦',
    longitude: 103.834,
    latitude: 36.0613,
    distance: '120米',
    tel: '0931-1234567',
  },
  {
    title: '保查询',
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
    title: '保查询',
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
    title: '社保查询',
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
    title: '社保查询',
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
  <view class="p-20px">
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in mainData"
        :key="index"
        :to="item.url"
        custom-class="cell-item"
        title-width="100%"
      >
        <template #icon>
          <view class="cell-icon mt-10px mr-10px">
            <wd-img :src="item.url" :width="45" :height="45"></wd-img>
          </view>
        </template>
        <template #title>
          <view class="flex justify-between items-center">
            <view class="truncate-1 color-#000 font-bold mb-10px text-16px">{{ item.title }}</view>
            <view class="color-#A3A9B6 text-12px">2020-2020-2020</view>
          </view>
        </template>
        <template #label>
          <view class="flex">
            <view class="color-#999 truncate-1 flex-1">地址: {{ item.lable }}</view>
            <view
              class="size-20px bg-#E81010 rounded-50% text-center color-#fff text-12px line-height-20px"
            >
              5
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

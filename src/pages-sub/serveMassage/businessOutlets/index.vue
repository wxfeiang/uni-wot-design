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
import useCardMessage from './hooks/businessOutlets'

const { cardInfoData } = useCardMessage()

function toPhone(e) {
  uni.makePhoneCall({
    phoneNumber: e.phone,
    fail: function (e) {},
  })
}
function toLocation(e) {
  uni.openLocation({
    latitude: Number(e.latitude),
    longitude: Number(e.longitude),
    name: e.name,
    address: e.address,
  })
}
</script>

<template>
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="p-10px">
    <!-- <dy-title title="服务网点" class="py-10px"></dy-title> -->
    <wd-cell-group border>
      <wd-cell
        v-for="(item, index) in cardInfoData"
        :key="index"
        :to="item.url"
        custom-class="cell-item"
        title-width="70%"
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
          <view class="truncate-1 color-#999">距离 : {{ item.distance || '100 米' }}</view>
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

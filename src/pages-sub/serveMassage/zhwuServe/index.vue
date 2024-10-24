<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import { useToLocation, useToPhone } from '@/utils/uniapi'
import { useToast } from 'wot-design-uni'
import dizhi from '../static/images/zhenwu/dizhi.png'
import phone from '../static/images/zhenwu/phone.png'
import time from '../static/images/zhenwu/time.png'
import zhenwu from '../static/images/zhenwu/zhenwu.png'
import zhenwuTitle from '../static/images/zhenwu/zhenwuTitle.png'
import zhenwuicon from '../static/images/zhenwu/zhenwuicon.png'

// import SugItem from './components/SugItem.vue'
// import useSuggest from './utils/useSuggest'
const toast = useToast()

function toDetil(item) {
  routeTo({
    url: '/pages-sub/userManager/suggest/suggestDetil',
    data: { id: item.adviceId },
  })
}
const paging = ref(null)
const dataList = ref([
  {
    id: 1,
    title: '雄安新区政务服务中心',
    address: '河北省雄安新区容城县奥威路16号（奥威路与罗萨大街交叉口西80米）',
    phone: '0312-5671358',
    latitude: 115.877677,
    longitude: 39.041988,

    processingTime: [
      '工作日:上午9:00-12:00，下午12:30-17:00;',
      '双休日、节假日“不打烊”办理时间:上午9:00-11:30，下午14:00-17:00',
    ],
  },
  {
    id: 2,
    title: '雄县政务服务中心',
    address: '河北雄安新区雄县鑫盛街40号',
    phone: '0312-5560006',
    latitude: 116.09929,
    longitude: 39.010136,
    processingTime: [
      '工作日:秋冬春季(9月1日-5月31日)上午8:30-12:00，下午13:30-17:30；',
      '夏季(6月1日-8月31日)上午8:30-12:00，下午14:30-17:30，法定节假日除外。',
    ],
  },
  {
    id: 3,
    title: '容城县政务服务中心',
    address: '河北省雄安新区容城县容美路38号',
    phone: '0312-5696927',
    longitude: 39.034846,
    latitude: 115.891159,
    processingTime: [
      '工作日:秋冬春季(9月1日-5月31日)上午8:30-12:00，下午13:30-17:30；',
      '夏季(6月1日-8月31日)上午8:30-12:00，下午14:30-17:30，法定节假日除外。',
    ],
  },
  {
    id: 4,
    title: '安新县政务服务中心',
    address: '河北省雄安新区安新县建设大街266号',
    phone: '0312-5355000',
    longitude: 38.945836,
    latitude: 115.932871,
    processingTime: [
      '工作日:秋冬春季(9月1日-5月31日)上午8:30-12:00，下午13:30-17:30；',
      '夏季(6月1日-8月31日)上午8:30-12:00，下午14:30-17:30，法定节假日除外。',
    ],
  },
])
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    // await sendAdvicelist(params)
    paging.value.complete(dataList.value)
  } catch (error) {
    paging.value.complete(false)
  }
}
const timeShow = ref(false)
const currentData = ref({
  id: 4,
  title: '安新县政务服务中心',
  address: '河北省雄安新区安新县建设大街266号',
  phone: '0312-5355000',
  longitude: 38.945836,
  latitude: 115.932871,
  processingTime: [
    '工作日:秋冬春季(9月1日-5月31日)上午8:30-12:00，下午13:30-17:30；',
    '夏季(6月1日-8月31日)上午8:30-12:00，下午14:30-17:30，法定节假日除外。',
  ],
})
function timeClick(item) {
  currentData.value = item
  timeShow.value = true
}
function timeclose(e) {
  timeShow.value = false
}
const footerBtns2 = ref([
  {
    text: '办事预约',
    size: 'medium',
    round: false,
    plain: true,
    type: 'primary',
    action: 'continue',
    customClass: 'btn-class',
  },
  {
    text: '预约记录',
    size: 'medium',
    round: false,
    plain: true,
    type: 'primary',
    customClass: 'custom-class-mine-dyinfo',
    action: 'over',
  },
])
async function btnClick(item) {
  toast.show('功能开发中，敬请期待!...')
}
</script>
<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    :auto-show-system-loading="true"
    :safe-area-inset-bottom="true"
  >
    <template #top>
      <!-- 顶部 -->
      <dy-navbar leftTitle="" left isNavShow color="#000"></dy-navbar>
      <view class="flex justify-around items-center px-10px">
        <wd-img :src="zhenwuTitle" width="187" height="81"></wd-img>
        <wd-img :src="zhenwu" width="174" height="174"></wd-img>
      </view>
    </template>
    <view class="px-10px pt-10px">
      <view
        class="px-10px py-3px bg-#fff rounded-5px mb-10px"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <view class="flex justify-between items-center py-10px">
          <view class="flex items-center gap-5px">
            <wd-img :src="zhenwuicon" width="18" height="18"></wd-img>
            <view class="text-16px font-600">{{ item.title }}</view>
          </view>
          <view class="flex items-center gap-5px" @click="timeClick(item)">
            <wd-img :src="time" width="18" height="18"></wd-img>
            <view class="text-12px color-#2D69EF">办理时间</view>
          </view>
        </view>
        <view
          class="flex justify-between items-center py-10px bb-1px_#ECECEC_dashed ml-20px pr-10px text-14px color-#999"
          @click="useToLocation(item)"
        >
          <view>地址: {{ item.address }}</view>
          <view>
            <wd-img :src="dizhi" width="16" height="18"></wd-img>
          </view>
        </view>
        <view
          class="flex justify-between items-center py-10px ml-20px pr-10px text-14px color-#999"
          @click="useToPhone(item)"
        >
          <view>电话: {{ item.phone }}</view>
          <view>
            <wd-img :src="phone" width="16" height="16"></wd-img>
          </view>
        </view>
      </view>
    </view>
    <!-- <template #bottom>
      <!~~ 底部 ~~>
      <view class="p-10px bg-#fff">
        <view class="flex gap-15px">
          <view class="flex-1" v-for="(item, index) in footerBtns2" :key="index">
            <wd-button
              :round="item.round"
              block
              :size="item.size"
              :type="item.type"
              :customClass="item.customClass"
              @click="btnClick(item)"
            >
              {{ item.text }}
            </wd-button>
          </view>
        </view>
      </view>
    </template>-->
  </z-paging>
  <wd-popup
    v-model="timeShow"
    custom-style=""
    @close="timeShow = false"
    custom-class="custom-class-pop"
  >
    <view class="bg-#fff rounded-5px p-10px pb-30px relative">
      <view class="text-center text-18px font-600 py-10px">办理时间</view>
      <view class="absolute top-20px right-20px" @click="timeShow = false">
        <wd-icon name="close" size="18px" color="#000"></wd-icon>
      </view>

      <view
        class="py-5px color-#555 text-16px px-15px"
        v-for="(item, index) in currentData!.processingTime"
        :key="index"
      >
        {{ item }}
      </view>
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped>
:deep(.z-paging-content) {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 40%, #f2f3f7 100%) !important;
}
:deep(.custom-class-pop) {
  @apply w-80%  rounded-10px;
}
</style>

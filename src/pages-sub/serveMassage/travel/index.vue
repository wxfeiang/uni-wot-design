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
import { useToLocation } from '@/utils/uniapi'
import { useToast } from 'wot-design-uni'
import bgimg from '../static/images/travel/bgimg.png'
import title from '../static/images/travel/title.png'
import dizhi from '../static/images/zhenwu/dizhi.png'
import useTravel from './utils/useTravel'
const { list, imgArr } = useTravel()

const toast = useToast()

function toDetil(index) {
  routeTo({
    url: '/pages-sub/serveMassage/travel/detle',
    data: { index },
  })
}
const paging = ref(null)
const dataList = ref([])
const queryList = async (pageNo, pageSize) => {
  const params = {
    page: pageNo,
    size: pageSize,
  }
  // 调用接口获取数据
  try {
    // await sendAdvicelist(params)

    paging.value.complete(list.content)
  } catch (error) {
    paging.value.complete(false)
  }
}
const timeShow = ref(false)

const footerBtns2 = ref([
  {
    text: '出示二维码',
    size: 'medium',
    round: false,
    plain: true,
    type: 'primary',
    action: 'continue',
    customClass: 'btn-class',
  },
  {
    text: '我的门票',
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
        <wd-img :src="title" width="187" height="81"></wd-img>
        <wd-img :src="bgimg" width="174" height="174"></wd-img>
      </view>
    </template>
    <view class="px-10px pt-10px">
      <view
        class="px-10px py-5px bg-#fff rounded-5px mb-10px flex items-center gap-10px"
        v-for="(item, index) in dataList"
        :key="index"
        @click="toDetil(index)"
      >
        <view class="rounded-4px overflow-hidden h-74px">
          <wd-img :src="item.img" width="94" height="74"></wd-img>
        </view>
        <view class="flex-1">
          <view class="text-16px font-600">
            {{ item.name }}
          </view>
          <view
            class="flex justify-between items-center bb-1px_#ECECEC pr-10px text-14px color-#999 truncate-1 line-height-30px"
          >
            <view>地址: {{ item.address }}</view>
          </view>
          <view
            class="flex justify-between items-center py-10px pr-10px text-14px color-#999"
            @click.stop="useToLocation(item)"
          >
            <view>距您: {{ item.distance }}</view>
            <view>
              <wd-img :src="dizhi" width="16" height="18"></wd-img>
            </view>
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
</template>

<style lang="scss" scoped>
:deep(.z-paging-content) {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 40%, #f2f3f7 100%) !important;
}
:deep(.custom-class-pop) {
  @apply w-80%  rounded-10px;
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  realNameAuthentication: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getUserCardDetail } from '@/service/api/userMessage'
import { useUserStore } from '@/store'
import { changeDict, dataDesensitization } from '@/utils/index'
import { useRequest } from 'alova/client'
import { storeToRefs } from 'pinia'
import userCardSev from './utils/userCardSev'
const { statusList } = userCardSev()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const title = ref('我的社保')
// 查询详情
const {
  send: sendCardDetail,
  data: cardDetailData,
  loading,
} = useRequest((data) => getUserCardDetail(data), {
  immediate: false,
  loading: false,
  initialData: [],
})

const dataList = ref([
  {
    title: '姓名',
    props: 'cardName',
  },
  {
    title: '社会保障卡号码',
    props: 'socialCardNum',
    showeys: true,
  },
  {
    title: '社会保障卡卡号',
    props: 'socialCard',
    showeys: true,
  },
  {
    title: '社保卡银行账户发卡行',
    props: 'bankCard',
  },
  {
    title: '社保卡银行卡号',
    props: 'bankCard',
    isbangk: true,
  },
  {
    title: '交通卡号 ',
    props: 'trafficNumber',
  },
  {
    title: ' 京雄通号',
    props: 'jingxiongNumber',
  },
  {
    title: ' 社保卡状态',
    props: 'cardStatus',
    isStatus: true,
  },
  {
    title: '发卡地',
    props: 'cardIssueOrg',
  },
  {
    title: '参保地',
    props: 'cardIssueOrsdg',
  },
])
const privacyStatus = ref(false)

const status = ref(true)

onLoad(async () => {
  try {
    await sendCardDetail({ cardId: userInfo.value.cardId })
    console.log('🍰', cardDetailData.value)
    // if(cardDetailData.value && cardDetailData.value.bankCard) {

    // }
  } catch (error) {
    console.log('🍡[error]:', error)
    status.value = false
  }
})
</script>

<template>
  <view class="w-100vw h-100vh dy-blue-bg box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    <view class="p-15px">
      <view v-if="cardDetailData && !loading && status">
        <wd-cell-group>
          <wd-cell title-width="80%" clickable custom-class="custom-class-cell">
            <template #title>
              <view class="truncate-1 text-16px font-600">
                {{ cardDetailData[dataList[0].props] }}
              </view>
            </template>
            <template #label>
              <view class="flex gap-20px color-#888 text-14px mt-10px">
                社会保障卡号码: {{ cardDetailData[dataList[1].props] }}
              </view>
            </template>
            <view class="flex">
              <view class="relative w-60px h-50px">
                <view
                  class="absolute top-[-10px] right-0 px-10px py-2px text-12px rounded-lb-15px"
                  :style="changeDict(statusList, cardDetailData[dataList[6].props], 'bg', 'label')"
                >
                  {{ cardDetailData[dataList[6].props] }}
                </view>
              </view>
            </view>
          </wd-cell>
        </wd-cell-group>
        <view class="bg-#fff pt-40px pb-5px">
          <view class="mt-[-20px]" v-for="item in dataList.slice(2)" :key="item.props">
            <wd-cell-group>
              <wd-cell clickable custom-class="custom-class-cell">
                <template #label>
                  <view class="flex gap-20px color-#999 text-14px">{{ item.title }}</view>
                </template>
                <view class="flex items-center gap-10px justify-end">
                  <template v-if="item.showeys">
                    {{ cardDetailData[item.props] }}
                    <view class="text-right color-#000">
                      {{ dataDesensitization(cardDetailData[item.props], privacyStatus, 'center') }}
                    </view>
                    <!-- <wd-icon
                      :name="privacyStatus ? 'view' : 'eye-close'"
                      size="22px"
                      @click="privacyStatus = !privacyStatus"
                    ></wd-icon> -->
                  </template>
                  <template v-if="item.isStatus">
                    <view
                      :style="changeDict(statusList, cardDetailData[item.props], 'bg', 'label')"
                    >
                      {{ cardDetailData[item.props] }}
                    </view>
                  </template>
                  <template v-else>
                    <view>
                      {{ cardDetailData[item.props] }}
                    </view>
                    <!-- FIX:暂时注释 -->
                    <!-- <view v-if="item.isbangk" class="color-#4077F2">(已绑卡)</view> -->
                  </template>
                </view>
              </wd-cell>
            </wd-cell-group>
          </view>
        </view>
      </view>
      <template v-else>
        <view class="bg-#fff py-20px">
          <wd-status-tip image="search" tip="没有查询到该信息" />
        </view>
      </template>
    </view>
    <view></view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-cell-group),
:deep(.wd-cell-group__body) {
  @apply bg-transparent!;
}
:deep(.custom-class-cell) {
  @apply rounded-6px! mb-10px! overflow-hidden!;
}
:deep(.wd-cell__wrapper) {
  @apply items-center!;
}
</style>

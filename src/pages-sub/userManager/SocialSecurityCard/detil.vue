<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { dataDesensitization } from '@/utils/index'
const title = ref('我的社保')
const dataList = ref([
  {
    title: '姓名',
    value: '李思思',
    props: 'username',
  },
  {
    title: '社会保障卡号码',
    value: '123456789',
    props: 'cardNo',
    showeys: true,
  },
  {
    title: '社保卡银行账户发卡行',
    value: '招商银行',
    props: 'cardStatus',
  },
  {
    title: '社保卡银行卡号',
    value: '233434',
    props: 'cardType',
    isbangk: true,
  },
  {
    title: '交通卡号 ',
    value: '6789',
    props: 'cardLevel',
  },
  {
    title: ' 京雄通号',
    value: '2022-01-01',
    props: 'cardIssueDate',
  },
  {
    title: ' 社保卡状态',
    value: '正常',
    props: 'cardExpireDate',
    isStatus: true,
  },
  {
    title: '发卡地',
    value: 'XX社保局',
    props: 'cardIssueOrg',
  },
  {
    title: '参保地',
    value: 'XX社保局',
    props: 'cardIssueOrsdg',
  },
])
const privacyStatus = ref(false)
</script>

<template>
  <view class="w-100vw h-100vh dy-blue-bg box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    <view class="p-15px">
      <view v-if="!dataList">
        <wd-cell-group>
          <wd-cell title-width="80%" clickable custom-class="custom-class-cell">
            <template #title>
              <view class="truncate-1 text-16px font-600">{{ dataList[0].value }}</view>
            </template>
            <template #label>
              <view class="flex gap-20px color-#888 text-14px mt-10px">
                社会保障卡号码: {{ dataList[1].value }}
              </view>
            </template>
            <view class="flex">
              <view class="relative w-60px h-50px">
                <view class="absolute top-[-10px] right-0 px-10px py-2px text-12px rounded-lb-15px">
                  正常
                </view>
              </view>
            </view>
          </wd-cell>
        </wd-cell-group>
        <view class="bg-#fff pt-40px pb-5px">
          <view class="mt-[-20px]" v-for="item in dataList.slice(1)" :key="item.props">
            <wd-cell-group>
              <wd-cell clickable custom-class="custom-class-cell">
                <template #label>
                  <view class="flex gap-20px color-#999 text-14px">{{ item.title }}</view>
                </template>
                <view class="flex items-center gap-10px justify-end">
                  <template v-if="item.showeys">
                    <view class="text-right color-#000">
                      {{ dataDesensitization(item.value, privacyStatus) }}
                    </view>
                    <wd-icon
                      :name="privacyStatus ? 'view' : 'eye-close'"
                      size="22px"
                      @click="privacyStatus = !privacyStatus"
                    ></wd-icon>
                  </template>
                  <template v-else>
                    <view class="color-#000" :class="{ 'color-#51A014': item.isStatus }">
                      {{ item.value }}
                    </view>
                    <view v-if="item.isbangk" class="color-#4077F2">(已绑卡)</view>
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

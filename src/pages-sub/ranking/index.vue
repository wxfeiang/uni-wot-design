<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '排行榜',
  },
}
</route>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import RankList from './components/list.vue'
import useHostory from './hooks/useHostory'
import { rankType } from './types/types'
const { isLogined, userInfo } = useUserStore()
const { hList, RList } = useHostory()
const tab = ref<number>(0)
const tabList = [
  {
    label: '考试记录',
    value: 0,
  },
  {
    label: '月排行榜',
    value: 1,
  },
]
</script>
<template>
  <view class="">
    <wd-tabs v-model="tab">
      <block v-for="(item, index) in tabList" :key="index">
        <wd-tab :title="item.label">
          <template v-if="tab === 0">
            <template v-if="isLogined">
              <view class="flex justify-between items-center px-20px py-10px bd-1px_solid_#f5f5f5">
                <view class="flex items-center">
                  <wd-img :width="50" :height="50" :src="userInfo.avatar" round />
                  <text class="ml-10px">您的历史最高成绩{{}} 0 分</text>
                </view>
                <view>
                  <wd-button type="primary" size="small">去考试</wd-button>
                </view>
              </view>
            </template>
            <template v-else>
              <view class="flex justify-between items-center px-20px py-10px bd-1px_solid_#f5f5f5">
                <view class="flex items-center">
                  <wd-img
                    :width="50"
                    :height="50"
                    :src="userInfo.avatar"
                    round
                    class="bg-coolGray"
                  />
                  <text class="ml-10px">无考试成绩</text>
                </view>
                <view>
                  <wd-button type="primary" size="small">去考试</wd-button>
                </view>
              </view>
            </template>
            <Rank-List :Hlist="hList" :type="rankType.History"></Rank-List>
          </template>

          <template v-if="tab === 1">
            <Rank-List :Rlist="RList" :type="rankType.Rank"></Rank-List>
          </template>
        </wd-tab>
      </block>
    </wd-tabs>
  </view>
  <view></view>
</template>

<style lang="scss" scoped></style>

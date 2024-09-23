<route lang="json5" type="page">
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

const title = ref('确认订单')

async function getList(item: any) {
  uni.showLoading({ title: '' })
  // 这里是请求数据
  list.value = 10
  state.value = 'loading'
  await uni.hideLoading()
}

function changeTab(e) {
  tabsVal.value = e.index
  console.log(e)
}

const gopath = function (e) {
  routeTo({
    url: '/pages-sub/marketManager/IntegralMarket/info',
    data: e,
  })
}

onLoad(async () => {
  // await getList()
})
</script>

<template>
  <view class="pageBoxBg w-screen">
    <dy-navbar :leftTitle="title" left></dy-navbar>
    <view class="pt-4">
      <wd-card>
        <template #title>
          <wd-text
            text="甘肃省兰州市城关区雁南街道"
            :lines="1"
            size="14px"
            color="#888888"
          ></wd-text>
        </template>

        <view class="flex justify-between items-center">
          <wd-text
            text="雁园街道雁兴路3100号附近基业豪庭"
            :lines="2"
            size="16px"
            color="#000000"
            class="font-bold"
          ></wd-text>
          <wd-icon name="arrow-right" size="22px" color="#000000"></wd-icon>
        </view>
        <template #footer>
          <view class="flex justify-left items-center">
            <wd-text text="张三18794578345" :lines="1" size="14px" color="#000000"></wd-text>
          </view>
        </template>
      </wd-card>
      <wd-card>
        <template #title>
          <view class="flex justify-left items-center">
            <wd-img
              :width="30"
              :height="30"
              round
              src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
            />
            <wd-text text="无备注" :lines="2" size="16px" color="#777777" class="ml-1"></wd-text>
          </view>
        </template>
        <view class="flex justify-between items-center mt-2 mb-2">
          <wd-img
            :width="100"
            :height="100"
            radius="7"
            src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
          />
          <view class="mb-4 ml-2 flex-1">
            <wd-text
              text="知味观糕点礼盒杭州特产中式送礼送长辈中式糕点心中秋月节饼"
              :lines="2"
              size="16px"
              color="#000000"
              class="font-bold"
            ></wd-text>
            <wd-text text="圆形铁盒/盒" :lines="1" size="14px" color="#757575"></wd-text>
            <view class="flex justify-left items-center">
              <wd-text
                text="32111"
                :lines="2"
                size="18px"
                color="#F44D24"
                class="font-bold"
              ></wd-text>
              <wd-text text="积分" :lines="2" size="12px" color="#F44D24" class="ml-1"></wd-text>
            </view>
          </view>
        </view>
        <template #footer>
          <view>
            <view class="flex justify-between items-center mb-4">
              <wd-text text="订单运费" :lines="2" size="16px" color="#000000"></wd-text>
              <wd-text text="包邮" :lines="2" size="16px" color="#000000"></wd-text>
            </view>
            <view class="flex justify-between items-center mb-2">
              <wd-text text="备注" :lines="2" size="16px" color="#000000"></wd-text>
              <view class="flex justify-left items-center">
                <wd-text text="无备注" :lines="2" size="16px" color="#777777"></wd-text>
                <wd-icon name="arrow-right" size="16px" color="#777777"></wd-icon>
              </view>
            </view>
          </view>
        </template>
      </wd-card>
    </view>
    <view class="p4 fixed b0 w-full box-border" style="bottom: 0px">
      <wd-button block custom-class="duihuanBtn" :round="false">提交兑换</wd-button>
    </view>
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  min-height: calc(100vh - 50px);
  background: #f3f4f6;
}

:deep(.duihuanBtn) {
  background: #f44d24 !important;
}

:deep(.wd-card__footer) {
  padding-top: 6px;
}

:deep(.wd-card__title-content) {
  padding-bottom: 6px;
}
</style>

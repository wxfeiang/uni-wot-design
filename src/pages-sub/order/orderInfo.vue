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

const paging = ref(null)

const title = ref('订单详情')

const orderInfo = ref({})

const showPop = ref(false)

async function getList(item: any) {
  uni.showLoading({ title: '' })
  // 这里是请求数据
  list.value = 10
  state.value = 'loading'
  await uni.hideLoading()
}

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

const goback = function (url, e) {
  uni.navigateBack()
}

onLoad((options) => {
  showPop.value = options.showPop?.showPop || false
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen">
    <view class="tabTool w-screen">
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-center items-center flex-col mt-3">
        <wd-text
          text="等待付款"
          size="20px"
          color="#333333"
          class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text text="23:00:06" size="14px" color="#e3832a" class="ml-1"></wd-text>
          <wd-text text="后订单将自动取消" size="14px" color="#777777" class="ml-1"></wd-text>
        </view>
      </view>
      <wd-card class="cardno">
        <view class="flex justify-between items-center py-2">
          <view class="flex justify-left items-center">
            <wd-icon name="location" size="22px"></wd-icon>
            <view class="flex justify-left items-start flex-col ml-1">
              <wd-text
                text="姓名 1300000000"
                size="16px"
                color="#333333"
                class="font-bold"
              ></wd-text>
              <wd-text
                text="甘肃省兰州市城关区xxxxxxxxxx号"
                size="16px"
                color="#777777"
                class="mt-1"
              ></wd-text>
            </view>
          </view>
        </view>
      </wd-card>

      <wd-card>
        <template #title>
          <view class="flex justify-between items-center">
            <view class="flex justify-left items-center">
              <wd-img
                :width="30"
                :height="30"
                round
                src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
              />
              <wd-text text="无备注" size="16px" color="#777777" class="ml-2"></wd-text>
              <wd-icon name="arrow-right" size="16px" class="ml-1" color="#777777"></wd-icon>
            </view>
            <wd-text text="代发货" size="14px" color="#e3832a" class=""></wd-text>
          </view>
        </template>
        <view v-for="(it, ind) in 2" :key="ind">
          <view class="flex justify-between items-center mt-2 mb-4">
            <wd-img
              :width="100"
              :height="100"
              radius="7"
              src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
            />
            <view class="ml-2 flex-1">
              <wd-text
                text="知味观糕点礼盒杭州特产中式送礼送长辈中式糕点心中秋月节饼"
                :lines="2"
                size="16px"
                color="#000000"
                class="font-bold"
              ></wd-text>
              <wd-text
                text="圆形铁盒/盒"
                :lines="1"
                size="14px"
                color="#757575"
                class="mt-1"
              ></wd-text>
              <view class="flex justify-between items-center mt-4">
                <wd-text text="￥32111" size="16px" color="#000000"></wd-text>
                <wd-text text="x1" size="14px" color="#777777" class="ml-1"></wd-text>
              </view>
            </view>
          </view>
        </view>
      </wd-card>

      <wd-card class="cardno">
        <view class="py-2">
          <view class="flex justify-between items-center mb-1">
            <view class="flex justify-left items-center">
              <wd-text text="订单编号" size="14px" color="#777777" class=""></wd-text>
              <wd-text text="136465514654654" size="14px" color="#333333" class="ml-2"></wd-text>
            </view>
            <wd-text text="复制" size="14px" color="#777777" class=""></wd-text>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="下单时间" size="14px" color="#777777" class=""></wd-text>
            <wd-text text="2024-09-11 15:00:02" size="14px" color="#333333" class="ml-2"></wd-text>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="配送方式" size="14px" color="#777777" class=""></wd-text>
            <wd-text text="快递配送" size="14px" color="#333333" class="ml-2"></wd-text>
          </view>
        </view>
      </wd-card>

      <wd-card class="cardno">
        <view class="py-2">
          <view class="flex justify-between items-center mb-1">
            <wd-text text="运费" size="14px" color="#777777" class=""></wd-text>
            <wd-text text="￥10" size="14px" color="#333333" class=""></wd-text>
          </view>
          <view class="flex justify-between items-center mb-1">
            <wd-text text="商品总价" size="14px" color="#777777" class=""></wd-text>
            <wd-text text="￥2222" size="14px" color="#333333" class=""></wd-text>
          </view>
          <view class="flex justify-between items-center mb-1">
            <wd-text text="优惠券" size="14px" color="#777777" class=""></wd-text>
            <wd-text text="0" size="14px" color="#333333" class=""></wd-text>
          </view>
          <view class="flex justify-right items-center my-3">
            <wd-text text="总计：" size="14px" color="#000000"></wd-text>
            <wd-text text="￥" size="14px" font-bold color="#d04b55" class="ml-1"></wd-text>
            <wd-text text="2339" size="18px" font-bold color="#d04b55" class=""></wd-text>
          </view>
        </view>
      </wd-card>
    </view>

    <view class="pt-2 overflow-hidden ListBox">
      <view v-for="(item, index) in 5" class="float-left w-full box-border" :key="index">
        <wd-card>
          <template #title>
            <view class="flex justify-between items-center">
              <view class="flex justify-left items-center">
                <wd-img
                  :width="30"
                  :height="30"
                  round
                  src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
                />
                <wd-text text="无备注" size="16px" color="#777777" class="ml-1"></wd-text>
                <wd-icon name="arrow-right" size="16px" class="ml-1" color="#777777"></wd-icon>
              </view>
              <wd-text text="代发货" size="14px" color="#777777" class=""></wd-text>
            </view>
          </template>
          <view v-for="(it, ind) in 2" :key="ind">
            <view class="flex justify-between items-center mt-2 mb-4">
              <wd-img
                :width="100"
                :height="100"
                radius="7"
                src="https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png"
              />
              <view class="ml-2 flex-1">
                <wd-text
                  text="知味观糕点礼盒杭州特产中式送礼送长辈中式糕点心中秋月节饼"
                  :lines="2"
                  size="16px"
                  color="#000000"
                  class="font-bold"
                ></wd-text>
                <wd-text
                  text="圆形铁盒/盒"
                  :lines="1"
                  size="14px"
                  color="#757575"
                  class="mt-1"
                ></wd-text>
                <view class="flex justify-between items-center mt-4">
                  <wd-text text="￥32111" size="16px" color="#000000"></wd-text>
                  <wd-text text="x1" size="14px" color="#777777" class="ml-1"></wd-text>
                </view>
              </view>
            </view>
          </view>
          <view class="flex justify-right items-center my-3">
            <wd-text text="共6件 金额：" size="14px" color="#000000"></wd-text>
            <wd-text text="￥" size="14px" font-bold color="#d04b55" class="ml-1"></wd-text>
            <wd-text text="2339" size="18px" font-bold color="#d04b55" class=""></wd-text>
          </view>
          <template #footer>
            <view class="flex justify-between items-center">
              <wd-text text="代发货" size="14px" color="#f0883a" class=""></wd-text>
              <view class="flex justify-right items-center">
                <wd-button
                  size="small"
                  plain
                  type="warning"
                  class="inline-block ml-2"
                  style="width: 5rem"
                  @click="goInfo()"
                >
                  评价
                </wd-button>
                <wd-button
                  size="small"
                  plain
                  type="info "
                  class="inline-block ml-2"
                  style="width: 5rem"
                >
                  立即使用
                </wd-button>
              </view>
            </view>
          </template>
        </wd-card>
      </view>
      <!--      <wd-loadmore custom-class="loadmore" state="loading"/>-->
    </view>
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  background: #f3f4f6;
}

:deep(.wd-card__footer) {
  padding-top: 6px;
}

:deep(.wd-card__title-content) {
  padding-bottom: 6px;
}

:deep(.cardno .wd-card__footer) {
  padding: 5px 0;
}

:deep(.cardno .wd-card__title-content) {
  padding: 5px 0;
}
</style>

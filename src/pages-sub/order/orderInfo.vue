<route lang="json5" type="page">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import orderInter from './utils/orderInter'

const { sendOrderInfo, sendOrderList } = orderInter()

const paging = ref(null)
const chooseIndex = ref(-1)

const title = ref('订单详情')

const orderInfo = ref({})

const showPop = ref(false)

function openPop(e) {
  showPop.value = true
}

function closePop(e) {
  showPop.value = false
}

function Choose(index) {
  // chooseIndex.value = index
  // console.log('chooseIndex', index)
  // skuInfo.value = skuList.value[index]
  // closePop()
}

async function getInfo(id: any) {
  uni.showLoading({ title: '' })
  // 这里是请求数据
  const da = { orderId: id }
  const data: any = await sendOrderInfo(da)
  uni.hideLoading()
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
  showPop.value = options.showPop?.showPop || true
  getInfo(options.id)
})
</script>

<template>
  <view class="pageBoxBg w-screen h-screen pt-4 pb-4">
    <view class="tabTool w-screen">
      <dy-navbar :leftTitle="title" left></dy-navbar>
      <view class="flex justify-center items-center flex-col">
        <wd-text
          text="等待付款"
          size="20px"
          color="#333333"
          custom-class="my-1 text-center font-bold"
        ></wd-text>
        <view class="flex justify-center items-center mt-1 mb-2">
          <wd-text text="23:00:06" size="14px" color="#e3832a" custom-class="ml-1"></wd-text>
          <wd-text
            text="后订单将自动取消"
            size="14px"
            color="#777777"
            custom-class="ml-1"
          ></wd-text>
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
                custom-class="font-bold"
              ></wd-text>
              <wd-text
                text="甘肃省兰州市城关区xxxxxxxxxx号"
                size="16px"
                color="#777777"
                custom-class="mt-1"
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
              <wd-text text="无备注" size="16px" color="#777777" custom-class="ml-2"></wd-text>
              <wd-icon name="arrow-right" size="16px" custom-class="ml-1" color="#777777"></wd-icon>
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
                custom-class="font-bold"
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
                <wd-text text="x1" size="14px" color="#777777" custom-class="ml-1"></wd-text>
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
              <wd-text
                text="136465514654654"
                size="14px"
                color="#333333"
                custom-class="ml-2"
              ></wd-text>
            </view>
            <wd-text text="复制" size="14px" color="#777777" class=""></wd-text>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="下单时间" size="14px" color="#777777" class=""></wd-text>
            <wd-text
              text="2024-09-11 15:00:02"
              size="14px"
              color="#333333"
              custom-class="ml-2"
            ></wd-text>
          </view>
          <view class="flex justify-left items-center mb-1">
            <wd-text text="配送方式" size="14px" color="#777777" class=""></wd-text>
            <wd-text text="快递配送" size="14px" color="#333333" custom-class="ml-2"></wd-text>
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
          <view class="flex justify-end items-center my-3">
            <wd-text text="总计：" size="14px" color="#000000"></wd-text>
            <wd-text text="￥" size="14px" font-bold color="#d04b55" custom-class="ml-1"></wd-text>
            <wd-text text="2339" size="18px" font-bold color="#d04b55" class=""></wd-text>
          </view>
        </view>
      </wd-card>
    </view>
    <!--    <wd-overlay :show="showPop" @click="showPop = false"/>-->
    <wd-action-sheet v-model="showPop" @close="closePop" title="取消订单">
      <!--  <wd-popup v-model="showPop" position="bottom" closable @close="closePop">-->
      <view class="px-4">
        <view class="pb-4">
          <wd-text text="请选择取消原因" size="14px" color="#777777"></wd-text>
        </view>

        <wd-radio-group v-model="chooseIndex" shape="dot" @change="Choose" checked-color="#f44d24">
          <wd-radio :value="1">不想要了</wd-radio>
          <wd-radio :value="2">信息填错，重新下单</wd-radio>
          <wd-radio :value="3">卖家缺货</wd-radio>
          <wd-radio :value="4">物流原因</wd-radio>
          <wd-radio :value="5">其他原因</wd-radio>
        </wd-radio-group>

        <wd-button type="warning" custom-class="duihuanBtn   mt-4 " @click="closePop">
          确定
        </wd-button>
      </view>

      <!--  </wd-popup>-->
    </wd-action-sheet>
  </view>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  position: relative;
  background: #f3f4f6;
}

:deep(.wd-card__footer) {
  padding-top: 6px;
}

:deep(.wd-card__title-content) {
  padding-bottom: 6px;
}

:deep(.wd-card__footer) {
  padding: 5px 0 !important;
}

:deep(.wd-card__title-content) {
  padding: 5px 0 !important;
}

:deep(.duihuanBtn) {
  width: 100% !important;
  color: #ffffff;
  background: #f44d24 !important;
}

:deep(.is-checked .wd-radio__shape) {
  background-color: #f44d24 !important;
  border-color: #f44d24 !important;
}
</style>

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

const title = ref('商品详情')
const showSkuChoose = ref(false)
const skuList = ref([])
const skuInfo = ref({})
const SkuIndex = ref(0)

async function getList(item: any) {
  uni.showLoading({ title: '' })
  // 这里是请求数据
  list.value = 10
  state.value = 'loading'
  await uni.hideLoading()
}

function openSkuChoose(e) {
  showSkuChoose.value = true
}

function skuChoose(index) {
  SkuIndex.value = index
  console.log('SkuIndex', index)
  // skuInfo.value = skuList.value[index]
  closeSkuChoose()
}

function closeSkuChoose(e) {
  showSkuChoose.value = false
}

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

onLoad(async () => {
  // await getList()
})
</script>

<template>
  <view class="pageBoxBg w-screen">
    <view class="bannerBg">
      <dy-navbar :leftTitle="title" left></dy-navbar>
    </view>
    <!--    <view class="flex justify-between items-center navbg w-screen h-90px">-->
    <!--      <view class="flex justify-left items-start flex-col">-->
    <!--        <view class="text-base text-white mb-1">我的积分</view>-->
    <!--        <view class="text-xs text-slate-100 opacity-60">积分可兑换商品，避免失效请尽快使用</view>-->
    <!--      </view>-->
    <!--      <view class="text-2xl text-white">32857</view>-->
    <!--    </view>-->

    <view class="cardtop"></view>
    <view class="bg-white w-screen p4 box-border pt-0 absolute contentBox">
      <view class="flex justify-between items-center w-full mb-2">
        <view class="flex justify-left items-center">
          <wd-text text="3323" :lines="1" size="24px" color="#FB2549" class="font-bold"></wd-text>
          <wd-text text="￥" :lines="1" size="12px" color="#FB2549" class="ml-1"></wd-text>
        </view>

        <wd-text text="已兑1153件" :lines="1" size="12px" color="#999999" class="ml-1"></wd-text>
      </view>
      <wd-text
        text="知味观糕点礼盒杭州特产中式送礼送长辈中式糕点心中秋月节饼团购"
        :lines="2"
        size="18px"
        color="#000000"
        class="font-bold mb-2"
      ></wd-text>

      <view class="flex justify-left items-center borders pt-2 pb-2 mt-2 mb-2">
        <wd-text text="商品规格" :lines="1" size="14px" color="#000000"></wd-text>
        <wd-text
          @click="openSkuChoose"
          text="兑换后7天有效，每天可兑换一次"
          :lines="1"
          size="14px"
          color="#777777"
          class="ml-2"
        ></wd-text>
      </view>

      <view class="mt-2 mb-1">
        <wd-text text="商品详情" :lines="1" size="18px" color="#000000" class="font-bold"></wd-text>
        <view></view>
      </view>
    </view>

    <view
      class="z-10 px-4 py-4 shadow bg-white fixed b0 w-full box-border flex justify-between items-center"
      style="bottom: 0px"
    >
      <wd-icon name="goods" size="22px" color="#f44d24"></wd-icon>
      <view flex justify-right items-center>
        <wd-button
          block
          custom-class="duihuanBtn"
          :round="false"
          @click="gopath('/pages/shop/shopCar')"
        >
          加入购物车
        </wd-button>
        <wd-button
          block
          custom-class="duihuanBtn"
          :round="false"
          @click="gopath('/pages/shop/order')"
          class="ml-3"
        >
          立即购买
        </wd-button>
      </view>
    </view>
  </view>

  <wd-action-sheet v-model="showSkuChoose" title="规格选择" @close="closeSkuChoose">
    <view class="bg-white p4 w-full box-border overflow-hidden">
      <wd-button
        size="small"
        :plain="index == SkuIndex ? false : true"
        class="float mr-2 mb-3"
        v-for="(item, index) in 10"
        :key="index"
        @click="skuChoose(index)"
      >
        小号按钮
      </wd-button>
    </view>
  </wd-action-sheet>
  <!-- </view> -->
</template>
<style lang="scss" scoped>
.pageBoxBg {
  min-height: calc(100vh - 50px);
  background: #f3f4f6;
}

.bannerBg {
  width: 100vw;
  height: 300px;
  background-image: url('https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.navbg {
  box-sizing: border-box;
  padding: 0px 30px 20px 30px;
  background-image: url('https://oss.xay.xacloudy.cn/images/2024-09/5066fcb4-00df-4f6a-8641-3bba21c8b824jifenbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

:deep(.wd-navbar) {
  width: 100%;
  color: #ffffff !important;
  background-color: transparent !important;
}

:deep(.wd-navbar__title) {
  color: #ffffff !important;
}

.cardtop {
  position: relative;
  top: -14px;
  z-index: 2;
  float: left;
  width: 100vw;
  height: 15px;
  background: #ffffff;
  border-radius: 15px 15px 0 0;
}

:deep(.duihuanBtn) {
  background: #f44d24 !important;
}

.borders {
  border-top: 1px dotted #e4e7ec;
  border-bottom: 1px dotted #e4e7ec;
}

.contentBox {
  box-sizing: border-box;
  min-height: calc(100vh - 340px);
  padding-bottom: 80px;
}
</style>

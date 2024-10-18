<route lang="json5">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
    backgroundColor: '#F3F4F6',
  },
}
</route>
<script lang="ts" setup>
import anvter from '@/static/images/mine/anvter.png'
import anvter1 from '@/static/images/mine/anvter1.png'
import h0 from '@/static/images/mine/h0.png'
import h1 from '@/static/images/mine/h1.png'
import sjfw from '@/static/images/mine/sjfw.png'
import tygj from '@/static/images/mine/tygj.png'
import gerenicon from '@/static/images/mine/gerenicon.png'
import dhicon from '@/static/images/mine/dhicon.png'
import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
import { storeToRefs } from 'pinia'
import { useMessage, useToast } from 'wot-design-uni'
import useInfo from './utils/useInfo'

const { navTop } = useNav()

const {
  serveList,
  serveClick,
  topList,
  serveOrderList,
  sendMerchantServicesCount,
  // msCount,
  sendMyInfo,
  sendOrderStatistics,
  sendBusinessInfo,
  grzqList,
} = useInfo()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()

function login() {
  routeTo({ url: '/pages/login/index' })
}

const toast = useToast()
const bgUrlBase64 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/0d9fe262-f40e-4115-9173-e9f89d24828aJZDxK0DIw9Ta144dbd42ab626884a3018ec3ecaf2d6d.png',
)
const userGrade = ref(1)
const msCount = ref({
  totalMoneyDay: 0,
  totalOrderNumDay: 0,
})

const userGradeTitle = ref('')
const dingdan = (e) => {
  routeTo({ url: e })
}
const qiandao = () => {
  routeTo({ url: '/pages-sub/marketManager/integral/index' })
}
const toShopService = () => {
  routeTo({ url: '/pages-sub/shopManager/index' })
}

onShow(async () => {
  if (isLogined.value) {
    try {
      const countInfo: any = await sendMyInfo()
      userGrade.value = countInfo.userGrade
      topList.value[0].value = countInfo.pointsNum
      topList.value[1].value = countInfo.couponNum
      topList.value[2].value = countInfo.pocketNum
      userGradeTitle.value = countInfo.userGradeName

      if (userInfo.value.merchantId) {
        // 查询商户统计
        const datas: any = await sendBusinessInfo()

        msCount.value.totalMoneyDay = datas.todayAmount ? datas.todayAmount : 0
        msCount.value.totalOrderNumDay = datas.todayOrderNum ? datas.todayOrderNum : 0
      }

      const da: any = await sendOrderStatistics({ type: 1 })
      serveOrderList.value[0].value = da.dfk ? da.dfk : 0
      serveOrderList.value[1].value = da.dfh ? da.dfh : 0
      serveOrderList.value[2].value = da.dsh ? da.dsh : 0
      serveOrderList.value[3].value = da.ywc ? da.ywc : 0
      serveOrderList.value[4].value = da.sh ? da.sh : 0
    } catch {
      topList.value[0].value = 0
      topList.value[1].value = 0
      topList.value[2].value = 0
    }
  } else {
    serveOrderList.value[0].value = 0
    serveOrderList.value[1].value = 0
    serveOrderList.value[2].value = 0
    serveOrderList.value[3].value = 0
    serveOrderList.value[4].value = 0

    topList.value[0].value = 0
    topList.value[1].value = 0
    topList.value[2].value = 0
  }
})
</script>

<template>
  <view
    class="box-border w-100vw flex flex-col bg-no-repeat bg-#f5f5f5 min-h-100vh"
    :style="`padding-top:${navTop}px ;background-image: url(${bgUrlBase64}); background-size:100% 310px`"
  >
    <view class="px-15px mt-10%">
      <view class="flex justify-between items-center">
        <view class="flex items-center gap-20px">
          <template v-if="isLogined">
            <view class="flex gap-15px items-center">
              <view>
                <view class="p-5px rounded-50% size-64px">
                  <wd-img :width="60" :height="60" :src="anvter1" round />
                </view>

                <view
                  class="flex items-center mt-[-15px] relative z-9 pl-10px ml-[-10px]"
                  v-if="userInfo.cardType === '3'"
                >
                  <wd-img :src="h1" width="22" height="18"></wd-img>
                  <view
                    class="color-#fff text-10px text-center h-bg rounded-100 px-10px ml-[-10px] mt-2px"
                  >
                    已申领
                  </view>
                </view>
                <view class="flex items-center mt-[-15px] relative z-9 pl-10px ml-[-10px]" v-else>
                  <wd-img :src="h0" width="22" height="18"></wd-img>
                  <view
                    class="color-#fff text-10px text-center bg-#ccc rounded-100 px-10px ml-[-10px] mt-2px"
                  >
                    未申领
                  </view>
                </view>
              </view>
              <view>
                <view class="font-size-20px font-medium">
                  {{ isLogined ? (userInfo.userName ?? '微信用户') : '立即登录' }}
                </view>

                <view v-if="isLogined">
                  <view v-if="userGrade == 1" class="mt-2">
                    <img src="/src/static/images/mine/level1.png" alt="" class="userGradeBG" />
                    <span class="userGradeTitle l1">{{ userGradeTitle }}</span>
                  </view>
                  <view v-else-if="userGrade == 2" class="mt-2">
                    <img src="/src/static/images/mine/level2.png" alt="" class="userGradeBG" />
                    <span class="userGradeTitle l2">{{ userGradeTitle }}</span>
                  </view>
                  <view v-else-if="userGrade == 3" class="mt-2">
                    <img src="/src/static/images/mine/level3.png" alt="" class="userGradeBG" />
                    <span class="userGradeTitle l3">{{ userGradeTitle }}</span>
                  </view>
                  <view v-else-if="userGrade == 4" class="mt-2">
                    <img src="/src/static/images/mine/level4.png" alt="" class="userGradeBG" />
                    <span class="userGradeTitle l4">{{ userGradeTitle }}</span>
                  </view>
                  <view v-else-if="userGrade == 5" class="mt-2">
                    <img src="/src/static/images/mine/level5.png" alt="" class="userGradeBG" />
                    <span class="userGradeTitle l5">{{ userGradeTitle }}</span>
                  </view>
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <view class="flex items-center">
              <view class="p-5px rounded-50% size-64px">
                <wd-img :width="60" :height="60" :src="anvter" round />
              </view>
              <view @click="login">
                <view class="font-bold">立即登录</view>
              </view>
            </view>
          </template>
        </view>
        <view
          class="qiandao flex items-center gap-5px justify-center line-height-32px color-#fff font-size-14px"
          @click="qiandao"
          v-if="isLogined"
        >
          <i class="iconfont xa-jinbi2 text-20px"></i>
          <text>签到</text>
        </view>
      </view>
      <view class="py-10px mt-3%">
        <view class="flex justify-around">
          <view
            class="w-1/3 text-center"
            v-for="(item, index) in topList"
            :key="index"
            @click="serveClick(item)"
          >
            <view class="text-20px">
              {{ isLogined ? item.value : 0 }}
            </view>
            <view class="text-14px mt-10px">
              {{ item.title }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="p-15px pt-0px">
      <view class="p-10px bg-#fff rounded-7px">
        <view class="flex justify-between items-center gap-10px mb-10px">
          <view class="flex items-center gap-5px">
            <view class="mt-3px">
              <wd-img :src="gerenicon" width="18" height="18"></wd-img>
            </view>
            <view class="text-16px font-600">个人专区</view>
          </view>
        </view>
        <view class="grid grid-cols-3 gap-10px">
          <view
            class="flex items-center py-10px gap-5px"
            v-for="(item, index) in grzqList"
            :key="index"
            @click="serveClick(item)"
          >
            <wd-badge :modelValue="item.value">
              <view>
                <wd-img :src="item.icon" width="33" height="33"></wd-img>
              </view>
            </wd-badge>

            <view class="text-13px text-center">
              {{ item.title }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="p-15px pt-0px">
      <view class="p-10px bg-#fff rounded-7px">
        <view class="flex justify-between items-center gap-10px mb-10px">
          <view class="flex items-center gap-5px">
            <view class="mt-3px">
              <wd-img :src="dhicon" width="18" height="18"></wd-img>
            </view>
            <view class="text-16px font-600">我的订单</view>
          </view>
        </view>
        <view class="grid grid-cols-5 gap-2px">
          <view
            class="flex flex-col items-center py-10px"
            v-for="(item, index) in serveOrderList"
            :key="index"
            @click="dingdan(item.path)"
          >
            <wd-badge :modelValue="item.value">
              <view>
                <wd-img :src="item.icon" width="26" height="26"></wd-img>
              </view>
            </wd-badge>

            <view class="text-13px mt-10px">
              {{ item.label }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 商家 -->
    <view class="p-15px pt-0px" v-if="isLogined && userInfo.merchantId">
      <view class="p-10px bg-#fff rounded-7px">
        <view class="flex justify-between items-center gap-10px" @click="toShopService">
          <view class="flex items-center gap-5px">
            <view class="mt-3px">
              <wd-img :src="sjfw" width="18" height="18"></wd-img>
            </view>
            <view class="text-16px font-600">商家服务</view>
          </view>
          <view>
            <wd-icon name="chevron-right" size="14px"></wd-icon>
          </view>
        </view>
        <view class="flex justify-around items-center gap-10px before-shu">
          <view class="text-center">
            <view class="text-14px color-#999 py-10px">今日收款 (元)</view>
            <view>{{ msCount.totalMoneyDay }}</view>
          </view>
          <view class="text-center">
            <view class="text-14px color-#999 py-10px">今日订单</view>
            <view>{{ msCount.totalOrderNumDay }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 工具 -->
    <view class="p-15px pt-0px">
      <view class="p-10px bg-#fff rounded-7px">
        <view class="grid grid-cols-5">
          <view
            class="flex flex-col items-center py-10px"
            v-for="(item, index) in serveList"
            :key="index"
            @click="serveClick(item)"
          >
            <wd-badge :modelValue="item.value">
              <view>
                <wd-img :src="item.icon" width="38" height="38"></wd-img>
              </view>
            </wd-badge>

            <view class="text-13px mt-10px text-center">
              {{ item.title }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.qiandao {
  width: 82px;
  height: 32px;
  background: linear-gradient(270deg, #99c7f2 0%, #71a2fb 100%);
  border-radius: 19px;
}

.money {
  box-sizing: border-box;
  border-right: 1px solid #d4d4d4;
}

.h-bg {
  background: linear-gradient(90deg, #a4e3fa 0%, #4bbefd 100%);
}

:deep(.custom-class-mine-login) {
  color: #fff !important;
  background: linear-gradient(90deg, #72c2fe 0%, #4055fe 100%) !important;
  border: none !important;
  border-radius: 6px !important;
}

.before-shu {
  &::before {
    position: absolute;
    right: 48%;
    width: 1px;
    height: 40px;
    content: '';
    background: #e5e5e5;
  }
}

.userGradeTitle {
  position: absolute;
  box-sizing: border-box;
  display: inline-block;
  width: 62px;
  height: 19px;
  padding-top: 4px;
  padding-left: 12px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;

  &.l1 {
    color: #548d33;
  }

  &.l2 {
    color: #898989;
  }

  &.l3 {
    color: #ff8000;
  }

  &.l4 {
    color: #f9f0ea;
  }

  &.l5 {
    color: #f9f0ea;
  }
}

.userGradeBG {
  position: absolute;
  display: inline-block;
  width: 62px;
  height: 19px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
</style>

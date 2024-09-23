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
import anvter from '@/static/images/mine/anvter.png'
import anvter1 from '@/static/images/mine/anvter1.png'
import imgUrl from '@/static/images/mine/bg.png'
import h0 from '@/static/images/mine/h0.png'
import h1 from '@/static/images/mine/h1.png'
import sjfw from '@/static/images/mine/sjfw.png'
import tygj from '@/static/images/mine/tygj.png'
import { useUserStore } from '@/store/user'
import { routeTo } from '@/utils'
import { pathToBase64 } from 'image-tools'
import { storeToRefs } from 'pinia'
import { useMessage, useToast } from 'wot-design-uni'
import useInfo from './utils/useInfo'

const { navTop } = useNav()

const {
  toContent,
  serveList,
  serveClick,
  topList,
  sendUserCouponList,
  sendInterInfo,
  serveOrderList,
} = useInfo()
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
function login() {
  routeTo({ url: '/pages/login/index' })
}
const toast = useToast()
const bgUrlBase64 = ref()

const qiandao = () => {
  routeTo({ url: '/pages-sub/marketManager/integral/index' })
}
const toShopService = () => {
  routeTo({ url: '/pages-sub/shopManager/index' })
}
onLoad(async () => {
  // 设置背景图片
  bgUrlBase64.value = await pathToBase64(imgUrl)
})
onShow(async () => {
  if (isLogined.value) {
    try {
      const params = {
        status: 0,
      }
      const data2: any = await sendInterInfo()
      topList.value[0].value = data2.totalIntegral ?? 0
      const data: any = await sendUserCouponList(params)
      topList.value[1].value = data.unUsedCouponNum
    } catch {
      topList.value[0].value = 0
      topList.value[1].value = 0
    }
  }
})
</script>

<template>
  <view
    class="box-border w-100vw flex flex-col bg-no-repeat bg-#f5f5f5 min-ht-100vh"
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
    <view class="p-15px">
      <view class="p-10px bg-#fff rounded-7px flex justify-between items-center gap-10px">
        <view
          class="w-1/5 flex flex-col items-center py-10px"
          v-for="(item, index) in serveOrderList"
          :key="index"
          @click="toContent(item)"
        >
          <wd-badge :modelValue="item.value">
            <view>
              <wd-img :src="item.icon" width="26" height="26"></wd-img>
            </view>
          </wd-badge>

          <view class="text-14px mt-10px">
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>
    <view class="p-15px pt-0px">
      <view class="p-10px bg-#fff rounded-7px">
        <view class="flex justify-between items-center gap-10px" @click="toShopService">
          <view class="flex items-center gap-5px">
            <view class="mt-3px">
              <wd-img :src="sjfw" width="18" height="18"></wd-img>
            </view>
            <view class="text-16px font-600">商家服务</view>
          </view>
          <view><wd-icon name="chevron-right" size="14px"></wd-icon></view>
        </view>
        <view class="flex justify-around items-center gap-10px before-shu">
          <view class="text-center">
            <view class="text-14px color-#999 py-10px">今日收款 (元)</view>
            <view>0.00</view>
          </view>
          <view class="text-center">
            <view class="text-14px color-#999 py-10px">今日订单</view>
            <view>0.00</view>
          </view>
        </view>
      </view>
    </view>
    <view class="p-15px pt-0px">
      <view class="p-10px bg-#fff rounded-7px">
        <view class="flex justify-between items-center gap-10px" @click="toShopService">
          <view class="flex items-center gap-5px">
            <view class="mt-3px">
              <wd-img :src="tygj" width="18" height="18"></wd-img>
            </view>
            <view class="text-16px font-600">通用工具</view>
          </view>
        </view>
        <view class="flex items-center gap-10px flex-wrap mt-10px">
          <view
            class="w-22% flex flex-col items-center py-10px"
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
</style>
<style lang="scss" scoped>
.qiandao {
  width: 82px;
  height: 32px;
  background: linear-gradient(270deg, #99c7f2 0%, #71a2fb 100%);
  border-radius: 19px;
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
</style>

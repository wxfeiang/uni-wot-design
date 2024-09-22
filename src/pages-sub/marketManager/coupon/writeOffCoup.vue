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
import { routeTo } from '@/utils'
import { Toast } from '@/utils/uniapi/prompt'
import { useMessage } from 'wot-design-uni'
import sucessImg from '../static/images/coupon/success.png'
import CouponLine from './components/couponLine.vue'
const message = useMessage()

// import { getCurrentInstance, onMounted } from 'vue' // eslint-disable-line
const title = ref('核销优惠券')
const serchValue = ref('')
const show = ref(false)
const sucessShow = ref(false)
const footbtn = ref([
  {
    title: '支付',
  },
  {
    title: '核销',
  },
])
const tab = ref(1)
const instance = getCurrentInstance().proxy
const cameraContext = ref(null)
// const eventChannel = instance.getOpenerEventChannel() // eslint-disable-line

onLoad((options: any) => {})

function cameraError(e) {
  console.log(e.detail)
}
function scancode(e) {
  console.log('🍝[e]:', e)
  if (e) {
    message.alert({
      title: '扫码成功',
      msg: e.detail.result,
    })
  }
}
// 关闭相机
const close = () => {
  console.log('🌭======关闭相机-----')
  uni.navigateBack()
}
function handleClose() {
  console.log('🌮')
}
function toMingxi() {
  sucessShow.value = false
  routeTo({
    url: '/pages-sub/marketManager/coupon/writeOffCoupList',
  })
}

function continueOff() {
  sucessShow.value = false
}

onMounted(() => {
  if (uni.createCameraContext) {
    cameraContext.value = uni.createCameraContext()
  } else {
    Toast('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。')
  }
})
</script>
<template>
  <vie class="fixed top-0 left-0 right-0 bottom-0 z-9">
    <view class="relative w-100% h-100%">
      <camera
        mode="scanCode"
        device-position="back"
        flash="auto"
        class="absolute z-10 w-100% h-100%"
        binderror="cameraError"
        ref="camera"
        id="camera"
        @error="cameraError"
        @scancode="scancode"
      ></camera>
      <view class="absolute z-20 w-100% h-100% bg-#000/30">
        <dy-navbar :leftTitle="title" left isNavShow></dy-navbar>
        <!--  -->
        <view class="flex flex-col justify-between items-center h-85% py-20px">
          <!--  -->

          <view class="px-10px py-2px rounded-3px overflow-hidden bg-#fff/90 w-85%">
            <wd-input
              v-model="serchValue"
              :maxlength="20"
              placeholder-left
              no-border
              placeholder="请输入优惠券码"
              custom-class="custom-class-input"
            >
              <template #suffix>
                <wd-button :round="false">核销</wd-button>
              </template>
            </wd-input>
          </view>
          <!-- 扫码框 -->
          <view>
            <view class="w-250px h-250px bd-1px_#888 relative bg-transparent">
              <view class="absolute w-90% h-3px bg-green left-5% right-0 animation-to"></view>
            </view>
            <view class="text-center color-#fff mt-10px">将二维码放入框内,即可核销</view>
          </view>
          <!-- 底部 -->
          <view class="w-80%">
            <wd-button block :round="false" @click="toMingxi">查看核销记录</wd-button>
          </view>
          <!-- 核销框 -->
          <wd-popup
            v-model="show"
            position="center"
            custom-class="custom-class-popup"
            @close="handleClose"
          >
            <view class="text-center font-600 text-18px py-5px">优惠券核销</view>
            <view class="my-10px">
              <CouponLine></CouponLine>
            </view>

            <view class="bb-1px_#888_dashed my-30px"></view>

            <view class="flex justify-between items-center py-10px gap-10px mb-15px">
              <view class="flex-1">
                <wd-button block :round="false" type="info">取 消</wd-button>
              </view>
              <view class="flex-1">
                <wd-button block :round="false">确认核销</wd-button>
              </view>
            </view>
          </wd-popup>
          <!-- 核销成功 -->
          <wd-overlay :show="sucessShow">
            <view class="size-full flex flex-col justify-start pt-100px items-center bg-#fff">
              <wd-status-tip
                :image="sucessImg"
                :image-size="{
                  height: 81,
                  width: 81,
                }"
              />

              <view class="mt-40px w-100% px-40px box-border">
                <view class="mb-20px">
                  <wd-button
                    type="primary"
                    :round="false"
                    plain
                    hairline
                    block
                    @click="continueOff"
                  >
                    继续核销
                  </wd-button>
                </view>
                <view>
                  <wd-button type="primary" :round="false" color="#2D69EF" block @click="toMingxi">
                    查看核销记录
                  </wd-button>
                </view>
              </view>
            </view>
          </wd-overlay>
        </view>
      </view>
    </view>
  </vie>
</template>

<style lang="scss" scoped>
:deep(.custom-class-input) {
  @apply bg-transparent!;
}
.animation-to {
  animation: mymove 3s infinite;
}
@keyframes mymove {
  from {
    top: 0px;
  }
  to {
    top: 250px;
  }
}
:deep(.custom-class-popup) {
  @apply w-90%  rounded-10px bg-#fff p-20px box-border  overflow-hidden;
  &:before {
    @apply absolute w-27px h-27px  rounded-full top-60% left-[-14px]
    content-[''];
    background-color: rgba(0, 0, 0, 0.65);
  }
  &:after {
    @apply absolute w-27px h-27px  rounded-full top-60% right-[-14px]
    content-[''];
    background-color: rgba(0, 0, 0, 0.65);
  }
}
</style>

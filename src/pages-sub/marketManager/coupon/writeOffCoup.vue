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
import { Toast } from '@/utils/uniapi/prompt'
import { useMessage } from 'wot-design-uni'
const message = useMessage()

function alert() {
  message.alert('操作成功')
}
// import { getCurrentInstance, onMounted } from 'vue' // eslint-disable-line
const title = ref('核销优惠券')
const serchValue = ref('')
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
      <view class="absolute z-20 w-100% h-100%">
        <dy-navbar :leftTitle="title" left isNavShow></dy-navbar>
        <!--  -->
        <view class="flex flex-col justify-between items-center h-75% py-20px">
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

          <view class="w-250px h-250px bd-1px_#888 relative bg-transparent">
            <view class="absolute w-90% h-3px bg-green left-5% right-0 animation-to"></view>
          </view>

          <view class="w-80%">
            <wd-button block :round="false">查看核销记录</wd-button>
          </view>
        </view>
      </view>

      <view class="w-full absolute bottom-0 bg-#000 font-size-20px color-#fff py-20px z-99">
        <wd-tabs v-model="tab" custom-class="custom-class-tab">
          <block v-for="item in footbtn" :key="item">
            <wd-tab :title="item.title"></wd-tab>
          </block>
        </wd-tabs>
      </view>
    </view>
  </vie>
</template>

<style lang="scss" scoped>
:deep(.custom-class-tab),
:deep(.custom-class-tab .wd-tabs__nav) {
  @apply bg-transparent!;
}
:deep(.custom-class-tab) {
  .wd-tabs__nav-item {
    @apply text-#838383;
  }
  .wd-tabs__nav-item.is-active {
    @apply color-#fff;
  }
  .wd-tabs__line {
    @apply bg-#fff h-1px;
  }
}
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
</style>

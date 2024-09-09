<script lang="ts" setup>
import { routeTo } from '@/utils'
import { data as dataInfo } from '../types/data'

import { useMessage } from 'wot-design-uni'

import useCardApply from '../hooks/useCardApply'
const message = useMessage('wd-message-box-slot')
const message2 = useMessage()
const { sendCardQury, serchData, read } = useCardApply()

const showData = ref<any>({})
function toAgereement(type) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: '1710488285782016005', showTop: 1, title: '申领须知' },
  })
}
async function btnClick(item) {
  if (!read.value) {
    message
      .alert({
        title: '提示',
        confirmButtonText: '同意并办理',
      })
      .then(() => {
        read.value = true
        toApply(item)
      })
  } else {
    toApply(item)
  }
}

async function toApply(item) {
  if (item.index === 1) {
    const { resultCode }: any = await sendCardQury(serchData.value)
    isApply.value = resultCode
    if (isApply.value === '0') {
      message2
        .alert({
          msg: '您已申领过一卡通，请勿重复申请',
          title: '提示',
          closeOnClickModal: false,
        })
        .then(() => {
          uni.navigateBack()
        })
    } else {
      routeTo({
        url: '/pages-sub/serveMain/cardApplyFromType',
        data: item.data,
      })
    }
  } else if (item.index === 0) {
    routeTo({
      url: '/pages-sub/serveMain/cardApplyFromType',
      data: item.data,
    })
  }
}

const footerBtns = ref([
  {
    text: '代未成年人申领',
    type: 'info',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    isRead: true,
    isApply: false,
    isPeople: true,
    index: 0,
    data: { base: 'xinshenersl', title: '代未成年人申领' },
  },
  {
    text: '本人办理',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    isRead: true,
    isApply: false,
    isPeople: false,
    index: 1,
    data: { base: 'shebaoksl', title: '社保卡申领信息' },
  },
])

const isApply = ref(null)

onMounted(async () => {
  showData.value = dataInfo[0]
  // 如果阅读协议页面回来 则
  // read.value = 0
})
const value = ref()
</script>
<template>
  <view class="p-15px">
    <view class="text-center color-#000 font-bold line-height-60px text-20px">
      {{ showData.title }}
    </view>
    <view v-for="(item, index) in showData.list" :key="index">
      <wd-text color="#000" custom-class="custom-text" :text="item"></wd-text>
      <wd-gap bg-color="#f5f5f5"></wd-gap>
    </view>

    <!-- 底部 -->
    <view class="fixed bottom-3 left-0 right-0 w-full">
      <view class="px-20px py-1">
        <view class="">
          <wd-checkbox custom-label-class="label-class" v-model="read" size="large">
            我已阅读并同意以上内容,并接受
            <text class="color-#4d80f0" @click.stop="toAgereement(5)">
              《雄安一卡通申办业务须知协议》
            </text>
            协议
          </wd-checkbox>
        </view>
        <view class="flex gap-15px mt-20px">
          <view class="flex-1" v-for="(item, index) in footerBtns" :key="index">
            <wd-button
              :round="item.round"
              block
              :size="item.size"
              :type="item.type"
              @click="btnClick(item)"
            >
              {{ item.text }}
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </view>

  <wd-message-box selector="wd-message-box-slot">
    我已阅读并同意以上内容,并接受
    <text class="color-#4d80f0" @click.stop="toAgereement(5)">《雄安一卡通申办业务须知协议》</text>
  </wd-message-box>
  <wd-message-box></wd-message-box>
</template>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style lang="scss" scoped>
:deep(.custom-text) {
  @apply mb-10px!;
}
:deep(.wd-checkbox) {
  @apply flex!;
}
:deep(.wd-checkbox__shape) {
  @apply w-26px!;
}

:deep(.label-class .wd-checkbox__txt) {
  @apply whitespace-pre-wrap!;
}
</style>

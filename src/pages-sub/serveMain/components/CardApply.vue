<script lang="ts" setup>
import { routeTo } from '@/utils'
import { data as dataInfo } from '../types/data'

import { useMessage } from 'wot-design-uni'

import useCardApply from '../hooks/useCardApply'
const message = useMessage()
const { sendCardQury, read } = useCardApply()

const form = ref(null)

const applyData = ref()

const showData = ref<any>({})
function toAgereement(type) {
  routeTo({ url: '/pages-sub/webView/index', data: { type } })
}
function toAgereement2(type) {
  routeTo({ url: '/pages-sub/serveMain/cardApplyFromType', data: { type } })
}

const footerBtns = ref([
  {
    text: '非本人申领',
    type: 'info',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    disabled: true,
  },
  {
    text: '本人申领',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    disabled: true,
  },
])

watch(
  () => read.value,
  (val) => {
    footerBtns.value[0].disabled = !val
    footerBtns.value[1].disabled = !val
  },
  {
    immediate: true,
  },
)
onLoad((options: any) => {})

const isApply = ref(null)

onMounted(async () => {
  showData.value = dataInfo[0]
  // 如果阅读协议页面回来 则
  read.value = true
  const { resultCode }: any = await sendCardQury()
  // 0 不让在申请了

  isApply.value = resultCode
  if (isApply.value === '0') {
    message.alert('当前用户已申领过一卡通，请勿重复申领').then(() => {
      // uni.navigateBack()
    })
  }
})
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
          <wd-checkbox v-model="read" prop="read" custom-label-class="label-class">
            我已阅读并同意以上内容,并接受
          </wd-checkbox>
          <view class="color-#4d80f0" @click.stop="toAgereement(5)">
            《雄安一卡通申办业务须知协议》
          </view>
        </view>
        <view class="flex gap-15px mt-20px">
          <view class="flex-1" v-for="(item, index) in footerBtns" :key="index">
            <wd-button
              :disabled="item.disabled"
              :round="item.round"
              block
              :size="item.size"
              :type="item.type"
              @click="toAgereement2(2)"
            >
              {{ item.text }}
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </view>

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
:deep(.label-class) {
  @apply w-300px! h-auto!;
}

// // /* #ifdef */
// :deep(.custom-text span) {
//   @apply pl-40px!;
// }
// // /* #endif */
</style>

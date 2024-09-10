<script lang="ts" setup>
import { routeTo } from '@/utils'
import { data as dataInfo } from '../types/data'

import { useMessage } from 'wot-design-uni'

const message = useMessage('wd-message-box-slot')
const message2 = useMessage()
const read = ref<boolean>(false)

const showData = ref<any>({})
function toAgereement() {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: '1710488285782016019', showTop: 1, title: '补卡须知' },
  })
}
function btnClick(item) {
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
  if (item.isPeople) {
    message2.alert({
      msg: '非本人业务暂未提供办理!',
      title: '提示',
      closeOnClickModal: false,
    })
    return
  }
  routeTo({
    url: '/pages-sub/serveMain/cardApplyFromType',
    data: item.data,
  })
}
const footerBtns = ref([
  {
    text: '非本人办理',
    type: 'info',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    isPeople: true,
  },
  {
    text: '本人办理',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',

    isPeople: false,
    data: { base: 'shebaokbh', title: '社保卡补换信息' },
  },
])

onMounted(async () => {
  showData.value = dataInfo[1]
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
            <text class="color-#4d80f0" @click.stop="toAgereement">
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
    <text class="color-#4d80f0" @click.stop="toAgereement">《雄安一卡通申办业务须知协议》</text>
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

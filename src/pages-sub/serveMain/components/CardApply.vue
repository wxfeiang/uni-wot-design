<script lang="ts" setup>
import { routeTo } from '@/utils'
import useCardFrom from '../hooks/useCardFrom'
const { Login, model, rules, loading, read } = useCardFrom()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')

const applyData = ref([
  {
    title: '[申领条件]',
    type: 'idcard',
    list: ['1.本人为柳州市柳北区户籍居民', '2.本人年龄在18-60周岁之间'],
  },
])

const showData = ref<any>({})
function toAgereement(type) {
  routeTo({ url: '/pages-sub/components/webView/index', data: { type } })
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
onLoad((e: any) => {
  showData.value = applyData.value.find((item) => {
    return item.type === 'idcard'
  })

  // 如果阅读协议页面回来 则
  read.value = true
})
</script>
<template>
  <view class="p-15px">
    <view class="text-center color-#000 font-bold line-height-60px text-20px">
      {{ showData.title }}
    </view>
    <view v-for="(item, index) in showData!.list" :key="index">
      <wd-text color="#000" custom-class="custom-text" :text="item"></wd-text>
      <wd-gap bg-color="#f5f5f5"></wd-gap>
    </view>

    <!-- 底部 -->
    <view class="fixed bottom-3 left-0 right-0">
      <view class="px-20px py-1">
        <view>
          <wd-checkbox v-model="read" prop="read" custom-label-class="label-class">
            已阅读并同意
            <text class="color-#4d80f0" @click.stop="toAgereement(5)">《在线考试及相关授权》</text>
          </wd-checkbox>
        </view>
        <view class="flex gap-15px mt-20px">
          <view class="flex-1" v-for="(item, index) in footerBtns" :key="index">
            <wd-button
              :disabled="item.disabled"
              :round="item.round"
              block
              :size="item.size"
              :type="item.type"
            >
              {{ item.text }}
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </view>
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

// /* #ifdef */
:deep(.custom-text span) {
  @apply pl-40px!;
}
// /* #endif */
</style>

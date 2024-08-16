<script lang="ts" setup>
import useCardMessage from '../hooks/useCardMessage'
import { sexList } from '../types/dict'

const { cardInfoData } = useCardMessage()

// function toRegister() {
//   routeTo({ url: '/pages/login/register' })
// }

const visible = ref<boolean>(false)

const back = () => {
  uni.navigateBack()
}
const data = ref([
  {
    title: '姓名',
    value: '',
    prop: 'xm',
  },
  {
    title: '证件号码',
    value: '',
    prop: 'zjhm',
  },
  {
    title: '证件有效期限',
    value: '',
    prop: 'zjyxq',
  },
  {
    title: '性别',
    value: '',
    prop: 'xb',
    type: 'dict',
    options: sexList,
  },
  {
    title: '出生日期',
    value: '',
    prop: 'csrq',
  },
  {
    title: '国籍',
    value: '',
    prop: 'gj',
  },
  {
    title: '民族',
    value: '',
    prop: 'mz',
  },
  {
    title: '职业',
    value: '',
    prop: 'zy',
  },
  {
    title: '区域代码',
    value: '',
    prop: 'areaCode',
  },
  {
    title: '常住所在地地址',
    value: '',
    prop: 'address',
  },
  {
    title: '社会保障卡号',
    value: '',
    prop: 'zhbzkh',
  },
  {
    title: '银行卡号',
    value: '',
    prop: 'yhkh',
  },
  {
    title: '联系电话',
    value: '',
    prop: 'phone',
  },
  {
    title: '卡应用状态',
    value: '',
    prop: 'cardStatus',
  },
])
</script>
<template>
  <view class="p-15px">
    <!--     {{ cardInfoData }}-->
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-cell-group title="基本信息" border>
        <wd-cell :title="item.title" border v-for="(item, index) in data" :key="index">
          <!--  -->
          <view v-if="item.type === 'dict'">
            {{ item.options.find((i) => i.value === cardInfoData[item.prop])?.label }}
          </view>
          <view v-else>
            {{ cardInfoData[item.prop] }}
          </view>
        </wd-cell>
      </wd-cell-group>
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="back" block>返 回</wd-button>
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
:deep(.wd-input__error-message),
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}
</style>

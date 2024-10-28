<script lang="ts" setup>
import { changeDict } from '@/utils'
import useCardMessage from '../hooks/useCardMessage'
import {
  bankCodeList,
  cardType,
  ethniCodeList,
  occupationList,
  regionList,
  sexList,
  socialSecurity,
} from '../types/dict'

interface dataType {
  title: string
  value: string
  prop: string
  type?: string
  options?: any[]
}

const { getCadInfo, loading } = useCardMessage()

const visible = ref<boolean>(false)

const back = () => {
  uni.navigateBack()
}

const data = ref<dataType[]>([
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
    title: '证件类型',
    value: '',
    prop: 'zjlx',
    type: 'dict',
    options: cardType,
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
    type: 'dict',
    options: regionList,
  },
  {
    title: '民族',
    value: '',
    prop: 'mz',
    type: 'dict',
    options: ethniCodeList,
  },
  {
    title: '职业',
    value: '',
    prop: 'zy',
    type: 'dict',
    options: occupationList,
  },
  // {
  //   title: '区域代码',
  //   value: '',
  //   prop: 'areaCode',
  // },
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
    title: '银行行号',
    value: '',
    prop: 'yhhh',
    type: 'dict',
    options: bankCodeList,
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
    type: 'dict',
    options: socialSecurity,
  },
])
const cardInfoData = ref<any[]>([])
const errotText = ref<string>('没有查询到该信息')
onMounted(async () => {
  try {
    const res: any = await getCadInfo()
    Object.keys(res.cardInfo).forEach((key) => {
      data.value.forEach((item) => {
        if (item.prop === key) {
          item.value = res.cardInfo[key] ?? ''
          cardInfoData.value.push(item)
        }
      })
    })
  } catch (error) {
    errotText.value = error?.data?.message
    console.log('🧀[error]:', error)
  }
})
onUnmounted(() => {
  cardInfoData.value = null
})
</script>
<template>
  <view class="p-15px">
    <view class="rounded-10px overflow-hidden bg-#fff pb-10px">
      <template v-if="cardInfoData.length === 0 && !loading">
        <wd-status-tip image="search" :tip="errotText" />
      </template>
      <template v-else>
        <wd-cell-group title="基本信息" border>
          <wd-cell :title="item.title" border v-for="(item, index) in cardInfoData" :key="index">
            <view v-if="item.type === 'dict'">
              {{ changeDict(item.options, item.value) }}
            </view>
            <view v-else>
              {{ item.value }}
            </view>
          </wd-cell>
        </wd-cell-group>
      </template>
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

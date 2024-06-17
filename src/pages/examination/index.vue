<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { chunk } from 'lodash-es'

const current1 = ref(1)
const list1 = ref([
  {
    value: '考试',
    disabled: false,
    payload: {
      avatar: 'https://unpkg.com/wot-design-uni-assets/redpanda.jpg',
    },
  },
  {
    value: '练习',
    disabled: false,
    payload: {
      avatar: 'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
    },
  },
])
const anList = ref([
  {
    name: '请选择下列数据1111',
    type: 'radio',
    seValue: '',
    list: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 1,
      },
      {
        name: 'asudiasnd',
        value: 1,
      },
      {
        name: '爱疯vv你',
        value: 1,
      },
    ],
  },
  {
    name: '请选择下列数据222222222',
    type: 'radio',
    seValue: '',
    list: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 1,
      },
    ],
  },
  {
    name: '请选择下列数据3333333',
    type: 'radio',
    seValue: '',
    list: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 1,
      },
    ],
  },
])
// 对页面数据分组
const list = ref() // 分页数据
const cIndex = ref(0) // 获取总数下标
const cList = ref() // 获取当前数据

list.value = chunk(anList.value, 1)
cList.value = list.value[cIndex.value]

const initData = (f?: number) => {
  const l = list.value.length - 1
  if (f === 1) {
    cIndex.value = cIndex.value < l ? cIndex.value + 1 : l
  } else if (f === 0) {
    cIndex.value = cIndex.value > 0 ? cIndex.value - 1 : 0
  }
  // 获取当前数据
  cList.value = list.value[cIndex.value]
}
const startData = reactive({
  clientX: 0,
  clientY: 0,
})
const start = (e) => {
  startData.clientX = e.changedTouches[0].clientX
  startData.clientY = e.changedTouches[0].clientY
}
const end = (e) => {
  //
  const subX = e.changedTouches[0].clientX - startData.clientX
  const subY = e.changedTouches[0].clientY - startData.clientY
  if (subY > 50 || subY < -50) {
    console.log('🍇', '上下滑')
  } else {
    if (subX > 100) {
      initData(0)
    } else if (subX < -100) {
      initData(1)
    }
    // else {
    //
    // }
  }
}
</script>

<template>
  <wd-navbar left-arrow>
    <template #title>
      <wd-segmented :options="list1" v-model:value="current1"></wd-segmented>
    </template>
  </wd-navbar>
  <view @touchstart="start" @touchend="end" class="h-100vh bg-[#f5f5f5]">
    <view>
      <view>
        <wd-tag type="primary" mark>单选题</wd-tag>
        {{ cList[0].name }}
      </view>

      <wd-radio-group v-model="cList[0].seValue">
        <wd-radio :value="c.value" v-for="(c, j) in cList[0].list" :key="j">
          {{ c.name }}
        </wd-radio>
      </wd-radio-group>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//TODO: 滚动动画
</style>

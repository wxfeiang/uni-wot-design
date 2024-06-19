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
import Problem from './components/Problem.vue'

const cuMode = ref(1)
const navTitle = ref([
  {
    value: 1,
    disabled: false,
    payload: {
      label: '答题模式',
    },
  },
  {
    value: 2,
    disabled: false,
    payload: {
      label: '背题模式',
    },
  },
])
const anList = ref([
  {
    name: '子仪豆豆讲',
    type: 'radio',
    answer: 3,
    options: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 2,
      },
      {
        name: '子仪豆豆',
        value: 3,
      },
      {
        name: '上海',
        value: 4,
      },
    ],
  },
  {
    name: '下列描述正确的是?',
    type: 'checkbox',
    answer: '[2,4]',
    options: [
      {
        name: '紫竹语嫣z',
        value: 1,
      },
      {
        name: '早起回家，上海无滤镜碧蓝色天空🉑真美呢[太开心][太开心][太开心]  ​​​',
        value: 2,
      },
      {
        name: '总是会想有个人或者事情能当我的精神寄托，这是脆弱的表现吗？',
        value: 3,
      },
      {
        name: '如果雨过不天晴',
        value: 4,
      },
    ],
    explain:
      '驾驶机动车向左变更车道遇到这种情况要注意让行驾驶机动车向左变更车道遇到这种情况要注意让行',
  },

  {
    name: '请选择下列数据222222222',
    type: 'boolean',
    answer: 1,
    options: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: '23',
      },
    ],
  },
  {
    name: '请选择下列数据3333333',
    type: 'checkbox',
    answer: 2,
    options: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 2,
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

const actionData = (f?: number) => {
  const l = list.value.length - 1
  if (f === 1) {
    cIndex.value = cIndex.value < l ? cIndex.value + 1 : l
  } else if (f === 0) {
    cIndex.value = cIndex.value > 0 ? cIndex.value - 1 : 0
  }
  console.log('🍱[cList.value]:', cList.value)
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
      actionData(0)
    } else if (subX < -100) {
      actionData(1)
    }
  }
}
const changeTitle = (e) => {
  console.log('🥧[e]:', e) //
}
</script>

<template>
  <wd-navbar fixed placeholder left-arrow>
    <template #title>
      <wd-segmented :options="navTitle" v-model:value="cuMode" class="mt-5px" @change="changeTitle">
        <template #label="{ option }">
          {{ option.payload!.label }}
        </template>
      </wd-segmented>
    </template>
  </wd-navbar>
  <view @touchstart="start" @touchend="end" class="h-100vh bg-[#f5f5f5]">
    <view>
      <Problem :list="cList[0]" :cMode="cuMode"></Problem>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//TODO: 滚动动画
</style>

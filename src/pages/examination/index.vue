<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { Toast } from '@/utils/uniapi/prompt'
import { chunk } from 'lodash-es'
import { useMessage, useToast } from 'wot-design-uni'
import ProblemComp from './components/problem.vue'
import TransitionComp from './components/transition.vue'
const { safeAreaInsets } = uni.getSystemInfoSync()
const message = useMessage()
const toast = useToast()
// 动画相关数据
const position = ref('right')
const transition = ref(null)

const show = ref(false)

const cMode = ref(0)
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
])
// 对页面数据分组
const list = ref() // 分页数据
const cIndex = ref(0) // 获取总数下标
const cList = ref() // 获取当前数据

list.value = chunk(anList.value, 1)
cList.value = list.value[cIndex.value]

// 操作题目切换
const actionData = (f?: number) => {
  const l = list.value.length - 1
  console.log('🍷', cIndex.value)
  setTimeout(() => {
    if (f === 1) {
      position.value = 'right'
      if (cIndex.value < l) {
        cIndex.value++
      } else {
        cIndex.value = l

        if (cMode.value === 0) {
          submitAnswer()
        } else {
          Toast('已经是最后一题了哦')
        }

        return false
      }
    } else if (f === 0) {
      position.value = 'left'
      if (cIndex.value > 0) {
        cIndex.value--
      } else {
        cIndex.value = 0
        Toast('已经是第一题了哦')
        return false
      }
    }
    transition.value.custom()
    cList.value = list.value[cIndex.value]
  }, 300)
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
function submitAnswer() {
  message
    .confirm({
      msg: '提示文案',
      title: '标题',
    })
    .then(() => {
      console.log('点击了确定按钮')
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
</script>

<template>
  <wd-navbar fixed placeholder safeAreaInsetTop left-arrow>
    <template #title>
      <view class="mt-8px">
        <wd-segmented :options="navTitle" v-model:value="cMode">
          <template #label="{ option }">
            {{ option.payload!.label }}
          </template>
        </wd-segmented>
      </view>
    </template>
  </wd-navbar>

  <view @touchstart="start" @touchend="end" class="h-100vh bg-[#f5f5f5]">
    <view>
      <Problem-Comp :list="cList[0]" :cMode="cMode" @next="actionData(1)"></Problem-Comp>
    </view>
  </view>

  <Transition-Comp :position="position" ref="transition" />
</template>

<style lang="scss" scoped></style>

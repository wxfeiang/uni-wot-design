<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { routeTo } from '@/utils'
import { Toast } from '@/utils/uniapi/prompt'

import { useMessage, useToast } from 'wot-design-uni'
import counAnswerCopm from './components/counAnswer.vue'
import ProblemComp from './components/problem.vue'
import TransitionComp from './components/transition.vue'
import useAnswer from './utils/useAnswer'
const { getList, anList, cIndex, cList, listLoading } = useAnswer()

const message = useMessage()
const toast = useToast()
const message2 = useMessage('wd-message-box-slot')
// 动画相关数据
const position = ref('right')
const transition = ref(null)
// 考试时间
const countDown = ref<any>(null)
const countDownTime = ref<number>(45 * 60 * 60 * 1000)

function timePause() {
  countDown.value.pause()
}
const timeStart = () => {
  countDown.value.start()
}

// 当前展示类型
const cMode = ref(null)
// 顶部标题
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

// 操作题目切换
const actionData = (f?: number, index?: number) => {
  const l = anList.value.length - 1

  setTimeout(() => {
    if (!index && index !== 0) {
      if (f === 1) {
        position.value = 'right'
        if (cIndex.value < l) {
          cIndex.value++
        } else {
          cIndex.value = l
          if (cMode.value === 0) {
            Toast('题目都做完了!')
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

          Toast('已经是第一题了哦!')
          return false
        }
      }
    } else {
      cIndex.value = index
    }

    transition.value.custom()
    cList.value = anList.value[cIndex.value]
  }, 500)
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
    console.log('手指上下滑')
  } else {
    if (subX > 100) {
      actionData(0)
    } else if (subX < -100) {
      actionData(1)
    }
  }
}

const aIsNoAnswer = ref<number>(0)
const current = ref<number>(0)
const gradientColor = {
  '0%': '#ffd01e',
  '100%': '#ee0a12',
}
const defaultColor = ref('#4d80f0')
// 交卷提示
function comfirAnswer(event?: any) {
  aIsNoAnswer.value = event
  const l = anList.value.length
  current.value = Math.floor(((l - event) / l) * 100)

  timePause()
  message2
    .confirm({
      title: '交卷提示',
      confirmButtonText: '继续答题',
      cancelButtonText: '现在交卷',
      closeOnClickModal: false,
    })
    .then(() => {
      timeStart()
    })
    .catch(() => {
      submitAnswer()
    })
}

// 交卷
function submitAnswer() {
  toast.loading('考试结束,正在提交数据...')
  // TODO: 跳转至结果页面
  setTimeout(() => {
    routeTo({
      url: '/pages-sub/result/index',
      navType: NAVIGATE_TYPE.REDIRECT_TO,
    })
  }, 100)
}
// 完成答卷
function finishAnswer() {
  toast.loading('考试结束,自动提提交...')
  submitAnswer()
}

// 顶部返回
function handleClickLeft() {
  uni.navigateBack()
}

// 底部题目切换
function toAnswer(event) {
  actionData(1, event)
}

onLoad((options: any) => {
  if (!options.cMode) {
    Toast('获取页面数据参数有误!')
    setTimeout(() => {
      routeTo({
        navType: NAVIGATE_TYPE.NAVIGATE_BACK,
      })
    }, 1000)
    return false
  }
  cMode.value = options.cMode * 1
  getList(cMode.value)
})
</script>

<template>
  <wd-navbar fixed placeholder safeAreaInsetTop left-arrow @click-left="handleClickLeft">
    <template #title>
      <view class="mt-8px">
        <template v-if="cMode !== 0">
          <wd-segmented :options="navTitle" v-model:value="cMode">
            <template #label="{ option }">
              {{ option.payload!.label }}
            </template>
          </wd-segmented>
        </template>
        <template v-else>
          <view class="pt-10px">
            <wd-count-down :time="countDownTime" ref="countDown" @finish="finishAnswer" />
          </view>
        </template>
      </view>
    </template>
  </wd-navbar>

  <view @touchstart="start" @touchend="end" class="h-100vh pb-100px">
    <view>
      <Problem-Comp :list="cList" :cMode="cMode" @next="actionData(1)"></Problem-Comp>
    </view>
  </view>

  <counAnswer-Copm
    :cIndex="cIndex"
    :alist="anList"
    :cMode="cMode"
    @toAnswer="toAnswer"
    @submitAnswer="comfirAnswer"
  ></counAnswer-Copm>
  <Transition-Comp :position="position" ref="transition" />
  <wd-message-box selector="wd-message-box-slot" custom-class="customMassage">
    <wd-circle
      v-model="current"
      :strokeWidth="15"
      :color="aIsNoAnswer > 0 ? gradientColor : defaultColor"
    >
      <view v-if="aIsNoAnswer > 0">
        <view class="font-size-12px">未做题</view>
        <view class="color-red">{{ aIsNoAnswer }} 题</view>
      </view>
      <view v-else>
        <view class="font-size-12px">已完成</view>
        <view class="color-blue">{{ anList.length }} 题</view>
      </view>
    </wd-circle>
  </wd-message-box>
</template>

<style lang="scss" scoped></style>

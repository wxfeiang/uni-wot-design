<script lang="ts" setup>
import { changeDict } from '@/utils'
import { answerIndex, answerType } from '@/utils/dict'
import { Mode, ProBlemItemList } from '../types/types'

const props = defineProps({
  list: {
    type: Object as PropType<ProBlemItemList>,
  },
  cMode: {
    type: Number as PropType<Mode>,
    default: 1,
  },
})
// 初始化数据
const initData = () => {
  console.log('🍜', props.cMode, props.list)
  if (props.cMode === 2) {
    props.list.options.forEach((item) => {
      item.activeName = item.value === props.list.answer ? 'success' : 'default'
    })
  } else if (props.cMode === 1) {
    props.list.options.forEach((item) => {
      console.log('🍢')
      item.activeName = 'default'
      // 找出答题过的
      if (item.value === props.list.answer && props.list.isAnswer) {
        item.activeName = 'success'
      } else if (item.value === props.list.currentAnswer && item.isActive) {
        // 找出打错的项目
        item.activeName = 'error'
      }
    })
  }
}
// 监听当前模式
watch(
  () => [props.cMode, props.list],
  (newValue) => {
    initData()
  },
  {
    immediate: true,
  },
)

// 答题操作
const changeAnswer = (e) => {
  console.log('🍎[e]:', e, props.cMode, props.list)
  // 当前题目是否已经答过/背题
  if (props.list.isAnswer || props.cMode === 2) return false
  // 改变当前题目状态
  props.list!.isAnswer = true // 标记当前题目已经答过
  // 改变选项颜色
  props.list.options.forEach((item) => {
    if (item.value === e.value) {
      item.isActive = true // 标记当前选项
    }
    if (!props.cMode) {
      // 考试模式只显示正确答案 ,不显示其他
      if (e.value === props.list.answer && item.value === props.list.answer) {
        console.log('对了', item)
        item.activeName = 'success'
      }
    } else if (props.cMode === 1) {
      // 答题模式
      if (e.value === props.list.answer && item.value === props.list.answer) {
        console.log('对====了', item)
        item.activeName = 'success'
      } else if (e.value === item.value) {
        // 当前值标出错误
        item.activeName = 'error'
        // 把对的值标出来
      } else if (props.list.answer === item.value) {
        item.activeName = 'success'
      }
    } else if (props.cMode === 2) {
      // 背题模式
      console.log('🥓')
    }
  })
}
// 计算当前答案 和已选的答案
const showAnswerObj = computed(() => {
  const obj = {
    answerIndex: null,
    currentIndex: null,
  }
  if (props.list.isAnswer) {
    // 正确答案的下标
    const index = props.list.options.findIndex((item) => {
      return item.value === props.list.answer
    })
    console.log('🌽[index]:', index)
    // 当前答题的下标
    const currentIndex = props.list.options.findIndex((item) => {
      return item.value === props.list.currentAnswer
    })
    // 正确答案的下标
    obj.answerIndex = index
    // 当前答题的下标
    obj.currentIndex = currentIndex
  }

  return obj
})
</script>

<template>
  <view class="p-10px">
    <view class="mb-10px">
      <wd-tag type="primary" mark>
        {{ changeDict(answerType, list.type) }}
      </wd-tag>
      {{ list.name }}
    </view>

    <template v-if="list.type === 'radio' || list.type === 'boolean'">
      <wd-radio-group v-model="list!.currentAnswer" class="bg-transparent" @change="changeAnswer">
        <wd-radio
          :value="item.value"
          v-for="(item, index) in list.options"
          :key="index"
          class="p-10px"
          :class="item.activeName"
        >
          <view class="flex items-center" :class="item.activeName">
            <view class="an-text a-text" v-if="item.activeName === 'success'">
              <wd-icon name="check1" size="18px"></wd-icon>
            </view>
            <view class="an-text a-text" v-else-if="item.activeName === 'error'">
              <wd-icon name="close" size="12px"></wd-icon>
            </view>
            <view class="an-text active" v-else>
              {{ answerIndex[index] }}
            </view>

            <view class="flex-1 text-left" :class="item.activeName">{{ item.name }}</view>
          </view>
        </wd-radio>
      </wd-radio-group>
    </template>
    <template v-if="list.type === 'checkbox'">
      <wd-checkbox-group v-model="list!.currentAnswer">
        <wd-checkbox
          :modelValue="item.value"
          v-for="(item, index) in list.options"
          :key="index"
          class="py-10px"
        >
          <view class="flex items-center">
            <view class="an-text">
              {{ answerIndex[index] }}
            </view>
            <view class="flex-1 text-left">{{ item.name }}</view>
          </view>
        </wd-checkbox>
      </wd-checkbox-group>
      <view class="flex justify-center mt-30px">
        <wd-button>确认答案</wd-button>
      </view>
    </template>
  </view>
  <view>
    正确答案 : {{ answerIndex[showAnswerObj!.answerIndex] }}, 你的答案 :
    {{ answerIndex[showAnswerObj!.currentIndex] }}
  </view>
</template>

<style lang="scss" scoped>
.success {
  color: var(--color-an-success);
  .a-text {
    background: var(--color-an-success);
    @apply text-white;
  }
}
.error {
  color: var(--color-an-error);
  .a-text {
    background: var(--color-an-error);
    @apply text-white;
  }
}

:deep(.wd-icon-check),
:deep(.wd-checkbox__shape),
:deep(.wd-radio__shape) {
  display: none !important;
}

.an-text {
  @apply mr-10px w-25px h-25px line-height-25px rounded-10000  shadow-md text-center;
}
</style>

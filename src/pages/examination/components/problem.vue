<script lang="ts" setup>
import { changeDict } from '@/utils'
import { answerIndex, answerType } from '@/utils/dict'
import { orderBy } from 'lodash-es'
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
  //  单选
  if (props.list.type === 'radio') {
    console.log('🍞====radio')
    if (props.cMode === 2) {
      props.list.options.forEach((item) => {
        item.activeName = item.value === props.list.answer ? 'success' : 'default'
      })
    } else if (props.cMode === 1) {
      props.list.options.forEach((item, index) => {
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
  // 多选
  if (props.list.type === 'checkbox') {
    console.log('🍞====checkbox')
    const rArr = JSON.parse(props.list.answer)

    if (props.cMode === 2) {
      props.list.options.forEach((item, index) => {
        rArr.forEach((i, j) => {
          if (item.value === i) {
            item.activeName = 'success'
          }
        })
      })
    } else if (props.cMode === 1) {
      console.log('🦐', props.list)
      props.list.options.forEach((item, index) => {
        item.activeName = 'default'
        // // 找出答题过的
        rArr.forEach((i, j) => {
          if (item.value === i && props.list.isAnswer) {
            item.activeName = 'success'
          } else {
            item.activeName = 'default'
          }
        })
        // if (item.value === props.list.answer && props.list.isAnswer) {
        //   item.activeName = 'success'
        // } else if (item.value === props.list.currentAnswer && item.isActive) {
        //   // 找出打错的项目
        //   item.activeName = 'error'
        // }
      })
    }
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
  // 当前题目是否已经答过/背题
  if (props.list.isAnswer || props.cMode === 2) return false
  // 改变当前题目状态
  props.list!.isAnswer = true // 标记当前题目已经答过
  // 改变选项颜色
  props.list.options.forEach((item, index) => {
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

// 标出正确答案/及显示所选答案
const currentSelect = computed(() => {
  const a = props.list.options.findIndex((item) => item.isActive)
  const b = props.list.options.findIndex((item) => item.activeName === 'success') //
  return {
    // 当前选中
    cIndex: a,
    // 当前正确答案下标
    rIndex: b,
    // 当前选择了 对错状态
    rSataus: a === b,
    // 显示作答结果
    isShowAnswer: props.cMode === 2 || (props.cMode === 1 && a > -1), // 这道题已经选择了
  }
})

// 多选cao zuos
const sureCheckbox = () => {
  // if (!props.list.currentAnswer || props.list.currentAnswer.length < 2) {
  //   Toast('请选择两个及以上答案!')
  // }
  props.list!.isAnswer = true // 标记当前已经作答
  const a = props.list.currentAnswer as unknown as Array<number>
  // const c = orderBy(props.list.currentAnswer as unknown as Array<number>) // 当前答案排序
  const rArr = JSON.parse(props.list.answer)
  const r = orderBy(rArr as unknown as Array<number>) // 正确答案排序

  // a.forEach((item, index) => {
  //   console.log('🍛', item)
  //   r.forEach((i, j) => {
  //     // eslint-disable-next-line eqeqeq
  //     if (item == i) {
  //       item.activeName = 'success'
  //     }
  //   })
  // })
}
const toggle = (e) => {
  console.log('🥕', e)
  return false
}
</script>

<template>
  <view class="p-10px bg-white">
    <view class="my-10px">
      <wd-tag mark bg-color="#1dacfa">
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
      <wd-checkbox-group
        v-model="list!.currentAnswer"
        class="dy-checkbox-default"
        @toggle="toggle"
        :disabled="props.cMode == 2"
      >
        <wd-checkbox
          :modelValue="item.value"
          v-for="(item, index) in list.options"
          :key="index"
          class="py-10px"
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
            <view class="flex-1 text-left whitespace-break-spaces">{{ item.name }}</view>
          </view>
        </wd-checkbox>
      </wd-checkbox-group>
      <view class="flex justify-center mt-30px">
        <wd-button class="w-80%" @click="sureCheckbox">确认答案</wd-button>
      </view>
    </template>

    <view class="my-20px p-10px flex bg-coolgray-200" v-if="currentSelect.isShowAnswer">
      <view class="mr-10px font-bold">
        正确答案 :
        <text class="text-lightblue">{{ answerIndex[currentSelect.rIndex] }}</text>
      </view>
      <view class="font-bold" v-if="props.cMode === 1 && currentSelect.cIndex > -1">
        您的答案 :
        <text :class="currentSelect.rSataus ? 'text-lightblue' : 'text-red-500'">
          {{ answerIndex[currentSelect.cIndex] }}
        </text>
      </view>
      <view class="text-lightblue ml-auto">
        <wd-icon name="keywords" size="18px"></wd-icon>
        速记口诀
      </view>
    </view>

    <view class="mt-30px" v-if="currentSelect.isShowAnswer">
      <!-- TODO: vip 权限校验 -->
      <dy-title title="本题技巧"></dy-title>
      <view class="p-10px">
        {{ props.list.explain || '死记硬背' }}
      </view>
    </view>
  </view>
  <wd-gap bg-color="#F3F7F8"></wd-gap>
  <view class="p-10px bg-white" v-if="currentSelect.isShowAnswer">
    <view class="text-center font-bold text-lg">题目解析</view>
    <view class="">
      <dy-title title="题目解析"></dy-title>
      <view class="color-gray-500 p-10px">
        {{ props.list.explain || '死记硬背' }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@mixin band($f) {
  background: var($f) !important;
  @apply text-white;
}

.success {
  color: var(--color-an-success);
  .a-text {
    @include band(--color-an-success);
  }
}
.error {
  color: var(--color-an-error);
  .a-text {
    @include band(--color-an-error);
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
.dy-checkbox-default {
  :deep(.is-checked .success .an-text) {
    @include band(--color-an-success);
  }
  :deep(.is-checked .error .an-text) {
    @include band(--color-an-error);
  }
  :deep(.is-checked .an-text) {
    @include band(--color-an-info);
  }
  :deep(.wd-checkbox.is-disabled .wd-checkbox__label) {
    color: var(--wot-checkbox-label-color);
  }
}
</style>

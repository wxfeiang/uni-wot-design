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
// let initList = () => {
//   props.list!

// })
// onMounted(async () => {
//   await initList();
// });

// 当前模式/ 考试/背题
// const activeNmae = computed<string>(() => {
//   let a = ''
//   if (!props.cMode) {
//     a = props.list.answer === props.list.currentAnswer ? 'success' : 'error'
//   }
//   return a
// })
function change(e) {
  // 答对的值
  const right = e.value === props.list.answer ? e.value : ''

  // props.list.options.forEach((item) => {
  //   if (!props.cMode) {
  //     // 考试模式只显示正确答案 ,不显示其他
  //     if (e.value === props.list.answer && item.value === props.list.answer) {
  //       console.log('对了', item)
  //       item.activeName = 'success'
  //     }
  //   } else if (props.cMode === 1) {
  //     // 答题模式
  //     if (e.value === props.list.answer && item.value === props.list.answer) {
  //       console.log('对====了', item)
  //       item.activeName = 'success'
  //     } else {
  //       item.activeName = 'error'
  //     }
  //   }

  //   // else if (e.value === item.value) {
  //   //   console.log('打错了')
  //   //   item.activeName = 'error'
  //   // }
  // })
}
</script>

<template>
  <view class="p-10px">
    <wd-tag type="primary" mark>
      {{ changeDict(answerType, list.type) }}
    </wd-tag>
    {{ list.name }}

    <wd-radio-group v-model="list!.currentAnswer" class="bg-transparent" @change="change">
      <wd-radio
        :value="item.value"
        v-for="(item, index) in list.options"
        :key="index"
        class="p-10px"
        :class="item.activeName"
      >
        <view class="flex items-center">
          <view
            class="mr-10px w-25px h-25px line-height-25px rounded-10000 border-solid border-2 border-sky-500"
          >
            {{ answerIndex[index] }}
          </view>
          <view class="flex-1 text-left">{{ item.name }}</view>
        </view>
      </wd-radio>
    </wd-radio-group>
  </view>
</template>

<style lang="scss" scoped>
.success {
  color: #1890ff;
  background: #000;
}
.error {
  color: red;
  background: red;
}
:deep(.wd-icon-check),
:deep(.wd-radio__shape) {
  display: none !important;
}
// :deep(.is-checked) {
//   color: #fff !important;
//   background: #0083ff;
// }
</style>

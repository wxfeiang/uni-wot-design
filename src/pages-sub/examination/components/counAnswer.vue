<script lang="ts" setup>
import { Toast } from '@/utils/uniapi/prompt'
const emit = defineEmits<{
  (e: 'submitAnswer', value: number): void
  (e: 'toAnswer', value: number): void // 切换题目
}>()
const props = defineProps({
  alist: {
    type: Object, // 总数
  },
  cIndex: {
    // 当前位子
    type: Number,
    default: 0,
  },
  cMode: {
    // 当前模式
    type: Number,
    default: 1,
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: 'h-50px',
  },
})
const allStatus = computed(() => {
  let aIsRight = 0
  let aNoIsRight = 0
  let aIsNoAnswer = 0
  if (props.cMode !== 0) {
    aIsRight = props.alist.filter((item) => item.isRight).length
    aNoIsRight = props.alist.filter((item) => !item.isRight && item.isAnswer).length
  } else {
    // 考试模式
    // props.alist.foeach((item) => {
    //   if (item.isAnswer) {
    //   }
    // })

    aIsNoAnswer = props.alist.filter((item) => !item.isAnswer).length
  }
  return {
    aIsRight,
    aNoIsRight,
    aIsNoAnswer,
  }
})
// 点击收藏
function collect() {
  props.alist[props.cIndex]!.isCollect = !props.alist[props.cIndex]!.isCollect
  props.alist[props.cIndex]!.isCollect ? Toast('收藏成功') : Toast('取消收藏')
}

const show = ref<boolean>(false)

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
function toAnswer(index) {
  emit('toAnswer', index)
  close()
}
function submitAnswer() {
  emit('submitAnswer', allStatus.value.aIsNoAnswer)
}
</script>

<template>
  <view :class="props.placeholder ? props.height : ''"></view>
  <!-- // 占位在空标 防止塌陷 -->

  <view class="dy-footer">
    <view class="flex justify-between items-center h-100% px-10px">
      <view class="flex">
        <view class="dy-icon" @click="collect">
          <wd-icon name="star" size="22px" v-if="!props.alist[cIndex]?.isCollect"></wd-icon>
          <wd-icon name="star-filled" size="22px" color="#ebde4f" v-else></wd-icon>
          <text>收藏</text>
        </view>
        <view class="ml-4" v-if="props.cMode == 0">
          <wd-button size="small" @click="submitAnswer">交卷</wd-button>
        </view>
      </view>
      <view class="dy-icon">
        <template v-if="props.cMode !== 0">
          <view class="dy-icon mr-10px success">
            <view class="a-text">
              <wd-icon name="check1" size="18px"></wd-icon>
            </view>
            <text>{{ allStatus.aIsRight }}</text>
          </view>
          <view class="dy-icon mr-10px error">
            <view class="a-text">
              <wd-icon name="close-normal" size="18px"></wd-icon>
            </view>
            <text>{{ allStatus.aNoIsRight }}</text>
          </view>
        </template>
        <view class="dy-icon" @click="showActions">
          <wd-icon name="app" size="22px"></wd-icon>
          <text>{{ props.cIndex + 1 }} / {{ props.alist.length }}</text>
        </view>
      </view>
    </view>
  </view>

  <wd-action-sheet v-model="show" @close="close" title="答题卡">
    <view class="flex flex-wrap gap-15px p-15px max-h-500px overflow-y-auto">
      <template v-for="(item, index) in props.alist" :key="item.id">
        <template v-if="item!.isAnswer">
          <view
            class="dy-item"
            :class="item.isRight ? 'isRight' : props.cMode !== 0 ? 'isError' : 'isActive'"
            @click="toAnswer(index)"
          >
            {{ index + 1 }}
          </view>
        </template>
        <template v-else>
          <view class="dy-item" @click="toAnswer(index)">{{ index + 1 }}</view>
        </template>
      </template>
    </view>
  </wd-action-sheet>
</template>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
    virtualHost: true,
  },
}
</script>
<style lang="scss" scoped>
@mixin band($f) {
  background: var($f) !important;
}
.a-text {
  @apply text-white;
}
.success {
  color: var(--color-an-success) !important;
  .a-text {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    @include band(--color-an-success);
  }
}
.error {
  color: var(--color-an-error) !important;
  .a-text {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    @include band(--color-an-error);
  }
}

.dy-footer {
  @apply fixed bottom-0 left-0 right-0 h-50px z-9 w-100%  bt-#ccc bg-white;
}

.dy-icon {
  @apply flex items-center;
  text {
    @apply mx-5px;
  }
}
.dy-item {
  @apply wh-40 rounded-100 text-center line-height-40px bd-#ccc;
}
.isRight {
  @apply text-white;
  @include band(--color-an-success);
}
.isError {
  @apply text-white;
  @include band(--color-an-error);
}
.isActive {
  @apply text-white;
  @include band(--color-an-info);
}
.currentName {
  border: 1px solid #1890ff;
}
</style>

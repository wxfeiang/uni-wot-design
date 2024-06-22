<script lang="ts" setup>
import { Toast } from '@/utils/uniapi/prompt'
const props = defineProps({
  alist: {
    type: Object, // 总数
  },
  cIndex: {
    // 当前位子
    type: Number,
    default: 0,
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
  const aIsRight = props.alist.filter((item) => item.isRight).length
  const aNoIsRight = props.alist.filter((item) => !item.isRight && item.isAnswer).length

  return {
    aIsRight,
    aNoIsRight,
  }
})
// 点击收藏
function collect() {
  props.alist[props.cIndex]!.isCollect = !props.alist[props.cIndex].isCollect
  props.alist[props.cIndex]!.isCollect ? Toast('收藏成功') : Toast('取消收藏')
}

const show = ref<boolean>(false)
const panels = ref([
  [
    {
      iconUrl:
        '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
      title: '微信好友',
    },
  ],
  [
    {
      iconUrl:
        '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
      title: '微信好友',
    },
  ],
])
function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
</script>

<template>
  <view :class="props.placeholder ? props.height : ''"></view>
  <view class="dy-footer">
    <view class="flex justify-between items-center h-100% px-10px">
      <view class="dy-icon" @click="collect">
        <wd-icon name="star" size="22px" v-if="!props.alist[cIndex].isCollect"></wd-icon>
        <wd-icon name="star-filled" size="22px" color="#ebde4f" v-else></wd-icon>
        收藏
      </view>
      <view class="dy-icon">
        <view class="dy-icon mr-10px">
          <view class="a-text">
            <wd-icon name="check-circle-filled success" size="22px"></wd-icon>
          </view>
          <text>{{ allStatus.aIsRight }}</text>
        </view>
        <view class="dy-icon mr-10px">
          <view class="a-text">
            <wd-icon name="close-circle-filled error" size="22px"></wd-icon>
          </view>
          <text>{{ allStatus.aNoIsRight }}</text>
        </view>
        <view class="dy-icon" @click="showActions">
          <wd-icon name="app" size="22px"></wd-icon>
          <text>{{ props.cIndex + 1 }} / {{ alist.length }}</text>
        </view>
      </view>
    </view>
  </view>
  <wd-action-sheet v-model="show" :panels="panels" @close="close" />
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
.dy-footer {
  @apply fixed bottom-0 left-0 right-0 h-50px z-9 w-100% border-t-1px border-t-#ccc border-t-solid bg-white;
}
.dy-icon {
  @apply flex items-center;
  text {
    @apply mx-5px;
  }
}

@mixin band($f) {
  background: var($f) !important;
  @apply text-white;
}
.success {
  color: var(--color-an-success) !important;
  .a-text {
    @include band(--color-an-success);
  }
}
.error {
  color: var(--color-an-error) !important;
  .a-text {
    @include band(--color-an-error);
  }
}
</style>

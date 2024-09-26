<script setup lang="ts">
const props = defineProps({
  leftTitle: {
    type: [String, Number],
  },
  left: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  isNavShow: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#fff',
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
})
function handleClickLeft() {
  uni.navigateBack()
}
</script>
<template>
  <view class="">
    <!-- dy 完全居左 -->
    <wd-navbar
      safeAreaInsetTop
      :placeholder="props.placeholder"
      fixed
      :bordered="props.border"
      :custom-class="`custom-class-nav-left ${props.isNavShow ? 'nav_show' : ''}`"
      v-if="props.left"
    >
      <template #left>
        <wd-icon
          @click="handleClickLeft"
          name="arrow-left"
          size="22px"
          :color="props.isNavShow ? props.color : ''"
        ></wd-icon>
      </template>
      <template #title>
        <view class="flex items-center" @click="handleClickLeft">
          <view
            class="ml-5px truncate-1 text-left font-400"
            :class="props.isNavShow ? 'color-#fff' : ''"
            :style="`color:${props.isNavShow ? props.color : ''}`"
          >
            {{ props.leftTitle }}
          </view>
        </view>
      </template>
    </wd-navbar>
    <!-- dy 中 -->
    <wd-navbar
      v-if="props.center"
      fixed
      :placeholder="props.placeholder"
      left-arrow
      :bordered="props.border"
      :custom-class="`${props.isNavShow ? 'nav_show' : ''}`"
      safeAreaInsetTop
    >
      <template #left>
        <wd-icon
          @click="handleClickLeft"
          name="arrow-left"
          size="22px"
          :color="props.isNavShow ? props.color : ''"
        ></wd-icon>
      </template>
      <template #title>
        <view
          class="truncate-1 font-400 text-center"
          :class="props.isNavShow ? 'color-#fff' : ''"
          :style="`color:${props.isNavShow ? props.color : ''}`"
        >
          {{ props.leftTitle }}
        </view>
      </template>
    </wd-navbar>
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
//@import url(); 引入公共css类
:deep(.custom-class-nav-left) {
  .wd-navbar__content {
    @apply flex! items-center! justify-between! gap-10px!;
    .wd-navbar__title {
      @apply flex-1! flex! max-w-85%!;
    }
  }
}
</style>

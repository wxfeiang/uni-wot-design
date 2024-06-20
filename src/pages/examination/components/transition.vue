<script lang="ts" setup>
const props = defineProps({
  // customShow: {
  //   type: Boolean,
  //   default: false,
  // },
  position: {
    type: String,
    default: 'right',
  },
})
const customShow = ref<boolean>(false)
const translate = ref('blue')
function custom() {
  customShow.value = true
  setTimeout(() => {
    customShow.value = false
  }, 10)
}

defineExpose({
  custom,
})
</script>

<template>
  <view>
    {{ position }}
    <wd-transition
      :show="customShow"
      name=""
      :duration="1000"
      enter-class="custom-enter"
      enter-active-class="custom-enter-active"
      enter-to-class="custom-enter-to"
      leave-class="custom-leave"
      leave-active-class="custom-leave-active"
      leave-to-class="custom-leave-to"
      :custom-class="`block2 ${props.position}`"
    />
  </view>
</template>

<style lang="scss" scoped>
:deep(.block2) {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
}
:deep(.right) {
  right: 0;
}
:deep(.left) {
  left: 0;
}
:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition-property: transform;
}

:deep(.custom-leave-to) {
  transform: v-bind(
    'position === "right"?  "translate(-1000px, 0px)": "translate(1000px, 0px)"'
  ); /* 水平移动50像素，垂直移动100像素 */
}
</style>

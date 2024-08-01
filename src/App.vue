<script setup lang="ts">
// import { useSystemStore } from '@/store'

// // 初始化系统信息
// const systemStore = useSystemStore()
// console.log('🌶[systemStore]:', systemStore.initSystemInfo())

// const config = useSystemFig(systemStore.initSystemInfo())

useUpdateApp()
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>

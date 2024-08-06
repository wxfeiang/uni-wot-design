<script setup lang="ts">
import { useSystemStore } from '@/store'
//
onLaunch(() => {
  useUpdateApp()
})

// 初始化系统请求信息
const systemStore = useSystemStore()
useSystemFig(systemStore.initSystemInfo())
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

<script setup lang="ts">
import { useSystemStore } from './store'

//
onLaunch(() => {
  useUpdateApp()
})

// 初始化系统请求信息
const systemStore = useSystemStore()
useSystemFig(systemStore.initSystemInfo())

// 隐藏tabbar，参数true表示隐藏，false表示显示
uni.hideTabBar({
  animation: false, // 是否需要动画效果，默认为 false
  success: function () {
    console.log('Tabbar is hidden!')
  },
  fail: function (err) {
    console.error('Failed to hide tabbar:', err)
  },
})
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

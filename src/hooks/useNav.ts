import PLATFORM from '@/utils/platform'

const { safeAreaInsets } = uni.getSystemInfoSync()
console.log('🍠[safeAreaInsets]:', safeAreaInsets, uni.getSystemInfoSync())

// 计算出顶部所需要的安全距离
const navTop = ref(safeAreaInsets.top + 40)

onMounted(async () => {
  if (PLATFORM.isH5) {
    navTop.value = navTop.value - 44
  }
})

export default () => {
  return {
    navTop,
  }
}

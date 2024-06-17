<script lang="ts" setup>
import { ProBlemList } from '../types/types'

const props = defineProps({
  list: {
    type: Object as PropType<ProBlemList>,
  },
})

//
</script>

<template>
  <view>
    <wd-tag type="primary" mark>{{ list.type }}</wd-tag>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useWebview from './hooks/useWebview'
const { content, AarData } = useWebview()
const types = ref(null)
onLoad((options) => {
  console.log('🍬[options]:', options)
  types.value = options.type
  AarData(types.value)
})
</script>

<template>
  <view class="">
    <dy-richtext :html="content"></dy-richtext>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

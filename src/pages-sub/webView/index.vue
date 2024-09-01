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
const showType = ref()
const webUrl = ref('')

onLoad((options) => {
  types.value = options.type
  webUrl.value = decodeURIComponent(options.url)
  showType.value = options.showType
  // AarData(types.value)
})
</script>

<template>
  <web-view :src="webUrl" v-if="showType === 'h5'"></web-view>

  <view class="" v-else>
    <dy-richtext :html="content"></dy-richtext>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

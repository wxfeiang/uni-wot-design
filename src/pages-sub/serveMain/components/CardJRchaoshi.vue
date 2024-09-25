<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { SetClipboardData } from '@/utils/uniapi'

const title = ref('码服务')
</script>

<template>
  <dy-navbar :leftTitle="title" left></dy-navbar>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
import { changeDict } from '@/utils'
import { answerType } from '@/utils/dict'
import { ProBlemItemList } from '../types/types'

const props = defineProps({
  list: {
    type: Object as PropType<ProBlemItemList>,
  },
})
</script>

<template>
  <view>
    <wd-tag type="primary" mark>
      {{ changeDict(answerType, list.type) }}
    </wd-tag>
    {{ list.name }}

    <wd-radio-group>
      <wd-radio :value="c.value" v-for="(c, j) in list.options" :key="j">
        {{ c.name }}
      </wd-radio>
    </wd-radio-group>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

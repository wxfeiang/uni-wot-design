<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationBarTitleText: '雄安一卡通',
  },
}
</route>

<script lang="ts" setup>
import { Constant } from '@/enums/constant'
import { mainTypeEmums } from '@/enums/mainTypeEmum'
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { routeTo } from '@/utils'
//
onLoad((options) => {
  uni.showLoading({ title: '加载中', mask: true })
  console.log('🍢[options]:', options)
  if (options.type === mainTypeEmums.SHARE_COUPN) {
    routeTo({
      url: `${Constant.COUPON_PATH}`,
      data: { ...options },
      navType: NAVIGATE_TYPE.REDIRECT_TO,
    })
  }
  uni.hideLoading()
})
</script>

<template>
  <view class="">处理中</view>
</template>

<style lang="scss" scoped>
//
</style>

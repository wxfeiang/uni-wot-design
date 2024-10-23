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
import qs from 'qs'
// 去对应的页面
function goto(options) {
  if (options.type === mainTypeEmums.SHARE_COUPN) {
    routeTo({
      url: `${Constant.COUPON_PATH}`,
      data: { ...options },
      navType: NAVIGATE_TYPE.REDIRECT_TO,
    })
  }
  if (options.type === mainTypeEmums.SHARE_PROUDUCT) {
    routeTo({
      url: `${Constant.GOODS_PATH}`,
      data: { ...options },
      navType: NAVIGATE_TYPE.REDIRECT_TO,
    })
  }
  const path = qs.stringify(options)
  useShare(path)
}
onLoad((options) => {
  uni.showLoading({ title: '加载中', mask: true })
  console.log('🍢页面进入数据====》:', options)

  const q = decodeURIComponent(options.q) // 获取到二维码原始链接内容
  // const scancode_time = parseInt(query.scancode_time) // 获取用户扫码时间 UNIX 时间戳
  console.log('🥘', q !== 'undefined')
  if (q && q !== 'undefined') {
    // FIX: 待验证
    const pathData = q.split('?')[1]
    const data = qs.parse(pathData)
    goto(data)
  } else {
    goto(options)
  }

  uni.hideLoading()
})
</script>

<template>
  <view class=""></view>
</template>

<style lang="scss" scoped>
//
</style>

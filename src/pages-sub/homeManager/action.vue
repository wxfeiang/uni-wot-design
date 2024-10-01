<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '活动',
  },
}
</route>
<script lang="ts" setup>
import { routeTo } from '@/utils'

const id = ref('null')

const gopath = function (url, e) {
  routeTo({
    url,
    data: e,
  })
}

const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    // const res: any = await getGoodList({
    //   page: pageNo,
    //   size: pageSize,
    //   status: 1,
    // })
    // res.content.forEach((el) => {
    //   el.rotationUrl = JSON.parse(el.rotationUrl).map((item) => item.data)
    // })
    // console.log('商城列表', res.content)
    // paging.value.complete(res.content)
    // paging.value.complete([])
  } catch {
    paging.value.complete(false)
  }
}

onLoad(async () => {
  // 设置背景图片
})

// 正常情况下，导航栏背景色为透明，滚动距离超过50px时，导航栏背景色变为自生
</script>
<template>
  <view>
    <dy-navbar leftTitle="活动" left></dy-navbar>
  </view>
</template>

<style>
:deep(.nav_custom) {
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent !important;
}
</style>

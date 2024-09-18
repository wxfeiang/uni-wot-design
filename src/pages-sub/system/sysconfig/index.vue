<route lang="json5" type="page">
{
  needLogin: true,
  style: {
    navigationBarTitleText: '设置',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import gywm from '../static/images/gywm.png'
import mmdl from '../static/images/mmdl.png'
import yhxy from '../static/images/yhxy.png'
import yszc from '../static/images/yszc.png'
import { serveProps } from './utils/types'

const serveList = ref<serveProps[]>([
  {
    icon: mmdl,
    title: '小程序免密登录',
    path: '/pages-sub/system/sysconfig/setting',
    islink: true,
  },
  {
    icon: yhxy,
    title: '用户协议',
    path: '/pages-sub/webView/index',
    islink: true,
    data: {
      articleId: '1710488285782016006',
    },
  },
  {
    icon: yszc,
    title: '隐私政策',
    path: '/pages-sub/webView/index',
    islink: true,
    data: {
      articleId: '1710488285782016005',
    },
  },
  {
    icon: gywm,
    title: '版本',
    path: 'min',
    islink: false,
    value: 'V1.2.0',
  },
])
const serveClick = (item: serveProps) => {
  if (item.islink) {
    routeTo({
      url: item.path,
      data: { type: item.data?.articleId, showTop: true, title: item.title },
    })
  } else {
    if (item.path) return

    uni.showToast({
      title: '功能开发中...',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="py-10px">
    <view class="rounded-10px overflow-hidden">
      <wd-cell-group border>
        <wd-cell
          :is-link="item.islink"
          custom-class="custom-class-mine-cell"
          v-for="(item, index) in serveList"
          :key="index"
          clickable
          @click="serveClick(item)"
        >
          <template #icon>
            <wd-img :src="item.icon" width="28" height="28px"></wd-img>
          </template>
          <template #title>
            <view class="ml-10px">{{ item.title }}</view>
          </template>
          <view v-if="item.value" class="color-#999">{{ item.value }}</view>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

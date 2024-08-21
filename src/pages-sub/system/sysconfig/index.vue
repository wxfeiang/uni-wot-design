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
import about from './static/images/about.png'
import shezhi from './static/images/shezhi.png'
import yinsi from './static/images/yinsi.png'
import yonghu from './static/images/yonghu.png'
const setInfo = ref([
  {
    name: '设置',
    icon: shezhi,
    value: '设置小程序免密登录',
    islink: true,
  },
  {
    name: '设置',
    icon: yinsi,
    value: '隐私政策',
    islink: true,
  },

  {
    name: '设置',
    icon: yonghu,
    value: '用户',
    islink: true,
  },
  {
    name: '设置',
    icon: about,
    value: '关于我们',
    islink: false,
  },
])
</script>

<template>
  <view class="p-10px bg-#f5f5f5">
    <view class="rounded-10px overflow-hidden">
      <wd-cell-group border>
        <template v-for="(item, index) in setInfo" :key="index">
          <wd-cell :title="item.name" :is-link="item.islink">
            <template #icon v-if="item.icon">
              <view class="mr-10px">
                <wd-img width="48" height="48" :src="item.icon"></wd-img>
              </view>
            </template>
            <template #label v-if="item.name">
              <view class="color-#999">
                {{ item.name }}
              </view>
            </template>
          </wd-cell>
        </template>
      </wd-cell-group>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

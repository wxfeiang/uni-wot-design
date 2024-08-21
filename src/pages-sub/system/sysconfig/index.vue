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
const setInfo = ref([
  {
    name: '我的社保卡',
  },
  {
    name: '设置',
    icon: 'star',
    rightValue: '设置小程序服务',
  },
])
</script>

<template>
  <view class="p-10px bg-#f5f5f5">
    <view class="rounded-10px overflow-hidden">
      <wd-cell-group border>
        <template v-for="(item, index) in setInfo" :key="index">
          <wd-cell :title="item.name" is-link>
            <template #icon v-if="item.icon">
              <view class="mr-10px">
                <wd-icon name="setting1" size="22px" color="#4689fd"></wd-icon>
              </view>
            </template>
            <view class="color-#999">
              {{ item.rightValue }}
            </view>
          </wd-cell>
        </template>
      </wd-cell-group>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

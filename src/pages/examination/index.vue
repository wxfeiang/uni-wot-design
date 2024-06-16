<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
const { start, end } = useCoordinate()
const current1 = ref(1)
const list1 = ref([
  {
    value: '考试',
    disabled: false,
    payload: {
      avatar: 'https://unpkg.com/wot-design-uni-assets/redpanda.jpg',
    },
  },
  {
    value: '练习',
    disabled: false,
    payload: {
      avatar: 'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
    },
  },
])
const anList = ref([
  {
    name: '请选择下列数据',
    type: 'radio',
    seValue: '',
    list: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 1,
      },
      {
        name: 'asudiasnd',
        value: 1,
      },
      {
        name: '爱疯vv你',
        value: 1,
      },
    ],
  },
  {
    name: '请选择下列数据222222222',
    type: 'radio',
    seValue: '',
    list: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 1,
      },
      {
        name: 'asudiasnd',
        value: 1,
      },
      {
        name: '爱疯vv你',
        value: 1,
      },
    ],
  },
  {
    name: '请选择下列数据3333333',
    type: 'radio',
    seValue: '',
    list: [
      {
        name: '但安逸',
        value: 1,
      },
      {
        name: 'daasdnasdnl',
        value: 1,
      },
      {
        name: 'asudiasnd',
        value: 1,
      },
      {
        name: '爱疯vv你',
        value: 1,
      },
    ],
  },
])
</script>

<template>
  <view class=""></view>
  <wd-navbar left-arrow>
    <template #title>
      <wd-segmented :options="list1" v-model:value="current1"></wd-segmented>
    </template>
  </wd-navbar>
  <view @touchstart="start" @touchend="end">
    <view v-for="(item, index) in anList" :key="index">
      <view>{{ item.name }}</view>

      <wd-radio-group v-model="item.seValue">
        <wd-radio :value="c.value" v-for="(c, j) in item.list" :key="j">
          {{ c.name }}
        </wd-radio>
      </wd-radio-group>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

<script lang="ts" setup>
import useCardMessage from '../hooks/useCardMessage'

const { cardInfoData } = useCardMessage()

// function toRegister() {
//   routeTo({ url: '/pages/login/register' })
// }

const visible = ref<boolean>(false)

const back = () => {
  uni.navigateBack()
}

const data = ref([
  {
    title: '姓名',
    value: '',
    prop: 'xm',
  },
  {
    title: '性别',
    value: '男',
    prop: 'xb',
  },
  {
    title: '年龄',
    value: '18',
    prop: 'phone',
  },
  {
    title: '电话',
    value: '123456789',
    prop: 'dh',
  },
  {
    title: '社会保障卡号',
    value: '123456789',
    prop: 'zhbzkh',
  },
  {
    title: '地址',
    value: '北京市',
    prop: 'address',
  },
])
</script>
<template>
  <view class="p-15px">
    <!-- {{ cardInfoData }} -->
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-cell-group title="基本信息" border>
        <wd-cell
          :title="item.title"
          :value="cardInfoData[item.prop]"
          border
          v-for="(item, index) in data"
          :key="index"
        ></wd-cell>
      </wd-cell-group>
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="back" block>返 回</wd-button>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style lang="scss" scoped>
:deep(.wd-input__error-message),
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}
</style>

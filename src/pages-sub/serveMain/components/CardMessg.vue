<script lang="ts" setup>
import useCardFrom from '../hooks/useCardFrom'
const { Login, model, rules, loading, read } = useCardFrom()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')

// function toRegister() {
//   routeTo({ url: '/pages/login/register' })
// }

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}
const onInput = (value) => {
  model.password += value
}
const onDelete = (value) => {
  // console.log(value)
  // model.password += value
  model.password = value
}
const back = () => {
  uni.navigateBack()
}
const data = ref([
  {
    title: '姓名',
    value: '张三',
  },
  {
    title: '性别',
    value: '男',
  },
  {
    title: '年龄',
    value: '18',
  },
  {
    title: '电话',
    value: '123456789',
  },
  {
    title: '地址',
    value: '北京市',
  },
])
</script>
<template>
  <view class="p-15px">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-cell-group title="基本信息" border>
        <wd-cell
          :title="item.title"
          :value="item.value"
          border
          v-for="(item, index) in data"
          :key="index"
        ></wd-cell>
      </wd-cell-group>
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="back" block :loading="loading">
        返 回
      </wd-button>
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

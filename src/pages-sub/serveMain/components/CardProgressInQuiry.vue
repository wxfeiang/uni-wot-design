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
</script>
<template>
  <view class="p-15px b-green">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            label="身份证号码:"
            label-width="100px"
            type="text"
            v-model="model.username"
            placeholder="请输入身份证号码"
            :rules="rules.username"
            prop="username"
            custom-input-class="custom-input-right"
            disabled
            @click="showKeyBoard"
            :maxlength="18"
            :mixlength="16"
          />

          <wd-input
            label="姓名:"
            label-width="100px"
            type="text"
            v-model="model.password"
            placeholder="请输入姓名"
            :rules="rules.username"
            prop="password"
            custom-input-class="custom-input-right"
          />
          <wd-number-keyboard
            v-model:visible="visible"
            v-model="model.username"
            :maxlength="18"
            extra-key="X"
            close-text="完成"
          ></wd-number-keyboard>
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="mt-20px">
      <wd-button
        type="primary"
        :round="false"
        size="medium"
        @click="Login(form)"
        block
        :loading="loading"
      >
        查 询
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

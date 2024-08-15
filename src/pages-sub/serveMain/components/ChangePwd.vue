<script lang="ts" setup>
import useChangePwd from '../hooks/useChangePwd'
const { submitPasswoed, model, rules, loading } = useChangePwd()

const form = ref(null)

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}
</script>
<template>
  <view class="p-15px">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            label="姓名:"
            label-width="100px"
            type="text"
            v-model="model.xm"
            placeholder="请输入姓名"
            :rules="rules.xm"
            prop="xm"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="证件号码:"
            label-width="100px"
            type="text"
            v-model="model.zjhm"
            placeholder="请输入证件号码"
            :rules="rules.zjhm"
            prop="zjhm"
            custom-input-class="custom-input-right"
            disabled
            @click="showKeyBoard"
            :maxlength="18"
            :mixlength="16"
          />
          <wd-number-keyboard
            v-model:visible="visible"
            v-model="model.zjhm"
            :maxlength="18"
            extra-key="X"
            close-text="完成"
          ></wd-number-keyboard>
          <wd-input
            label="社会保障卡号:"
            label-width="100px"
            type="text"
            v-model="model.shbzkh"
            placeholder="请输入社会保障卡号"
            :rules="rules.shbzkh"
            prop="shbzkh"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="旧密码:"
            label-width="100px"
            type="text"
            v-model="model.oldPwd"
            placeholder="请输入旧密码"
            :rules="rules.oldPwd"
            prop="oldPwd"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="新密码:"
            label-width="100px"
            type="text"
            v-model="model.newPwd"
            placeholder="请输入新密码"
            :rules="rules.newPwd"
            prop="newPwd"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="经办人:"
            label-width="100px"
            type="text"
            v-model="model.jbr"
            placeholder="请输入经办人"
            :rules="rules.jbr"
            prop="jbr"
            custom-input-class="custom-input-right"
          />
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="mt-20px">
      <wd-button
        type="primary"
        :round="false"
        size="medium"
        @click="submitPasswoed(form)"
        block
        :loading="loading"
      >
        提 交
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
:deep(.wd-input__error-message) {
  @apply text-right!;
}
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}
</style>

<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
import useUnboxingInfo from '../hooks/useUnboxingInfo'
const message = useMessage()
const { submitUnboxingInfo, model, rules, loading, submitStatus, statusDel } = useUnboxingInfo()

const form = ref(null)

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

watchEffect(() => {
  if (submitStatus.value) {
    // msg: statusDel.value?.message ? statusDel.value.message : '提交成功',
    let msg = ''
    if (statusDel && statusDel.value && statusDel.value.message) {
      if (statusDel.value.message === '服务器异常，请联系管理员') {
        msg = '提交成功'
      } else {
        msg = statusDel.value.message
      }
    } else {
      msg = '提交成功'
    }

    message
      .alert({
        closeOnClickModal: false,
        msg,
        title: '提示',
        confirmButtonText: statusDel.value?.message ? '确定' : '返回',
      })
      .then(() => {
        if (msg === '提交成功') {
          uni.navigateBack()
        }
        // if (!statusDel.value?.message) {
        //   uni.navigateBack()
        // }
        submitStatus.value = false
      })
  }
})
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
            disabled
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="身份证号码:"
            label-width="100px"
            type="text"
            v-model="model.zjhm"
            placeholder="请输入身份证号码"
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
            v-model="model.zhbzkh"
            placeholder="请输入社会保障卡号"
            :rules="rules.zhbzkh"
            prop="zhbzkh"
            custom-input-class="custom-input-right"
          />
          <!-- <wd-input
            label="经办人:"
            label-width="100px"
            type="text"
            v-model="model.jbr"
            placeholder="请输入经办人"
            :rules="rules.jbr"
            prop="jbr"
            custom-input-class="custom-input-right"
          /> -->
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="mt-20px">
      <wd-button
        type="primary"
        :round="false"
        size="medium"
        @click="submitUnboxingInfo(form)"
        block
        :loading="loading"
      >
        提 交
      </wd-button>
    </view>
  </view>
  <wd-message-box></wd-message-box>
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

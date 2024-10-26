<script lang="ts" setup>
import { cardLoss } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
import { useForm } from 'alova/client'
import { useMessage } from 'wot-design-uni'
import { statusTisProps } from '../types/types'
const message = useMessage()

const form = ref(null)
const visible = ref<boolean>(false)
const { userInfo } = useUserStore()

const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  jbr: [{ required: true, message: '请输入经办人' }],
  zhbzkh: [{ required: true, message: '请输入社会保障卡号' }],
}
function showKeyBoard() {
  visible.value = true
}
// 社保卡挂失
const {
  loading,
  send: sendCardLoss,
  form: model,
} = useForm((data) => cardLoss(data), {
  immediate: false,
  loading: false,
  resetAfterSubmiting: true,
  initialForm: {
    xm: userInfo.cardName,
    zjhm: userInfo.idCardNumber,
    zhbzkh: '',
    jbr: userInfo.cardName,
  },
})
const statusDel = ref<statusTisProps>()

const submitCard = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendCardLoss(model.value)
        statusDel.value = data
        // msg: statusDel.value?.message ? statusDel.value.message : '提交成功',
        let msg = ''
        if (statusDel.value && statusDel.value && statusDel.value.message) {
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
          })
      } catch (error) {
        console.log('数据校验失败')
      }
    }
  })
}
</script>
<template>
  <view class="p-15px">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
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
        @click="submitCard(form)"
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

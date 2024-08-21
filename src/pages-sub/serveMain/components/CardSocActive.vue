<script lang="ts" setup>
import cardSocialActive from '../hooks/cardSocialActive'
import { useMessage } from 'wot-design-uni'
import { cardSocialStart } from '@/service/api/cardServe'
import { useRequest } from 'alova/client'
const message = useMessage()
const { model, rules } = cardSocialActive()
const form = ref(null)

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}
// 社保卡启用
const { loading, send: sendsocialsecardActive } = useRequest((data) => cardSocialStart(data), {
  immediate: false,
  loading: false,
})

const submitCardSocialActive = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        console.log(model)
        const data: any = await sendsocialsecardActive(model.value)
        console.log('==========message' + data.message)
        if (data.data === '成功') {
          message.alert('社保卡启用成功').then(() => {
            uni.navigateBack()
          })
        } else if (data.data !== '成功') {
          message.alert(data.message).then(() => {
            uni.navigateBack()
          })
        }
      } catch (error) {
        console.log(error)
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
            label="姓名:"
            label-width="100px"
            type="text"
            v-model="model.userName"
            placeholder="请输入姓名"
            :rules="rules.userName"
            prop="userName"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="身份证号码:"
            label-width="100px"
            type="text"
            v-model="model.cardNumber"
            placeholder="请输入身份证号码"
            :rules="rules.cardNumber"
            prop="cardNumber"
            custom-input-class="custom-input-right"
            disabled
            @click="showKeyBoard"
            :maxlength="18"
            :mixlength="16"
          />
          <wd-number-keyboard
            v-model:visible="visible"
            v-model="model.cardNumber"
            :maxlength="18"
            extra-key="X"
            close-text="完成"
          ></wd-number-keyboard>
          <wd-input
            label="社会保障卡号:"
            label-width="100px"
            type="text"
            v-model="model.socialScCardNumber"
            placeholder="请输入社会保障卡号"
            :rules="rules.socialScCardNumber"
            prop="socialScCardNumber"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="经办人:"
            label-width="100px"
            type="text"
            v-model="model.operator"
            placeholder="请输入经办人"
            :rules="rules.operator"
            prop="operator"
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
        @click="submitCardSocialActive(form)"
        block
        :loading="loading"
      >
        启用
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

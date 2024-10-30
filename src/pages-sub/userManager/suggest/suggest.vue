<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
import useSuggest from './utils/useSuggest'
const { adviceType, model, rules, submit, submitStatus } = useSuggest()
const message = useMessage()
const title = ref('我要反馈')
const form = ref(null)

// 错误提示
watchEffect(() => {
  if (submitStatus.value) {
    message
      .alert({
        closeOnClickModal: false,
        msg: '感谢您的反馈!',
        title: '提示',
        confirmButtonText: '确定',
      })
      .then(() => {
        uni.navigateBack()
      })
  }
})
onUnload(() => {
  submitStatus.value = false
})
</script>

<template>
  <view class="w-100vw h-100vh dy-blue-bg box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    <view class="p-15px">
      <view class="rounded-8px overflow-hidden">
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
            <view class="pt-10px px-10px color-#000 font-600 text-14px">
              反馈类型
              <text class="color-red">*</text>
            </view>
            <view class="mx-[-5px]">
              <wd-radio-group
                v-model="model.adviceType"
                cell
                shape="button"
                checked-color="#1890ff"
              >
                <wd-radio :value="item.value" v-for="(item, index) in adviceType" :key="index">
                  {{ item.label }}
                </wd-radio>
              </wd-radio-group>
            </view>

            <view class="pt-10px px-10px color-#000 font-600 text-14px">
              问题描述
              <text class="color-red">*</text>
            </view>
            <wd-textarea
              v-model="model.adviceContent"
              placeholder="请输入您要建议/反馈的内容（必填，100字以内）"
              prop="adviceContent"
              :rules="rules.adviceContent"
              :maxlength="100"
              clearable
              show-word-limit
            />

            <wd-cell title="反馈截图" title-width="100px">
              <dy-upload v-model="model.adviceImg"></dy-upload>
            </wd-cell>

            <wd-input
              label="联系方式"
              :maxlength="11"
              prop="advicePhone"
              :rules="rules.advicePhone"
              clearable
              v-model="model.advicePhone"
              placeholder="请输入联系电话"
            />
          </wd-cell-group>
        </wd-form>
      </view>
    </view>

    <view class="px-10px py-10px fixed bottom-0 left-0 right-0 bg-#fff safe-area-after">
      <wd-button block :round="false" @click="submit(form)">提 交</wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-radio.is-button .wd-radio__label) {
  @apply rounded-4px! bg-#EFF4FF! color-#2D69EF!;
}
:deep(.wd-radio.is-button.is-checked .wd-radio__label) {
  @apply bg-#2D69EF!  color-#fff!;
}
</style>

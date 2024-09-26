<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import useCenter from './utils/useCenter'
const title = ref('投诉建议')
const form = ref(null)

const { model, rules, submit } = useCenter()
</script>

<template>
  <view class="w-100vw h-100vh bg-#F7F7F7 box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left></dy-navbar>
    <view class="p-15px">
      <view class="rounded-8px overflow-hidden">
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
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
              <dy-upload v-model="model.adviceImgs"></dy-upload>
            </wd-cell>

            <wd-input
              label="联系方式"
              :maxlength="11"
              prop="phone"
              clearable
              v-model="model.adviceContact"
              placeholder="请输入联系电话(选填)"
            />
          </wd-cell-group>
        </wd-form>
      </view>
    </view>

    <view class="px-10 py-20px fixed bottom-20px left-0 right-0">
      <wd-button block @click="submit(form)">提交</wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>

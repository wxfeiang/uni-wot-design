<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { sendBusinessAdvice } from './utils/useCenter'
// import {addBusinessAdvice} from "@/service/api/userMessage";

const title = ref('投诉建议')
const form = ref(null)

const handleConfirm = (e) => {
  model.value.adviceType = e.value
}
const adviceType = ref([
  {
    label: '投诉',
    value: 0,
  },
  {
    label: '建议',
    value: 1,
  },
])

// 投诉建议
const model = ref({
  feedbackCon: '',
  feedbackImg: '',
  createPhone: '',
  adviceType: 1,
})
const rules = {
  feedbackImg: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  createPhone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  feedbackCon: [{ required: true, message: '请输入投诉建议内容', trigger: 'blur' }],
}

const submit = (form) => {
  console.log('🍲[submit]:', form, model.value)
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const data: any = await sendBusinessAdvice({
          adviceContent: model.value.feedbackCon,
          adviceImg: model.value.feedbackImg,
          adviceType: model.value.adviceType,
          advicePhone: model.value.createPhone,
        })
        console.log('🍋[data]:', data)
        uni.navigateBack()
      } catch (error) {
        console.log('🍲[error]:', error)
      }
    }
  })
}
onMounted(() => {
  model.value.feedbackCon = ''
  model.value.feedbackImg = ''
  model.value.createPhone = ''
  model.value.adviceType = 1
})
</script>

<template>
  <view class="w-100vw h-100vh bg-#F7F7F7 box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left></dy-navbar>
    <view class="p-15px">
      <view class="rounded-8px overflow-hidden">
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
            <view class="pt-10px px-10px color-#333 text-14px">我要反馈</view>
            <wd-textarea
              v-model="model.feedbackCon"
              placeholder="请输入您要建议/反馈的内容（必填，100字以内）"
              prop="feedbackCon"
              :rules="rules.feedbackCon"
              :maxlength="100"
              clearable
              show-word-limit
            />

            <wd-picker
              :columns="adviceType"
              label="反馈类型"
              v-model="model.adviceType"
              @confirm="handleConfirm"
            />

            <!--            <wd-cell title="反馈截图" title-width="100px">-->
            <!--              <dy-upload v-model="model.feedbackImg"></dy-upload>-->
            <!--            </wd-cell>-->

            <wd-input
              label="联系方式"
              :maxlength="11"
              prop="phone"
              clearable
              v-model="model.createPhone"
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

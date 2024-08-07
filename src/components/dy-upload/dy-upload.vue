<script setup lang="ts">
import { changeUploadUrl, rightFileUrl } from '@/utils/file'
import { FilesList, uploadProps } from './types'
defineOptions({
  name: 'dy-upload',
})

const props = defineProps(uploadProps)

// 额外参数
const defaultFormDarta = {
  appId: '',
}

const emit = defineEmits<{
  (e: 'submit', value: any): void
  (e: 'update:modelValue', value: any): string
}>()

const fileList = ref<FilesList[]>([])
const curFileList = ref<FilesList[]>([])

// 初始化文件信息
const initModelValues = () => {
  console.log('🥩', props.defaultAttrs)
  if (props.modelValue) {
    const arr = props.modelValue.split(',')
    const narr = []
    arr.forEach((item) => {
      curFileList.value.push({
        url: rightFileUrl(item, { key: true }),
        name: item, // 保留原始文件名路径
      })
    })
    fileList.value = curFileList.value
  }
}
// 初始化监听数据
watch(
  () => props.modelValue,
  () => {
    initModelValues()
  },
  { deep: true },
)
onMounted(async () => {
  await initModelValues()
})

// 上传成功后 返回新的地址
const handleChange = (e: any) => {
  const str = changeUploadUrl(e.fileList)
  emit('update:modelValue', str)
}
</script>
<template>
  <wd-upload
    v-bind="props.defaultAttrs"
    :file-list="fileList"
    :image-mode="props.imageMode"
    :limit="props.limit"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :name="props.name"
    :show-limit-num="props.showFileList"
    :action="props.action"
    :header="props.header"
    :formData="{ ...defaultFormDarta, ...props.formData }"
    @change="handleChange"
  >
    <template v-if="props.showFileDy">
      <slot></slot>
    </template>
  </wd-upload>
</template>
<style lang="scss" scoped></style>

<script setup lang="ts">
import { changeUploadUrl, rightFileUrl } from '@/utils/file'
import { FilesList, uploadProps } from './types'
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

// 初始化文件信息
const initModelValues = () => {
  // TODO: 待处理图片为空的情况
  const arr = props.modelValue.split(',')
  if (arr.length === 0) return (fileList.value = [])
  console.log('🍏[arr.length]:', arr.length)
  const narr = []
  arr.forEach((item) => {
    narr.push({
      url: rightFileUrl(item, '', true),
      name: item,
      meta: { url: item, name: item },
    })
  })
  fileList.value = narr
  console.log('🍊[fileList.value ]:', fileList.value)
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
const handleChange1 = (e: any) => {
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
    @change="handleChange1"
  ></wd-upload>
</template>
<style lang="scss" scoped></style>

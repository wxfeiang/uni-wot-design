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
  if (props.modelValue) {
    const arr = Array.isArray(props.modelValue) ? props.modelValue : props.modelValue.split(',')
    let narr = []
    narr = arr.map((item) => {
      return {
        url: rightFileUrl(item),
        name: item,
        meta: { url: item, name: item },
      }
    })
    // nextTick(() => {
    // 重新解析数据
    if (props.isAes) {
      narr.forEach(async (item) => {
        item.url = await useFilePase(item.name).fileData
      })
      console.log('🍛11111>>>>>', narr)
      fileList.value = narr
    } else {
      console.log('---------', narr)
      fileList.value = narr
    }
    // })
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
    <template #default v-if="props.showFileDy">
      <slot></slot>
    </template>
  </wd-upload>
</template>
<style lang="scss" scoped></style>

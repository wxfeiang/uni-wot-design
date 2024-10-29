<script lang="ts" setup>
import card1 from '../static/images/idCard1.png'
import card2 from '../static/images/idCard2.png'
import card3 from '../static/images/idCard3.png'

const emit = defineEmits<{
  (e: 'unloadClick', value: any): void
}>()
const props = defineProps({
  type: {
    type: Number,
    default: 0,
  },

  smTitle: {
    type: String,
    default: '',
  },
  imgUrl: {
    type: String,
    default: '',
  },
})
const data = ref([
  {
    type: 0,
    name: '正面照片',
    url: card3,
  },
  {
    type: 1,
    name: '身份证人像照片',
    url: card1,
  },
  {
    type: 2,
    name: '身份证国徽面照片',
    url: card2,
  },
])
const current = ref({
  type: 0,
  name: '正面照片',
  url: card3,
})
onMounted(() => {
  current.value = data.value.find((item) => {
    return item.type === props.type
  })
})
</script>

<template>
  <view>
    <view class="custom-class custom-preview-class mt-20px! relative overflow-hidden text-center">
      <image
        class="custom-class-img"
        :width="100"
        :height="100"
        :src="props.imgUrl"
        v-if="props.imgUrl"
        :class="current!.type !== 0 ? 'img1' : 'img2'"
      ></image>
      <image
        :width="100"
        :height="100"
        :src="current!.url"
        custom-class="custom-class-img"
        v-else
      ></image>
    </view>
    <view class="text-center mt-10px">{{ props.smTitle }}{{ current!.name }}</view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.custom-class) {
  @apply w-80% mx-a bd-dashed_#1890ff rounded-10px;
}
:deep(.custom-evoke-class),
:deep(.custom-preview-class) {
  @apply w-full h-180px  m-0;
}
:deep(.custom-class-img) {
  @apply wh-full! overflow-hidden rounded-10px;
}
:deep(.wd-img),
:deep(.wd-img__image) {
  @apply wh-full!;
}
.img1 {
  transform: rotate(270deg) scaleY(1.8) scaleX(1.4);
}
.img2 {
  @apply w-50%!;
}
</style>

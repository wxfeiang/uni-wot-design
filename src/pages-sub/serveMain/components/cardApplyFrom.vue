<script lang="ts" setup>
import { routeTo } from '@/utils'

import useCardApply from '../hooks/useCardApply'
const { modelPhoto } = useCardApply()

const form = ref(null)

function toQueryDetil(data?: any) {
  routeTo({ url: '/pages-sub/serveMain/cardMessType' })
}

const cardUrl = 'https://cdn.uviewui.com/uview/demo/upload/positive.png'

const action = import.meta.env.VITE_UPLOAD_BASEURL + '/card/app/uploadPhoto'

const getdata = () => {
  // console.log('🥠=====', fileData.value)
}

const wotUpAttrs0 = {
  formData: {
    photoType: '1',
    type: '1',
    zjhm: '210204199207215655',
  },
  limit: 1,
  'custom-preview-class': 'custom-preview-class',
  'custom-evoke-class': 'custom-evoke-class',
  'custom-class': 'custom-class',
}

const wotUpAttrs1 = {
  limit: 1,
  'custom-preview-class': 'custom-preview-class',
  'custom-evoke-class': 'custom-evoke-class',
  'custom-class': 'custom-class',
  formData: {
    photoType: '1',
    type: '1',
    zjhm: '210204199207215655',
  },
}
const url1 = ref('')
const url2 = ref('')
</script>
<template>
  <view class="p-10px py-20px">
    <view class="rounded-10px overflow-hidden bg-#fff py-20px">
      <wd-form ref="form" :model="modelPhoto">
        <view class="mb-20px">
          <dy-upload
            v-model="url1"
            :limit="1"
            showFileDy
            :defaultAttrs="wotUpAttrs0"
            :action="action"
            name="photoBase64"
          >
            <view class="custom-preview-class">
              <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-class-img" />
            </view>
          </dy-upload>
        </view>
        <view class="mb-20px">
          <dy-upload
            v-model="url2"
            :limit="1"
            showFileDy
            :defaultAttrs="wotUpAttrs1"
            :action="action"
            name="photoBase64"
          >
            <view class="custom-preview-class">
              <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-class-img" />
            </view>
          </dy-upload>
        </view>
      </wd-form>
    </view>
    <view class="mt-10px">
      <wd-text type="warning" text="温馨提示:"></wd-text>
      请保持证件边框与图片边框基本一致
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="toQueryDetil(form)" block>
        下一步
      </wd-button>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style lang="scss" scoped>
:deep(.wd-input__error-message),
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}

:deep(.custom-class) {
  @apply w-80% mx-a bd-dashed_#1890ff rounded-10px;
}
:deep(.custom-evoke-class),
:deep(.custom-preview-class) {
  @apply w-full h-200px  m-0;
}
:deep(.custom-class-img) {
  @apply wh-full! overflow-hidden rounded-10px;
}
</style>

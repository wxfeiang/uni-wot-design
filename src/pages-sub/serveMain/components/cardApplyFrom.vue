<script lang="ts" setup>
import { useBaseStore } from '@/store'
import { routeTo } from '@/utils'
import useCardFrom from '../hooks/useCardFrom'

const { Login, model, rules, loading, read } = useCardFrom()
const form = ref(null)
function toQueryDetil(data?: any) {
  routeTo({ url: '/pages-sub/serveMain/cardMessType' })
}

const cardUrl = 'https://cdn.uviewui.com/uview/demo/upload/positive.png'
const url = ref(
  'https://zhjia.net:8890/picture/ec-saas/20240808/13e7effe76844c168be1ac926317f4a3.jpg',
)
const { fileData } = useFilePase('privacy-bucket/20240809/4b67606be1af4b85a045c56bdb29e2d8.jpg')

const url2 = ref('') // ref('public/uploads/image/1722994513452-5d9fdf30-37c4-409e-88ed-f1ad64a0a958.jpg')
const getdata = () => {
  console.log(url.value)
  console.log(url2.value)
  // console.log('🥠=====', fileData.value)
}
const wotUpAttrs = {
  limit: 1,
  'custom-preview-class': 'custom-preview-class',
  'custom-evoke-class': 'custom-evoke-class',
  'custom-class': 'custom-class',
}

const show = ref(false)
const a = ref()
function upload2(photoType) {
  // routeTo({ url: '/pages-sub/serveMain/cop', data: { show: true, photoType } })
  // // console.log('🍪======')
  // // show.value = true
  // // console.log('🍣', show.value)
  uni.navigateTo({
    url: '/pages-sub/serveMain/cop',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      camera: function (data) {
        console.log('监听到数据回传', data)
        a.value = data.data
      },
    },
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('options', { data: '进入给你传的谁' })
    },
  })
}

const { cameraData } = useBaseStore()
onShow(() => {
  console.log('🥒----', cameraData)
})
</script>
<template>
  <view class="p-10px py-20px" v-if="!show">
    <view class="rounded-10px overflow-hidden bg-#fff py-20px">
      <wd-form ref="form" :model="model">
        <view class="bg-blue h-200px" @click="upload2('0')">
          <wd-img :width="100" :height="100" :src="a" custom-class="custom-class-img" />
        </view>
        <view class="bg-blue h-200px" @click="upload2('1')">
          <wd-img
            :width="100"
            :height="100"
            :src="cameraData[1].url"
            custom-class="custom-class-img"
          />
        </view>
        <view class="bg-blue h-200px" @click="upload2('2')">
          <wd-img
            :width="100"
            :height="100"
            :src="cameraData[2].url"
            custom-class="custom-class-img"
          />
        </view>

        <!-- <view class="mb-20px">
          <dy-upload v-model="url2" :limit="1" showFileDy :defaultAttrs="wotUpAttrs" isAes>
            <view class="custom-preview-class">
              <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-class-img" />
            </view>
          </dy-upload>
        </view>
        <view class="mb-20px">
          <dy-upload v-model="url2" :limit="1" showFileDy :defaultAttrs="wotUpAttrs" isAes>
            <view class="custom-preview-class">
              <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-class-img" />
            </view>
          </dy-upload>
        </view> -->
      </wd-form>
    </view>
    <view class="mt-10px">
      <wd-text type="warning" text="温馨提示:"></wd-text>
      请保持证件边框与图片边框基本一致
    </view>
    <view class="mt-20px">
      <wd-button
        type="primary"
        :round="false"
        size="medium"
        @click="toQueryDetil(form)"
        block
        :loading="loading"
      >
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

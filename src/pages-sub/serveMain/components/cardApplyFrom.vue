<script lang="ts" setup>
import dayjs from 'dayjs'
import { useMessage } from 'wot-design-uni'
import useCardApply from '../hooks/useCardApply'
import {
  areaCodeList,
  cardType,
  ethniCodeList,
  isMailList,
  occupationList,
  regionList,
  sexList,
} from '../types/dict'

import { useBaseStore, useUserStore } from '@/store'
import { changeDict, routeTo } from '@/utils'
import card1 from '../static/images/idCard1.jpg'
import card2 from '../static/images/idCard2.jpg'
import card3 from '../static/images/idCard3.jpg'
const message = useMessage()
const { modelPhoto, model, rules, submitCard, submitStatus, statusDel, sendPhoto, loadingPhoto } =
  useCardApply()

const userStore = useUserStore()
const { userInfo } = userStore

const cardUrl = ref(card1)
const cardUrl2 = ref(card2)
const cardUrl0 = ref(card3)

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const form = ref(null)

// 错误提示
watch(
  () => submitStatus.value,
  () => {
    message.alert(statusDel.value).then(() => {
      if (submitStatus.value === 1) {
        uni.navigateBack()
      }
    })
  },
  { deep: true },
)

const current = ref('1')
async function upload(photoType: string, type: string) {
  routeTo({
    url: '/pages-sub/serveMain/OcrCamera',
    data: { photoType, type, zjhm: userInfo.idCardNumber },
  })
  // try {
  //   current.value = photoType
  //   const { photoBase64, url }: any = await upLoadImg()

  //   const formData = {
  //     photoBase64: photoBase64.replace('data:image/png;', 'data:image/jpg;'),
  //     photoType,
  //     type,
  //     zjhm: userInfo.idCardNumber,
  //   }
  //   const data: any = await sendPhoto(formData)
  //   if (data.data.data.message || data.data.code === 500) {
  //     message.alert(data.data.data.message || data.data.msg)
  //   } else {
  //     if (photoType === '1') {
  //       cardUrl.value = url
  //       model.value.idCardFrontPhotoId = data.data.data.id
  //     }
  //     if (photoType === '2') {
  //       cardUrl2.value = url
  //       model.value.idCardBackPhotoId = data.data.data.id
  //     } else if (photoType === '0') {
  //       cardUrl3.value = url
  //       model.value.photoId = data.data.data.id
  //     }
  //   }
  // } catch (error) {
  //   console.log('🥦[error]:', error)
  //   message.alert('图片上传失败，请重新上传')
  // }
}
const { cameraData } = useBaseStore()
onShow((options) => {
  console.log('🍒', options)
  console.log('🍊============ ')
  console.log('🥧', cameraData)

  if (cameraData.idCardFront.id) {
    cardUrl.value = cameraData.idCardFront.url
    model.value.idCardFrontPhotoId = cameraData.idCardFront.id
    const { words_result: wordsResult }: any = cameraData.idCardFront.data
    model.value.name = wordsResult['姓名'].words
    model.value.sex = changeDict(sexList, wordsResult['性别'].words, 'value', 'label')
    model.value.idCardNumber = wordsResult['公民身份号码'].words
    model.value.nation = changeDict(ethniCodeList, wordsResult['民族'].words, 'value', 'label')
    model.value.address = wordsResult['住址'].words
  }
  if (cameraData.idCardBackPhoto.id) {
    cardUrl2.value = cameraData.idCardBackPhoto.url

    const { words_result: wordsResult }: any = cameraData.idCardFront.data
    model.value.idCardBackPhotoId = cameraData.idCardBackPhoto.id
    model.value.startDate = dayjs(wordsResult['签发日期'].words).unix().toString()
    model.value.endDate = dayjs(wordsResult['失效日期'].words).unix().toString()
  } else if (cameraData.photo.id) {
    cardUrl0.value = cameraData.photo.url
    model.value.photoId = cameraData.photo.id
  }
})
const steep = ref(1)
function next() {
  console.log('🍉', model.value)
  if (model.value.idCardFrontPhotoId && model.value.idCardBackPhotoId && model.value.photoId) {
    steep.value = 2
  } else {
    message.alert('请上传图片')
  }
}
</script>
<template>
  <view class="p-10px py-20px" v-if="steep == 1">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="formPhoto" :model="modelPhoto">
        <view class="mb-20px px-20px">
          <view>
            <view
              class="custom-class custom-preview-class mt-20px! relative overflow-hidden"
              @click="upload('1', '1')"
            >
              <view
                v-if="loadingPhoto && current === '1'"
                class="flex flex-col justify-center items-center bg-coolGray-5 size-full! absolute left-0 top-0 z-10"
              >
                <wd-loading type="outline" />
              </view>

              <wd-img :width="100" :height="100" :src="cardUrl" custom-class="custom-class-img" />
            </view>
            <view class="text-center mt-10px">身份证正面照片</view>
          </view>
          <view>
            <view
              class="custom-class custom-preview-class mt-20px! relative overflow-hidden"
              @click="upload('2', '1')"
            >
              <view
                v-if="loadingPhoto && current === '2'"
                class="flex flex-col justify-center items-center bg-coolGray-5 size-full! absolute left-0 top-0 z-10"
              >
                <wd-loading type="outline" />
              </view>

              <wd-img :width="100" :height="100" :src="cardUrl2" custom-class="custom-class-img" />
            </view>
            <view class="text-center mt-10px">身份证国徽面照片</view>
          </view>
          <view>
            <view
              class="custom-class custom-preview-class mt-20px! relative overflow-hidden"
              @click="upload('0', '1')"
            >
              <view
                v-if="loadingPhoto && current === '0'"
                class="flex flex-col justify-center items-center bg-coolGray-5 size-full! absolute left-0 top-0 z-10"
              >
                <wd-loading type="outline" />
              </view>

              <wd-img :width="100" :height="100" :src="cardUrl0" custom-class="custom-class-img" />
            </view>
            <view class="text-center mt-10px">本人正面照片</view>
          </view>
        </view>
      </wd-form>
    </view>
    <view class="mt-10px">
      <wd-text type="warning" text="温馨提示:"></wd-text>
      请保持证件边框与图片边框基本一致 照片大小为80KB 以内
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="next" block>下一步</wd-button>
    </view>
  </view>
  <view class="p-10px py-20px" v-if="steep == 2">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            label="姓名:"
            label-width="100px"
            type="text"
            v-model="model.name"
            placeholder="请输入姓名"
            :rules="rules.name"
            prop="name"
            custom-input-class="custom-input-right"
          />
          <wd-input
            label="身份证号码:"
            label-width="100px"
            type="text"
            v-model="model.idCardNumber"
            placeholder="请输入身份证号码"
            :rules="rules.idCardNumber"
            prop="idCardNumber"
            custom-input-class="custom-input-right"
            disabled
            @click="showKeyBoard"
            :maxlength="18"
            :mixlength="16"
          />
          <wd-number-keyboard
            v-model:visible="visible"
            v-model="model.idCardNumber"
            :maxlength="18"
            extra-key="X"
            close-text="完成"
          ></wd-number-keyboard>
          <wd-picker
            :columns="cardType"
            custom-value-class="custom-input-right"
            label="证件类型"
            v-model="model.idCardType"
            :rules="rules.idCardType"
            prop="idCardType"
          />
          <wd-picker
            :columns="sexList"
            custom-value-class="custom-input-right"
            label="性别"
            v-model="model.sex"
            :rules="rules.sex"
            prop="sex"
          />
          <wd-input
            label="手机号码:"
            label-width="100px"
            type="text"
            v-model="model.phoneNumber"
            placeholder="请输入身份证号码"
            :rules="rules.phoneNumber"
            prop="phoneNumber"
            custom-input-class="custom-input-right"
            :maxlength="11"
            :mixlength="11"
          />

          <wd-datetime-picker
            type="date"
            label-width="150"
            custom-value-class="custom-input-right"
            align-right
            label="出生日期"
            v-model="model.birthdate"
            :rules="rules.birthdate"
            prop="birthdate"
          />
          <wd-input
            label="户籍地址:"
            label-width="100px"
            type="text"
            v-model="model.address"
            placeholder="请输入户籍地址"
            :rules="rules.address"
            prop="address"
            custom-input-class="custom-input-right"
          />
          <wd-picker
            :columns="regionList"
            custom-value-class="custom-input-right"
            label="国籍"
            v-model="model.nationality"
            :rules="rules.nationality"
            prop="nationality"
          />
          <wd-picker
            :columns="ethniCodeList"
            custom-value-class="custom-input-right"
            label="民族"
            v-model="model.nation"
            :rules="rules.nation"
            prop="nation"
          />

          <wd-picker
            :columns="areaCodeList"
            custom-value-class="custom-input-right"
            label="区域代码"
            v-model="model.areaCode"
            :rules="rules.areaCode"
            prop="areaCode"
          />

          <wd-datetime-picker
            type="date"
            label-width="150"
            custom-value-class="custom-input-right"
            label="身份证有效起始日期"
            v-model="model.startDate"
            :rules="rules.startDate"
            prop="startDate"
            align-right
          />
          <wd-datetime-picker
            type="date"
            label-width="150"
            custom-value-class="custom-input-right"
            label="身份证有效结束日期"
            v-model="model.endDate"
            :rules="rules.endDate"
            prop="endDate"
            align-right
          />
          <wd-picker
            :columns="occupationList"
            custom-value-class="custom-input-right"
            label="职业"
            v-model="model.work"
            :rules="rules.work"
            prop="work"
          />
          <!-- <wd-picker
            :columns="areaCodeList"
            custom-value-class="custom-input-right"
            label="网点编码"
            v-model="model.bankBranchCode"
            :rules="rules.bankBranchCode"
            prop="bankBranchCode"
          /> -->
          <wd-input
            label="联系地址"
            v-model="model.address"
            :rules="rules.address"
            prop="address"
            label-width="100px"
            type="text"
            placeholder="请输入联系地址"
            custom-input-class="custom-input-right"
          />
          <wd-picker
            :columns="isMailList"
            custom-value-class="custom-input-right"
            label="是否邮寄"
            v-model="model.isPostcard"
            :rules="rules.isPostcard"
            prop="isPostcard"
          />
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="submitCard(form)" block>
        确认提交
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
:deep(.wd-picker__error-message),
:deep(.wd-input__error-message) {
  @apply text-right!;
}
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}

:deep(.custom-class) {
  @apply w-80% mx-a bd-dashed_#1890ff rounded-10px;
}
:deep(.custom-evoke-class),
:deep(.custom-preview-class) {
  @apply w-full h-150px  m-0;
}
:deep(.custom-class-img) {
  @apply wh-full! overflow-hidden rounded-10px;
}
</style>

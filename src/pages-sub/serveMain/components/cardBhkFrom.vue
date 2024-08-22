<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
import useCardBhk from '../hooks/useCardBhk'
import {
  applicantList,
  areaCodeList,
  bankCodeList,
  businessTypeList,
  cardType,
  ethniCodeList,
  isDbbs,
  isMailList,
  occupationList,
  reason,
  sexList,
} from '../types/dict'
import CardUpload from './CardUpload.vue'

import { useBaseStore, useUserStore } from '@/store'
import { changeDict, routeTo } from '@/utils'
import dayjs from 'dayjs'

const message = useMessage()
const {
  modelPhoto,
  model,
  rules,
  submitCard,
  submitStatus,
  statusDel,
  sendPhoto,
  loadingPhoto,
  sendBranches,
} = useCardBhk()

const userStore = useUserStore()
const { userInfo } = userStore

const cardUrl1 = ref()
const cardUrl2 = ref()
const cardUrl0 = ref()

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

onLoad((option: any) => {
  console.log('🍷[option=====]:', option)
})

const current = ref('1')

async function upload(photoType: string, type: string) {
  routeTo({
    url: '/pages-sub/serveMain/OcrCamera',
    data: { photoType, type, zjhm: userInfo.idCardNumber },
  })
}
const { cameraData } = useBaseStore()
onShow((options) => {
  console.log('🍒', options)
  console.log('🍊============ ')
  console.log('🥧', cameraData)

  if (cameraData.idCardFront.id) {
    cardUrl1.value = cameraData.idCardFront.url
    model.value.idCardFrontPhotoId = cameraData.idCardFront.id
    const { words_result: wordsResult }: any = cameraData.idCardFront.data
    model.value.name = wordsResult['姓名'].words
    model.value.sex = changeDict(sexList, wordsResult['性别'].words, 'value', 'label')
    model.value.idCardNumber = wordsResult['公民身份号码'].words
    model.value.nation = changeDict(
      ethniCodeList,
      wordsResult['民族'].words.replace('族', ''),
      'value',
      'label',
    )
    model.value.mailAddress = wordsResult['住址'].words
  }
  if (cameraData.idCardBackPhoto.id) {
    cardUrl2.value = cameraData.idCardBackPhoto.url

    const { words_result: wordsResult }: any = cameraData.idCardBackPhoto.data
    model.value.idCardBackPhotoId = cameraData.idCardBackPhoto.id
    model.value.startDate = dayjs(wordsResult['签发日期'].words).valueOf()
    model.value.endDate = dayjs(wordsResult['失效日期'].words).valueOf()
  }

  if (cameraData.photo.id) {
    console.log('🍰', cameraData.photo.url)
    cardUrl0.value = cameraData.photo.url
    model.value.photoId = cameraData.photo.id
  }
})

const steep = ref(1)
const bankBranchList = ref([])
function next() {
  console.log('🍉', model.value)
  // if (model.value.idCardFrontPhotoId && model.value.idCardBackPhotoId && model.value.photoId) {
  //   steep.value = 2
  // } else {
  //   message.alert('请上传图片')
  // }

  steep.value = 2
}

function cramert(photoType: string, type: string) {
  routeTo({
    url: '/pages-sub/serveMain/OcrCamera',
    data: { photoType, type, zjhm: userInfo.idCardNumber },
  })
}
// 查询邮寄银行网点
async function handleChange(pickerView, value, columnIndex, resolve) {
  console.log(model.value.area, model.value.bankCode, model.value.isPostcard)

  const formData = {
    yhdm: model.value.bankCode,
    areaCode: model.value.area,
    isMail: model.value.isPostcard,
  }
  console.log(formData)
  const data: any = await sendBranches(formData)
  const ldata = []
  data.forEach((v) => {
    ldata.push({ value: v.areaCode, label: v.name })
  })
  bankBranchList.value = ldata
  console.log(data)
}
</script>
<template>
  <view class="p-10px py-20px" v-if="steep == 1">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="formPhoto" :model="modelPhoto">
        <view class="mb-20px px-20px">
          <view @click="upload('1', '1')">
            <Card-Upload :type="1" :imgUrl="cardUrl1" />
          </view>
          <view @click="upload('2', '1')">
            <Card-Upload :type="2" :imgUrl="cardUrl2" />
          </view>
          <view @click="upload('0', '1')">
            <Card-Upload :type="0" :imgUrl="cardUrl0" />
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
            readonly
          />
          <wd-input
            label="身份证号:"
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
            readonly
          />
          <wd-number-keyboard
            v-model:visible="visible"
            v-model="model.idCardNumber"
            :maxlength="18"
            extra-key="X"
            close-text="完成"
          ></wd-number-keyboard>
          <wd-picker
            :columns="sexList"
            custom-value-class="custom-input-right"
            label="性别"
            v-model="model.sex"
            :rules="rules.sex"
            prop="sex"
            readonly
          />
          <wd-input
            label="手机号码:"
            label-width="100px"
            type="text"
            v-model="model.phoneNumber"
            placeholder="请输入手机号码"
            :rules="rules.phoneNumber"
            prop="phoneNumber"
            custom-input-class="custom-input-right"
            :maxlength="11"
            :mixlength="11"
          />
          <wd-picker
            :columns="ethniCodeList"
            custom-value-class="custom-input-right"
            label="民族"
            v-model="model.nation"
            :rules="rules.nation"
            prop="nation"
            readonly
          />
          <wd-input
            label="通讯地址"
            v-model="model.mailAddress"
            :rules="rules.mailAddress"
            prop="mailAddress"
            label-width="100px"
            type="text"
            placeholder="请输入通讯地址"
            custom-input-class="custom-input-right"
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
          <wd-picker
            :columns="areaCodeList"
            custom-value-class="custom-input-right"
            label="申领地区"
            v-model="model.area"
            :rules="rules.area"
            prop="area"
            :column-change="handleChange"
          />
          <wd-picker
            :columns="isMailList"
            custom-value-class="custom-input-right"
            label="邮寄方式"
            v-model="model.isPostcard"
            :rules="rules.isPostcard"
            prop="isPostcard"
            :column-change="handleChange"
          />
          <wd-picker
            :columns="bankCodeList"
            custom-value-class="custom-input-right"
            label="申领银行"
            v-model="model.bankCode"
            :rules="rules.bankCode"
            prop="bankCode"
            :column-change="handleChange"
          />
          <wd-picker
            :columns="bankBranchList"
            custom-value-class="custom-input-right"
            label="申领网点"
            v-model="model.bankBranchCode"
            :rules="rules.bankBranchCode"
            prop="bankBranchCode"
          />

          <wd-picker
            :columns="businessTypeList"
            custom-value-class="custom-input-right"
            label="业务类型"
            v-model="model.businessType"
            :rules="rules.businessType"
            onchange="handleChange"
            prop="businessType"
          />
          <wd-picker
            :columns="reason"
            custom-value-class="custom-input-right"
            label="补卡原因"
            v-model="model.reason"
            :rules="rules.reason"
            prop="reason"
          />
          <wd-picker
            :columns="isDbbs"
            custom-value-class="custom-input-right"
            label="是否代办"
            v-model="model.dbbs"
            :rules="rules.dbbs"
            prop="dbbs"
          />
          <template v-if="model.dbbs === '1'">
            <wd-input
              label="代办人姓名"
              v-model="model.dbrName"
              :rules="rules.dbrName"
              prop="dbrName"
              label-width="100px"
              type="text"
              placeholder="请输入代办人姓名"
              custom-input-class="custom-input-right"
            />
            <wd-picker
              :columns="cardType"
              custom-value-class="custom-input-right"
              label="代办人证件类型"
              v-model="model.dbrType"
              :rules="rules.dbrType"
              prop="dbrType"
            />
            <wd-input
              label="代办人证件号码"
              v-model="model.dbrZjhm"
              :rules="rules.dbrZjhm"
              prop="dbrZjhm"
              label-width="100px"
              type="text"
              placeholder="请输入代办人证件号码"
              custom-input-class="custom-input-right"
            />
            <wd-picker
              :columns="sexList"
              custom-value-class="custom-input-right"
              label="代办人性别"
              v-model="model.dbrSex"
              :rules="rules.dbrSex"
              prop="dbrSex"
            />
            <wd-picker
              :columns="applicantList"
              custom-value-class="custom-input-right"
              label="代办人与申请人关系"
              v-model="model.familyRelation"
              :rules="rules.familyRelation"
              prop="familyRelation"
            />

            <wd-input
              label="代办人手机号"
              v-model="model.dbrPhone"
              :rules="rules.dbrPhone"
              prop="dbrPhone"
              label-width="100px"
              type="text"
              placeholder="请输入代办人手机号"
              custom-input-class="custom-input-right"
            />

            <wd-input
              label="代办人代办人地址"
              v-model="model.dbrAddress"
              :rules="rules.dbrAddress"
              prop="dbrAddress"
              label-width="100px"
              type="text"
              placeholder="请输入代办人地址"
              custom-input-class="custom-input-right"
            />
          </template>

          <template v-if="model.isPostcard == '1'">
            <wd-input
              label="邮寄人姓名"
              v-model="model.postcardName"
              :rules="rules.postcardName"
              prop="postcardName"
              label-width="100px"
              type="text"
              placeholder="请输入邮寄人姓名'"
              custom-input-class="custom-input-right"
            />
            <wd-input
              label="邮寄人手机号"
              v-model="model.postcardPhone"
              :rules="rules.postcardPhone"
              prop="postcardPhone"
              label-width="100px"
              type="text"
              placeholder="请输入邮寄人手机号"
              custom-input-class="custom-input-right"
            />

            <wd-input
              label="邮寄地址"
              v-model="model.postcardAddress"
              :rules="rules.postcardAddress"
              prop="postcardAddress"
              label-width="100px"
              type="text"
              placeholder="请输入邮寄地址"
              custom-input-class="custom-input-right"
            />
          </template>
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
  @apply text-right! color-#999999! truncate-1!;
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

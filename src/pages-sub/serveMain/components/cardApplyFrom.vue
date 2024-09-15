<script lang="ts" setup>
import { useUserStore } from '@/store'
import { changeDict } from '@/utils'
import dayjs from 'dayjs'
import qs from 'qs'
import { useMessage } from 'wot-design-uni'
import useCardApply from '../hooks/useCardApply'
import {
  areaCodeList,
  bankCodeList,
  cardType,
  ethniCodeList,
  isMailList,
  occupationList,
  regionList,
  sexList,
} from '../types/dict'

import useCardBhk from '../hooks/useCardBhk'
import CardUpload from './CardUpload.vue'

const minDate = dayjs('191000101').valueOf()
const maxDate = dayjs('20991225').valueOf()

const message = useMessage()
const { modelPhoto, model, rules, submitCard, submitStatus, statusDel } = useCardApply()
const { sendBranches } = useCardBhk()
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
watchEffect(() => {
  if (submitStatus.value) {
    message
      .alert({
        closeOnClickModal: false,
        msg: statusDel.value?.message ? statusDel.value.message : '提交成功',
        title: '提示',
        confirmButtonText: statusDel.value?.message ? '确定' : '返回',
      })
      .then(() => {
        if (!statusDel.value?.message) {
          uni.navigateBack()
        }
        submitStatus.value = false
      })
  }
})
async function upload(photoType: string, type: string) {
  const data = { photoType, type, zjhm: userInfo.idCardNumber }
  const queryStr = qs.stringify(data)
  uni.navigateTo({
    url: `/pages-sub/serveMain/OcrCamera?${queryStr}`,
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      camera: function (data) {
        console.log('监听到数据回传', data.cameraData)
        // 处理回传数据
        changeCamearData(data.cameraData)
      },
    },
  })
}

function changeCamearData(cameraData) {
  console.log('🥧', cameraData)

  if (cameraData.type === 1) {
    cardUrl1.value = cameraData.url
    model.value.idCardFrontPhotoId = cameraData.id
    const { words_result: wordsResult }: any = cameraData.data
    model.value.name = wordsResult['姓名'].words
    model.value.sex = changeDict(sexList, wordsResult['性别'].words, 'value', 'label')
    model.value.idCardNumber = wordsResult['公民身份号码'].words
    model.value.nation = changeDict(
      ethniCodeList,
      wordsResult['民族'].words.replace('族', ''),
      'value',
      'label',
    )
    model.value.address = wordsResult['住址'].words
  }
  if (cameraData.type === 2) {
    cardUrl2.value = cameraData.url
    const { words_result: wordsResult }: any = cameraData.data
    model.value.idCardBackPhotoId = cameraData.id
    model.value.startDate = dayjs(wordsResult['签发日期'].words).valueOf()
    model.value.endDate = dayjs(wordsResult['失效日期'].words).valueOf()
  }
  if (cameraData.type === 0) {
    cardUrl0.value = cameraData.url
    model.value.photoId = cameraData.id
  }
}

const bankBranchList = ref([])
// 查询邮寄银行网点
const handleChange = async (pickerView, value, columnIndex, resolve) => {
  try {
    const params = {
      yhdm: model.value.bankCode,
      areaCode: '',
      isMail: model.value.isPostcard,
    }
    const data: any = await sendBranches(params)
    bankBranchList.value = data.content.map((v) => {
      return { value: v.areaCode, label: v.name }
    })
  } catch (error) {
    bankBranchList.value = []
  }
}

const steep = ref(1)
function next() {
  if (model.value.idCardFrontPhotoId && model.value.idCardBackPhotoId && model.value.photoId) {
    steep.value = 2
  } else {
    message.alert({
      msg: '请先上传身份证证件照/人像照片',
      title: '提示',
      closeOnClickModal: false,
    })
    steep.value = 2
  }
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
            placeholder="请输入手机号码"
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
            :maxDate="maxDate"
            :minDate="minDate"
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

          <wd-datetime-picker
            type="date"
            label-width="150"
            custom-value-class="custom-input-right"
            label="身份证有效起始日期"
            v-model="model.startDate"
            :rules="rules.startDate"
            prop="startDate"
            align-right
            :maxDate="maxDate"
            :minDate="minDate"
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
            :maxDate="maxDate"
            :minDate="minDate"
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
            v-model="model.areaCode"
            :rules="rules.areaCode"
            prop="areaCode"
            :columnChange="handleChange"
          />
          <wd-picker
            :columns="bankCodeList"
            custom-value-class="custom-input-right"
            label="申领银行"
            v-model="model.bankCode"
            :rules="rules.bankCode"
            prop="bankCode"
            :columnChange="handleChange"
          />
          <wd-picker
            :columns="bankBranchList"
            custom-value-class="custom-input-right"
            label="申领网点"
            v-model="model.bankBranchCode"
            :rules="rules.bankBranchCode"
            prop="bankBranchCode"
            :disabled="!model.areaCode"
          />
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
        <template v-if="model.isPostcard == '1'">
          <wd-input
            label="邮寄人姓名"
            v-model="model.postcardName"
            :rules="rules.postcardName"
            prop="postcardName"
            label-width="100px"
            type="text"
            placeholder="请输入邮寄人姓名"
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
</style>

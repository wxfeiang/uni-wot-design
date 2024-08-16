<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
import useCardBhk from '../hooks/useCardBhk'
import { upLoadImg } from '../hooks/useUpload'
import {
  applicantList,
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

import { useUserStore } from '@/store'
import card1 from '../static/images/idCard1.jpg'
import card2 from '../static/images/idCard2.jpg'
import card3 from '../static/images/idCard3.jpg'
const message = useMessage()
const { modelPhoto, model, rules, submitCard, submitStatus, statusDel, sendPhoto, loadingPhoto } =
  useCardBhk()

const userStore = useUserStore()
const { userInfo } = userStore

const cardUrl = ref(card1)
const cardUrl2 = ref(card2)
const cardUrl3 = ref(card3)

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
      uni.navigateBack()
    })
  },
  { deep: true },
)

const current = ref('1')
async function upload(photoType: string, type: string) {
  try {
    current.value = photoType
    const { photoBase64, url }: any = await upLoadImg()

    const formData = {
      photoBase64: photoBase64.replace('data:image/png;', 'data:image/jpg;'),
      photoType,
      type,
      zjhm: userInfo.idCardNumber,
    }
    const data: any = await sendPhoto(formData)
    if (data.data.data.message || data.data.code === 500) {
      message.alert(data.data.data.message || data.data.msg)
    } else {
      if (photoType === '1') {
        cardUrl.value = url
        model.value.idCardFrontPhotoId = data.data.data.id
      }
      if (photoType === '2') {
        cardUrl2.value = url
        model.value.idCardBackPhotoId = data.data.data.id
      } else if (photoType === '0') {
        cardUrl3.value = url
        model.value.photoId = data.data.data.id
      }
    }
  } catch (error) {
    console.log('🥦[error]:', error)
    message.alert('图片上传失败，请重新上传')
  }
}
const steep = ref(1)
function next() {
  if (model.value.idCardFrontPhotoId && model.value.idCardBackPhotoId && model.value.photoId) {
    steep.value = 2
  } else {
    message.alert('请上传图片')
  }
  steep.value = 2
}
</script>
<template>
  <view class="p-10px py-20px" v-if="steep == 1">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="formPhoto" :model="modelPhoto">
        <view class="mb-20px px-10px">
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

              <wd-img :width="100" :height="100" :src="cardUrl3" custom-class="custom-class-img" />
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
          <wd-picker
            :columns="ethniCodeList"
            custom-value-class="custom-input-right"
            label="民族"
            v-model="model.nation"
            :rules="rules.nation"
            prop="nation"
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
            :columns="bankCodeList"
            custom-value-class="custom-input-right"
            label="开户银行"
            v-model="model.bankCode"
            :rules="rules.bankCode"
            prop="bankCode"
          />

          <!-- <wd-picker
            :columns="areaCodeList"
            custom-value-class="custom-input-right"
            label="请选择开户网点"
            v-model="model.bankBranchCode"
            :rules="rules.bankBranchCode"
            prop="bankBranchCode"
          /> -->

          <wd-picker
            :columns="businessTypeList"
            custom-value-class="custom-input-right"
            label="业务类型"
            v-model="model.businessType"
            :rules="rules.businessType"
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
          <wd-picker
            :columns="isMailList"
            custom-value-class="custom-input-right"
            label="是否邮寄"
            v-model="model.isPostcard"
            :rules="rules.isPostcard"
            prop="isPostcard"
          />
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

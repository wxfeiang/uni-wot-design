<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
import useCardApply from '../hooks/useCardApply'
import { upLoadImg } from '../hooks/useUpload'
import {
  areaCodeList,
  cardType,
  ethniCodeList,
  isMailList,
  occupationList,
  regionList,
  sexList,
} from '../types/dict'
const message = useMessage()
const { modelPhoto, model, rules, submitCard, submitStatus, statusDel, sendPhoto, loadingPhoto } =
  useCardApply()

const urlDefulate = ref('https://cdn.uviewui.com/uview/demo/upload/positive.png')
const cardUrl = ref(urlDefulate.value)
const cardUrl2 = ref(urlDefulate.value)
const cardUrl3 = ref(urlDefulate.value)

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

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const form = ref(null)
const steep = ref(1)
function next() {
  steep.value = 2
}
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
      zjhm: '130604199109200611',
    }
    const data: any = await sendPhoto(formData)
    if (data.data.data.message) {
      message.alert(data.data.data.message)
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
    message.alert(error)
  }
}
function delPhpoto() {
  cardUrl.value = ''
}
</script>
<template>
  <view class="p-10px py-20px" v-if="steep == 1">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="formPhoto" :model="modelPhoto">
        <view class="mb-20px px-10px">
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
        </view>
      </wd-form>
    </view>
    <view class="mt-10px">
      <wd-text type="warning" text="温馨提示:"></wd-text>
      请保持证件边框与图片边框基本一致
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

          <!-- <wd-datetime-picker
            type="date"
            label-width="150"
            custom-value-class="custom-input-right"
            label="出生日期"
            v-model="model.birthdate"
            :rules="rules.birthdate"
            prop="birthdate"
          /> -->

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
          <!--
        <wd-datetime-picker
          type="date"
          label-width="150"
          custom-value-class="custom-input-right"
          label="身份证有效起始日期"
          v-model="model.startDate"
          :rules="rules.startDate"
          prop="startDate"
        />
        <wd-datetime-picker
          type="date"
          label-width="150"
          custom-value-class="custom-input-right"
          label="身份证有效结束日期"
          v-model="model.endDate"
          :rules="rules.endDate"
          prop="endDate"
        /> -->
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

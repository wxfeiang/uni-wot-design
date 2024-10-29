<script lang="ts" setup>
import { useUserStore } from '@/store'
import { changeDict } from '@/utils'
import dayjs from 'dayjs'
import qs from 'qs'
import { useMessage } from 'wot-design-uni'
import useCardBhk from '../hooks/useCardBhk'
import useCardJuvenApply from '../hooks/useCardJuvenApply'
import {
  applicantList,
  areaCodeList,
  bankCodeList,
  cardType,
  ethniCodeList,
  isMailList,
  occupationList,
  regionList,
  sexList,
} from '../types/dict'
import CardUpload from './CardUpload.vue'
const message = useMessage()
const { modelPhoto, model, rules, submitCard, submitStatus, statusDel } = useCardJuvenApply()
const minDate = dayjs('191000101').valueOf()
const maxDate = dayjs('20991225').valueOf()
const userStore = useUserStore()
const { userInfo } = userStore
const { sendBranches } = useCardBhk()
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
      // if (submitStatus.value === 1) {

      // }
      uni.navigateBack()
    })
  },
  { deep: true },
)

const current = ref('1')
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

const dbrCardUrl = ref()
const dbrCardUrl2 = ref()

const cardUrl1 = ref()
const cardUrl2 = ref()
const cardUrl0 = ref()

function changeCamearData(cameraData) {
  console.log('🥧', cameraData)
  console.log('🥧+cameraData', cameraData)
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

  if (cameraData.type === 3) {
    dbrCardUrl.value = cameraData.url
    model.value.dbrIdCardFrontPhotoId = cameraData.id

    const { words_result: wordsResult }: any = cameraData.data
    model.value.dbrName = wordsResult['姓名'].words
    model.value.dbrZjhm = wordsResult['公民身份号码'].words
    model.value.dbrSex = changeDict(sexList, wordsResult['性别'].words, 'value', 'label')
    model.value.dbrAddress = wordsResult['住址'].words
  }
  if (cameraData.type === 4) {
    dbrCardUrl2.value = cameraData.url
    model.value.dbrIdCardBackPhotoId = cameraData.id
  }
}

const steep = ref(1)
function next() {
  if (model.value.dbrIdCardFrontPhotoId && model.value.dbrIdCardBackPhotoId) {
    steep.value = 2
  } else {
    message.alert({
      msg: '请先上传身份证证件照/人像照片',
      title: '提示',
      closeOnClickModal: false,
    })
  }
}

const footerBtns1 = ref([
  {
    text: '上一步',
    size: 'medium',
    round: false,
    plain: true,
    type: 'info',

    customClass: 'btn-class',
  },
  {
    text: '下一步',
    size: 'medium',
    round: false,
    plain: true,
    type: 'primary',
    customClass: 'btn-class',
  },
])
async function btnClick1(item) {
  if (item.text === '上一步') {
    steep.value = 1
  } else {
    const status = await submitCard(form.value, 'next')
    if (status) {
      steep.value = 3
    }
  }
}

const footerBtns2 = ref([
  {
    text: '上一步',
    size: 'medium',
    round: false,
    plain: true,
    type: 'info',
    customClass: 'btn-class',
  },
  {
    text: '下一步',
    size: 'medium',
    round: false,
    plain: true,
    type: 'primary',
    customClass: 'btn-class',
  },
])
async function btnClick2(item) {
  if (item.text === '上一步') {
    steep.value = 2
  } else {
    const status = await submitCard(form.value, 'next')
    if (status) {
      steep.value = 4
    }
  }
}

const footerBtns3 = ref([
  {
    text: '上一步',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    type: 'info',
  },
  {
    text: '确认提交',
    size: 'medium',
    round: false,
    plain: true,
    customClass: 'btn-class',
    type: 'primary',
  },
])
function btnClick3(item) {
  if (item.text === '上一步') {
    steep.value = 3
  } else if (item.text === '确认提交') {
    if (model.value.idCardFrontPhotoId && model.value.idCardBackPhotoId && model.value.photoId) {
      submitCard(form.value, 'submit', true)
    } else {
      message.alert({
        msg: '请先上传身份证证件照/人像照片',
        title: '提示',
        closeOnClickModal: false,
      })
    }
  }
}

const bankBranchList = ref([])
// 查询邮寄银行网点
const handleChange = async (pickerView, value, columnIndex, resolve) => {
  try {
    const params = {
      yhdm: model.value.bankCode,
      areaCode: model.value.areaCode,
      isMail: model.value.isPostcard,
    }

    const data: any = await sendBranches(params)

    bankBranchList.value = data?.length
      ? data.map((v) => {
          return { value: v.wdCode, label: v.name }
        })
      : [{ value: '', label: '暂无数据,请重新选择网点!' }]
    console.log('🥦', bankBranchList.value)
  } catch (error) {
    bankBranchList.value = []
  }
}
</script>
<template>
  <view class="p-10px py-20px" v-if="steep == 1">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-form ref="formPhoto" :model="modelPhoto">
        <view class="mb-20px px-20px">
          <view @click="upload('3', '1')">
            <Card-Upload :type="1" :imgUrl="dbrCardUrl" smTitle="代办人" />
          </view>
          <view @click="upload('4', '1')">
            <Card-Upload :type="2" :imgUrl="dbrCardUrl2" smTitle="代办人" />
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
            label="代办人姓名:"
            label-width="100px"
            type="text"
            v-model="model.dbrName"
            placeholder="请输入代办人姓名"
            :rules="rules.dbrName"
            prop="dbrName"
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
            label="代办人证件号码:"
            label-width="100px"
            type="text"
            v-model="model.dbrZjhm"
            placeholder="请输入代办人证件号码"
            :rules="rules.dbrZjhm"
            prop="dbrZjhm"
            custom-input-class="custom-input-right"
            disabled
            @click="showKeyBoard"
            :maxlength="18"
            :mixlength="16"
          />
          <wd-number-keyboard
            v-model:visible="visible"
            v-model="model.dbrZjhm"
            :maxlength="18"
            extra-key="X"
            close-text="完成"
          ></wd-number-keyboard>
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
            label="亲属关系"
            v-model="model.familyRelation"
            :rules="rules.familyRelation"
            prop="familyRelation"
          />
          <wd-input
            label="代办人联系手机:"
            label-width="100px"
            type="text"
            v-model="model.dbrPhone"
            placeholder="请输入代办人联系手机"
            :rules="rules.dbrPhone"
            prop="dbrPhone"
            custom-input-class="custom-input-right"
            :maxlength="11"
            :mixlength="11"
          />
          <wd-input
            label="代办人地址:"
            label-width="100px"
            type="text"
            v-model="model.dbrAddress"
            placeholder="请输入代办人地址"
            :rules="rules.dbrAddress"
            prop="dbrAddress"
            custom-input-class="custom-input-right"
          />
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="flex gap-15px mt-20px">
      <view class="flex-1" v-for="(item, index) in footerBtns1" :key="index">
        <wd-button
          :round="item.round"
          block
          :size="item.size"
          :type="item?.type"
          @click="btnClick1(item)"
        >
          {{ item.text }}
        </wd-button>
      </view>
    </view>
  </view>

  <view class="p-10px py-20px" v-if="steep == 3">
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
            label="证件号码:"
            label-width="100px"
            type="text"
            v-model="model.idCardNumber"
            placeholder="请输入证件号码"
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
          <wd-input
            label="移动电话:"
            label-width="100px"
            type="text"
            v-model="model.phoneNumber"
            placeholder="请输入移动电话"
            :rules="rules.phoneNumber"
            prop="phoneNumber"
            custom-input-class="custom-input-right"
            :maxlength="11"
            :mixlength="11"
          />
          <wd-input
            label="联系地址:"
            label-width="100px"
            type="text"
            v-model="model.address"
            placeholder="请输入联系地址"
            :rules="rules.address"
            prop="address"
            custom-input-class="custom-input-right"
          />
          <wd-datetime-picker
            type="date"
            label-width="150"
            custom-value-class="custom-input-right"
            label="证件有效起始日期"
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
            label="证件有效结束日期"
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
            :columns="isMailList"
            custom-value-class="custom-input-right"
            label="是否邮寄"
            v-model="model.isPostcard"
            :rules="rules.isPostcard"
            prop="isPostcard"
            @confirm="handleChange"
          />
          <wd-picker
            :columns="areaCodeList"
            custom-value-class="custom-input-right"
            label="申领地区"
            v-model="model.areaCode"
            :rules="rules.areaCode"
            prop="areaCode"
            @confirm="handleChange"
          />
          <wd-picker
            :columns="bankCodeList"
            custom-value-class="custom-input-right"
            label="申领银行"
            v-model="model.bankCode"
            :rules="rules.bankCode"
            prop="bankCode"
            @confirm="handleChange"
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
          <template v-if="model.isPostcard == '1'">
            <wd-input
              label="收件人姓名:"
              label-width="100px"
              type="text"
              v-model="model.postcardName"
              placeholder="请输入收件人姓名"
              :rules="rules.postcardName"
              prop="postcardName"
              custom-input-class="custom-input-right"
            />
            <wd-input
              label="收件人联系方式:"
              label-width="100px"
              type="text"
              v-model="model.postcardPhone"
              placeholder="请输入收件人联系方式"
              :rules="rules.postcardPhone"
              prop="postcardPhone"
              custom-input-class="custom-input-right"
            />
            <wd-input
              label="收件人地址:"
              label-width="100px"
              type="text"
              v-model="model.postcardaddress"
              placeholder="请输入收件人地址"
              :rules="rules.postcardaddress"
              prop="postcardaddress"
              custom-input-class="custom-input-right"
            />
          </template>
          <wd-input
            v-if="model.idCardType === '18'"
            label="永居证中文名"
            v-model="model.idName"
            :rules="rules.idName"
            prop="idName"
            label-width="100px"
            type="text"
            placeholder="请输入永居证中文名"
            custom-input-class="custom-input-right"
          />
        </wd-cell-group>
      </wd-form>
    </view>
    <view class="flex gap-15px mt-20px">
      <view class="flex-1" v-for="(item, index) in footerBtns2" :key="index">
        <wd-button
          :round="item.round"
          block
          :size="item.size"
          :type="item.type"
          @click="btnClick2(item)"
        >
          {{ item.text }}
        </wd-button>
      </view>
    </view>
  </view>

  <view class="p-10px py-20px" v-if="steep == 4">
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
    <view class="flex gap-15px mt-20px">
      <view class="flex-1" v-for="(item, index) in footerBtns3" :key="index">
        <wd-button
          :round="item.round"
          block
          :size="item.size"
          :type="item.type"
          @click="btnClick3(item)"
        >
          {{ item.text }}
        </wd-button>
      </view>
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

<script lang="ts" setup>
import { SetClipboardData } from '@/utils/uniapi'
import { useMessage } from 'wot-design-uni'
import useCardpress from '../hooks/useCardpress'
const {
  cardQury,
  model,
  rules,
  loading,
  cardInfoData,
  submitStatus,
  statusDel,
  serchBtnStatus,
  sendCardMail,
  model2,
  cardMailData,
} = useCardpress()
const form = ref(null)
const message = useMessage()
const visible = ref<boolean>(false)
function showKeyBoard() {
  visible.value = true
}
const back = () => {
  uni.navigateBack()
}

const data = ref([
  {
    title: '申领状态:',
    value: '',
    prop: 'zkjd',
  },
  {
    title: '状态更新时间:',
    value: '',
    prop: 'date',
  },
])
const data1 = ref([
  {
    title: '网点名称:',
    value: '',
    prop: 'wdName',
  },
  {
    title: '领取渠道:',
    value: '',
    prop: 'lqqd',
  },
  {
    title: '邮寄单号:',
    value: '',
    prop: 'yjdh',
    action: 'copy',
  },
  {
    title: '邮寄公司:',
    value: '',
    prop: 'yjCompany',
  },
])
const outherData = ref<any>(null)
onUnmounted(() => {
  cardInfoData.value = null
})

const suMit1 = ref(true)
// 您未在本平台申领社保卡，未查询到您的制卡进度
function juvenClick(form) {
  suMit1.value = false
  cardQury(form)
}
// 错误提示
watchEffect(async () => {
  if (submitStatus.value) {
    message
      .alert({
        closeOnClickModal: false,
        msg: statusDel.value.message,
        title: '提示',
        confirmButtonText: '确定',
      })
      .then(() => {
        if (!statusDel.value?.message) {
          uni.navigateBack()
        }
        submitStatus.value = false
        serchBtnStatus.value = false
      })
  }
  if (cardInfoData.value) {
    try {
      const rdata: any = await sendCardMail()
      outherData.value = rdata.data
    } catch (error) {
      cardMailData.value = null
    }
  }
})
onUnmounted(() => {
  serchBtnStatus.value = false
})
</script>
<template>
  <view class="p-15px">
    <view v-if="!cardInfoData">
      <view class="rounded-10px overflow-hidden bg-#fff">
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
            <wd-input
              label="姓名:"
              label-width="100px"
              type="text"
              v-model="model.xm"
              placeholder="请输入姓名"
              :rules="rules.xm"
              prop="xm"
              custom-input-class="custom-input-right"
            />
            <wd-input
              label="身份证号码:"
              label-width="100px"
              type="text"
              v-model="model.zjhm"
              placeholder="请输入身份证号码"
              :rules="rules.zjhm"
              prop="zjhm"
              custom-input-class="custom-input-right"
              @click="showKeyBoard"
              :maxlength="18"
              :mixlength="16"
            />
            <wd-number-keyboard
              v-model:visible="visible"
              v-model="model.zjhm"
              :maxlength="18"
              extra-key="X"
              close-text="完成"
            ></wd-number-keyboard>
          </wd-cell-group>
        </wd-form>
      </view>
      <view class="mt-20px">
        <wd-button
          type="primary"
          :round="false"
          size="medium"
          @click="cardQury(form)"
          block
          :loading="loading"
          v-if="suMit1"
        >
          查 询
        </wd-button>
        <!-- <view class="mt-20px flex justify-center">
          <wd-text
            text="未成年人申领进度查询"
            type="primary"
            decoration="underline"
            @click="juvenClick(form)"
          />
        </view> -->
      </view>
    </view>
    <view v-if="cardInfoData && !loading">
      <view class="rounded-10px overflow-hidden bg-#fff">
        <wd-cell-group title="查询到您的制卡进度信息" border>
          <wd-cell
            :title="item.title"
            :value="cardInfoData[item.prop]"
            border
            v-for="(item, index) in data"
            :key="index"
          ></wd-cell>
          <template v-if="outherData">
            <template v-for="(item, index) in data1">
              <wd-cell :title="item.title" border :key="index" v-if="outherData[item.prop]">
                <view>
                  <view class="flex gap-10px items-center justify-end">
                    <text>{{ outherData[item.prop] }}</text>
                    <wd-icon
                      name="file-copy"
                      size="18px"
                      color="#1890ff"
                      v-if="item.action && item.action == 'copy'"
                      @click="SetClipboardData(outherData[item.prop])"
                    ></wd-icon>
                  </view>
                </view>
              </wd-cell>
            </template>
          </template>
        </wd-cell-group>
      </view>
      <view class="mt-20px">
        <wd-button type="primary" :round="false" size="medium" @click="back" block>返 回</wd-button>
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
:deep(.wd-input__error-message) {
  @apply text-right!;
}
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}
</style>

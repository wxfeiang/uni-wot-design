<script lang="ts" setup>
import useCardpress from '../hooks/useCardpress'
const { cardQury, model, rules, loading, cardInfoData } = useCardpress()

const form = ref(null)

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}
const back = () => {
  uni.navigateBack()
}

const data1 = ref([
  {
    title: '姓名:',
    value: '',
    prop: 'xm',
  },
  {
    title: '身份证号:',
    value: '',
    prop: 'xb',
  },
  {
    title: '申领银行:',
    value: '',
    prop: 'phone',
  },
  {
    title: '申领时间:',
    value: '',
    prop: 'dh',
  },
])

const data2 = ref([
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
onUnmounted(() => {
  cardInfoData.value = null
})
const suMit1 = ref(true)

function juvenClick(form) {
  suMit1.value = false
  cardQury(form)
}
</script>
<template>
  <view class="p-15px">
    <view v-if="!cardInfoData">
      <view class="rounded-10px overflow-hidden bg-#fff">
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
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
        <wd-cell-group title="制卡进度" border>
          <wd-cell
            :title="item.title"
            :value="cardInfoData[item.prop]"
            border
            v-for="(item, index) in data2"
            :key="index"
          ></wd-cell>
        </wd-cell-group>
      </view>
      <view class="mt-20px">
        <wd-button type="primary" :round="false" size="medium" @click="back" block>返 回</wd-button>
      </view>
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
:deep(.wd-input__error-message) {
  @apply text-right!;
}
:deep(.custom-input-right) {
  @apply text-right! color-#999999!;
}
</style>

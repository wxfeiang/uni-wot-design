<script lang="ts" setup>
import { routeTo } from '@/utils'
import useCardFrom from '../hooks/useCardFrom'
const { cardQury, model, rules, loading } = useCardFrom()

const form = ref(null)

const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

function toQueryDetil(data?: any) {
  routeTo({ url: '/pages-sub/serveMain/cardMessType' })
}
const data = ref({
  username: '123456789012345678',
  password: '123456789012345678',
})
</script>
<template>
  <view class="p-15px">
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
            disabled
            @click="showKeyBoard"
            :maxlength="18"
            :mixlength="16"
          />

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
      >
        查 询
      </wd-button>
    </view>

    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-cell-group title="基本信息" border>
        <wd-cell
          :title="item"
          :value="item"
          border
          v-for="(item, index) in data"
          :key="index"
        ></wd-cell>
      </wd-cell-group>
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" block>返 回</wd-button>
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

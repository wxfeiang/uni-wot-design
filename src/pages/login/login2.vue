<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    'mp-alipay': {
      transparentTitle: 'always',
      titlePenetrate: 'YES',
    },
  },
}
</route>
<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import useLogin from './utils/useLogin'
const { isLogined, userInfo } = storeToRefs(useUserStore())
const { Login, model, rules } = useLogin()
const form = ref(null)

function handleClickLeft() {
  uni.navigateBack()
}
console.log('🌯', userInfo)
const data = ref([])
const iconColse = ref(false)

function close() {
  iconColse.value = !iconColse.value
  if (!iconColse.value) {
    data.value[0].value = userInfo.value?.userName
    data.value[2].value = userInfo.value?.idCardNumber
  } else {
    if (userInfo.value?.userName) {
      data.value[0].value = data.value[0].value.replace(/(.).*?(.)/, '**$2')
      data.value[2].value = data.value[2].value.replace(/(\d{1})\d{16}(\d{1})/, '$1************$2')
    }
  }
}
onShow(() => {
  if (isLogined.value) {
    console.log('🍔')
    data.value = [
      {
        title: '姓名',
        value: userInfo.value.userName,
      },
      {
        title: '证件类型',
        value: '身份证',
      },
      {
        title: '身份证号',
        value: userInfo.value.idCardNumber,
      },
    ]
    close()
  }
})
</script>
<template>
  <dy-navbar leftTitle="实名认证" left></dy-navbar>

  <view class="px-10px py-5px" v-if="!userInfo?.idCardNumber">
    <wd-form ref="form" :model="model">
      <view class="py-10px mb-10px">
        <view class="my-8px">真实姓名</view>
        <view class="p-10px bg-#fff rounded-4px">
          <wd-input
            type="text"
            v-model="model.username"
            placeholder="请输入真实姓名"
            :rules="rules.username"
            prop="username"
            no-border
          />
        </view>
      </view>
      <view class="py-10px mb-10px">
        <view class="my-8px">身份证号</view>
        <view class="p-10px bg-#fff rounded-4px">
          <wd-input
            type="text"
            v-model="model.password"
            placeholder="请输入身份证号"
            :rules="rules.password"
            prop="password"
            no-border
            maxlength="18"
          />
        </view>
      </view>
    </wd-form>
    <view class="mt-40px">
      <wd-button type="primary" size="medium" :round="false" @click="Login(form, true)" block>
        去 认 证
      </wd-button>
    </view>
  </view>
  <view class="px-10px py-5px" v-else>
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-cell-group title="基本信息" border>
        <template #value>
          <view @click="close">
            <wd-icon
              :name="iconColse ? 'eye-close' : 'view'"
              size="20px"
              :color="iconColse ? '#666' : '#2D69EF'"
            ></wd-icon>
          </view>
        </template>
        <wd-cell
          :title="item.title"
          :value="item.value"
          border
          v-for="(item, index) in data"
          :key="index"
        ></wd-cell>
      </wd-cell-group>
    </view>
    <view class="mt-30px">
      <wd-button type="primary" :round="false" size="medium" block @click="handleClickLeft">
        返 回
      </wd-button>
    </view>
  </view>
</template>
<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
:deep(.label-class),
:deep(.text-btn) {
  font-size: 12px !important;
  color: #999 !important;
}
</style>

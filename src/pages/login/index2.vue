<route lang="json5">
{
  layout: 'default',
  needLogin: true,
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
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { routeTo } from '@/utils'
import { useMessage } from 'wot-design-uni'
import useLogin from './utils/useLogin'
const { Login, model, rules, read, loading, columns } = useLogin()
const form = ref(null)
const logo = ref('https://unpkg.com/wot-design-uni-assets/meng.jpg')
const to = () => {
  routeTo({ url: '/pages/aa/index', navType: NAVIGATE_TYPE.NAVIGATE_TO })
}
const tab = ref<number>(0)
function toAgereement(type) {
  routeTo({ url: '/pages-sub/components/webView/index', data: { type } })
}
function handleClickLeft() {
  uni.navigateBack()
}
function handleConfirm({ value }) {
  model.value.select = value
}
const message = useMessage()
function test() {
  message.alert('操作成功')
}
const data = ref([
  {
    title: '姓名',
    value: '张三',
  },
  {
    title: '性别',
    value: '男',
  },
  {
    title: '年龄',
    value: '18',
  },
  {
    title: '电话',
    value: '123456789',
  },
  {
    title: '地址',
    value: '北京市',
  },
])
</script>
<template>
  <view class="px-10px py-10px">
    <wd-form ref="form" :model="model">
      <view class="py-10px mb-10px">
        <view class="my-5px">真实姓名</view>
        <view class="p-10px bg-#fff rounded-4px">
          <wd-input
            type="text"
            v-model="model.password"
            show-password
            placeholder="请输入真实姓名"
            :rules="rules.password"
            prop="password"
            no-border
          />
        </view>
      </view>
      <view class="py-10px mb-10px">
        <view class="my-5px">身份证号</view>
        <view class="p-10px bg-#fff rounded-4px">
          <wd-input
            type="text"
            v-model="model.password"
            show-password
            placeholder="请输入身份证号"
            :rules="rules.password"
            prop="password"
            no-border
          />
        </view>
      </view>
    </wd-form>
    <view class="mt-40px">
      <wd-button
        type="primary"
        size="medium"
        :round="false"
        @click="Login(form)"
        block
        :loading="loading"
      >
        去 认 证
      </wd-button>
    </view>
  </view>
  <view class="p-15px">
    <view class="rounded-10px overflow-hidden bg-#fff">
      <wd-cell-group title="基本信息" border>
        <wd-cell
          :title="item.title"
          :value="item.value"
          border
          v-for="(item, index) in data"
          :key="index"
        ></wd-cell>
      </wd-cell-group>
    </view>
    <view class="mt-20px">
      <wd-button type="primary" :round="false" size="medium" @click="back" block :loading="loading">
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
.top {
  clip-path: inset(0% 0% 10% 0% round 0% 0 44% 44%);
  background-image: linear-gradient(to bottom, rgb(22, 104, 235), rgb(110, 163, 247));
}
:deep(.label-class),
:deep(.text-btn) {
  font-size: 12px !important;
  color: #999 !important;
}
</style>

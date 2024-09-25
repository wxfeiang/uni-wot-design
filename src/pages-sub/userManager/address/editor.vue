<!-- eslint-disable prefer-promise-reject-errors -->
<!-- eslint-disable prefer-promise-reject-errors -->
<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import { useColPickerData } from '@/hooks/useColPickerData'
import useAddress from './utils/useAddress'
const { model, rules } = useAddress()
const { colPickerData, findChildrenByCode } = useColPickerData()

const title = ref('收货地址')
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])

const form = ref()
const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        console.log('🥔')
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
    )
  } else {
    finish()
  }
}

function handleConfirm({ value, selectedItems }) {
  console.log(value, selectedItems)
}
function addAddress() {}

onLoad(async () => {
  // 设置背景图片
  console.log('area', area.value)
})
</script>
<template>
  <view class="w-100vw h-100vh bg-#F7F7F7 box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left></dy-navbar>
    <view class="p-15px rounded-8px">
      <wd-form ref="form" :model="model">
        <wd-cell-group border>
          <wd-input
            label="收货人"
            prop="name"
            clearable
            v-model="model.name"
            placeholder="请输入收货人姓名"
            :rules="rules.name"
          />
          <wd-input
            label="联系电话"
            :maxlength="11"
            label-width="100px"
            prop="phone"
            clearable
            v-model="model.phone"
            placeholder="请输入联系电话"
            :rules="rules.phone"
          />
          <wd-col-picker
            label="选择地址"
            v-model="model.area"
            :columns="area"
            :column-change="columnChange"
            prop="area"
            @confirm="handleConfirm"
            :rules="rules.area"
          ></wd-col-picker>
          <wd-textarea
            v-model="model.detail"
            placeholder="请填写详细地址（街道，楼牌号等）"
            prop="detail"
            :rules="rules.detail"
          />
        </wd-cell-group>
        <wd-cell-group>
          <wd-cell title="设为默认地址" center>
            <view class="mt-10px">
              <wd-switch v-model="model.isDefault" size="16" change="handleSwitchChange" />
            </view>
          </wd-cell>
        </wd-cell-group>
      </wd-form>
    </view>

    <view class="px-10 py-20px fixed bottom-20px left-0 right-0">
      <wd-button block custom-class="custom-class-mine-error" @click="addAddress">
        保存地址
      </wd-button>
    </view>
  </view>
</template>

<style></style>

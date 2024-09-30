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
import { addressListAddOrEdit } from '@/service/api/address'

const { model, rules, routeTo, Toast } = useAddress()
const { colPickerData, findChildrenByCode } = useColPickerData()

const title = ref('收货地址')
const isAdd = ref(true)
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
  findChildrenByCode(colPickerData, '130000')!.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
  findChildrenByCode(colPickerData, '130200')!.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])
const form = ref()
const showArea = ref('')
const addAddress = () => {
  const { userName, userPhone, area, userAddress, isDefault, id } = model
  const data: any = {
    userName,
    userPhone,
    province: showArea.value[0].label,
    city: showArea.value[1].label,
    area: showArea.value[2].label,
    provinceCode: showArea.value[0].value,
    cityCode: showArea.value[1].value,
    areaCode: showArea.value[2].value,
    userAddress,
    isDefault,
  }
  console.log('data', data)
  let msg = ''
  if (isAdd.value) {
    msg = '新增成功'
  } else {
    data.id = id
    msg = '编辑成功'
  }
  addressListAddOrEdit(data).then((res) => {
    console.log('新增/修改地址', res)
    Toast(msg)
    routeTo({ url: '/pages-sub/userManager/address/list' })
  })
}
const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        addAddress()
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
// const columnChange = ({ selectedItem, resolve, finish }) => {
//   const areaData = findChildrenByCode(colPickerData, selectedItem.value)
//   if (areaData && areaData.length) {
//     resolve(
//       areaData.map((item) => {
//         return {
//           value: item.value,
//           label: item.text
//         }
//       })
//     )
//   } else {
//     finish()
//   }
// }
//
// function handleConfirm({ value, selectedItems }) {
//   console.log(value, selectedItems)
//   showArea.value = selectedItems
// }

const value = ref<string[]>(['150000', '150100', '150121'])

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

function handleConfirm({ value }) {
  console.log(value)
}

onLoad(async (options) => {
  // 设置背景图片
  console.log('options', options)
  if (options.type === 'edit') {
    isAdd.value = false
    // let obj = JSON.parse(decodeURIComponent(options.item))
    // Object.keys(model).forEach(key => {
    //   model[key] = obj[key]
    // })
    Object.assign(model, JSON.parse(decodeURIComponent(options.item)))
    // model.area = [model.provinceCode, model.cityCode, model.areaCode]
    model.area = ['110000', '110100', '110101']
    console.log('model', model)
  } else {
    Object.assign({}, model)
  }
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
            prop="userName"
            clearable
            v-model="model.userName"
            placeholder="请输入收货人姓名"
            :rules="rules.userName"
          />
          <wd-input
            label="联系电话"
            :maxlength="11"
            prop="userPhone"
            clearable
            v-model="model.userPhone"
            placeholder="请输入联系电话"
            :rules="rules.userPhone"
          />
          <wd-col-picker
            label="选择地址"
            v-model="value"
            :columns="area"
            :column-change="columnChange"
          ></wd-col-picker>
          <!--          {{ model.area }}-->
          <!--          <wd-col-picker-->
          <!--            label="选择地址"-->
          <!--            v-model="model.area"-->
          <!--            :columns="area"-->
          <!--            :column-change="columnChange"-->
          <!--            prop="area"-->
          <!--            auto-complete-->
          <!--            @confirm="handleConfirm"-->
          <!--            :rules="rules.area"-->
          <!--          ></wd-col-picker>-->
          <wd-textarea
            v-model="model.userAddress"
            placeholder="请填写详细地址（街道，楼牌号等）"
            prop="userAddress"
            :rules="rules.userAddress"
          />
        </wd-cell-group>
        <wd-cell-group>
          <wd-cell title="设为默认地址" center>
            <view class="mt-10px">
              <wd-switch
                v-model="model.isDefault"
                size="16"
                :active-value="1"
                :inactive-value="0"
              />
            </view>
          </wd-cell>
        </wd-cell-group>
      </wd-form>
    </view>

    <view class="px-10 py-20px fixed bottom-20px left-0 right-0">
      <wd-button block custom-class="custom-class-mine-error" @click="handleSubmit">
        保存地址
      </wd-button>
    </view>
  </view>
</template>

<style></style>

<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
  {
    layout: 'default',
    style: {
      navigationBarTitleText: '收获地址',
      backgroundColor: '#ffffff',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
    },
  }
  </route>
<script lang="ts" setup>
import { useColPickerData } from '@/hooks/useColPickerData'
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'

const { colPickerData, findChildrenByCode } = useColPickerData()


const topbgBase64 = ref('')
const { navTop } = useNav()
const { VITE_APP_LOGOTITLE } = import.meta.env


const area = ref<any[]>([

  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])
let model = reactive({
  name: '',
  phone: "",
  area: [],
  detail: '',
  isDefault: false
})
const form = ref()
const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {

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
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}
// 表单校验
const validatorName = (val) => {
  return model.name.length > 0
}
const validatorDetail = (val) => {
  return model.detail.length > 0
}
const validatorArea = (val: Array<any>) => {
  return val.length > 0
}
const validatorPhone = (val) => {
  if (String(val).length > 0) {
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (reg.test(val)) {
      return true
    } else {
      return Promise.reject('请输入正确手机号')
    }

  } else {
    return false
  }
}

function handleConfirm({ value }) {
  console.log(value)
}
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
  console.log('area', area.value)
})
</script>
<template>

  <view class="w-100vw h-100vh bg-#F7F7F7  box-border overflow-y-auto pb-100px">
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input label="收货人" label-width="100px" prop="name" clearable v-model="model.name" placeholder="请输入用户名"
          :rules="[{ required: false, validator: validatorName, message: '请填写收货人姓名' }]" />
        <wd-input label="联系电话" type="number" :maxlength="11" label-width="100px" prop="phone" clearable
          v-model="model.phone" placeholder="请输入联系电话"
          :rules="[{ required: false, validator: validatorPhone, message: '请填写联系电话' }]" />
        <wd-col-picker label="选择地址" v-model="model.area" :columns="area" :column-change="columnChange" prop="area"
          @confirm="handleConfirm"
          :rules="[{ required: false, validator: validatorArea, message: '请选择省市区' }]"></wd-col-picker>
        <wd-textarea v-model="model.detail" placeholder="请填写详细地址（街道，楼牌号等）" prop="detail"
          :rules="[{ required: false, validator: validatorDetail, message: '请填写详细地址' }]" />
      </wd-cell-group>
      <wd-cell-group>
        <wd-cell title="设为默认地址" center>
          <view class="custom-value">
            <wd-switch v-model="model.isDefault" change="handleSwitchChange" />
          </view>
        </wd-cell>
      </wd-cell-group>
    </wd-form>

    <view class="submit" @click="handleSubmit">保存地址</view>

  </view>


</template>

<style>
.submit {
  position: fixed;
  bottom: 40px;
  left: 50%;
  width: 70vw;
  line-height: 50px;
  color: #fff;
  text-align: center;
  background-color: #f44d24;
  border-radius: 50px;
  transform: translate(-50%);
}
</style>
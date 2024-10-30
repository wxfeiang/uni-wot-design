<route lang="json5" type="page">
{
  layout: 'default',

  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'
import { useToast } from 'wot-design-uni'
import dayjs from 'dayjs'
import { useUserStore } from '@/store'
import foodicon01 from '@/static/images/smartCanteen/foodicon01.png'
import foodicon02 from '@/static/images/smartCanteen/foodicon02.png'
import foodicon03 from '@/static/images/smartCanteen/foodicon03.png'
import logo from '@/static/images/smartCanteen/logo.png'

import { getInfoId, getCardInfo2, getInfoList } from '@/service/api/userMessage'
// realNameAuthentication: true,
const userStore = useUserStore()

const value = ref('1')
const toast = useToast()
const title = ref('智慧食堂')
const personId: any = ref('')
const info: any = ref({})
const name: any = ref('')
const money: any = ref({})
const lists: any = ref([])

const show = ref(false)
const GInfoId = () => {
  getInfoId({
    pageNo: 1,
    pageSize: 10,
    // phone: userStore.userInfo.userPhone
    phone: '19933331858',
  }).then((res) => {
    console.log('卡信息', res)
    info.value = res.data.data.list[0] ? res.data.data.list[0] : {}

    if (info.value.personName.length === 2) {
      name.value = info.value.personName.slice(0, 1) + '*'
    } else if (info.value.personName.length === 3) {
      name.value = info.value.personName.slice(0, 1) + '*' + info.value.personName.slice(2, 3)
    } else {
      name.value =
        info.value.personName.slice(0, 1) +
        '*' +
        info.value.personName.slice(2, info.value.personName.length)
    }

    personId.value = res.data.data.list[0].personId
    console.log(info.value)
    Gcardinfo()
    GinfoList()
  })
}

function Gcardinfo() {
  getCardInfo2({ personId: personId.value }).then((res) => {
    console.log('卡余额', res)
    money.value = res.data.data.totalAccount / 100
  })
}

function GinfoList() {
  getInfoList({
    personId: personId.value,
    pageNo: 1,
    pageSize: 999,
    transactionTypes: '1,5',
    endTime: new Date().toISOString().slice(0, 19) + '+08:00',
    startTime:
      new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 19) +
      '+08:00',
  }).then((res) => {
    console.log('列表', res)
    lists.value = res.data.data.rows
  })
}

const formatTimeA = (val) => {
  return val.slice(0, 10)
}
const formatTimeB = (val) => {
  return val.slice(11, 19)
}
onShow(() => {
  GInfoId()
})

function toMingxi(item) {
  if (item.path) {
    routeTo({
      url: '/pages-sub/userManager/smartCanteen/rechargeAndSonsumption',
      data: { type: item.type }, // 1 充值 2 消费
    })
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}
</script>

<template>
  <view class="flex flex-col bg-no-repeat dy-blue-bg2" style="min-height: 100vh">
    <view>
      <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
      <view class="topbg pos-relative">
        <!--        <view-->
        <!--          class="brge pos-absolute pos-top-none pos-right-none flex justify-center items-center"-->
        <!--          @click="show = true"-->
        <!--        >-->
        <!--          <wd-img :src="qiehuan" :width="13" :height="11" custom-class="mr-5px"></wd-img>-->
        <!--          <wd-text text="切换食堂" color="#A5D8FF" size="12px"></wd-text>-->
        <!--        </view>-->
        <view class="flex items-center">
          <wd-img :src="logo" :width="40" :height="40" custom-class="mr-11px"></wd-img>
          <wd-text text="智慧食堂" size="20px" color="#fff" lineHeight="28px"></wd-text>
        </view>
        <!--        <view class="flex justify-end">-->
        <!--          <wd-text text="￥200" size="26px" color="#fff" bold></wd-text>-->
        <!--        </view>-->
        <view
          class="pos-absolute w-full pos-left-none pos-bottom-none h-38px line-height-38px px-20px box-border flex justify-between"
          style="background: rgba(19, 35, 187, 0.3)"
        >
          <wd-text :text="name" size="14px" color="#fff"></wd-text>
          <wd-text
            :text="info.phoneNo"
            size="14px"
            color="#94C1E3"
            mode="phone"
            :format="true"
          ></wd-text>
        </view>
      </view>
    </view>
    <view class="px-15px box-border">
      <view
        class="mb-10px p-15px bg-#fff rounded-6px box-border w-full flex justify-between items-center"
      >
        <view class="flex items-center justify-left">
          <wd-img :width="22" :height="22" :src="foodicon01" custom-class="mr-5px"></wd-img>
          <wd-text text="余额：" size="14px" color="#000" bold></wd-text>
          <wd-text
            :text="money"
            size="14px"
            color="#f80"
            mode="price"
            bold
            prefix="￥"
            suffix="元"
          ></wd-text>
        </view>

        <view>
          <!--          <wd-button size="small" custom-class="cz" disabled>充值</wd-button>-->
        </view>
      </view>

      <wd-text text="近期交易记录" size="14px" color="#333" bold custom-class="py-2"></wd-text>

      <template v-for="(it, ind) in lists" :key="ind">
        <view
          v-if="it.transactionType === 1"
          class="my-10px p-15px bg-#fff rounded-6px box-border w-full flex justify-between items-center"
        >
          <view class="flex items-center justify-left">
            <view class="">
              <view class="mb-5px flex items-center justify-left">
                <wd-img :width="22" :height="22" :src="foodicon02" custom-class="mr-5px"></wd-img>
                <wd-text text="充值" size="14px" color="#000" bold></wd-text>
              </view>
              <view class="flex items-center justify-left">
                <wd-text
                  :text="formatTimeA(it.debitTime)"
                  size="12px"
                  color="#999"
                  custom-class="mr-10px"
                ></wd-text>
                <wd-text :text="formatTimeB(it.debitTime)" size="12px" color="#999"></wd-text>
              </view>
            </view>
          </view>
          <view>
            <wd-text
              :text="it.deduction / 100"
              size="14px"
              color="#49940f"
              mode="price"
              suffix="元"
            ></wd-text>
          </view>
        </view>
        <view
          v-if="it.transactionType === 5"
          class="my-10px p-15px bg-#fff rounded-6px box-border w-full flex justify-between items-center"
        >
          <view class="flex items-center justify-left">
            <view class="">
              <view class="mb-5px flex items-center justify-left">
                <wd-img :width="22" :height="22" :src="foodicon03" custom-class="mr-5px"></wd-img>
                <wd-text text="消费" size="14px" color="#000" bold></wd-text>
              </view>
              <view class="flex items-center justify-left">
                <wd-text
                  :text="formatTimeA(it.debitTime)"
                  size="12px"
                  color="#999"
                  custom-class="mr-10px"
                ></wd-text>
                <wd-text :text="formatTimeB(it.debitTime)" size="12px" color="#999"></wd-text>
              </view>
            </view>
          </view>
          <view>
            <wd-text
              :text="it.deduction / 100"
              size="14px"
              color="#f28b89"
              mode="price"
              suffix="元"
            ></wd-text>
          </view>
        </view>
      </template>
    </view>
  </view>
  <wd-popup
    v-model="show"
    custom-style="height:440px;borderRadius:20px 20px 0 0 ;padding:15px 20px 25px 28px;box-sizing:border-box;display:flex;flex-direction: column;"
    position="bottom"
  >
    <view class="flex justify-center items-center pos-relative">
      <wd-text text="切换食堂"></wd-text>
      <view class="pos-absolute pos-right-5px pos-top-5spx" @click="show = false">
        <wd-icon name="close" size="12px" color="#C9C9C9"></wd-icon>
      </view>
    </view>
    <view class="flex-1 overflow-y-auto mt-30px">
      <wd-radio-group v-model="value" inline shape="dot" checked-color="#F44D24">
        <view class="w-full flex items-center mb-10px" v-for="i in 20" :key="i">
          <wd-radio value="1"></wd-radio>
          <wd-text :text="'单选框' + i" size="18px" color="#000000"></wd-text>
        </view>
      </wd-radio-group>
    </view>
    <view
      class="w-full h-40px flex justify-center items-center bg-#2D69EF color-#fff border-rd-6px mt-30px"
    >
      确认切换
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped>
:deep(.custom-cell-picker) {
  @apply bg-#fff;

  .wd-picker__arrow {
    @apply hidden;
  }
}

.topbg {
  box-sizing: border-box;
  width: calc(100% - 30px);
  padding: 19px 19px 45px 19px;
  margin: 10px auto;
  overflow: hidden;
  background: linear-gradient(48deg, #2bc5ff 0%, #1d4adc 100%);
  border-radius: 8px 8px 8px 8px;

  .brge {
    width: 87px;
    height: 28px;
    background: rgba(35, 31, 150, 0.42);
    border-radius: 0px 8px 0px 25px;
  }
}

:deep(.custom-view-picker) {
  @apply flex justify-between items-center;
}

:deep(.cz) {
  width: 60px;
  color: #ff8800 !important;
  background-color: #feece7 !important;
}

.dy-blue-bg2 {
  background: linear-gradient(
    180deg,
    #d6eafe 0%,
    #d6eafe 0%,
    #d6eafe 0%,
    #f3f4f6 40%,
    #f2f3f7 100%
  ) !important;
}
</style>

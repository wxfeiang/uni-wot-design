<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import anvter1 from '@/static/images/mine/anvter1.png'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'
import caeama from '../static/images/caeama.png'
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
const title = ref('个人信息')
</script>

<template>
  <view class="h-100vh bg-#F6F6F6">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>

    <view class="px-15px">
      <view class="my-10px">
        <view class="rounded-8px my-10px">
          <view class="flex justify-center my-30px">
            <view class="bg-#fff rounded-full relative">
              <dy-upload v-model="anvter1" :limit="1">
                <template #default>
                  <view class="absolute bottom-[-5px] right-0">
                    <wd-img :width="27" :height="27" :src="caeama" round />
                  </view>
                </template>
                <template #preview>
                  <view class="absolute bottom-[-5px] right-0">
                    <wd-img :width="27" :height="27" :src="caeama" round />
                  </view>
                </template>
                <!-- <wd-img :width="100" :height="100" :src="anvter1" round /> -->
              </dy-upload>
            </view>
          </view>

          <wd-cell-group border>
            <wd-cell title="昵称" :value="userInfo.userName" is-link />
            <wd-cell title="账号" :value="userInfo.userPhone" />
          </wd-cell-group>
        </view>
      </view>
    </view>

    <view></view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

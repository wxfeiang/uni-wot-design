<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import logo from '@/static/images/logo.png'
import { routeTo } from '@/utils'
import stkts from '../../static/image/sbkts.png'
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
const cfig = ref({
  logoImage: logo,
  str: '',
  logoWidth: 60,
  logoHeight: 60,
  size: 440,
})

const title = ref('公交出行')
function toMingxi() {
  routeTo({ url: '/pages-sub/userManager/userCenter/transit/list' })
}

const status = ref(2)
const cardyh = ref(true)
const countdown = ref(60)
</script>
<template>
  <view class="dy-blue-bg">
    <!-- 顶部 -->
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    <view class="px-20px mt-20px">
      <view class="flex justify-center">
        <view
          class="text-center py-8px bg-#2D69EF color-#fff px-10px min-w-75% ti rounded-t-10px overflow-hidden"
        >
          乘公交
        </view>
      </view>

      <view class="bg-#fff rounded-10px shoad">
        <view class="px-20px pt-35px py-10px">
          <template v-if="status === 1">
            <view class="text-center py-15px color-#777">立即开通，享受便捷展码乘车</view>
            <view class="flex justify-center my-25px">
              <wd-status-tip
                :image="stkts"
                :image-size="{
                  height: 132,
                  width: 200,
                }"
              />
            </view>
            <view class="my-20px">
              <wd-button block :round="false">立即开通</wd-button>
            </view>
          </template>
          <template v-else>
            <view class="flex justify-center mt-10px flex-col items-center">
              <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
              <view>
                <text class="text-#999999 text-14px mr-10px">{{ countdown }}秒自动刷新</text>
                <wd-button type="text" @click="codeRefsh">手动刷新</wd-button>
              </view>

              <view class="mx-[-20px] my-20px" v-if="!cardyh">
                <view class="text-14px text-center color-#999">
                  绑定银行卡，立即享受展码乘车
                  <wd-button type="text">【去绑卡】</wd-button>
                </view>
              </view>
              <view class="w-112% mt-20px bt-1px_solid_#EBEBEB" v-else>
                <wd-cell-group>
                  <wd-cell is-link @click="toMingxi" center>
                    <template #icon>
                      <view class="pt-6px">
                        <wd-img :src="logo" width="22" height="22px"></wd-img>
                      </view>
                    </template>
                    <template #title>
                      <view class="pl-5px">招商银行储蓄卡</view>
                    </template>
                  </wd-cell>
                </wd-cell-group>
              </view>
            </view>
          </template>
        </view>
      </view>
      <view class="mt-20px rounded-6px overflow-hidden" v-if="status !== 1">
        <wd-cell-group>
          <wd-cell is-link @click="toMingxi" center>
            <template #icon>
              <view class="pt-6px">
                <wd-img :src="logo" width="22" height="22px"></wd-img>
              </view>
            </template>
            <template #title>
              <view class="pl-5px">乘车记录</view>
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.ti {
  clip-path: polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%);
}
.shoad {
  box-shadow: 0px 0px 15px 1px rgba(18, 49, 170, 0.17);
}
:deep(.wd-cell__left) {
  @apply items-center!;
}
</style>

<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { pathToBase64 } from 'image-tools'
import icons from './static/editlog.png'
import tobg from './static/tobg.png'
// TODO: 背景图片
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import lPainter from '@/components/lime-painter/components/l-painter/l-painter.vue'
import { routeTo } from '@/utils'
import qs from 'qs'

import { downSaveImage } from '@/utils/uniapi'
import { useMessage } from 'wot-design-uni'
import { shopDetilProps } from './utils/types'
import useShopServe from './utils/useShopServe'
const { shopMessage, sendShopDetail } = useShopServe()
const topbgBase64 = ref('')
const { VITE_SERVER_BASEURL } = import.meta.env
const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
const message = useMessage()
const show = ref(false)
const qrCodeImg = ref('')
const path = ref('')
const cfig = ref()
cfig.value = {
  str: '',
  size: 400,
}
const painter = ref()
const poster = ref({
  css: {
    width: '750rpx',
    margin: '0 auto',
    background: 'linear-gradient(131deg, #72c2fe 0%, #4055fe 100%)',
    opcity: '0.5',
    padding: '0 20px',
    borderRadius: '10px',
  },
  views: [
    {
      text: '商户收款码',
      type: 'text',
      css: {
        display: 'block',
        textAlign: 'center',
        padding: '20px 0 ',
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600',
      },
    },
    {
      type: 'view',
      css: {
        padding: '10px 20px 40px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: '0 auto',
        background: '#fff',
      },
      views: [
        {
          text: shopMessage.value.merchantName,
          type: 'text',
          css: {
            display: 'block',
            textAlign: 'center',
            padding: '20px 0',
            color: '#000',
            fontSize: '18px',
            height: '20px',
          },
        },
        {
          type: 'view',
          css: {
            width: '232px',
            height: '232px',
          },
          views: [
            {
              type: 'image',
              src: qrCodeImg,
              css: {
                width: '100%',
                height: '100%',
              },
            },
          ],
        },
      ],
    },
    {
      text: '打开雄安一卡通【扫一扫】',
      type: 'text',
      css: {
        display: 'block',
        textAlign: 'center',
        padding: '20px 0 ',
        color: '#fff',
        fontSize: '16px',
      },
    },
  ],
})
const downLoadQrcode = () => {
  qrcode.value?.save().then((img) => {
    show.value = true
    qrCodeImg.value = img
    painter.value.render(poster.value)

    // 开始下载
    setTimeout(() => {
      show.value = false
      downSaveImage(path.value)
    }, 3000)
  })
}

function toMingxi() {
  routeTo({ url: '/pages-sub/shopManager/shopPayList' })
}

onLoad(async (options) => {
  topbgBase64.value = await pathToBase64(tobg)
  try {
    await sendShopDetail()
    const qrcodeData = {
      merchantId: shopMessage.value.merchantId,
      type: 'xaCard',
      action: 'pay',
    }
    cfig.value.str = `${VITE_SERVER_BASEURL}?${qs.stringify(qrcodeData)}`
  } catch (error) {
    shopMessage.value = {} as shopDetilProps
    message.alert({ title: '提示', msg: error.data.msg, closeOnClickModal: false }).then((res) => {
      // uni.navigateBack()
    })
  }
})
</script>

<template>
  <view
    class="bg-#F2F3F7 w-100vw h-100vh flex flex-col bg-no-repeat"
    :style="`background-image: url(${topbgBase64}); background-size: 100% 300px`"
  >
    <dy-navbar leftTitle="收款码" left isNavShow></dy-navbar>
    <view class="mt-40px px-20px">
      <view class="bg-#fff p-20px py-0 rounded-10px overflow-hidden">
        <view class="text-18px py-10px">商户收款码</view>
        <view class="flex justify-center mt-10px flex-col items-center">
          <view class="py-10px">{{ shopMessage.merchantName }}</view>
          <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
          <view class="py-10px">
            <wd-text
              text="下载二维码"
              color="#2D69EF"
              size="14px"
              @click="downLoadQrcode"
            ></wd-text>
          </view>
        </view>
        <view
          @click="toMingxi"
          class="flex justify-between items-center text-14px color-#555 bt-1px_dashed_#E2E2E2 py-20px p-15px mt-20px mx-[-20px]"
        >
          <view class="flex items-center gap-10px">
            <wd-img :src="icons" width="19" height="22px"></wd-img>
            收款记录
          </view>
          <view><wd-icon name="chevron-right" size="14px"></wd-icon></view>
        </view>
      </view>
    </view>
  </view>
  <wd-overlay :show="show" @click="show = false">
    <view class="size-full flex flex-col justify-center items-center bg-#000/30">
      <view class="bd-1px_#888 rounded-10px px-10px py-20px bg-#fff">
        <image :src="path" mode="widthFix"></image>
      </view>
    </view>
  </wd-overlay>
  <l-painter
    isCanvasToTempFilePath
    ref="painter"
    @success="path = $event"
    custom-style="position: fixed; left: 200%"
    :painterConfig="poster"
  />
</template>

<style lang="scss" scoped>
.bg-sm {
  background: linear-gradient(131deg, #72c2fe 0%, #4055fe 100%);
}
</style>

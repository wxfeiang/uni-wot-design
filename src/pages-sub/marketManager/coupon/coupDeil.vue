<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
// import { useRequest } from 'alova/client'
// TODO: 背景图片
import tmQrcode from '@/components/dy-qrcode/dy-qrcode.vue'
import lPainter from '@/components/lime-painter/components/l-painter/l-painter.vue'
import { Constant } from '@/enums/constant'
import { mainTypeEmums } from '@/enums/mainTypeEmum'
import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { isRouterCheckd } from '@/interceptors/route'
import { useUserStore } from '@/store'
import { getBack, routeTo, sceneResult } from '@/utils'
import PLATFORM from '@/utils/platform'
import { downSaveImage, useScancode } from '@/utils/uniapi'
import { Toast } from '@/utils/uniapi/prompt'
import { storeToRefs } from 'pinia'
import qs from 'qs'
import { useMessage } from 'wot-design-uni'
import hb from '../static/images/coupon/hb.png'
import wx from '../static/images/coupon/wx.png'
import CouponList from './components/couponList.vue'
import { conponListProps } from './utils/types'
import userCoupon from './utils/userCoupon'
const { isLogined, userInfo } = storeToRefs(useUserStore())
const message = useMessage()
const { VITE_SERVER_BASEURL, VITE_APP_LOGOTITLE } = import.meta.env
const sharePath = ref(Constant.MAIN_PAGE)

const { sendCouponInfo, couponInfoData, sendReceiveCoupon } = userCoupon()

const qrcode = ref<InstanceType<typeof tmQrcode> | null>(null)
const cfigSatatus = ref(false)
const show = ref(false)
const cfig = ref({
  str: '', // 要生成二维码的字符串
  size: 300,
})
const shareQbg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/5abaa059-f847-4b9f-b2a1-083d082498e3qbg.png',
)
const shareQbg2 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-10/c9b8ca4c-b555-495a-a631-5c6b5703f35ashareCounp.png',
)

const share = async () => {
  show.value = true
}
const path = ref('')
const showHb = ref(false)
const painter = ref(null)
const isShare = ref(false) // 是否显现分享按钮
const shareType = ref('') // 是否分享入口进入
const poster = ref({})
const createImg = () => {
  const couponPrice =
    couponInfoData.value.couponType === 3
      ? couponInfoData.value.couponPrice * 10
      : couponInfoData.value.couponPrice
  const company = couponInfoData.value.couponType === 3 ? '折' : '¥'
  const couponFillPrice =
    couponInfoData.value.couponFillPrice > 0
      ? '满' + couponInfoData.value.couponFillPrice + '元可用'
      : '无门槛'
  const qrcodePath = `${Constant.MAIN_PATH}?type=${mainTypeEmums.SHARE_COUPN}&couponCode=${couponInfoData.value.couponCode}`
  return {
    css: {
      width: '750rpx',
      margin: '0 auto',
      padding: '10px',
      height: '1000rpx',
      borderRadius: '5px',
      position: 'relative',
      // backgroundImage: url(${shareQbg.value})`,
      background: '#EC542F',
      backgroundRepeat: 'no-repeat',
      // backgrounSize: '100%',
    },
    views: [
      // {
      //   src: shareQbg.value,
      //   type: 'image',
      //   css: {
      //     objectFit: 'contain',
      //     objectPosition: '100% 100%',
      //     width: '750rpx',
      //     height: '100%',
      //     position: 'absolute',
      //     top: '0',
      //     left: '0',
      //     right: '0',
      //     bottm: '0',
      //     zIndex: '-1',
      //   },
      // },
      {
        text: couponInfoData.value.couponName,
        // text: '无门槛优惠券!',
        type: 'text',
        css: {
          display: 'block',
          textAlign: 'center',
          padding: '20px 0',
          color: '#fff',
          fontSize: '30px',
        },
      },
      {
        type: 'view',
        css: {
          display: 'block',
          textAlign: 'center',
          marginTop: '20px',
          padding: '30px 0 ',
        },
        views: [
          {
            text: couponPrice,
            type: 'text',
            css: {
              color: '#FFECBA',
              fontSize: '80px',
              fontWeight: '600',
              lineHeight: '100px',
              verticalAlign: 'bottom',
            },
          },
          {
            text: company,
            type: 'text',
            css: {
              color: '#FFECBA',
              fontSize: '30px',
              fontWeight: '600',
              lineHeight: '50px',
              verticalAlign: 'bottom',
            },
          },
        ],
      },
      {
        text: couponFillPrice,
        // text: '满100元可用',
        type: 'text',
        css: {
          display: 'block',
          textAlign: 'center',
          padding: '20px 0',
          color: '#FFECBA',
          fontSize: '30px',
        },
      },
      {
        type: 'qrcode',
        text: qrcodePath,
        css: {
          width: '80px',
          height: '80px',
          padding: '10px',
          margin: '20px auto',
          borderRadius: '5px',
          color: '#000',
          background: '#fff',
        },
      },
    ],
  }
}
// 海报打开后开始下载
const downLoadQrcode = async () => {
  showHb.value = true
  poster.value = createImg()
  console.log('🥑', poster.value)
  painter.value.render(poster.value)
  painter.value.canvasToTempFilePathSync({
    // 在nvue里是jpeg
    fileType: 'jpg',
    quality: 1,
    success: (res) => {
      // 非H5 保存到相册
      // H5 提示用户长按图另存
      setTimeout(() => {
        show.value = false
      }, 3000)
      // #ifndef  H5
      downSaveImage(res.tempFilePath)
      // #endif
    },
  })
}
const showHbClose = () => {
  showHb.value = false
  show.value = false
}

const lqStatus = ref(false) // 是否领取
const lqError = ref(false) // 领取失败
const couponId = ref('')

const btnClick2 = async (item) => {
  if (item.action === 'lq') {
    routeTo({ url: '/pages-sub/marketManager/coupon/index' })
  } else if (item.action === 'myCoupon') {
    routeTo({ url: '/pages-sub/marketManager/coupon/mycoupon' })
  } else if (item.action === 'uselq') {
    if (!isLogined.value) {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      // 获取当前页面的路径
      const currentPath = currentPage.route
      isRouterCheckd(currentPath)
    } else {
      const params = {
        couponId: couponInfoData.value.couponId,
      }
      try {
        const data: any = await sendReceiveCoupon(params)
        if (data === true) {
          setTimeout(() => {
            Toast('领取成功')
          }, 50)
          // 改变按钮显示
          lqStatus.value = true
        }
      } catch (error) {
        if (error?.data?.msg === '已领取') {
          lqStatus.value = true
        } else {
          console.log('🍡------')
          lqStatus.value = false
          // 异常 处理后
          lqError.value = true
        }
      }
    }
  } else if (item.action === 'useCoupon') {
    // 点击分享
    if (couponInfoData.value.type === 1) {
      const resData: any = await useScancode({ onlyFromCamera: true })
      const { status, url } = sceneResult(resData)
      if (status) {
        routeTo({
          url: '/pages/pay/index',
          data: { url },
        })
      } else {
        message.alert({
          msg: '未识别到二维码内容',
          title: '提示',
        })
      }
    }
    if (couponInfoData.value.type === 2) {
      setTimeout(() => {
        Toast('即将前往商城城中心!')
        routeTo({ url: '/pages/shop/index', navType: NAVIGATE_TYPE.SWITCH_TAB })
      }, 3000)
    }
    if (couponInfoData.value.type === 3) {
      cfigSatatus.value = true
    }
  }
}
const footerBtns1 = ref([
  {
    text: '领券中心',
    size: 'medium',
    round: false,
    plain: true,
    type: 'error',
    action: 'lq',
    customClass: 'custom-class-error-dyplain',
  },
  {
    text: '立即领取',
    size: 'medium',
    round: false,
    type: 'error',
    action: 'uselq',
    customClass: 'custom-class-mine-error',
  },
])
const footerBtns2 = ref([
  {
    text: '领券中心',
    size: 'medium',
    round: false,
    plain: true,
    type: 'error',
    action: 'lq',
    customClass: 'custom-class-error-dyplain',
  },
])

const footerBtns3 = ref([
  {
    text: '我的优惠券',
    size: 'medium',
    round: false,
    plain: true,
    type: 'error',
    action: 'myCoupon',
    customClass: 'custom-class-error-dyplain',
  },
  {
    text: '立即使用',
    size: 'medium',
    round: false,
    type: 'error',
    action: 'useCoupon',
    customClass: 'custom-class-mine-error',
  },
])
const cuButton = computed(() => {
  if (isLogined.value) {
    console.log('🍨========', isShare.value)
    if (
      (isShare.value || shareType.value === mainTypeEmums.SHARE_COUPN) &&
      !lqStatus.value &&
      !lqError.value
    ) {
      console.log('🍲')
      return footerBtns1.value
    } else {
      console.log('<<<<<<<<<<<,=========')
      if (lqStatus.value) {
        console.log('🥤,=========')
        return footerBtns3.value
      } else if (lqError.value) {
        return footerBtns2.value
      } else {
        return footerBtns1.value
      }
    }
  } else {
    return footerBtns1.value
  }
})
const handleClose = () => {
  show.value = false
}
const wexinClick = () => {
  if (PLATFORM.platform === 'h5') {
    console.log('🥧')
  } else {
    console.log('🍲')
  }
}

onLoad(async (options) => {
  isShare.value = Number(options.isMain) === 1
  shareType.value = options.type

  couponId.value = options.couponId
  try {
    await sendCouponInfo({ couponCode: options.couponCode, couponId: couponId.value })
    const qrcodeData = {
      couponCode: options.couponCode,
      qrCodeType: Constant.QR_CODE_FLAG,
      actionType: Constant.QR_CODE_PAY,
    }
    cfig.value.str = `${VITE_SERVER_BASEURL}?${qs.stringify(qrcodeData)}`
  } catch (error) {
    couponInfoData.value = {} as conponListProps
    message
      .alert({
        title: '提示',
        msg: error.data?.msg ?? '优惠券不存在!',
        closeOnClickModal: false,
      })
      .then((res) => {
        getBack()
      })
  }
})

// 来自页面内分享按钮
onShareAppMessage((res) => {
  if (res.from === 'button') {
    show.value = false
    const path = sharePath.value + `?type=${mainTypeEmums.SHARE_COUPN}&couponId=${couponId.value}`
    console.log('🍣[path]:', path)
    return {
      title: VITE_APP_LOGOTITLE,
      desc: '我抢到优惠券啦!快来一起抢，名额有限!',
      imageUrl: shareQbg2.value,
      path,
      complete: () => {
        handleClose()
      },
    }
  }
})
</script>

<template>
  <view class="min-h-100vh">
    <dy-navbar leftTitle="优惠券详情" left></dy-navbar>
    <view class="px-15px">
      <view class="isShadow rounded-10px">
        <view class="mx-[-15px]">
          <Coupon-List
            :data="couponInfoData"
            :actionShow="false"
            :isShare="isShare"
            :detil="false"
            @share="share"
          ></Coupon-List>
        </view>

        <view class="pb-30px" v-if="couponInfoData.type === 3 && cfigSatatus && isLogined">
          <view class="py-10px text-16px text-center">券码：{{ couponInfoData.couponCode }}</view>
          <view class="flex justify-center mt-10px flex-col items-center">
            <dy-qrcode ref="qrcode" :option="cfig"></dy-qrcode>
          </view>
        </view>
      </view>
      <!-- <view>
        <dy-wxguanzhu></dy-wxguanzhu>
      </view> -->
      <view>
        <view class="text-14px p-15px mt-20px" v-if="couponInfoData.couponRemark">
          <view class="color-#000 text-16px">使用说明</view>
          <view class="color-#777777 mt-5px">{{ couponInfoData.couponRemark }}</view>
        </view>
      </view>
    </view>
    <view class="fixed bottom-3 left-0 right-0 px-20px">
      <view class="flex gap-15px mt-20px">
        <view class="flex-1" v-for="(item, index) in cuButton" :key="index">
          <wd-button
            :round="item.round"
            block
            :size="item.size"
            :type="item.type"
            :custom-class="item.customClass"
            :plain="item.plain"
            @click="btnClick2(item)"
          >
            {{ item.text }}
          </wd-button>
        </view>
      </view>
    </view>
    <wd-popup
      v-model="show"
      custom-class="custom-class-popup"
      lock-scroll
      position="bottom"
      :safe-area-inset-bottom="true"
      :z-index="100"
      :close-on-click-modal="true"
    >
      <view class="rounded-t-10px overflow-hidden">
        <view class="flex justify-around items-center py-10px px-20px bg-#fff py-20px">
          <!-- #ifdef H5 -->
          <view class="flex justify-center gap-10px items-center" @click="wexinClick">
            <wd-img :src="wx" width="24" height="19"></wd-img>
            <view class="color-#888 text-14px">微信好友</view>
          </view>
          <!--  #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="flex justify-center gap-10px items-center">
            <wd-button class="" type="text" open-type="share">
              <view class="flex justify-center gap-10px items-center">
                <wd-img :src="wx" width="24" height="19"></wd-img>
                <view class="color-#888 text-14px">微信好友</view>
              </view>
            </wd-button>
          </view>
          <!--  #endif -->
          <view class="color-#e8e8e8">|</view>
          <view class="flex justify-center gap-10px items-center" @click="downLoadQrcode">
            <wd-img :src="hb" width="24" height="19"></wd-img>
            <view class="color-#888 text-14px">生成海报</view>
          </view>
        </view>
        <view @click="handleClose" class="py-15px color-#000 text-center bt-1px_#E8E8E8">取消</view>
      </view>
    </wd-popup>
  </view>
  <wd-overlay :show="showHb" :z-index="1000" :close-on-click-modal="false">
    <view class="h-full flex flex-col justify-center items-center bg-#000/30 px-50px box-border">
      <view class="text-right ml-auto mb-10px mx-[-30px]">
        <wd-icon name="error-fill" size="30px" color="#fff" @click="showHbClose"></wd-icon>
      </view>
      <view class="bd-1px_#888 rounded-10px p-5px box-border bg-#fff">
        <image :src="path" mode="widthFix" style="width: 280px; height: 450px"></image>
      </view>
      <!-- #ifdef H5-->
      <view class="w-full mt-20px mx-[-15px]">
        <wd-button
          :round="false"
          block
          size="large"
          type="error"
          custom-class="custom-class-mine-error"
        >
          保存
        </wd-button>
      </view>

      <!-- #endif -->
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
.isShadow {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.11);
}
:deep(.custom-class-popup) {
  @apply overflow-hidden rounded-t-20px;
}
</style>

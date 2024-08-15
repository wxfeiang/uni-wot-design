import { Toast } from './prompt'

/**
 * @description 设置系统剪贴板的内容
 * @param data 需要设置的内容
 * @param showToast 配置是否弹出提示，默认弹出提示
 * @constructor
 */
export const SetClipboardData = (data: string, showToast = true) =>
  new Promise((resolve, reject) => {
    uni.setClipboardData({
      data,
      showToast,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })

/**
 * @description 获取系统剪贴板内容
 * @constructor
 */
export const GetClipboardData = () =>
  new Promise((resolve, reject) => {
    uni.getClipboardData({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })

/**
 * rpx 换算为 px
 * @param upx
 */
export const rpx2px = (upx: number) => {
  return uni.upx2px(upx)
}

/**
 * px 换算为 rpx
 * @param px
 */
export const px2rpx = (px: number) => {
  return px / (uni.upx2px(100) / 100)
}

export const useScancode = () => {
  // 允许从相机和相册扫码
  uni.scanCode({
    success: function (res) {
      console.log('条码类型：' + res.scanType)
      console.log('条码内容：' + res.result)
    },
  })
}
export const startFacialRecognitionVerify = (data) => {
  console.log('🍩[data]:人脸识别参数====', data)
  return new Promise((resolve, reject) => {
    uni.startFacialRecognitionVerify({
      ...data,
      checkAliveType: 1, // 屏幕闪烁(人脸核验的交互方式，默认0,读数字)
      success(res) {
        console.log(res, ' ========') // 认证结果
        if (res.errCode === 0) {
          // 识别成功  这个时候可以调后端的接口 （带着返的res.
          resolve(res)
        } else {
          Toast('识别失败')
        }
      },
      complete(res) {
        console.log(res)
      },
      fail(e) {
        // console.log('err', e) // 失败处理方法
        Toast('识别失败')
      },
    })
  })
}

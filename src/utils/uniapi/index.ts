import { HideLoading, Modal, Toast } from './prompt'
const { VITE_HALF_APPID } = import.meta.env
/**
 * @description: 打开第三方小程序
 * @param {} appId
 * @param {} path
 */
export const openWxChart = (appId: string, path: string, extraData = {}) => {
  return new Promise((resolve, reject) => {
    uni.navigateToMiniProgram({
      appId,
      path,
      extraData, // 需要传递给目标小程序的数据
      envVersion: 'release', // trial
      success(res) {
        // 打开成功
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
/**
 * @description: 打开第三方小程序(半屏)
 * @param {} appId
 * @param {} path
 */
export const openEmbeddedMiniProgram = (path: string, extraData = {}, appId = VITE_HALF_APPID) => {
  return new Promise((resolve, reject) => {
    uni.openEmbeddedMiniProgram({
      appId,
      path,
      extraData, // 需要传递给目标小程序的数据
      // envVersion: 'develop', // trial
      envVersion: 'trial', // develop
      success(res) {
        // 打开成功
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * @description 设置系统剪贴板的内容
 * @param data 需要设置的内容
 * @param showToast 配置是否弹出提示，默认弹出提示
 * @constructor
 */
export const SetClipboardData = (data: string, showToast = true) => {
  return new Promise((resolve, reject) => {
    uni.setClipboardData({
      data,
      success: (res) => {
        resolve(res)
        if (showToast) {
          uni.showToast({
            title: '内容已复制到剪切板!',
            icon: 'none',
          })
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
/**
 * @description 获取系统剪贴板内容
 * @constructor
 */
export const GetClipboardData = () => {
  return new Promise((resolve, reject) => {
    uni.getClipboardData({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        uni.showToast({
          title: '内容获取失败',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

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

/**
 * @description:  扫码
 * @return {}
 */
export const useScancode = (options?: any) => {
  // 允许从相机和相册扫码
  return new Promise((resolve, reject) => {
    uni.scanCode({
      ...options,
      success: function (res) {
        console.log('扫码' + res)
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      },
    })
  })
}
/**
 * @description:  调用人脸识别
 * @param {} data
 * @return {}
 */
export const startFacialRecognitionVerify = (data) => {
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

/**
 * @description: 获取登录凭证（code）
 * @return {}
 */
export const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (wxres) {
        resolve(wxres.code)
      },
      fail: function (err) {
        reject(err)
      },
    })
  })
}

/**
 * @description: 获取当前位置
 * @return {}
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'wgs84', // 返回可以用于uni.openLocation的经纬度，默认为wgs84的gps坐标
      success: (res) => {
        console.log('当前位置的经度：' + res.longitude)
        console.log('当前位置的纬度：' + res.latitude)
        resolve(res)
      },
      fail: (err) => {
        Toast('获取位置失败')
        reject(err)
      },
    })
  })
}

export const useSetScreenBrightness = (value?: number) => {
  return new Promise((resolve, reject) => {
    uni.setScreenBrightness({
      value,
      success: function () {
        resolve('success')
      },
    })
  })
}

export const usegetScreenBrightness = () => {
  return new Promise((resolve, reject) => {
    uni.getScreenBrightness({
      success: function (res) {
        resolve(res.value)
      },
    })
  })
}
export const useSetKeepScreenOn = (flog = false) => {
  // 保持屏幕常亮
  uni.setKeepScreenOn({
    keepScreenOn: flog,
  })
}

/**
 * @description: 保存图片到相册
 * @return {}
 */
export const useSaveImageToPhotosAlbum = (path: string) => {
  uni.downloadFile({
    url: path,
    success: (res) => {
      console.log('🥫[res]:', res)
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            Toast('保存成功', { icon: 'success' })
          },
          fail: function (err) {
            console.log('🍜[err]:', err)
            Toast('保存失败，请稍后重试')
          },
          complete: function () {
            HideLoading()
          },
        })
      }
    },
  })
}
/**
 * @description: 文件下载
 * @return {}
 */

export const downSaveImage = (imgurl: string) => {
  uni.getSetting({
    success(res) {
      console.log('🥨[res]:', res)
      if (res.authSetting['scope.writePhotosAlbum']) {
        // 已授权，直接保存图片
        useSaveImageToPhotosAlbum(imgurl)
      } else if (res.authSetting['scope.writePhotosAlbum'] === false) {
        // 用户已拒绝授权，提示用户授权
        Modal({
          title: '提示',
          content: '您未授权保存图片到相册，是否前往设置页面进行授权？',
          success: function (res) {
            if (res.confirm) {
              uni.openSetting({
                success: function (res) {
                  if (res.authSetting['scope.writePhotosAlbum']) {
                    useSaveImageToPhotosAlbum(imgurl)
                  }
                },
              })
            } else if (res.cancel) {
              Modal({
                title: '您取消了授权',
              })
            }
          },
        })
      } else {
        // 用户第一次调用，调用授权接口
        uni.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            useSaveImageToPhotosAlbum(imgurl)
          },
          fail() {
            Modal({
              title: '授权失败，请稍后重试',
            })
          },
        })
      }
    },
    fail(err) {
      console.log('🍭[err]:', err)
    },
  })
}

/**
 * @description: 小程序调用支付
 * @return {}
 */
interface payProps {
  timeStamp: string
  nonceStr: string
  packageStr: string
  signType: string
  paySign: string
}
export const useRequestPayment = (data: payProps) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment<any>({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.packageStr,
      signType: data.signType,
      paySign: data.paySign,
      success: function (res) {
        console.log('🍥[res]:', res)
        resolve(res)
      },
      fail: function (res) {
        console.log('🍭[res]:', res)
        reject(res)
      },
      complete: function (res) {
        console.log('🍭[res]:', res)
      },
    })
  })
}

export const useToPhone = (e: any) => {
  uni.makePhoneCall({
    phoneNumber: e.phone,
    fail: function (e) {},
  })
}
export const useToLocation = (e: any) => {
  uni.openLocation({
    latitude: e.dimension * 1,
    longitude: e.longitude * 1,
    name: e.name,
    address: e.address,
  })
}

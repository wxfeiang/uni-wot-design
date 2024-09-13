import { Toast } from './prompt'
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
      envVersion: 'develop', // trial
      success(res) {
        // 打开成功
        resolve(res)
      },
      fail: (err) => {
        uni.showToast({
          title: '打开失败',
          icon: 'none',
        })
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
      envVersion: 'develop', // trial
      success(res) {
        // 打开成功
        resolve(res)
      },
      fail: (err) => {
        console.log('🥥[err]:', err)
        uni.showToast({
          title: '打开失败!',
          icon: 'none',
        })
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
      showToast,
      success: (res) => {
        resolve(res)
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
        uni.showToast({
          title: '无法识别此二维码',
          icon: 'none',
        })
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
 * @description: 小程序调用支付
 * @return {}
 */
export const useRequestPayment = (data?: any) => {
  return new Promise((resolve, reject) => {
    uni.requestPayment<any>({
      timeStamp: '1414561699',
      nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
      package: 'prepay_id=wx201410272009395522657a690389285100',
      signType: 'RSA',
      paySign:
        'oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq/xDg==',
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

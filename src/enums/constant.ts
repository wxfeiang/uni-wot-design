export enum Constant {
  TOKEN = 'token',
  // token 时间戳
  TIME_SAMP = 'timeStamp',
  // 超时
  TOKEN_TIMEOUT_VALUE = 2 * 1000 * 3600,
  // 国际化
  LANF = 'language',
  // appkey
  APP_KEY = 'wx', // default

  // terminal
  TERMINAL = 'terminal',

  // 二维码一卡通标志
  QR_CODE_FLAG = 'xaCard',

  // 二维码一卡通支付类型
  QR_CODE_PAY = 'pay',

  // 二维码一卡通核销类型
  QR_CODE_OFF = 'writeOff',
  // 二维码一卡通卡展示类型
  QR_CODE_CARD = 'card',

  // 统一分享基础地址
  MAIN_PATH = 'https://ykt.xionganbc.com/wxcode',

  // 统一小程序入口地址
  MAIN_PAGE = '/pages/pay/mainResult',

  // 优惠券入口地址
  COUPON_PATH = '/pages-sub/marketManager/coupon/coupDeil',

  // 商品详情入口
  GOODS_PATH = '/pages-sub/homeManager/shopInfo',
}

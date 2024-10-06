/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/index/index" |
       "/pages/login/index" |
       "/pages/login/login2" |
       "/pages/login/phoneLogin" |
       "/pages/login/phoneLoginbc" |
       "/pages/login/sfzLogin" |
       "/pages/mine/index" |
       "/pages/pay/index" |
       "/pages/pay/sacnResult" |
       "/pages/serve/index" |
       "/pages/shop/index" |
       "/pages-sub/serveMain/cardApplyFromType" |
       "/pages-sub/serveMain/cardApplyType" |
       "/pages-sub/serveMain/cardFromType" |
       "/pages-sub/serveMain/cardMessType" |
       "/pages-sub/serveMain/jinrongType" |
       "/pages-sub/serveMain/OcrCamera" |
       "/pages-sub/serveMassage/businessOutlets/index" |
       "/pages-sub/serveMassage/messageList/index" |
       "/pages-sub/serveMassage/newsManager/index" |
       "/pages-sub/serveMassage/serchFor/index" |
       "/pages-sub/serveMassage/workGuide/index" |
       "/pages-sub/webView/index" |
       "/pages-sub/system/sysconfig/index" |
       "/pages-sub/system/sysconfig/setting" |
       "/pages-sub/userManager/address/editor" |
       "/pages-sub/userManager/address/list" |
       "/pages-sub/userManager/cardManager/index" |
       "/pages-sub/userManager/collection/collection" |
       "/pages-sub/userManager/collection/follow" |
       "/pages-sub/userManager/SocialSecurityCard/barcode" |
       "/pages-sub/userManager/SocialSecurityCard/index" |
       "/pages-sub/userManager/SocialSecurityCard/indexback" |
       "/pages-sub/userManager/userCenter/massage" |
       "/pages-sub/userManager/userCenter/suggest" |
       "/pages-sub/userManager/userCenter/user" |
       "/pages-sub/marketManager/coupon/coupDeil" |
       "/pages-sub/marketManager/coupon/index" |
       "/pages-sub/marketManager/coupon/mycoupon" |
       "/pages-sub/marketManager/coupon/writeOffCoup" |
       "/pages-sub/marketManager/coupon/writeOffCoupList" |
       "/pages-sub/marketManager/integral/index" |
       "/pages-sub/marketManager/integral/interList" |
       "/pages-sub/marketManager/IntegralMarket/IntegralMarket/buyOrder" |
       "/pages-sub/marketManager/IntegralMarket/IntegralMarket/info" |
       "/pages-sub/marketManager/IntegralMarket/IntegralMarket/list" |
       "/pages-sub/shopManager/addEvaluate" |
       "/pages-sub/shopManager/evaluateList" |
       "/pages-sub/shopManager/index" |
       "/pages-sub/shopManager/shopCode" |
       "/pages-sub/shopManager/shopHome" |
       "/pages-sub/shopManager/shopPayList" |
       "/pages-sub/shopManager/shopPayMingxi" |
       "/pages-sub/order/logistics" |
       "/pages-sub/order/orderInfo" |
       "/pages-sub/order/orderList" |
       "/pages-sub/homeManager/action" |
       "/pages-sub/homeManager/gongjiaochuxing" |
       "/pages-sub/homeManager/goodsSearch" |
       "/pages-sub/homeManager/mafuwu" |
       "/pages-sub/homeManager/order" |
       "/pages-sub/homeManager/shopCar" |
       "/pages-sub/homeManager/shopInfo";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "/pages/index/index" | "/pages/serve/index" | "/pages/shop/index" | "/pages/mine/index"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}

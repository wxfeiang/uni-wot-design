import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import path from 'node:path'
import { loadEnv } from 'vite'
const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd(), 'env'))

const { VITE_APP_LOGOTITLE } = env
export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: VITE_APP_LOGOTITLE,
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
      '^dy-(.*)': 'components/dy-$1/dy-$1.vue',
    },
  },
  tabBar: {
    color: '#000000',
    selectedColor: '#3177f6',
    backgroundColor: '#fff',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/index.png',
        selectedIconPath: 'static/tabbar/index-a.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/fuwu.png',
        selectedIconPath: 'static/tabbar/fuwu-a.png',
        pagePath: 'pages/serve/index',
        text: '服务',
      },
      {
        iconPath: 'static/tabbar/shop.png',
        selectedIconPath: 'static/tabbar/shop-a.png',
        pagePath: 'pages/shop/action',
        text: '商城',
      },
      {
        iconPath: 'static/tabbar/mine.png',
        selectedIconPath: 'static/tabbar/mine-a.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
})

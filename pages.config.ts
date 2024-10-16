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
})

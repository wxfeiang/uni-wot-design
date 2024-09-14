import { getMessageList } from '@/service/api/source'
import { routeTo } from '@/utils'
import { useRequest } from 'alova/client'
import { bannerProps, messProps } from './types'

import zhenwufuwu from '@/static/images/index/1.png'
import jiaotongchuxing from '@/static/images/index/2.png'
import jiyyigouyao from '@/static/images/index/3.png'
import daiyufafang from '@/static/images/index/4.png'
import jinrongruwu from '@/static/images/index/5.png'
import wenhuatiyan from '@/static/images/index/6.png'
import lvyouguanguang from '@/static/images/index/7.png'
import jinxonghutong from '@/static/images/index/8.png'

import kfw from '@/static/images/index/kfw.png'
import saoyisao from '@/static/images/index/saoyisao.png'
import xabc from '@/static/images/index/xabc.png'
import xajft from '@/static/images/index/xajft.png'
const topAction = ref([
  // {
  //   icon: dzsbk,
  //   text: '电子社保卡',
  //   type: 'router',
  //   path: '/pages-sub/userManager/SocialSecurityCard/index',
  // },
  {
    icon: saoyisao,
    text: '扫一扫',
    type: 'sacn',
  },
  {
    icon: xajft,
    text: '雄安缴费通',
    type: 'wxChart',
    appId: 'wx0f343dd3b89d6f07', // 填入目标小程序的 appId
    path: 'pages/index/index',
  },
  {
    icon: xabc,
    text: '雄安乐泊',
    type: 'wxChart',
    appId: 'wx6d1780b8d016147c', // 填入目标小程序的 appId
    path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
  },
  {
    icon: kfw,
    text: '卡服务',
    type: 'switchTab',
    path: '/pages/serve/index',
    active: 0,
  },
])

const bannerUrl = 'https://oss.xay.xacloudy.cn'
const swiperList = ref<bannerProps[]>([
  {
    id: '1',
    path: '/pages-sub/serveMain/cardApplyType',
    title: '社保卡申领',
    description: '',
    islink: true,
    image:
      bannerUrl +
      '/images/2024-09/cd5ea186-5790-4381-af88-e885ba51368c1725327394702-c3cb364e-544b-41d4-97d2-1c4daf1f4b7e.png',
    type: 'router',
    data: { base: 'shebaoksl', title: '社保卡申领' },
  },
  {
    id: '1710488285782016007',
    path: '/pages-sub/webView/index',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl +
      '/images/2024-09/6e17d89a-f218-4cba-a2b2-22849173a2381725172128186-2ab9df4e-54db-4228-ab3a-f93f5a9c7f59.png',
    type: 'article',
  },
  {
    id: '1710488285782016008',
    path: '/pages-sub/webView/index',
    title: 'title1',
    description: '',
    islink: true,
    image:
      bannerUrl +
      '/images/2024-09/741122e4-fb69-4ec6-8d11-b86894bfc4a81725172156390-21e78f8b-2791-4cc1-b8ff-1b01c015058e.png',
    type: 'article',
  },
])
const serviceArea = ref([
  {
    title: '政务服务',
    icon: zhenwufuwu,
    bgcolor: 'linear-gradient( 180deg, #FFE8E8 0%, #FFCCCC 100%);',
    iconbg: '#D84D4C',
    path: '/pages-sub/webView/index',
    id: '1710488285782016016',
  },
  {
    title: '交通出行',
    icon: jiaotongchuxing,
    bgcolor: 'linear-gradient( 180deg, #F2FBF8 0%, #E6F8F0 100%);',
    iconbg: '#78CEA8',
    path: '/pages-sub/webView/index',
    id: '1710488285782016010',
  },
  {
    title: '就医购药',
    icon: jiyyigouyao,
    bgcolor: 'linear-gradient( 180deg, #D1F2FF 0%, #E2F1FF 100%);',
    iconbg: '#46ABFF',
    path: '/pages-sub/webView/index',
    id: '1710488285782016013',
  },
  {
    title: '待遇发放',
    icon: daiyufafang,
    bgcolor: 'linear-gradient( 180deg, #FEFCF4 0%, #FFE3CE 100%);',
    iconbg: '#FC9559',
    path: '/pages-sub/webView/index',
    id: '1710488285782016009',
  },
  {
    title: '金融服务',
    icon: jinrongruwu,
    bgcolor: 'linear-gradient( 180deg, #FEFCF1 0%, #FFEA98 100%);',
    iconbg: '#F1C63A',
    path: '/pages-sub/webView/index',
    id: '1710488285782016011',
  },
  {
    title: '文化体验',
    icon: wenhuatiyan,
    bgcolor: 'linear-gradient( 180deg, #EFF4FE 0%, #CAE4FD 100%);',
    iconbg: '#2994FF',
    path: '/pages-sub/webView/index',
    id: '1710488285782016015',
  },
  {
    title: '旅游观光',
    icon: lvyouguanguang,
    bgcolor: 'linear-gradient( 180deg, #FEEEEF 0%, #FDC9C9 100%);',
    iconbg: '#F24848',
    path: '/pages-sub/webView/index',
    id: '1710488285782016014',
  },
  {
    title: '京雄互通',
    icon: jinxonghutong,
    bgcolor: 'linear-gradient( 180deg, #D8DAFF 0%, #DDE0FA 100%);',
    iconbg: '#5339FF',
    path: '/pages-sub/webView/index',
    id: '1710488285782016012',
  },
])
// 消息列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
  loading: messageLoading,
} = useRequest((data) => getMessageList(data), {
  immediate: false,
  loading: false,
  initialData: [],
})

function messageClick(item: messProps) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: { type: item.articleId },
  })
}
export default () => {
  return {
    messageData,
    messageClick,
    sendMessageList,
    messageLoading,
    swiperList,
    serviceArea,
    topAction,
  }
}

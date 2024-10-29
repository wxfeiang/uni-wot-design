import { getMessageList, getSpecialTypeList } from '@/service/api/source'
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
import dzsbk from '@/static/images/index/dzsbk.png'

import { getActivityList } from '@/service/api/shop'
import { List } from '@/service/model/baseModel'
import kfw from '@/static/images/index/kfw.png'
import mfw from '@/static/images/index/mfw.png'
import saoyisao from '@/static/images/index/saoyisao.png'

const topAction = ref([
  // {
  //   icon: jtcx,
  //   text: '公交出行',
  //   type: 'router',
  //   path: '/pages-sub/userManager/transit/index', // 打开的页面路径，如果为空则打开首页
  // },
  // {
  //   icon: xajft,
  //   text: '雄安缴费通',
  //   type: 'wxChart',
  //   appId: 'wx0f343dd3b89d6f07', // 填入目标小程序的 appId
  //   path: 'pages/index/index',
  // },
  // {
  //   icon: xabc,
  //   text: '雄安乐泊',
  //   type: 'wxChart',
  //   appId: 'wx6d1780b8d016147c', // 填入目标小程序的 appId
  //   path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
  // },
  {
    icon: kfw,
    text: '社保卡服务',
    type: 'switchTab',
    path: '/pages/serve/index',
    active: 0,
  },
  {
    icon: dzsbk,
    text: '电子社保卡',
    type: 'router',
    path: '/pages-sub/userManager/SocialSecurityCard/indexback',
  },

  {
    icon: saoyisao,
    text: '扫一扫',
    type: 'sacn',
  },
  {
    icon: mfw,
    text: '一码办事',
    type: 'router',
    path: '/pages-sub/userManager/codeServe/index',
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
    path: '/pages-sub/serveMassage/zhwuServe/index',
    id: '1710488285782016016',
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/b797aa2c-93ff-4eb7-bf89-10c6a974111f1.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/606b8995-655e-4121-b793-fc8ef33bfc57政务服务.png',
    stext: 'GOVERNMENT AFFAIRS',
  },
  {
    title: '交通出行',
    icon: jiaotongchuxing,
    bgcolor: 'linear-gradient( 180deg, #F2FBF8 0%, #E6F8F0 100%);',
    iconbg: '#78CEA8',
    path: '/pages-sub/serveMassage/jiaotong/index',
    id: '1710488285782016010',
    height: 10,
    width: 33,
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/368b8902-aba2-4378-8f0c-fb8a1007c00c交通出行.png',
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/0b6d3a43-0825-4787-ab18-a901169cb3f42.png',
    stext: 'TRAFFIC',
  },
  {
    title: '就医购药',
    icon: jiyyigouyao,
    bgcolor: 'linear-gradient( 180deg, #D1F2FF 0%, #E2F1FF 100%);',
    iconbg: '#46ABFF',
    path: '/pages-sub/serveMassage/yiyao/index',
    id: '1710488285782016013',
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/67a7f9f6-eb4b-441c-b1de-42c27cf430d43.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/68fe5b58-0339-45d4-a32c-a77945ebf8f1就医购药.png',
    stext: 'BUYING  SERVEMEDICINE',
  },
  {
    title: '旅游观光',
    icon: lvyouguanguang,
    bgcolor: 'linear-gradient( 180deg, #FEEEEF 0%, #FDC9C9 100%);',
    iconbg: '#F24848',
    path: '/pages-sub/serveMassage/travel/index',
    id: '1710488285782016014',
    height: 10,
    width: 33,
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/b04a69cb-455a-4728-a637-3fe79a7072bb7.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/01c01602-7ba0-4990-bf6d-b14ef868b76d旅游观光.png',
    stext: 'TOURISM_AND SIGHTSEEING',
  },

  {
    title: '文化体验',
    icon: wenhuatiyan,
    bgcolor: 'linear-gradient( 180deg, #EFF4FE 0%, #CAE4FD 100%);',
    iconbg: '#2994FF',
    path: '/pages-sub/serveMassage/wenhuaServe/index',
    id: '1710488285782016015',
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/9c94efdf-dbad-4a13-8c06-e9576f840d4aWechatIMG407.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/642c0e30-27de-4071-b44f-c78f55c66e19文化体验.png',
    stext: 'CULTURAL EXPERIENCE',
  },

  {
    title: '惠民服务',
    icon: jinrongruwu,
    bgcolor: 'linear-gradient( 180deg, #FEFCF1 0%, #FFEA98 100%);',
    iconbg: '#F1C63A',
    path: '/pages-sub/serveMassage/huimingServe/index',
    id: '1710488285782016011',
    height: 10,
    width: 33,
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/a91456af-74e2-4261-818a-e1561e1959315.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/0b560526-9f44-4431-9d66-d6a31d5473d2惠民服务.png',
    stext: 'HUIMIN SERVICE',
  },

  {
    title: '待遇发放',
    icon: daiyufafang,
    bgcolor: 'linear-gradient( 180deg, #FEFCF4 0%, #FFE3CE 100%);',
    iconbg: '#FC9559',
    path: '/pages-sub/webView/index',
    id: '1710488285782016009',
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/005b21d2-9c79-4912-935e-b7d977b43b014.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/42e5430c-be51-4da1-ba99-e10963deb63a待遇发放.png',
    stext: 'SALARY DISTRIBUTION',
  },
  {
    title: '京雄互通',
    icon: jinxonghutong,
    bgcolor: 'linear-gradient( 180deg, #D8DAFF 0%, #DDE0FA 100%);',
    iconbg: '#5339FF',
    path: '/pages-sub/webView/index',
    id: '1710488285782016012',
    texticon:
      'https://oss.xay.xacloudy.cn/images/2024-10/f1a997ca-99b0-4388-ba4d-d62816b4a03c8.png',
    bgimg:
      'https://oss.xay.xacloudy.cn/images/2024-10/d2a908e0-bdb6-4789-8399-80d6dab41cf8京雄互通.png',
    stext: 'JINGXIONG INTERCHANGE',
  },
])

// 轮播图
const {
  send: sendSwiperList,
  data: swiperListData,
  loading: swiperListLoading,
} = useRequest((data) => getActivityList<List>(data), {
  immediate: false,
  loading: true,
  initialData: [] as List[],
})

// 文章列表
const {
  send: sendMessageList,
  data: messageData,
  onSuccess: messageSucess,
  loading: messageLoading,
} = useRequest((data) => getMessageList<List>(data), {
  immediate: false,
  loading: false,
  initialData: [],
})

function messageClick(item: messProps) {
  routeTo({
    url: '/pages-sub/webView/index',
    data: {
      type: item.articleId,
      showType: item.linkType === '1' ? 'webView' : '',
      url: item.linkUrl,
    },
  })
}

const {
  send: sendGetSpecialTypeList,
  data: specialTypeList,
  loading: specialTypeLoading,
} = useRequest((params) => getSpecialTypeList<List>(params), {
  immediate: false,
  loading: false,
})
const specialTypeskeleton = ref([
  [
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
    { width: '48px', height: '48px' },
  ],
  [
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
    { width: '48px', height: '16px' },
  ],
])

export default () => {
  return {
    messageData,
    messageClick,
    sendMessageList,
    messageLoading,
    swiperList,
    serviceArea,
    topAction,

    sendGetSpecialTypeList,
    specialTypeList,
    specialTypeLoading,
    specialTypeskeleton,
    sendSwiperList,
    swiperListData,
    swiperListLoading,
  }
}

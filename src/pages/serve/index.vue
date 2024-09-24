<route lang="json5" type="page">
{
  needLogin: true,
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { routeTo } from '@/utils'

import shebaok from '@/static/images/serve/shebaok.png'
import shebaokbh from '@/static/images/serve/shebaokbh.png'
import shebaoksl from '@/static/images/serve/shebaoksl.png'

import kaguas from '@/static/images/serve/kaguas.png'
import kajiegua from '@/static/images/serve/kajiegua.png'
import kajindu from '@/static/images/serve/kajindu.png'

import kabase from '@/static/images/serve/kabase.png'

import jiaofeitong from '@/static/images/serve/jiaofeitong.png'
import kabiangeng from '@/static/images/serve/kabiangeng.png'
import mimachongzhi from '@/static/images/serve/mimachongzhi.png'
import xionganlebo from '@/static/images/serve/xionganlebo.png'

import { useBaseStore } from '@/store/modules/base'
import { openWxChart } from '@/utils/uniapi'
import { useToast } from 'wot-design-uni'
import { getRect, isArray } from 'wot-design-uni/components/common/util'

const bg = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/21c5af79-c081-48d8-8e4b-18f406d52b25serbg.png',
)
const dyheight = ref('100%')
const toast = useToast()
const basestore = useBaseStore()
const mainData1 = ref([
  {
    title: '社保卡申领',
    icon: 'card',
    url: shebaoksl,
    type: '2',
    base: 'shebaoksl',
  },
  {
    title: '社保卡补换',
    icon: 'order',
    url: shebaokbh,
    type: '2',
    base: 'shebaokbh',
  },
  {
    title: '制卡进度查询',
    base: 'kajindu',
    url: kajindu,
    type: '3',
  },
  // {
  //   title: '未成年人申领',
  //   icon: 'star',
  //   url: xinshenersl,
  //   type: '2',
  //   base: 'xinshenersl',
  // },
  // {
  //   title: '未成年人申领查询',
  //   icon: 'coupon',
  //   url: xinshengrq,
  // },
  {
    title: '社保卡启用',
    icon: 'coupon',
    url: shebaok,
    type: '3',
    base: 'cardSocialActive',
  },
  {
    title: '社保卡挂失',
    icon: 'coupon',
    url: kaguas,
    type: '3',
    base: 'cardLoss',
  },
  {
    title: '社保卡解挂',
    icon: 'kajiegua',
    url: kajiegua,
    type: '3',
    base: 'unboxingInfo',
  },
])

const mainData2 = ref([
  {
    title: '基础信息查询',
    icon: 'coupon',
    url: kabase,
    type: '1',
    base: 'cardBaseInfo',
  },
  // {
  //   title: '服务密码修改',
  //   icon: 'coupon',
  //   url: mimaxiugai,
  //   type: '3',
  //   base: 'changeCardPwd',
  // },
  {
    title: '社保信息变更',
    icon: 'coupon',
    url: kabiangeng,
    type: '3',
    base: 'cardChange',
  },
  {
    title: '服务密码管理',
    icon: 'coupon',
    url: mimachongzhi,
    type: '3',
    base: 'changeCardPwd',
  },
])

const mainData3 = ref([
  {
    title: '雄安乐泊',
    icon: 'coupon',
    url: xionganlebo,
    type: '4',
    base: '',
    appId: 'wx6d1780b8d016147c', // 填入目标小程序的 appId
    path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
  },
  {
    title: '雄安缴费通',
    icon: 'coupon',
    url: jiaofeitong,
    type: '4',
    base: '',
    appId: 'wx0f343dd3b89d6f07', // 填入目标小程序的 appId
    path: 'pages/index/index',
  },
])

function gridClick(item: any) {
  const { base, title } = item

  if (item.type === '1') {
    routeTo({
      url: '/pages-sub/serveMain/cardMessType',
      data: { base, title },
    })
  } else if (item.type === '2') {
    routeTo({ url: '/pages-sub/serveMain/cardApplyType', data: { base, title } })
  } else if (item.type === '3') {
    routeTo({ url: '/pages-sub/serveMain/cardFromType', data: { base, title } })
  } else if (item.type === '4') {
    openWxChart(item.appId, item.path)
  } else {
    toast.show('功能开发中，敬请期待!...')
  }
}

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])
const scrollIntoViewId = ref('id1')

const categories = ref([
  {
    label: '社保卡申领',
    title: '标题一',
    icon: 'thumb-up',
    items: mainData1.value,
  },
  {
    label: '社保卡服务',
    title: '标题二',
    icon: 'qrcode',
    items: mainData2.value,
  },
  {
    label: '生活服务',
    title: '标题三',
    icon: 'location',
    items: mainData3.value,
  },
])

function handleChange({ value }) {
  // console.log('🍬[value]:', value)
  if (value === 1 || value === 2) {
    dyheight.value = '38%'
  }
  if (value === 0) {
    dyheight.value = '100%'
  }
  setTimeout(() => {
    active.value = value
    scrollTop.value = itemScrollTop.value[value]
    scrollIntoViewId.value = 'id3'
  }, 100)
}

function onScroll(e) {
  const { scrollTop } = e.detail
  // console.log('🥚[scrollTop]:', scrollTop)
  if (scrollTop < itemScrollTop.value[active.value]) {
    dyheight.value = '100%'
  }
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    dyheight.value = '100%'
    return
  }
  const index = itemScrollTop.value.findIndex(
    (top) => top > scrollTop && top - scrollTop <= threshold,
  )
  if (index > -1) {
    active.value = index
  }
}

onShow((options: any) => {
  active.value = basestore.active
})

onMounted(() => {
  getRect('.category', true).then((rects) => {
    console.log('🍾[rects]:', rects)
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top - 210 || 0)
      scrollTop.value = rects[active.value].top - 210 || 0
    }
  })
})
</script>

<template>
  <view
    class="wraper bg-#F2F3F7 box-border overflow-hidden! bg-no-repeat"
    :style="`background-image: url(${bg}) ;background-size: 100% 250px`"
  >
    <wd-sidebar v-model="active" @change="handleChange" customClass="customClass-warp">
      <wd-sidebar-item
        v-for="(item, index) in categories"
        :key="index"
        :value="index"
        :label="item.label"
        customClass="customClass"
      />
    </wd-sidebar>
    <view class="flex-1 h-60% bg-#fff mt-190px mr-10px rounded-10px mb-20px">
      <scroll-view
        class="content"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        :throttle="false"
        @scroll="onScroll"
      >
        <view v-for="(item, index) in categories" :key="index" class="category" :id="'id' + index">
          <view class="pl-10px">
            <dy-title
              :title="item.label"
              class="pl-10px mb-0! py-10px"
              customClass="customClass-title"
            ></dy-title>
          </view>

          <wd-grid :column="3" clickable>
            <wd-grid-item
              use-icon-slot
              use-text-slot
              v-for="(cell, index) in item.items"
              :key="index"
              custom-class="grid-item"
              @itemclick="gridClick(cell)"
            >
              <template #icon>
                <image class="wh-42px rounded-10px" :src="cell.url" />
              </template>
              <template #text>
                <view class="text-center py-15px color-#7B838D">{{ cell.title }}</view>
              </template>
            </wd-grid-item>
          </wd-grid>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}

:deep(.wd-grid-item) {
  @apply justify-start! py-1px!;
}
:deep(.wd-grid-item__content) {
  @apply py-1px!;
}
:deep(.wd-sidebar) {
  @apply bg-#F2F3F7!;
}
:deep(.wd-sidebar-item--active) {
  @apply color-#2D69EF;
  background: linear-gradient(270deg, #f2f3f7 0%, #d1e8ff 100%) !important;
  border-radius: 0px 10px 0px 0px !important;
}
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
.content {
  box-sizing: border-box;
  flex: 1;
  height: v-bind(dyheight);
  // padding-top: 10px;
  // // margin-top: 190px;
  // margin-right: 10px;
  // margin-bottom: 30px;
  // background: #fff;
  // border-radius: 0 10px 10px 0;
  // box-shadow: 0px 0px 12px 1px rgba(114, 114, 114, 0.08);
}

:deep(.customClass-warp) {
  @apply mt-190px;
}
:deep(.customClass) {
  @apply text-12px!;
}
:deep(.customClass-title) {
  text {
    @apply font-400! text-14px!;
  }
}
</style>

<route lang="json5" type="page">
{
  needLogin: true,
  layout: 'default',
  style: {
    navigationBarTitleText: '服务中心',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
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
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}

function onScroll(e) {
  const { scrollTop } = e.detail
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
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
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0)
      scrollTop.value = rects[active.value].top || 0
    }
  })
})
</script>

<template>
  <view class="wraper">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in categories"
        :key="index"
        :value="index"
        :label="item.label"
        customClass="customClass"
      />
    </wd-sidebar>
    <scroll-view
      class="content"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      :throttle="false"
      @scroll="onScroll"
    >
      <view v-for="(item, index) in categories" :key="index" class="category">
        <dy-title :title="item.label" class="py-4px pl-10px"></dy-title>
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
              <view class="text-center mt-5px">{{ cell.title }}</view>
            </template>
          </wd-grid-item>
        </wd-grid>
        <wd-gap height="6" bg-color="#f5f5f5"></wd-gap>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply size-auto!;
}

:deep(.wd-grid-item) {
  @apply justify-start!;
}

.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}

.content {
  flex: 1;
  background: #fff;
}

:deep(.customClass) {
  @apply text-12px!;
}
</style>

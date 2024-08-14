<route lang="json5" type="page">
{
  needLogin: true,
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
import xinshenersl from '@/static/images/serve/xinshenersl.png'

import kaguas from '@/static/images/serve/kaguas.png'
import kajindu from '@/static/images/serve/kajindu.png'
import mimaxiugai from '@/static/images/serve/mimaxiugai.png'

import kabase from '@/static/images/serve/kabase.png'

import xinshengrq from '@/static/images/serve/xinshengrq.png'

import kabiangeng from '@/static/images/serve/kabiangeng.png'
import mimachongzhi from '@/static/images/serve/mimachongzhi.png'

import { useBaseStore } from '@/store/modules/base'
import { getRect, isArray } from 'wot-design-uni/components/common/util'

const basestore = useBaseStore()
const mainData = ref([
  {
    title: '社保卡申领',
    icon: 'card',
    url: shebaoksl,
    type: '1',
    base: 'shebaoksl',
  },
  {
    title: '社保卡补换',
    icon: 'order',
    url: shebaokbh,
    type: '3',
  },
  {
    title: '未成年人申领',
    icon: 'star',
    url: xinshenersl,
    type: '4',
  },
  {
    title: '未成年人申领查询',
    icon: 'coupon',
    url: xinshengrq,
    type: '5',
  },
  {
    title: '社保卡挂失',
    icon: 'coupon',
    url: kaguas,
  },
  {
    title: '卡进度查询',
    base: 'kajindu',
    url: kajindu,
    type: '1',
  },
  {
    title: '社保卡激活',
    icon: 'coupon',
    url: shebaok,
  },
  {
    title: '基础信息查询',
    icon: 'coupon',
    url: kabase,
    type: '1',
    base: 'cardBaseInfo',
  },
  {
    title: '服务密码修改',
    icon: 'coupon',
    url: mimaxiugai,
  },
  {
    title: '社保信息变更',
    icon: 'coupon',
    url: kabiangeng,
  },
  {
    title: '服务密码重置',
    icon: 'coupon',
    url: mimachongzhi,
  },
])

function gridClick(item: any) {
  const { base, title } = item
  console.log('🍓[base, title ]:', base, title)
  if (item.type === '1') {
    routeTo({
      url: '/pages-sub/serveMain/cardMessType',
      data: { base, title },
    })
  } else if (item.type === '2') {
    routeTo({ url: '/pages-sub/serveMain/cardApplyType', data: { base, title } })
  } else {
    routeTo({ url: '/pages-sub/serveMain/cardFromType', data: { base, title } })
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
    items: mainData.value.slice(0, 5),
  },
  {
    label: '社保卡服务',
    title: '标题二',
    icon: 'qrcode',
    items: mainData.value.slice(5, 12),
  },
  // {
  //   label: '生活缴费',
  //   title: '标题三',
  //   icon: 'location',
  //   items: mainData.value.slice(12, 20),
  // },
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
onLoad((options: any) => {
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
        <dy-title :title="item.label" class="py-8px pl-10px"></dy-title>
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
              <view class="text-center mt-10px">{{ cell.title }}</view>
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

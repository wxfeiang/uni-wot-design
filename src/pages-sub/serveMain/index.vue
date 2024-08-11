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

import cardUrl from './static/images/more.png'

import { getRect, isArray } from 'wot-design-uni/components/common/util'

const mainData = ref([
  {
    title: '社保卡申领',
    icon: 'card',
    url: cardUrl,
  },
  {
    title: '社保卡补换',
    icon: 'order',
    url: cardUrl,
  },
  {
    title: '新生儿申领',
    icon: 'star',
    url: cardUrl,
  },
  {
    title: '卡挂失',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '卡进度查询',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '密码修改',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '卡基础信息',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '卡解卦',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '卡信息变更',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '新生儿申领查询',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '社保卡启用',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '密码重置',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '看病',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '出行',
    icon: 'coupon',
    url: cardUrl,
  },
])

function gridClick(item: any) {
  console.log('🍝')
  if (item.title === '申请') {
    routeTo({ url: '/pages-sub/serveMain/cardApplyType' })
  } else {
    routeTo({ url: '/pages-sub/serveMain/cardFromType' })
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
    items: mainData.value.slice(0, 3),
  },
  {
    label: '社保卡服务',
    title: '标题二',
    icon: 'qrcode',
    items: mainData.value.slice(3, 12),
  },
  {
    label: '生活缴费',
    title: '标题三',
    icon: 'location',
    items: mainData.value.slice(12, 20),
  },
])

onMounted(() => {
  getRect('.category', true).then((rects) => {
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0)
      scrollTop.value = rects[active.value].top || 0
    }
  })
})

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
            @itemclick="gridClick(item)"
          >
            <template #icon>
              <image class="wh-42px rounded-10px" :src="cell.url" />
            </template>
            <template #text>
              <view class="text-center mt-10px">{{ cell.title }}</view>
            </template>
          </wd-grid-item>
        </wd-grid>
        <wd-gap bg-color="#f5f5f5"></wd-gap>
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

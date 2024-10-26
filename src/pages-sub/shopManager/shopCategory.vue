<route lang="json5" type="page">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getGoodType } from '@/service/api/shop'
import { routeTo } from '@/utils'
import { useUserStore } from '@/store'
import { Modal } from '@/utils/uniapi/prompt'
import { getRect, isArray } from '../../../node_modules/wot-design-uni/components/common/util'

const userStore = useUserStore()

const active = ref<number>(1)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const categories = ref([])

onLoad(async () => {
  const res = await getGoodType()
  categories.value = res
})

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
  <dy-navbar leftTitle="全部分类" left></dy-navbar>
  <view class="wraper">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in categories"
        :key="index"
        :value="index"
        :label="item.title"
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
        <wd-cell-group :title="item.title" border>
          <wd-cell
            clickable
            v-for="(cell, index) in item.items"
            :key="index"
            :title="cell.name"
            @click="gopath('/pages-sub/shopManager/shopList?type=8')"
          >
            <wd-icon name="arrow-right" size="18px" color="#cecece"></wd-icon>
          </wd-cell>
        </wd-cell-group>
      </view>
    </scroll-view>
  </view>
</template>

<style>
.content {
  flex: 1;
  background: #fff;
}

.wraper {
  display: flex;
}
:deep(.wd-cell__wrapper) {
  padding-left: 20px;
}
:deep(.wd-cell-group__title) {
  color: #7f7f7f;
}
</style>

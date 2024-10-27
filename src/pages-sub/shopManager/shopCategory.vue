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
import { getGoodList, getGoodType } from '@/service/api/shop'
import { routeTo } from '@/utils'
import { useUserStore } from '@/store'
import { Modal } from '@/utils/uniapi/prompt'
import { getRect, isArray } from '../../../node_modules/wot-design-uni/components/common/util'

const userStore = useUserStore()

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])
const TypeList = ref([])

function gopath(url, e) {
  routeTo({
    url,
    data: e,
  })
}

const getUrl = (str) => {
  if (str) {
    return JSON.parse(str)[0].data
  } else {
    return ''
  }
}

async function getTypeLsit(Code) {
  const res: any = await getGoodList({
    page: 1,
    size: 5,
    status: 1,
    firstCategoryId: Code,
  })

  TypeList.value = res.content
}

const categories = ref([])

onLoad(async () => {
  const res = await getGoodType()
  categories.value = res
  getTypeLsit(categories.value[0].label)
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
  getTypeLsit(categories.value[active.value].label)
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
  <view class="flex flex-col justify-between" style="height: 100vh">
    <dy-navbar leftTitle="全部分类" left></dy-navbar>
    <view class="wraper" style="flex: 1">
      <wd-sidebar v-model="active" @change="handleChange">
        <wd-sidebar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="index"
          :label="item.title"
        />
      </wd-sidebar>
      <scroll-view class="content" scroll-y scroll-with-animation :throttle="false">
        <view
          class="category"
          v-if="categories[active].items && categories[active].items.length > 0"
        >
          <wd-img
            width="100%"
            mode="widthFix"
            :src="categories[active].pic"
            radius="5"
            custom-style="max-height:22vw"
          />

          <wd-grid :column="3" custom-class="mb-4" clickable>
            <template v-for="(cell, ind) in categories[active].items" :key="ind">
              <wd-grid-item
                use-icon-slot
                :text="cell.name"
                icon-size="50px"
                @itemclick="gopath('/pages-sub/shopManager/shopList?type=8&code=' + cell.code)"
              >
                <template #icon>
                  <wd-img width="50" height="50" :src="cell.bannerPic" radius="5" />
                </template>
              </wd-grid-item>
            </template>
          </wd-grid>

          <wd-text text="推荐好物" custom-class="mx-2 mb-4" color="#333" size="16px"></wd-text>

          <view class="w-full box-border my-4">
            <view
              class="flex w-full px-10px box-border mb-10px bg-#fff border-rd-6px"
              v-for="item in TypeList"
              :key="item.spuId"
              @click="routeTo({ url: '/pages-sub/homeManager/shopInfo', data: { id: item.spuId } })"
            >
              <wd-img
                :width="86"
                :height="86"
                :src="getUrl(item.saleUrl)"
                custom-style="border-radius: 5px ;overflow: hidden;"
              />
              <div class="flex-1 ml-15px flex flex-col justify-between">
                <view class="w-full name listname float-left">
                  <text class="ZYtag" v-if="item.shopName === '数城科技'">自营</text>
                  {{ item.spuName }}
                </view>

                <view class="flex justify-between">
                  <view>
                    <text style="font-size: 12px; color: #f44d24">￥</text>
                    <text style="font-size: 16px; font-weight: 600; color: #f44d24">
                      {{ item.sellPrice }}
                    </text>
                  </view>

                  <view
                    class="w-23px h-23px bg-#FFECE8 flex items-center justify-center border-rd-50px mr-2"
                  >
                    <wd-icon name="cart" size="16px" color="#F44D24"></wd-icon>
                  </view>
                </view>
              </div>
            </view>
          </view>
        </view>
        <view v-else class="p-4 flex justify-between box-border items-center empty">暂无分类</view>
      </scroll-view>
    </view>
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

:deep(.wd-sidebar-item) {
  font-size: 14px !important;
}

:deep(.wd-sidebar-item--active) {
  font-size: 16px !important;
  font-weight: normal !important;
}

:deep(.wd-cell-group__left:before) {
  display: inline-block;
  width: 15px;
  margin-right: 5px;
  font-family: 'wd-icons' !important;
  color: #7f7f7f !important;
  text-align: left;
  content: '\e6bc';
}

.listname {
  height: 48px;
  line-height: 24px;
}

.caricon {
  position: relative;
  margin-left: 16px;
}

.name {
  display: -webkit-box;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.ZYtag {
  padding: 2px 5px;
  margin-top: -1px;
  margin-right: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  background: #f54e24;
  border-radius: 3px;
}

:deep(.wd-cell__wrapper) {
  margin-left: 20px !important;
}

:deep(.wd-cell-group__title) {
  font-size: 14px !important;
  color: #7f7f7f !important;
}

.empty {
  display: block;
  width: 100%;
  padding-top: 50px;
  font-size: 14px;
  color: #cecece;
  text-align: center;
}

:deep(.wraper) {
  height: 100% !important;
  background: #f7f8fa;
}
</style>

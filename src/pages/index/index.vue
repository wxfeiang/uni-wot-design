<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
defineOptions({
  name: 'Index',
})

const topAction = ref([
  {
    icon: 'home',
    text: '扫一扫',
  },
  {
    icon: 'search',
    text: '收付款',
  },
  {
    icon: 'plus',
    text: '出行',
  },
  {
    icon: 'user',
    text: '卡服务',
  },
])

const cardUrl = ref('https://cdn.uviewui.com/uview/demo/upload/positive.png')

const mainData = ref([
  {
    title: '我的卡包',
    icon: 'card',
    url: cardUrl,
  },
  {
    title: '我的订单',
    icon: 'order',
    url: cardUrl,
  },
  {
    title: '我的收藏',
    icon: 'star',
    url: cardUrl,
  },
  {
    title: '我的优惠券',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '我的优惠券',
    icon: 'coupon',
    url: cardUrl,
  },
  {
    title: '我的优惠券',
    icon: 'coupon',
    url: cardUrl,
  },
])

const msg = ref([
  {
    title: '消息',
    content: '一卡通要上岸了,一卡通要上岸了,一卡通要上岸了',
    isRead: false,
    url: '',
  },
  {
    title: '消息',
    isRead: true,
    content: '一卡通要上岸了,一卡通要上岸了,一卡通要上岸了',
    url: '',
  },
])
</script>
<template>
  <!-- 顶部 -->
  <view class="bg-blue">
    <wd-navbar safeAreaInsetTop placeholder></wd-navbar>
    <wd-search placeholder-left placeholder="请输入关键词搜索" hide-cancel disabled light />
    <view class="p-10px flex justify-between">
      <view
        v-for="(item, index) in topAction"
        :key="index"
        class="w-20% text-center bd-dashed_#1890ff color-#fff"
      >
        <view>{{ item.icon }}</view>
        <view>{{ item.text }}</view>
      </view>
    </view>
  </view>

  <!-- 入口类表 -->

  <view class="mt-[-10px] overflow-hidden rounded-t-10px p-10px bg-red">
    <wd-grid :column="4">
      <wd-grid-item
        use-icon-slot
        use-text-slot
        v-for="(item, index) in mainData"
        :key="index"
        custom-class="grid-item"
      >
        <template #icon>
          <image class="wh-42px rounded-10px" :src="item.url" />
        </template>
        <template #text>
          <view class="text-center mt-10px">{{ item.title }}</view>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>

  <!-- 消息 -->
  <wd-gap bg-color="#f5f5f5"></wd-gap>
  <view class="pl-20px py-10px">
    <dy-title title="消息专区"></dy-title>
    <wd-cell-group>
      <wd-cell
        v-for="(item, index) in msg"
        :key="index"
        is-link
        :to="item.url"
        title-width="280px"
        custom-class="cell-item"
      >
        <template #title>
          <view class="flex">
            <view class="w-50px relative">
              <wd-tag type="danger" color="#e48370" bg-color="#f5f5f5">{{ item.title }}</wd-tag>
              <view
                v-if="item.isRead"
                class="absolute top-4px left-[-2px] wh-5px rounded-50% bg-red"
              ></view>
            </view>
            <view class="end-time truncate-1">{{ item.content }}</view>
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
  </view>
  <!-- 广告位 -->
  <view class="px-20px py-10px bg-#f5f5f5 h-120px">
    <wd-img :width="350" :height="120" :src="cardUrl" />
  </view>

  <!-- 服务专区 -->

  <view class="px-20px py-10px">
    <dy-title title="服务专区"></dy-title>
    <view class="bg-#f5f5f5">asdasd</view>
  </view>
</template>
<style>
.main-title-color {
  color: #e48370;
}
.slot-img {
  width: 42px;
  height: 42px;
  border-radius: 4px;
}
:deep(.grid-item .wd-grid-item__wrapper) {
  @apply w-auto! h-auto!;
}
:deep(.cell-item) {
  @apply pl-0;
}
</style>

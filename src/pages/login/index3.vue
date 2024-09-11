<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
    'mp-alipay': {
      transparentTitle: 'always',
      titlePenetrate: 'YES',
    },
  },
}
</route>
<script lang="ts" setup>
const a = ref(false)
function textclick() {
  console.log('点击了')
  a.value = !a.value
}
</script>
<template>
  <view class="px-20px mt-30px">
    <view class="bg-#1890ff">
      <view @click="textclick">点击</view>
      <!-- :class="a ? 'hidden' : 'block px-10px'" -->
      <view class="coupon" :class="a ? '' : 'expanded'">
        <view class="bg-amber">
          asdnakdf
          <view>asdcasd</view>
        </view>
      </view>
    </view>
  </view>

  <view class="bg-emerald">asdcadfc</view>
</template>
<style></style>
<style lang="scss" scoped>
.coupon {
  width: 300px;
  max-height: 30px;
  overflow: hidden;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: max-height 0.3s ease-out;
}
.collapsible-content.expanded {
  max-height: 1000px; /* 设置一个足够大的值，确保能容纳内容 */
}

.coupon-folded {
  height: 100px;
}
</style>

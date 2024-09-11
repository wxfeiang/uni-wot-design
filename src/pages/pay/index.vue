<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
//
const inValue = ref<number>()
const visible = ref(false)

const onInput = (val: string) => {
  inValue.value = Number(val)
}

const onDelete = () => {
  // inValue.value = inValue.value?.toString().slice(0, -1)
}
const remarks = ref('')

const show = ref(true)
const messData = ref([
  {
    title: '订单信息',
    msg: '中国雄安集团数字城市科技有限公司 IRUE8575757848488',
  },
  {
    title: '订单号',
    msg: 'IRUE8575757848488',
  },
  {
    title: '优惠券',
  },
])
const collapse = ref(false)
const value7 = ref<string[]>(['item3'])
</script>

<template>
  <dy-navbar leftTitle="付款" left></dy-navbar>
  <view class="px-10px py-20px" @click="show = true">
    <view class="flex justify-between items-center">
      <view>
        <view class="text-18px color-#000">付款给商家</view>
        <view class="text-14px color-#999999 mt-4px">文文跑江湖的店</view>
      </view>

      <view>
        <wd-img
          width="58px"
          height="58px"
          radius="7px"
          src="https://img0.baidu.com/it/u=123020064,1503144048&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
        ></wd-img>
      </view>
    </view>
  </view>

  <view class="rounded-t-20px overflow-hidden bg-#fff mt-20px">
    <view class="px-20px pt-20px">
      <view class="my-10px text-18px">付款金额</view>
      <wd-input
        type="number"
        v-model="inValue"
        placeholder="请输入付款金额"
        use-prefix-slot
        size="large"
        readonly
        @click="visible = true"
      >
        <template #prefix>
          <view class="24px color-#000 font-semibold">￥</view>
        </template>
      </wd-input>
      <wd-number-keyboard
        v-model="inValue"
        v-model:visible="visible"
        mode="custom"
        extra-key="."
        close-text="付款"
        @input="onInput"
        @delete="onDelete"
      ></wd-number-keyboard>

      <view class="text-14px color-#2D69EF my-10px">备注</view>
      <wd-textarea v-model="remarks" placeholder="" />
    </view>
  </view>

  <!--  -->

  <wd-popup
    v-model="show"
    :close-on-click-modal="false"
    closable
    custom-style="height: 500px;"
    custom-class="custom-class-popup"
    lock-scroll
    position="bottom"
    :safe-area-inset-bottom="true"
  >
    <view class="text-center py-15px">数城云收银</view>
    <view>
      <view class="text-center text-40px font-semibold">
        <text class="text-30px mt-5px">¥</text>
        <text>{{ inValue }}</text>
      </view>
      <view
        class="mt-10px font-400 text-#999 text-20px text-center bg-#F1F0EE px-20px py-5px mx-auto max-w-30% rounded-500 line-through"
      >
        {{ -1213 }}
      </view>
    </view>

    <view>
      <wd-cell-group>
        <wd-cell title="d" value="内容" />
      </wd-cell-group>
      <wd-collapse v-model="value7">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item name="item3">
          <template #title="{ expanded }">
            <view>优惠券</view>
            <view>
              <text class="text-12px">¥</text>
              <text>{{ inValue }} 1223</text>
              <wd-icon :name="expanded ? 'arrow-down' : 'arrow-right'" size="14px"></wd-icon>
            </view>
          </template>
          这是一条简单的示例文字。
        </wd-collapse-item>
      </wd-collapse>
    </view>
  </wd-popup>
</template>

<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
//
:deep(.custom-class-popup) {
  @apply overflow-hidden rounded-t-20px px-20px;
}
</style>

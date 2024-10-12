<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
import SugItem from './components/sugItem.vue'
import useSuggest from './utils/useSuggest'
const message = useMessage()
const { sendDetail, detilData } = useSuggest()
const title = ref('投诉与建议')
const form = ref(null)
const next = ref(false)
const dataList = ref([
  {
    title: '签到',
    createTime: '2023-10-10 10:10:10',
    type: 1,
    adviceType: 1,
    id: 1,
  },
])
const footerBtns2 = computed(() => {
  if (!next.value) {
    return [
      // {
      //   text: '继续反馈',
      //   size: 'medium',
      //   round: false,
      //   plain: true,
      //   type: 'primary',
      //   action: 'continue',
      //   customClass: 'btn-class',
      // },
      {
        text: '问题已解决',
        size: 'medium',
        round: false,
        plain: true,
        type: 'primary',
        customClass: 'btn-class',
        action: 'over',
      },
    ]
  } else {
    return [
      {
        text: '提交',
        size: 'medium',
        round: false,
        plain: true,
        type: 'primary',
        action: 'submit',
        customClass: 'btn-class',
      },
    ]
  }
})
const btnClick2 = async (item) => {
  if (item.action === 'continue') {
    next.value = true
  } else if (item.action === 'over') {
    message
      .confirm({
        msg: '确定当前问题已经解决？',
        title: '提示',
        closeOnClickModal: false,
      })
      .then(() => {
        console.log('🍭')
        // 更新状态
        // 重新查询数据
      })
  }
}

onLoad(async (option: any) => {
  console.log(option)
  await sendDetail({ id: option.id })
  // dataList.value = detilData.value
})
</script>

<template>
  <view class="w-100vw h-100vh bg box-border overflow-y-auto pb-100px">
    <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    <view class="p-15px">
      <Sug-Item :dataList="dataList" />
    </view>

    <view class="px-10px py-10px fixed bottom-0 left-0 right-0 bg-#fff">
      <view class="flex gap-15px">
        <view class="flex-1" v-for="(item, index) in footerBtns2" :key="index">
          <wd-button
            :round="item.round"
            block
            :size="item.size"
            :type="item.type"
            @click="btnClick2(item)"
          >
            {{ item.text }}
          </wd-button>
        </view>
      </view>
      <!-- <wd-button block :round="false" @click="submit(form)">提 交</wd-button> -->
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(180deg, #d6eafe 0%, #f3f4f6 50%);
}
</style>

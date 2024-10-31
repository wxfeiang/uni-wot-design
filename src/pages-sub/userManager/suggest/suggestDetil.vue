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
import SugItem from './components/SugItem.vue'
import useSuggest from './utils/useSuggest'
const message = useMessage()
const { sendDetail, detilData, submit, model } = useSuggest()
const title = ref('投诉与建议')
const form = ref(null)
const next = ref(false)
const dataList = ref([])
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
        updateStatus()
      })
  }
}
// 更新状态
async function updateStatus() {
  model.value.adviceContent = detilData.value!.adviceContent
  model.value.adviceImg = detilData.value!.adviceImg
  model.value.adviceType = detilData.value!.adviceType
  model.value.adviceState = '2'
  model.value.isDone = '1'
  model.value.adviceId = detilId.value
  await submit(model.value, true)
  getDetil()
}

// 重新查询数据

const detilId = ref('')
async function getDetil() {
  await sendDetail({ id: detilId.value })
  dataList.value = [detilData.value]
  console.log('🥕[ dataList.value]:', dataList.value)
}

onLoad(async (option: any) => {
  detilId.value = option.id
  getDetil()
})
</script>

<template>
  <dy-content customClass="dy-blue-bg">
    <template #top>
      <dy-navbar :leftTitle="title" left isNavShow color="#000"></dy-navbar>
    </template>
    <view class="">
      <view class="p-15px">
        <Sug-Item :dataList="dataList" :status="true" :objData="dataList[0]" />
      </view>
    </view>
    <template #bottom>
      <view class="px-10px py-10px safe-area-after bg-#fff" v-if="dataList[0]?.adviceState !== '2'">
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
      </view>
    </template>
  </dy-content>
</template>

<style lang="scss" scoped>
// :deep(.z-paging-content) {
//   @apply dy-blue-bg;
// }
</style>

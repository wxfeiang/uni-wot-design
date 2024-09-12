<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { getXinCangCardInfo, setXinCangCardAuthorize } from '@/service/api/userMessage'
import { useUserStore } from '@/store/user'
import { useRequest } from 'alova/client'
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'
const { isLogined, userInfo } = storeToRefs(useUserStore())
const url0 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/3f52b044-ecaa-4c53-b218-7096e83c9669WechatIMG195.jpg',
)
const url1 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/29673de5-ea59-438c-a9c3-79b5a957e927WechatIMG173.jpg',
)
const url2 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/3e596aec-9d47-41a0-986d-181b1f93d60eWechatIMG174.jpg',
)
const url3 = ref(
  'https://oss.xay.xacloudy.cn/images/2024-09/7935f044-8a8f-4789-ae9b-5838f3ef7e01WechatIMG175.jpg',
)

const message = useMessage()
const isShow = ref(false)
const mainData = ref([
  {
    type: '1',
    typeName: 'A',
    iconColse: true,
    bgUrl: url1.value,
  },
  {
    type: '2',
    typeName: 'B',
    iconColse: true,
    bgUrl: url2.value,
  },
  {
    type: '3',
    typeName: 'C',
    iconColse: true,
    bgUrl: url3.value,
  },
])
const showCardData = ref([])
function showCard(data) {
  showCardData.value = mainData.value
    .filter((item) => item.type === data.cardType)
    .map((item) => {
      return { ...item, ...data }
    })
}

const { send: sendXinCangCardInfo, loading: LoadingKey } = useRequest(
  (data) => getXinCangCardInfo(data),
  {
    immediate: false,
    loading: false,
  },
)

const { send: sendCardAuthorize } = useRequest((data) => setXinCangCardAuthorize(data), {
  immediate: false,
  loading: false,
})

const xiongcaiUserId = ref('')

const toShow = () => {
  console.log('授权展示雄才卡')
  message
    .confirm({
      msg: '是否授权“雄安一卡通小程序”获取您的雄才卡信息？',
      title: '提示',
    })
    .then(async () => {
      console.log('点击了确定按钮')

      // 查询卡
      const params = {
        xiongcaiUserId: xiongcaiUserId.value,
      }
      const data: any = await sendCardAuthorize(params)
      if (data) {
        // 展示卡面
        getInfo()
      } else {
        showCardData.value = []
      }
      isShow.value = true
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
// 初始化关闭的时候

function close(item, index) {
  showCardData.value[index].iconColse = !showCardData.value[index].iconColse
  mainData.value.forEach((i) => {
    if (i.type === item.type) {
      i.iconColse = showCardData.value[index].iconColse
    }
  })
  if (!showCardData.value[index].iconColse) {
    // 展示
    getInfo(1)
  } else {
    getInfo()
  }
}
async function getInfo(cardType?: number) {
  const params = {
    xiongcaiIdcardNumOut: userInfo.value.idCardNumber,
    cardType, // 1 不脱敏
  }
  try {
    const data: any = await sendXinCangCardInfo(params)
    if (!data.authorizeState) {
      xiongcaiUserId.value = data.xiongcaiUserId
    } else {
      // 直接展示
      isShow.value = true
      showCard(data)
    }
  } catch (error) {}
}

onLoad(() => {
  getInfo()
})
</script>

<template>
  <dy-navbar leftTitle="身份卡包" left></dy-navbar>
  <wd-gap bg-color="#ffff"></wd-gap>
  <view class="px-15px" v-if="!isShow">
    <view
      class="p-15px default_bg h-112px box-border mb-10px rounded-7px relative bg-no-repeat bg-cover!"
      :style="{ backgroundImage: `url(${url0})` }"
    >
      <view
        class="bg-#9a9a9a9a px-20px py-3px text-16px color-#FFF rounded-20px absolute right-20px bottom-30%"
        @click="toShow"
      >
        授权展示雄才卡
      </view>
    </view>
  </view>
  <view v-else>
    <view class="px-15px" v-if="showCardData && showCardData.length > 0">
      <view
        class="p-15px default_bg h-112px box-border mb-10px rounded-7px relative bg-no-repeat bg-cover!"
        v-for="(item, index) in showCardData"
        :key="index"
        :class="`${item.typeName}_type`"
        :style="{ backgroundImage: `url(${item.bgUrl})` }"
      >
        <view class="text-24px">{{ item.xiongcaiUserName }}</view>
        <view class="text-16px mt-10px">{{ item.xiongcaiIdcardNumOut }}</view>
        <view
          class="absolute right-0 top-0 py-2px pl-15px pr-10px rounded-bl-15px color-#fff text-16px"
          :class="`${item.typeName}_bg_type`"
        >
          {{ item.typeName.toUpperCase() }} 类
        </view>
        <view @click="close(item, index)" class="absolute right-10px bottom-10px">
          <wd-icon
            :name="item.iconColse ? 'eye-close' : 'view'"
            size="20px"
            :color="item.iconColse ? '#5D5D5D' : '#FFC248'"
          ></wd-icon>
        </view>
      </view>
    </view>
    <view v-else>
      <wd-status-tip image="content" tip="未持有任何卡片" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.default_bg {
  background: linear-gradient(311deg, #e0e0e0 0%, #bebebe 100%);
}
.A_type {
  @apply color-#E4C094;
}
.B_type {
  @apply color-#E96B16;
}
.C_type {
  @apply color-#000000;
}
.A_bg_type {
  background-color: linear-gradient(225deg, #220a01 0%, rgba(239, 187, 122, 0.62) 100%);
}
.B_bg_type {
  background-color: linear-gradient(225deg, #ff6600 0%, rgba(232, 188, 66, 0.87) 50%, #ff9800 100%);
}
.C_bg_type {
  background-color: linear-gradient(
    237deg,
    #4b4b4b 0%,
    rgba(195, 195, 195, 0.72) 50%,
    #696969 100%
  );
}
</style>

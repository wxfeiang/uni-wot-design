<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '收货地址',
    backgroundColor: '#ffffff',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'
import { addressList, addressListDel } from '@/service/api/address'
import { routeTo } from '@/utils'
import { useMessage } from 'wot-design-uni'
import { Toast } from '@/utils/uniapi/prompt'

const message = useMessage()
const topbgBase64 = ref('')

const paging = ref(null)
let adsList = ref([])

const editAddress = (item) => {

}
const delAddress = (id: String) => {
  console.log('shanchu', id)
  message.confirm({
    msg: '是否删除这条收货地址',
    title: '提示'
  })
    .then(() => {
      addressListDel({ id }).then(res => {
        Toast('删除成功')
        paging.value.reload()
      })
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
const getLsit = async (pageNo: number, pageSize: number) => {
  try {
    let res: any = await addressList({
      current: pageNo,
      size: pageSize,
    })

    console.log('地址列表', res)

    paging.value.complete(res)
  } catch {
    console.log("出错了")
    paging.value.complete(false)
  }
}
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <z-paging ref="paging" v-model="adsList" @query="getLsit" :paging-style="{
    'background-color': '#F7F7F7', 'box-sizing': 'border-box',
    'width': '100vw',
    'padding': '20px',
    'padding-bottom': '100px'
  }">

    <view class="border-rd-7px bg-white p-15px box-border mb-15px" v-for="item in adsList" :key="item.id">
      <view>{{ item.userName }} {{ item.userPhone }}</view>
      <view class="w-full my-10px add-detail">
        {{ item.province }} {{ item.city }} {{ item.area }} {{ item.userAddress }}
      </view>
      <view class="w-full flex justify-between items-center">
        <wd-checkbox v-model="item.isDefault" size="large" checked-color="#f44d24" :true-value="1"
          false-value="0">设为默认</wd-checkbox>
        <view style="color: #666666" class='flex items-center'>
          <view class="mr-10px" @click="editAddress(item)">
            <wd-icon name="edit-1" size="20px" style="margin-right: 3px"></wd-icon>
            <text>编辑</text>
          </view>
          <view @click="delAddress(item.id)">
            <wd-icon name="delete" size="20px" style="margin-right: 3px; margin-left: 10px"></wd-icon>
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>

    <view class="submit" @click="routeTo({ url: '/pages-sub/userManager/address/editor' })">新增收货地址</view>

  </z-paging>

</template>

<style>
.add-detail {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.list {
  box-sizing: border-box;
  width: 100vw;
  padding: 20px;
  padding-bottom: 100px;
  background: #F7F7F7;
}

.submit {
  position: fixed;
  bottom: 40px;
  left: 50%;
  width: 70vw;
  line-height: 50px;
  color: #fff;
  text-align: center;
  background-color: #f44d24;
  border-radius: 50px;
  transform: translate(-50%);
}
</style>

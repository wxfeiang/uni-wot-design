<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationBarTitleText: '购物车',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
}
</route>
<script lang="ts" setup>
import indexbg from '@/static/images/shop/navbg.png'
import { pathToBase64 } from 'image-tools'
import { useUserStore } from '@/store'
import { shopCarList, delCart } from '@/service/api/shop'
import { Toast } from '@/utils/uniapi/prompt'
import { useToast } from 'wot-design-uni'
import { routeTo } from '@/utils'

const toast = useToast()
const paging = ref(null)
const allValue = ref(false)
const goodList = ref([])
const total = ref()
const changeArr = ref<any>([])
const userStore = useUserStore()
const isManage = ref(false)
const topbgBase64 = ref('')
const submitData = ref([])

const handleShop = ({ value }, id) => {
  if (id === 'all') {
    goodList.value.forEach((el) => {
      el.isCheck = value
      el.shopCartProductResp.forEach((key) => {
        key.isCheck = value
        if (value) {
          changeArr.value.push(key.shopCartId)
        } else {
          changeArr.value.length = 0
        }
      })
    })
    allValue.value = value
  } else {
    goodList.value.forEach((el) => {
      if (el.shopId === id) {
        el.isCheck = value
        el.shopCartProductResp.forEach((key) => {
          key.isCheck = value
          if (value) {
            changeArr.value.push(key.shopCartId)
          } else {
            changeArr.value = changeArr.value.filter((item) => item !== key.shopCartId)
          }
        })
      }
    })
  }

  allValue.value = total.value === changeArr.value.length
}

const deleteCart = async () => {
  if (changeArr.value.length === 0) {
    Toast('请选择要删除的商品')
    return
  }
  try {
    const res = await delCart({
      shopCartIds: changeArr.value,
    })
    console.log('删除', res)
    Toast('删除成功')
    paging.value.reload()
  } catch {
    console.log('???')
  }
}
const handleGood = ({ value }, id) => {
  goodList.value.forEach((el) => {
    el.shopCartProductResp.forEach((key) => {
      if (key.shopCartId === id) {
        key.isCheck = value
        if (value) {
          changeArr.value.push(id)
        } else {
          changeArr.value = changeArr.value.filter((item) => item !== id)
          allValue.value = false
        }
      }
    })
    const status = el.shopCartProductResp.every((it) => it.isCheck)
    if (status) {
      el.isCheck = true
    } else {
      el.isCheck = false
    }
    allValue.value = total.value === changeArr.value.length
  })
  console.log('???', changeArr.value.length)
}
const goSubmitOrder = () => {
  if (changeArr.value.length === 0) {
    toast.warning('未选择任何商品')
  } else if (changeArr.value === 1) {
    goodList.value.forEach((it, idx) => {
      if (it.isCheck) {
        const deliveryAmount = it.shopCartProductResp.reduce((a, b) => {
          return a + Number((b.sellingPrice * b.itemNum).toFixed(2))
        }, 0)
        console.log('deliveryAmount', deliveryAmount)
        submitData.value.push({
          shopId: it.shopId,
          shopName: it.shopName,
          receiveAddrId: '', // 收货地址Id
          deliveryAmount, // 订单金额 Number((val.buy_num * val.price).toFixed(2))
          deliveryMode: 0, // 配送方式  0: 快递配送 ,1: 上门自提 ,2: 同城配送
          orderNote: '', // 订单备注
          receiveId: '', // 收货人Id
          couponId: '', // 优惠券ID
          orderResource: 2, //  订单来源 1web  2 小程序
          payShopListReqVo: it.shopCartProductResp.map((im) => {
            return {
              spuId: im.spuId,
              skuId: im.skuId,
              image: im.skuUrl,
              skuName: im.skuName,
              spuNum: im.itemNum,
              spuName: im.spuName,
              price: im.sellingPrice,
            }
          }),
        })
      } else {
        it.shopCartProductResp.forEach((item) => {
          if (item.isCheck) {
            const index = submitData.value.findIndex((k) => k.shopId === it.shopId)
            if (index !== -1) {
              const count = Number(
                (item.sellingPrice * item.itemNum).toFixed(2) +
                  submitData.value[index].deliveryAmount,
              )
              submitData.value[index].deliveryAmount = count
              submitData.value[index].payShopListReqVo.push({
                spuId: item.spuId,
                skuId: item.skuId,
                image: item.skuUrl,
                skuName: item.skuName,
                spuNum: item.itemNum,
                spuName: item.spuName,
                price: item.sellingPrice,
              })
            } else {
              const count = Number((item.sellingPrice * item.itemNum).toFixed(2))
              submitData.value.push({
                shopId: it.shopId,
                shopName: it.shopName,
                receiveAddrId: '', // 收货地址Id
                deliveryAmount: count, // 订单金额 Number((val.buy_num * val.price).toFixed(2))
                deliveryMode: 0, // 配送方式  0: 快递配送 ,1: 上门自提 ,2: 同城配送
                orderNote: '', // 订单备注
                receiveId: '', // 收货人Id
                couponId: '', // 优惠券ID
                orderResource: 2, //  订单来源 1web  2 小程序
                payShopListReqVo: [
                  {
                    spuId: item.spuId,
                    skuId: item.skuId,
                    image: item.skuUrl,
                    skuName: item.skuName,
                    spuNum: item.itemNum,
                    spuName: item.spuName,
                    price: item.sellingPrice,
                  },
                ],
              })
            }
          }
        })
      }
    })

    routeTo({ url: '/pages-sub/homeManager/order?obj=' + JSON.stringify(submitData.value) })
    console.log('submitData.value', submitData.value)
  } else {
    toast.warning('暂不支持多店铺下单，请选择一个店铺下单吧~')
  }
}
const getLsit = async () => {
  try {
    const res: any = await shopCarList({
      customerId: userStore.userInfo.userDId,
      current: 1,
      size: 10,
    })
    res.forEach((el) => {
      el.isCheck = false
      el.shopCartProductResp.forEach((key) => {
        key.isCheck = false
        key.skuName = Object.values(JSON.parse(key.skuName)).join(',')
        key.skuUrl = JSON.parse(key.skuUrl)[0].data
      })
    })
    console.log('购物车列表i', res)
    total.value = res.reduce((a, b) => {
      const num = b.shopCartProductResp.reduce((c, d) => {
        return c + d.itemNum
      }, 0)
      return a + num
    }, 0)
    paging.value.complete(res)
  } catch {
    console.log('????')
    paging.value.complete(false)
  }
}
onLoad(async () => {
  topbgBase64.value = await pathToBase64(indexbg)
  // 设置背景图片
})
</script>
<template>
  <view class="w-full font-600 flex items-center justify-between px-20px box-border">
    <view class="line-height-50px">购物车数量({{ total ? total : 0 }})</view>
    <view>
      <text style="margin-right: 10px; color: #f44d24" v-if="isManage" @click="deleteCart">
        删除
      </text>
      <text @click="isManage = !isManage">管理</text>
    </view>
  </view>
  <z-paging
    ref="paging"
    v-model="goodList"
    @query="getLsit"
    :paging-style="{
      'box-sizing': 'border-box',
      width: '100%',
      height: ' calc(100vh - 50px)',
      padding: '15px',
      'padding-bottom': '80px',
      'background-color': '#f5f6f8',
      'margin-top': '50px',
    }"
  >
    <view
      class="bg-white border-rd-10px p-15px box-border w-full mb-15px"
      v-for="item in goodList"
      :key="item.shopId"
    >
      <div class="flex items-center">
        <wd-checkbox v-model="item.isCheck" @change="handleShop($event, item.shopId)"></wd-checkbox>
        <view>{{ item.shopName }}</view>
        <wd-icon name="arrow-right" size="20px" color=""></wd-icon>
      </div>

      <view class="w-full mt-15px flex" v-for="it in item.shopCartProductResp" :key="it.spuId">
        <view class="flex items-center">
          <wd-checkbox
            v-model="it.isCheck"
            @change="handleGood($event, it.shopCartId)"
          ></wd-checkbox>
        </view>
        <wd-img :width="105" :height="105" :src="it.skuUrl" custom-class="img" />
        <view class="ml-15px flex-1 flex flex-col justify-between">
          <view class="w-190px name">{{ it.spuName }}</view>
          <view style="font-size: 14px; color: #757575">{{ it.skuName }}</view>
          <view class="w-full">
            <wd-tag color="#FAA21E" bg-color="#FF6609" plain>7天无理由退货</wd-tag>
            <wd-tag color="#FAA21E" bg-color="#FF6609" plain style="margin-left: 10px">
              运费险
            </wd-tag>
          </view>
          <view class="w-full flex justify-between">
            <view class="flex items-center" style="font-weight: 600; color: #f44d24">
              <text style="font-size: 14px">￥</text>
              <text style="font-size: 18px">{{ it.sellingPrice }}</text>
            </view>
            <view class="num">x{{ it.itemNum }}</view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>

  <!-- <view class="flex flex-col items-center justify-center mt-140px">
    <wd-img :width="246" :height="168"
      src='https://oss.xay.xacloudy.cn/images/2024-09/cdc42a2e-06d9-4981-9691-56c4bb873d28未标题-1.png'></wd-img>
    <view class='mt-32px'>暂无数据！</view>
  </view> -->

  <view
    v-if="!isManage"
    class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center"
  >
    <wd-checkbox v-model="allValue" @change="handleShop($event, 'all')">全选</wd-checkbox>
    <view class="flex items-center">
      <view class="flex items-center">
        合计：
        <view style="color: #f44d24">
          <text style="font-size: 14px">￥</text>
          <text style="font-size: 20px">0</text>
        </view>
      </view>
      <view class="submit" @click="goSubmitOrder">结算（{{ changeArr.length }}）</view>
    </view>
  </view>
</template>

<style>
.submit {
  width: 103px;
  margin-left: 20px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 6px 6px 6px 6px;
}

.img {
  overflow: hidden !important;
  border-radius: 5px;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.num {
  width: 25px;
  line-height: 25px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 5px 5px 5px 5px;
}
</style>

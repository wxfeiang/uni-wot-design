<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<script lang="ts" setup>
import { getCouponList } from '@/service/api/address'
import { useUserStore } from '@/store'
import { routeTo } from '@/utils'
import { getCurrentInstance } from 'vue'
import useOrder from '../../pages/shop/utils/userOrder'
import couponB from './static/image/coupon_b.png'

const userStore = useUserStore()
const {
  actions,
  showPop,
  checkDriver,
  select,
  orderDetails,
  isExtractList,
  shopExtractList,
  handleChange,
  checkExtract,
  getAdsList,
  adsList,
  shopAdsList,
  selfAdsList,
  submit,
  checkAddress,
  // getCoupon,
  couponList,
} = useOrder()

const totalPrice = ref(0)
const model = reactive({
  value1: '',
  value2: '',
})
const actions1 = ref([])
const couponS = ref([])
const avtCcoupon = ref(0)
const disCount = ref(false)
const getCouponOver = ref(null)
const disCountInd = ref(0)
const deliveryMode: any = ref([])
const instance = getCurrentInstance()

const getCoupon = async (data, index) => {
  const res = await getCouponList(data)
  couponS.value[index] = res

  couponList.value[index].id = res[0] ? res[0].receiveId : ''
  couponList.value[index].cid = res[0] ? res[0].couponId : ''
  couponList.value[index].couponPrice = res[0] ? res[0].couponPrice : 0

  console.log(' couponS.value[index]!~~~~~~~~~~~~~~~~~~~~', couponS.value[index])
  instance.proxy.$forceUpdate()
  let fl = true
  couponS.value.forEach((item, index) => {
    if (item === null) {
      fl = false
    }
  })
  if (fl === true) {
    getCouponOver.value = true
    console.log('++++++++++++++++++++++++++++++', couponS.value)
  } else {
    getCouponOver.value = false
  }
}

const openCount = (val: any, index: any) => {
  disCount.value = val
  disCountInd.value = index
}

//

const goAddress = (val: any) => {
  routeTo({
    url: '/pages-sub/userManager/address/list',
  })
}

const chooseact = (item, ind) => {
  couponList.value[disCountInd.value] = {
    act: ind,
    id: item.receiveId ? item.receiveId : '',
    cid: item.couponId ? item.couponId : '',
    couponPrice: item.couponPrice ? item.couponPrice : 0,
  }
}
const chooseactNo = (item, ind) => {
  couponList.value[disCountInd.value] = {
    act: -1,
    id: '',
    cid: '',
    couponPrice: 0,
  }
}

onLoad(async (options) => {
  console.log('传参', JSON.parse(decodeURIComponent(options.obj)))
  orderDetails.value = JSON.parse(decodeURIComponent(options.obj))
  couponList.value = []
  couponS.value = []

  orderDetails.value.forEach((element, index) => {
    deliveryMode.value = element.deliveryMode + ''.split(',')
    actions.value.forEach((it, idx) => {
      if (deliveryMode.value.includes(it.id)) {
        actions1.value.push(it)
      }
    })
    console.log('actions.value', deliveryMode.value, actions.value)
    element.deliveryMode = deliveryMode.value[0]
    element.userId = userStore.userInfo.userDId
    element.appKey = 1
    totalPrice.value = totalPrice.value + element.deliveryAmount
    const da = { shopId: element.shopId, productsList: [] }
    element.payShopListReqVo.forEach((e) => {
      da.productsList.push({ productId: e.spuId, price: e.price, num: e.spuNum })
    })
    couponS.value.push(null)
    couponList.value.push({ act: 0, id: null, cid: null })

    getCoupon(da, index)
  })
})
onShow(async (options) => {
  getAdsList()
  // 获取地址列表
})
</script>
<template>
  <view class="min-h-100vh bg-#f3f4f6">
    <dy-navbar leftTitle="确认订单" left></dy-navbar>
    <view class="list">
      <view class="border-rd-5px mb-20px" v-for="(item, idx) in orderDetails" :key="idx">
        <view
          class="bg-white border-rd-7px bg-white p-13px box-border mb-20px"
          v-if="item.deliveryMode !== 1 && adsList.length > 0"
          @click="checkAddress(idx)"
        >
          <view
            style="width: 100%; font-size: 14px; color: #888888"
            class="add-detail"
            v-if="shopAdsList[idx]"
          >
            {{ shopAdsList[idx].province }} {{ shopAdsList[idx].city }} {{ shopAdsList[idx].area }}
          </view>
          <view class="w-full flex items-center justify-between my-3px" v-if="shopAdsList[idx]">
            <view class="flex-1 add-detail">
              {{ shopAdsList[idx].userAddress }}
            </view>
            <wd-icon name="arrow-right" size="22px" color="#000"></wd-icon>
          </view>
          <view style="margin-top: 5px; font-size: 14px" v-if="shopAdsList[idx]">
            {{ shopAdsList[idx].userName }} {{ shopAdsList[idx].userPhone }}
          </view>
        </view>

        <view
          class="bg-white border-rd-7px bg-white p-13px box-border mb-20px"
          v-if="item.deliveryMode !== 1 && adsList && adsList.length <= 0"
        >
          <view class="w-full flex items-center justify-between my-3px">
            <wd-text text=" 暂无地址"></wd-text>

            <view class="flex items-center justify-right">
              <wd-button type="warning" @click="goAddress" size="small">去新增</wd-button>
              <!-- <wd-icon name="arrow-right" size="22px" color="#000"></wd-icon> -->
            </view>
          </view>
        </view>
        <view v-if="item.deliveryMode === 1" class="bg-white border-rd-7px px-0 box-border mb-20px">
          <wd-form ref="form" :model="selfAdsList[idx]">
            <wd-cell-group border>
              <wd-input
                label="提货人姓名"
                label-width="100px"
                prop="value1"
                clearable
                v-model="selfAdsList[idx].username"
                placeholder="请输入提货人姓名"
                :rules="[{ required: true, message: '请输入提货人姓名' }]"
              />
              <wd-input
                label="提货人手机号"
                label-width="100px"
                prop="value2"
                clearable
                v-model="selfAdsList[idx].userphone"
                placeholder="请输入提货人手机号"
                :rules="[{ required: true, message: '请填写提货人手机号' }]"
              />
            </wd-cell-group>
          </wd-form>
        </view>

        <view class="bg-white border-rd-10px p-15px box-border w-full">
          <div class="flex items-center">
            <wd-img :width="25" :height="25" :src="item.shopAvatar" radius="5px" />
            <view class="ml-12px" style="color: #333333">{{ item.shopName }}</view>
          </div>

          <view class="w-full mt-15px flex" v-for="(it, indx) in item.payShopListReqVo" :key="indx">
            <wd-img :width="105" :height="105" :src="it.image" custom-image="img" />
            <view class="ml-15px flex-1 flex flex-col justify-between overflow-hidden">
              <view class="w-210px name">{{ it.spuName }}</view>
              <view style="font-size: 14px; color: #757575">{{ it.skuName }}</view>
              <!--              <view class="w-full">-->
              <!--                <wd-tag color="#FAA21E" bg-color="#FF6609" plain>7天无理由退货</wd-tag>-->
              <!--                <wd-tag color="#FAA21E" bg-color="#FF6609" plain custom-class="ml-1">运费险</wd-tag>-->
              <!--              </view>-->
              <view class="w-full flex justify-between">
                <view class="flex items-center" style="font-weight: 600">
                  <text style="font-size: 14px">￥</text>
                  <text style="font-size: 18px">{{ it.price }}</text>
                  <!-- <view class="quan">
                    <text style="margin-right: 5px; font-size: 10px">券后价</text>
                    <text style="font-size: 8px; font-weight: 600">￥</text>
                    <text style="font-size: 16px; font-weight: 600">19.9</text>
                  </view> -->
                </view>
                <view class="num">x{{ it.spuNum }}</view>
              </view>
            </view>
          </view>
          <!--          getCouponOver{{ getCouponOver }}-->
          <view class="w-full flex justify-between items-center mt-15px" v-if="getCouponOver">
            <view class="mr-50px">优惠券</view>
            <view class="flex justify-right items-center">
              <view
                style="font-size: 14px; color: #333333"
                v-if="couponS[idx] !== null && couponS[idx][0] && couponList[disCountInd].act >= 0"
                @click="openCount(true, idx)"
              >
                {{ couponS[idx][0].couponName }}
              </view>

              <view
                style="font-size: 14px; color: #333333"
                v-else-if="couponList[disCountInd].act === -1"
                @click="openCount(true, idx)"
              >
                不使用优惠券
              </view>
              <view style="font-size: 14px; color: #333333" v-else>暂无可用优惠券</view>
              <wd-icon name="arrow-right" size="18px" color="#333333"></wd-icon>
            </view>
          </view>

          <view class="w-full flex justify-between items-center mt-15px">
            <view class="mr-50px">原价</view>
            <view class="color-#F44D24" style="font-size: 16px">
              <text>￥{{ totalPrice }}</text>
            </view>
          </view>
          <view class="w-full flex justify-between items-center mt-15px">
            <view class="mr-50px">优惠金额</view>
            <view class="color-#F44D24" style="font-size: 16px">
              <text>￥{{ couponList[disCountInd].couponPrice.toFixed(2) }}</text>
            </view>
          </view>
          <view class="w-full flex justify-between items-center mt-15px">
            <view class="mr-50px">配送方式</view>
            <!--            <view class="flex items-center" @click="checkDriver('showDeliveryMode', idx)">-->
            <view class="flex items-center">
              <text class="mr-5px" style="font-size: 14px; color: #333333">
                {{ actions[item.deliveryMode].name }}
              </text>
              <!--              <wd-icon name="arrow-right" size="18px" color="#333333"></wd-icon>-->
            </view>
          </view>
          <view
            class="w-full flex justify-between items-center mt-15px"
            v-if="item.deliveryMode === 1"
          >
            <view class="mr-50px">自提点</view>
            <view @click="checkDriver('isExtract', idx)">
              <wd-icon name="location" size="16px" color="#999999"></wd-icon>
              <text class="mr-5px">{{ shopExtractList[idx] }}</text>
              <wd-icon name="arrow-right" size="20px"></wd-icon>
            </view>
          </view>
          <view class="w-full flex justify-between items-center mt-15px">
            <view class="mr-50px">备注留言</view>
            <wd-input
              type="text"
              v-model.trim="item.orderNote"
              placeholder="无备注"
              :maxlength="20"
              no-border
              custom-input-class="inp"
              style="flex: 1; text-align: right"
            />
          </view>
        </view>
      </view>
    </view>

    <view
      class="bg-white pos-fixed h-80px pos-bottom-none flex w-full justify-between px-15px box-border items-center"
      :class="disCount ? 'z-999' : ''"
    >
      <view class="flex flex-col">
        <view style="color: #f44d24" class="font-600">
          <text style="font-size: 14px">￥</text>

          <text style="font-size: 20px">
            {{ (totalPrice - couponList[disCountInd].couponPrice).toFixed(2) }}
          </text>
        </view>
        <!-- <view class="mingxi flex items-center">
          <text>已优惠￥55.34 明细</text>
          <wd-icon name="arrow-up" size="22px"></wd-icon>
        </view> -->
      </view>
      <view class="submit" @click="submit">提交订单</view>
    </view>
    <!--  配送方式 -->
    <wd-action-sheet v-model="showPop.showDeliveryMode" :actions="actions1" @select="select" />

    <!--     券明细 -->
    <wd-popup
      v-model="disCount"
      lock-scroll
      position="bottom"
      custom-style="padding:18px 15px;box-sizing:border-box;border-radius:20px 20px 0 0;bottom:80px;"
    >
      <view class="font-600 mb-20px">选择优惠券</view>
      <!--      <view class="font-600 mb-20px w-full flex items-center justify-between">-->
      <!--        <text>合计优惠</text>-->
      <!--        <view>-->
      <!--          <text style="font-size: 14px">￥</text>-->
      <!--          <text style="font-size: 20px">66.9</text>-->
      <!--        </view>-->
      <!--      </view>-->

      <view v-if="getCouponOver">
        <view
          class="coupon"
          v-for="(item, index) in couponS[disCountInd]"
          :key="index"
          :class="index === couponList[disCountInd].act ? 'active' : 'unact'"
          @click="chooseact(item, index)"
        >
          <image :src="couponB"></image>
          <view
            class="flex"
            style="align-items: center; justify-content: space-between; height: 100%"
          >
            <view class="flex-c">
              <view class="coupon_title">{{ item.couponName }}</view>
              <view class="effect_time flex">
                <text style="line-height: 1.25">有效期：</text>
                <view class="flex-h">
                  <text>
                    {{
                      item.couponBeginDate.slice(0, 10) + ' 至 ' + item.couponEndDate.slice(0, 10)
                    }}
                  </text>
                </view>
              </view>
            </view>
            <div class="amount">
              <text class="reduct">￥{{ item.couponPrice }}</text>
              <text class="reduct_desc">满{{ item.couponFillPrice }}元可用</text>
            </div>
          </view>
        </view>
        <view
          @click="chooseactNo(item, index)"
          :class="couponList[disCountInd].act === -1 ? 'yUse' : 'noUse'"
        >
          暂不使用
        </view>
      </view>
    </wd-popup>
    <!-- 提货 -->
    <wd-popup
      v-model="showPop.isExtract"
      lock-scroll
      position="bottom"
      custom-style="padding:18px 15px;box-sizing:border-box;border-radius:20px 20px 0 0;"
    >
      <view class="font-600 mb-20px">选择自提点</view>
      <view style="width: 100%; max-height: 60vh; overflow-y: auto" v-if="isExtractList.length > 0">
        <view class="flex w-full mb-15px" v-for="(key, ind) in isExtractList" :key="ind">
          <view style="align-self: center">
            <wd-checkbox
              v-model="key.isCheck"
              @change="handleChange($event, key.id, 'isExtractList')"
            ></wd-checkbox>
          </view>
          <view class="flex-1 overflow-hidden">
            <view class="name w-full overflow-hidden">{{ key.storeName }}</view>
            <view class="name w-full overflow-hidden mt-5px">
              <wd-icon name="location" size="16px" color="#999999"></wd-icon>
              <text style="font-size: 14px; color: #999999">
                {{ key.address }}
              </text>
            </view>
          </view>
        </view>
      </view>
      <wd-status-tip image="content" tip="暂无自提点" v-else />
      <view
        class="address-submit"
        v-if="isExtractList.length > 0"
        @click="checkExtract('isExtractList')"
      >
        确定
      </view>
    </wd-popup>
    <!-- 选择收货地址 -->
    <wd-popup
      v-model="showPop.addList"
      lock-scroll
      position="bottom"
      custom-style="padding:18px 15px;box-sizing:border-box;border-radius:20px 20px 0 0;"
    >
      <view class="font-600 mb-20px">选择收货地址</view>
      <view style="width: 100%; max-height: 60vh; overflow-y: auto">
        <view class="flex w-full mb-15px" v-for="(it, ind) in adsList" :key="ind">
          <view style="align-self: center">
            <wd-checkbox
              v-model="it.isCheck"
              @change="handleChange($event, it.id, 'adsList')"
            ></wd-checkbox>
          </view>
          <view class="flex-1 overflow-hidden">
            <view style="width: 100%; font-size: 14px; color: #888888" class="add-detail">
              {{ it.province }} {{ it.city }} {{ it.area }}
            </view>
            <view class="w-full flex items-center justify-between my-3px">
              <view class="flex-1 add-detail">
                {{ it.userAddress }}
              </view>
            </view>
            <view style="margin-top: 5px; font-size: 14px">
              {{ it.userName }} {{ it.userPhone }}
            </view>
          </view>
        </view>
      </view>

      <view class="address-submit" @click="checkExtract('adsList')">确定</view>
    </wd-popup>
  </view>
</template>

<style lang="less">
.address {
  box-sizing: border-box;
  padding: 14px;
  background-color: #f3f4f6;
}

.add-detail {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.address-submit {
  width: 343px;
  margin: 20px auto;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 5px 5px 5px 5px;
}

.submit {
  width: 103px;
  margin-left: 20px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background: #f44d24;
  border-radius: 6px 6px 6px 6px;
}

.inp {
  text-align: right !important;
}

.mingxi {
  font-size: 12px;
  color: #f44d24;
}

.noUse {
  text-align: center;
  padding: 10px;
  color: #999;
  border: 1px solid #cecece;
  border-radius: 5px;
  font-size: 14px;
}

.yUse {
  text-align: center;
  padding: 10px;
  color: #fff;
  border: 1px solid #4bbefd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #4bbefd;
}

.list {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px 90px;
  overflow-y: auto;
  background-color: #f5f6f8;
}

.quan {
  box-sizing: border-box;
  width: 90px;
  padding: 4px;
  margin-left: 5px;
  color: #f44d24;
  text-align: center;
  background: #ffece8;
  border-radius: 2px 2px 2px 2px;
}

.img {
  overflow: hidden;
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

.jian {
  width: 67px;
  height: 20px;
  font-size: 10px;
  color: #f44d24;
  background: #ffece8;
  border-radius: 2px 2px 2px 2px;
}
</style>
<style lang="scss" scoped>
.coupon {
  $c: #ffc4a6;
  position: relative;
  box-sizing: border-box;
  width: 100%;

  padding: 17px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  & > view {
    position: relative;
    z-index: 2;
  }

  .flex {
    display: flex;
  }

  .flex-c {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .flex-h {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .coupon_title {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .effect_time {
    margin-bottom: 4px;
    font-size: 12px;
    color: $c;
  }

  .operate {
    display: flex;
    align-items: center;

    .receive_btn {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 25px;
      font-size: 13px;
      color: $c;
      border: 1px solid #fff;
      border-radius: 13px;
    }

    .desc {
      margin-left: 20px;
      font-size: 12px;
      color: #fff6da;
    }
  }

  .amount {
    display: flex;
    flex-direction: column;
    align-items: center;

    .reduct {
      font-size: 32px;
      font-weight: bold;
      color: #ff4345;
    }

    .reduct_desc {
      font-size: 12px;
      color: #666;
      text-indent: 5px;
    }
  }
}

.unact {
  opacity: 0.4;
}

.active {
  opacity: 1;
}
</style>

import { Toast } from '@/utils/uniapi/prompt'
import { routeTo } from '@/utils'
import { getPickUpStoreByMerchantId, submitOrder, getActivityList } from '@/service/api/shop'
import { addressList, getCouponList } from '@/service/api/address'
import { useRequest } from 'alova/client'

const orderDetails = ref<any>([])
const checkShop = ref(null)
const shopAdsList = ref<any>([])
const selfAdsList = ref<any>([])
const couponList = ref<any>([])
const shopExtractList = ref<any>([])
const showPop = reactive({
  showDeliveryMode: false,
  isExtract: false,
  addList: false,
})
const isExtractList = ref<any>([])
const adsList = ref<any>([])
const actions = ref<Array<any>>([
  {
    id: 0,
    name: '快递配送',
  },
  {
    id: 1,
    name: '上门自提',
  },
  // {
  //   name: '同城配送',
  // },
])

const submit = () => {
  console.log('提交订单', orderDetails.value)
  uni.showLoading({ title: '订单提交中...' })

  let fl = true
  orderDetails.value.forEach((item, idx) => {
    if (item.deliveryMode !== 1 && !shopAdsList.value[idx]) {
      fl = false
    }
    if (item.deliveryMode === 1 && !selfAdsList.value[idx]) {
      fl = false
    }
  })

  if (fl) {
    orderDetails.value.forEach((it, index) => {
      it.receiveId = couponList.value[index].id ? couponList.value[index].id : ''
      it.couponId = couponList.value[index].cid ? couponList.value[index].cid : ''
    })
    submitOrder({ xcxPaymentReqVos: orderDetails.value }).then((res) => {
      console.log('resresresresresresresresresresresres', res.bizOrderNo)
      uni.hideLoading()
      routeTo({
        url: '/pages-sub/order/orderInfo?id=' + res.bizOrderNo,
      })
    })
  } else {
    uni.hideLoading()
    Toast('请选择配送地址或自提方式')
  }
}
const getAdsList = async () => {
  shopAdsList.value = []
  selfAdsList.value = []
  adsList.value = await addressList({})
  if (adsList.value.length > 0) {
    adsList.value.forEach((element) => {
      element.isCheck = !!element.isDefault
    })
    let obj = adsList.value.find((it) => it.isDefault)
    if (!obj) {
      obj = adsList.value[0]
    }

    orderDetails.value.forEach((it) => {
      shopAdsList.value.push(obj)
      selfAdsList.value.push({ username: '', userphone: '' })
      shopExtractList.value.push('请选择门店')
      it.receiveAddrId = obj.id
    })
  } else {
    orderDetails.value.forEach((it) => {
      const obj = adsList.value.find((it) => it.isDefault)
      shopAdsList.value.push(obj)
      selfAdsList.value.push({ username: '', userphone: '' })
      shopExtractList.value.push('请选择门店')
      it.receiveAddrId = ''
    })
  }
  console.log('shopAdsList', shopAdsList)
}

const getCoupon = async (data, index) => {
  const res = await getCouponList(data)

  couponList.value[index].id = res[0] ? res[0].receiveId : ''
  couponList.value[index].cid = res[0] ? res[0].couponId : ''
}

const handleChange = ({ value }, id, key) => {
  console.log(value, id, key)
  if (key === 'isExtractList') {
    isExtractList.value.forEach((element) => {
      if (element.id === id) {
        element.isCheck = value
      } else {
        element.isCheck = !value
      }
    })
  } else {
    adsList.value.forEach((element) => {
      if (element.id === id) {
        element.isCheck = value
      } else {
        element.isCheck = !value
      }
    })
  }
}
const checkAddress = (idx) => {
  showPop.addList = true
  checkShop.value = idx
}
const checkExtract = (key) => {
  if (key === 'isExtractList') {
    const obj = isExtractList.value.find((it) => it.isCheck)
    orderDetails.value[checkShop.value].receiveAddrId = obj.id
    shopExtractList.value[checkShop.value] = obj.storeName
    showPop.isExtract = false
  } else {
    const obj = adsList.value.find((it) => it.isCheck)
    shopAdsList.value[checkShop.value] = obj
    orderDetails.value[checkShop.value].receiveAddrId = obj.id
    showPop.addList = false
  }
}
const checkDriver = async (key, idx) => {
  if (key === 'isExtract') {
    isExtractList.value = await getPickUpStoreByMerchantId({
      merchantId: orderDetails.value[idx].shopId,
    })
    isExtractList.value.forEach((element) => {
      element.isCheck = false
    })
    console.log(isExtractList.value)
  }
  showPop[key] = true
  checkShop.value = idx
}
const select = (e) => {
  orderDetails.value[checkShop.value].deliveryMode = e.index
  console.log('orderDetails.value', orderDetails.value)
}

const { send: sendGetActivityList } = useRequest(
  (params: ActivityParams) => getActivityList<IPaginationData<IActivityBanner>>(params),
  {
    immediate: false,
    loading: true,
  },
)

export default () => {
  return {
    routeTo,
    Toast,
    actions,
    showPop,
    checkDriver,
    select,
    orderDetails,
    isExtractList,
    handleChange,
    adsList,
    checkExtract,
    getAdsList,
    submit,
    checkAddress,
    shopAdsList,
    selfAdsList,
    shopExtractList,
    sendGetActivityList,
    // getCoupon,
    couponList,
  }
}

import { Toast } from '@/utils/uniapi/prompt'
import { routeTo } from '@/utils'
import { getPickUpStoreByMerchantId, submitOrder } from '@/service/api/shop'
import { addressList } from '@/service/api/address'

const orderDetails = ref<any>([])
const checkShop = ref(null)
const shopAdsList = ref<any>([])
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
    name: '快递配送',
  },
  {
    name: '上门自提',
  },
  {
    name: '同城配送',
  },
])

const submit = () => {
  console.log('提交订单', JSON.stringify(orderDetails.value))
  submitOrder({ xcxPaymentReqVos: orderDetails.value }).then((res) => {
    console.log('订单提交结果', res)
  })
}
const getAdsList = async () => {
  adsList.value = await addressList({})
  adsList.value.forEach((element) => {
    element.isCheck = !!element.isDefault
  })
  const obj = adsList.value.find((it) => it.isDefault)

  orderDetails.value.forEach((it) => {
    shopAdsList.value.push(obj)
    shopExtractList.value.push('请选择门店')
    it.receiveAddrId = obj.id
  })
  console.log('obj', obj)
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
    shopExtractList,
  }
}

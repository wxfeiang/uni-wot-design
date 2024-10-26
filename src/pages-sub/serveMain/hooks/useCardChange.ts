import { getCardBasicInfo } from '@/service/api/cardServe'
import { useUserStore } from '@/store/user'
import { Toast } from '@/utils/uniapi/prompt'
import { useForm } from 'alova/client'
import dayjs from 'dayjs'
import { statusTisProps } from '../types/types'

const userStore = useUserStore()
const { userInfo } = userStore

const rules = {
  xm: [{ required: true, message: '请输入姓名' }],
  zjhm: [{ required: true, message: '请输入证件号码' }],
  shbzhm: [{ required: true, message: '请输入社会保障号码' }],
  // address: [{ required: true, message: '请输入居住地址' }],
  // phone: [{ required: true, message: '请输入联系方式' }],
  // cardStartTime: [{ required: true, message: '请选择起始日期' }],
  // cardEndTime: [{ required: true, message: '请选择终止日期' }],
  zy: [{ required: true, message: '请选择职业' }],
}

// 卡信息查询
const {
  loading,
  send: sendCard,
  form: model,
} = useForm((data) => getCardBasicInfo(data), {
  immediate: false,
  loading: false,
  initialData: {},
  // 初始化表单数据
  resetAfterSubmiting: true,
  initialForm: {
    xm: userInfo.cardName,
    zjhm: userInfo.idCardNumber,
    shbzhm: '',
  },
})
const serchBtnStatus = ref(false)
const statusDel = ref<statusTisProps>()
const submitStatus = ref(false)
const cardQury = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        const res: any = await sendCard()
        if (res.cardInfo) {
          cardChangeInfo.value = res.cardInfo
          serchBtnStatus.value = true
        }
      } catch (error) {
        submitStatus.value = true
        statusDel.value = error.data
      }
    }
  })
}

// 提交变更信息

const {
  loading: bgloading,
  send: sendBgInfo,
  form: cardChangeInfo,
} = useForm(
  (formData) => {
    const params = {
      name: userInfo.cardName,
      idCardNumber: userInfo.idCardNumber,
      address: formData.address,
      phoneNumber: formData.phone,
      startDate: dayjs(formData.cardStartTime).format('YYYYMMDD'),
      endDate: dayjs(formData.cardEndTime).format('YYYYMMDD'),
      work: formData.zy,
    }
    // 可以在此转换表单数据并提交
    return getCardBasicInfo(params)
  },
  {
    immediate: false,
    loading: false,
    initialData: {},
    // 初始化表单数据
    initialForm: {
      xm: '',
      zjhm: '',
      xb: '',
      gj: '',
      mz: '',
      address: '',
      phone: '',
      cardStartTime: '',
      cardEndTime: '',
      zy: '',
    },
  },
)
const changeSubmit = (form) => {
  form.validate().then(async ({ valid, errors }) => {
    if (valid) {
      try {
        await sendBgInfo()
        // 跳转到登录后的页面
        uni.navigateBack()
      } catch (error) {
        Toast(error)
      }
    } else {
      console.log('数据校验失败')
    }
  })
}

const read = ref(false)
export default () => {
  return {
    cardQury,
    cardChangeInfo,
    model,
    rules,
    loading,
    read,
    changeSubmit,
    submitStatus,
    statusDel,
    serchBtnStatus,
  }
}

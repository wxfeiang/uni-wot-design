import { getActivityById } from '@/service/api/shop'
import { useRequest } from 'alova/client'
import dayjs from 'dayjs'

const activity = ref({})
const { send: getActivity } = useRequest(
  (data: ActivityParams) => getActivityById<IActivity>(data),
  {
    immediate: false,
    loading: false,
  },
)

const format = (val: string) => dayjs(val).format('YYYY-MM-DD hh:mm:ss')

export default () => ({
  getActivity,
  format,
})

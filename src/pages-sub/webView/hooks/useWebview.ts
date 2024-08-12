import { agreement } from '@/service/api/auth'

const content = ref('')
const { send: getAarData, loading: Loading } = agreement(
  {},
  {
    immediate: false,
    loading: false,
  },
)

const AarData = async (id) => {
  const params = {
    id,
  }
  try {
    const data: any = await getAarData(params)
    content.value = data[0].url
  } catch (error) {
    console.log('🥜')
  }
}

export default () => {
  return {
    content,
    AarData,
    Loading,
  }
}

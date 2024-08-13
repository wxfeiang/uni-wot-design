import { getArtacleDetail } from '@/service/api/source'

const content = ref('')
const { send: sedAarData, loading: Loading } = getArtacleDetail({
  immediate: false,
  loading: false,
})

const AarData = async (articleId) => {
  const params = {
    articleId: articleId || '1695005818677743600',
  }
  try {
    console.log('🍮[articleId]:', params)
    const data: any = await sedAarData(params)
    console.log('🍈[data]:', data)
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

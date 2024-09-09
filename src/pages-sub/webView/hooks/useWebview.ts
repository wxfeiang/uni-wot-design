import { getArtacleDetail } from '@/service/api/source'
import { useRequest } from 'alova/client'
const content = ref('')
const articleTitle = ref('')
const createTime = ref('')

const { send: sedAarData, loading: Loading } = useRequest((data) => getArtacleDetail(data), {
  immediate: false,
  loading: false,
})

const AarData = async (articleId) => {
  const params = {
    articleId,
  }
  try {
    const data: any = await sedAarData(params)
    content.value = data.data.data.articleContent ?? ''
    createTime.value = data.data.data.createTime
    articleTitle.value = data.data.data.articleTitle
  } catch (error) {
    content.value = ''
    console.log(error)
  }
}

export default () => {
  return {
    content,
    AarData,
    Loading,
    articleTitle,
    createTime,
  }
}

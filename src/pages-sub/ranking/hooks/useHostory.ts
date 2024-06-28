import { hostoryList, RankList } from '../types/types'

const hList = ref<hostoryList[]>([
  {
    id: 1,
    time: '0.03',
    name: '张三',
    score: 100,
    label: '不合格',
    date: '2024:02020',
  },
  {
    id: 2,
    time: '0.03',
    name: '张三',
    score: 100,
    label: '合格',
    date: '2024:02020',
  },
])
const RList = ref<RankList[]>([
  {
    id: 1,
    rank: 1,
    time: '100',
    name: '张三',
    avatar: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
    score: 100,
    label: '不合格',
    date: '2024:02020',
  },
  {
    id: 2,
    rank: 2,
    time: '100',
    name: '张三',
    avatar: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
    score: 100,
    label: '合格',
    date: '2024:02020',
  },
  {
    id: 3,
    rank: 3,
    time: '100',
    name: '张三',
    avatar: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
    score: 100,
    label: '合格',
    date: '2024:02020',
  },
  {
    id: 4,
    rank: 4,
    time: '100',
    name: '张三',
    avatar: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
    score: 100,
    label: '合格',
    date: '2024:02020',
  },
])

export default () => {
  return {
    hList,
    RList,
  }
}

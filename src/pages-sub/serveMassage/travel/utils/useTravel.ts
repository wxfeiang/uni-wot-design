const list = {
  content: [
    {
      name: '北戴河',
      address: '河北省秦皇岛市北戴河区',
      latitude: '39.8565',
      longitude: '119.5965',
      description:
        '北戴河是河北省著名的海滨旅游胜地，拥有美丽的海滨风光、丰富的自然资源和悠久的历史文化。这里的海滩、岛屿、森林、温泉等资源丰富，是休闲度假、避暑疗养的好去处。',
      image_url: 'http://example.com/images/beidaihe.jpg',
      distance: '100km',
    },
    {
      name: '承德避暑山庄',
      address: '河北省承德市双桥区',
      latitude: '40.9925',
      longitude: '117.9338',
      description:
        '承德避暑山庄是中国现存规模最大、保存最完整的古代皇家园林之一，被誉为“皇家园林博物馆”。山庄内建筑精美、景色秀丽，是了解中国古代园林文化和历史的重要场所。',
      image_url: 'http://example.com/images/bishushanzhuang.jpg',
      distance: '200km',
    },
    {
      name: '野三坡',
      address: '河北省保定市涿鹿县',
      latitude: '40.4167',
      longitude: '115.1947',
      description:
        '野三坡是河北省著名的自然风景区，拥有丰富的自然资源和独特的地貌景观。这里山清水秀、空气清新，是休闲度假、徒步探险的好去处。',
      image_url: 'http://example.com/images/yesanpo.jpg',
      distance: '300km',
    },
    {
      name: '石家庄动物园',
      address: '河北省石家庄市桥东区',
      latitude: '38.0427',
      longitude: '114.5147',
      description:
        '石家庄动物园是河北省最大的动物园之一，拥有丰富的动物资源和优美的园林景观。这里可以观赏到各种珍稀动物，是家庭游园、亲子活动的理想场所。',
      image_url: 'http://example.com/images/shijiazhuangzoo.jpg',
      distance: '400km',
    },
    {
      name: '张家口草原天路',
      address: '河北省张家口市崇礼区',
      latitude: '40.9767',
      longitude: '115.2667',
      description:
        '张家口草原天路是中国最长的草原观光道路，全长约150公里。这里风景秀丽、草原广阔，是摄影爱好者和游客的绝佳去处。',
      image_url: 'http://example.com/images/zhangjiakoutianlu.jpg',
      distance: '500km',
    },
    {
      name: '秦皇岛山海关',
      address: '河北省秦皇岛市山海关区',
      latitude: '39.935',
      longitude: '119.8647',
      description:
        '山海关是河北省著名的古长城遗址，被誉为“天下第一关”。这里历史悠久、风光秀丽，是了解中国古代军事文化和历史的重要场所。',
      image_url: 'http://example.com/images/shanhaiguan.jpg',
      distance: '600km',
    },
    {
      name: '保定白洋淀',
      address: '河北省保定市安新县',
      latitude: '38.8633',
      longitude: '115.8333',
      description:
        '白洋淀是河北省著名的湖泊风景区，拥有丰富的自然资源和独特的湿地景观。这里水乡风光、芦苇荡、荷花田等资源丰富，是休闲度假、摄影拍摄的好去处。',
      image_url: 'http://example.com/images/baiyangdian.jpg',
      distance: '700km',
    },
    {
      name: '秦皇岛南戴河',
      address: '河北省秦皇岛市南戴河区',
      latitude: '39.8565',
      longitude: '119.5965',
      description:
        '南戴河是河北省著名的海滨旅游胜地，拥有美丽的海滨风光、丰富的自然资源和悠久的历史文化。这里的海滩、岛屿、森林、温泉等资源丰富，是休闲度假、避暑疗养的好去处。',
      image_url: 'http://example.com/images/nandahe.jpg',
      distance: '800km',
    },
    {
      name: '承德围场',
      address: '河北省承德市围场满族蒙古族自治县',
      latitude: '41.9333',
      longitude: '117.5',
      description:
        '承德围场是河北省著名的草原风景区，拥有广阔的草原、丰富的自然资源和独特的草原文化。这里风景秀丽、空气清新，是休闲度假、摄影拍摄的好去处。',
      image_url: 'http://example.com/images/weichang.jpg',
      distance: '900km',
    },
    {
      name: '石家庄正定古城',
      address: '河北省石家庄市正定县',
      latitude: '38.155',
      longitude: '114.5333',
      description:
        '正定古城是河北省著名的古城遗址，拥有悠久的历史文化。这里古城墙、古建筑、古文化遗址等资源丰富，是了解中国古代历史文化的理想场所。',
      image_url: 'http://example.com/images/zhengding.jpg',
      distance: '1000km',
    },
  ],
}
const imgArr = [
  'https://oss.xay.xacloudy.cn/images/2024-10/22032577-a5ee-44a5-b055-cee34ae08c0bu=3074202952,204896178&fm=30&app=106&f=JPEG.jpeg',
  'https://oss.xay.xacloudy.cn/images/2024-10/0ccd9953-05f5-4cf5-861f-bcb0f95756e9u=3522462542,161652011&fm=30&app=106&f=JPEG.jpeg',
  'https://oss.xay.xacloudy.cn/images/2024-10/2c5fb9bb-c4ac-40b1-9e44-f856ebe6108e下载.jpeg',
]

export default () => {
  return {
    list,
    imgArr,
  }
}

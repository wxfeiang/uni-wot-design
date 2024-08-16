import { pathToBase64 } from 'image-tools'

export function upLoadImg() {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: async (res) => {
        console.log('🍝[res]:', res)
        if (res.tempFiles[0].size > 1024 * 80) {
          return resolve('图片大小不能超过80KB')
        }

        const photoBase64 = await pathToBase64(res.tempFilePaths[0])
        const data = {
          photoBase64,
          url: res.tempFilePaths[0],
        }
        return resolve(data)
      },
    })
  })
}

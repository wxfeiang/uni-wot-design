/**
 * @description: 直接调用系统登录
 * @return {}
 */

const login = () => {
  uni.login({
    provider: 'weixin', // 使用微信登录
    success: function (loginRes) {
      console.log(loginRes)
      uni.getUserInfo({
        provider: 'weixin',
        success: function (infoRes) {
          console.log('🍤[infoRes]:', infoRes)
          console.log('用户昵称为：' + infoRes.userInfo.nickName)
        },
      })
    },
    fail(result) {
      console.log('🍑[result]:', result)
    },
  })
}

export default () => {
  return {
    login,
  }
}

<template>
  <view class="bigBox">
    <view class="box">
      <!-- back -->
      <camera device-position="back" flash="off" @error="error" class="facevideo"></camera>
      <view class="cover-box">
        <view class="top top1"></view>
        <view class="left left1"></view>
        <view class="center">
          <view class="loading" v-show="fontShow">{{ fontMes }}</view>
          <img :src="src" alt="" :show="isShow" class="img" />
        </view>
        <view class="left"></view>
        <view class="bottom">
          <view class="btn-box">
            <view class="camera" @click="getPictur" v-show="btnShow">
              <view class="cemera-btn"></view>
            </view>
            <view style="display: flex; align-items: center">
              <button type="default" class="btn" @click="reGetPictur" v-show="!btnShow">
                重拍
              </button>
              <button type="primary" class="btn" @click="surePictur" v-show="!btnShow">确认</button>
            </view>
          </view>
        </view>
      </view>
      <canvas canvas-id="myCanvas" id="aa"></canvas>
    </view>
  </view>
</template>
<script>
// import { pathToBase64 } from 'image-tools'
// export default {
//   data() {
//     return {
//       path: this.api.VUE_APP_API_IMG + '/uploads/uni-app/logo.png',
//       canvasH: '',
//       canvasW: '',
//       src: '',
//       isShow: false,
//       fontShow: false,
//       fontMes: '拍摄中...',
//       btnShow: true,
//       isReadMes: true, // 当识别失败后，阻止未重拍行为，请求后台识别
//       type: 'face', // 拍摄身份证的正反面
//     }
//   },
//   onLoad(opt) {
//     this.type = opt.type == 1 ? 'face' : 'back'
//   },
//   methods: {
//     surePictur() {
//       this.fontMes = '正在识别中...'
//       this.fontShow = true
//       if (!this.isReadMes) {
//         this.fontMes = '未识别到有效信息'
//         return
//       } else {
//       }
//       this.getCrdMes(this.src)
//     },
//     reGetPictur() {
//       this.fontMes = '正在识别中...'
//       this.src = ''
//       this.btnShow = true
//       this.fontShow = false
//       this.isReadMes = true
//     },
//     getPictur() {
//       const _this = this
//       this.fontShow = true
//       this.btnShow = false
//       const camera = uni.createCameraContext()
//       camera.takePhoto({
//         quality: 'high',
//         success: function (mes) {
//           console.log('拍照成功了')
//           console.log(mes)
//           _this.getImagePortion(mes.tempImagePath)
//         },
//         fail: function (err) {
//           console.log('拍照失败了')
//           console.log(err)
//         },
//       })
//     },
//     getImagePortion(src, newWidth, newHeight, startX, startY, ratio) {
//       // src = this.api.VUE_APP_API_IMG + '/uploads/uni-app/logo.png';
//       const _this = this
//       uni.getImageInfo({
//         src,
//         success: (res) => {
//           const ctx = wx.createCanvasContext('myCanvas', _this)
//           ctx.drawImage(res.path, 0, 0, res.width, res.height)
//           ctx.draw()
//           console.log('执行完了')
//           const info0 = uni.createSelectorQuery().in(_this).select('.facevideo')
//           const info1 = uni.createSelectorQuery().in(_this).select('.top1')
//           const info2 = uni.createSelectorQuery().in(_this).select('.left1')
//           const FLAG = {
//             flag1: false,
//             flag2: false,
//             flag3: false,
//           }
//           const _info0 = {
//             height: 0,
//             width: 0,
//           }
//           const _info1 = {
//             height: 0,
//             width: 0,
//           }
//           const checkFlag = function () {
//             if (FLAG.flag1 && FLAG.flag2 && FLAG.flag3) _this.getImg(res, _info0, _info1)
//           }
//           info0
//             .boundingClientRect(function (data) {
//               _info0.width = data.width
//               _info0.height = data.height
//               FLAG.flag1 = true
//               checkFlag()
//             })
//             .exec(function (res) {
//               // 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
//             })
//           info1
//             .boundingClientRect(function (data) {
//               _info1.height = data.height
//               FLAG.flag2 = true
//               checkFlag()
//             })
//             .exec(function (res) {
//               // 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
//             })
//           info2
//             .boundingClientRect(function (data) {
//               _info1.width = data.width
//               FLAG.flag3 = true
//               checkFlag()
//             })
//             .exec(function (res) {
//               // 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
//             })
//         },
//         fail: (err) => {
//           console.log(err)
//         },
//       })
//     },
//     getImg(mes, _info0, _info1) {
//       const _this = this
//       const image_x = parseInt(mes.width * (_info1.width / _info0.width))
//       const image_y = parseInt(mes.height * (_info1.height / _info0.height))
//       const image_width = parseInt(mes.width * (300 / _info0.width))
//       const image_height = parseInt(mes.height * (475 / _info0.height))
//       uni.canvasToTempFilePath({
//         canvasId: 'myCanvas',
//         x: image_x,
//         y: image_y,
//         width: image_width,
//         height: image_height,
//         destWidth: image_width,
//         destHeight: image_height,
//         success: function (res) {
//           console.log(res)
//           _this.isShow = true
//           _this.src = res.tempFilePath
//           _this.fontShow = false
//           // _this.getCrdMes(res.tempFilePath);
//         },
//         fail: function (e) {
//           uni.hideLoading()
//           uni.showToast({
//             title: '出错啦...',
//             icon: 'loading',
//           })
//         },
//       })
//     },
//     getCrdMes(data) {
//       // 调用阿里巴巴的接口，识别身份证中的信息
//       const _this = this
//       console.log(_this.type)
//       pathToBase64(data)
//         .then((base64) => {
//           // console.log('11', base64)
//           const str = base64.substring(base64.indexOf(',') + 1)
//           // console.log(str);
//           const json = {
//             image: str,
//             configure: {
//               side: _this.type,
//             },
//           }
//           uni.request({
//             url: 'https://cardnumber.market.alicloudapi.com/rest/160601/ocr/ocr_idcard.json', // 测试api
//             dataType: 'json',
//             // 注意APPCODE和AppCode之间一定要有个英文半角空格否则接口返回400
//             header: {
//               Authorization: 'APPCODE 你的AppCode', // APPCODE值
//             },
//             method: 'POST',
//             data: JSON.stringify(json),
//             success(res) {
//               if (res.statusCode == 463) {
//                 _this.fontMes = '未识别到有效信息'
//                 _this.btnShow = false
//                 _this.isReadMes = false
//               } else {
//                 _this.fontShow = false
//                 _this.back.call(_this, res, str)
//               }
//             },
//           })
//         })
//         .catch((error) => {
//           console.error(error)
//         })
//     },
//     back(mes, img_src) {
//       console.log(mes)
//       const eventChannel = this.getOpenerEventChannel()
//       mes.data.img_src = this.src
//       eventChannel.emit('getFaceMes', mes.data)
//       uni.navigateBack({
//         delta: 1,
//       })
//     },
//   },
// }
</script>
<style>
.bigBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
}

.cover-box {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.facevideo {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
}
#aa {
  position: absolute;
  top: 50000px;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  border: 1px solid #ff0024;
  /* opacity: 0; */
}

.camera-view {
  width: 100%;
  height: 100%;
}

.center {
  position: relative;
  box-sizing: content-box;
  float: left;
  width: 300px;
  height: 475px;
  border: 1px solid #eee;
}

.top {
  float: left;
  width: 100%;
  height: calc(100% - 475px - 150rpx);
  background: rgba(0, 0, 0, 0.3);
}
.bottom {
  float: left;
  width: 100%;
  height: calc(150rpx - 4rpx);
  background: rgba(0, 0, 0, 0.3);
}
.left {
  float: left;
  width: calc((100% - 302px) / 2);
  height: calc(475px + 2px);
  background: rgba(0, 0, 0, 0.3);
}

.img-box {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.img {
  width: 300px;
  height: 475px;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
}
.btn-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.camera {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  height: 100rpx;
  border: 1px solid #fff;
  border-radius: 90%;
}
.cemera-btn {
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 90%;
}
.btn:not(:first-child) {
  margin-left: 20rpx;
}
</style>

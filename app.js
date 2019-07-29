//app.js
App({
  onLaunch: function () {
    //设置token信息
    wx.setStorageSync('token', '9cd000e1-cca7-42ab-aa9a-ec56fe6f140b')
    wx.setStorageSync('client', 'H5-HRX')
  },
  globalData: {
    baseUrl: 'https://schep-cdn-stg.pingan.com.cn'
  },

  POST: function(url, params) {
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.baseUrl + url,
        method: 'post',
        data: params,
        header: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'token': wx.getStorageSync('token'),
          'client': wx.getStorageSync('client')
         },
        success: function (res) {
          resolve(res)
        },
        fail: function (e) {
          reject(res)
        }
      });  
    });
  }
})
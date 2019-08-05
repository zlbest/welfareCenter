//app.js
App({
  onLaunch: function () {
    //设置token信息
    wx.setStorageSync('token', '78dc6887-75d3-488a-8033-6cfb6ff5ba5a')
    wx.setStorageSync('client', 'H5-HRX')
    // wx.getSystemInfo({
    //   success(res) {
    //     if (/iOS/i.test(res.system)) {
    //       wx.setStorageSync('client', 'IOS')
    //     } else {
    //       wx.setStorageSync('client', 'Android')
    //     }
    //   }
    // })
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
        fail: function (res) {
          reject(res)
        }
      });  
    });
  }
})
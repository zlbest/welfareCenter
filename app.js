//app.js
App({
  onLaunch: function () {
    //设置token信息
    wx.setStorageSync('token', '93623ffd-d4c1-484c-a882-88aff88049c4')
    wx.setStorageSync('client', '0')
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
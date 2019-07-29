//app.js
App({
  onLaunch: function () {
    //设置token信息
    wx.setStorageSync('token', "176a585c-359d-42b8-bd99-c2f54b32af55")
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
          'client': '0'
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
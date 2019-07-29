// pages/exchangeFailed/exchangeFailed.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    goodsName: '',
    reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getFailedDetail();
  },

  //获取兑换失败详情
  getFailedDetail: function () {
    wx.showLoading({
      title: '加载中'
    });
    let that = this;
    app.POST('/schep-sns/sns/exchangeRecordDetailForApp', {
      recordNo: that.data.id
    }).then(res => {
      let data = res.data;
      if (data.responseCode == '0') {
        wx.hideLoading();
        that.setData({
          goodsName: data.curObj.goodsName,
          reason: data.curObj.rejectedReason
        });
      }else {
        wx.showToast({
          title: data.responseMsg || '',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
})
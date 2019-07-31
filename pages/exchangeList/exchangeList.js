// pages/exchangeList/exchangeList.js
var app = getApp();
Page({
  data: {
    coins: 99,
    pageSize: 5,
    pageIndex: 0,
    total: 0,
    exchangeList: []
  },
  getExchangeRecords() {/* 获取兑换记录 */
    if(this.data.pageIndex * this.data.pageSize > this.data.total){
      return
    }
    wx.showLoading({
      title: '加载中',
    });
    this.data.pageIndex++;
    app.POST('/schep-sns/sns/exchangeRecordForApp', {
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndex
    }).then((res) => {
      let data = res.data;
      if (data.responseCode == 0) {
        this.setData({ 
          total: data.total,
          exchangeList: [...this.data.exchangeList,...data.rows]
        })
      } else {
        wx.showToast({
          title: data.responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading();
    });
  }, 
  getCoins() {/* 获取时间币个数 */
    app.POST('/schep-sns/sns/getTimeCoinAbout', {})
    .then((res) => {
      let data = res.data;
      if (data.responseCode == 0) {
        this.setData({
          coins: data.curObj.expendTimeCoin
        })
      } else {
        wx.showToast({
          title: data.responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
    });
  }, 
  goDetail(e){
    console.log(e)
  },
  onLoad: function (options) {
    this.getExchangeRecords()
    this.getCoins()
  },
  onReachBottom: function () {
    this.getExchangeRecords()
  }
})
// pages/exchangeList/exchangeList.js
const app = getApp();
Page({
  data: {
    coins: 0,
    pageSize: 20,
    pageIndex: 0,
    total: 0,
    exchangeList: [],
    nomore: false
  },
  getExchangeRecords() {/* 获取兑换记录 */
    if(this.data.pageIndex * this.data.pageSize > this.data.total){
      this.setData({
        nomore: true
      })
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
          coins: data.curObj.expendTimeCoin ? data.curObj.expendTimeCoin : '-'
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
    if (e.currentTarget.dataset.status == '3'){
      wx.navigateTo({
        url: '../exchangeFailed/exchangeFailed?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  onLoad: function (options) {
    this.getExchangeRecords()
    this.getCoins()
  },
  onReachBottom: function () {
    this.getExchangeRecords()
  }
})
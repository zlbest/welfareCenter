// pages/goodsList/goodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastTimeCoin: '-',
    pageIndex: 1,
    pageSize: 20,
    goodsList: [1],
    showLoading: true,
    loadingText: '加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳转兑换记录
  goExchangeList: function () {
    //wx.navigateTo({ url: '../exchangeList/exchangeList' });
  },

  //获取商品列表
  getGoodsList: function () {

    app.POST('',
      {
        
      }).then((res) => {
        wx.hideLoading();
        let data = res.data;
        if (data.errCode == 0) {
          that.setData({
            currency: data.records,
            current: data.records[0]
          });
          that.getData();
        }
      });
  },

  //获取页面数据
  getPageData: function () {
    wx.showLoading({
      title: '加载中'
    });
    let that = this;
  
  }
})
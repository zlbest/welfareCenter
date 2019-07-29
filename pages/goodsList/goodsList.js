// pages/goodsList/goodsList.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lastTimeCoin: '-',
    pageIndex: 0,
    pageSize: 20,
    allPages: 1,
    goodsList: [],
    showLoading: true,
    loadingText: '加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData();
  },

  //跳转兑换记录
  goExchangeList: function () {
    wx.navigateTo({ url: '../exchangeList/exchangeList' });
  },

  //获取商品列表
  getGoodsList: function () {
    if (this.data.pageIndex == this.data.allPages) {
      this.setData({
        loadingText: '没有更多了...'
      });
      wx.stopPullDownRefresh();
      return;
    }
    this.setData({
      pageIndex: this.data.pageIndex + 1
    });
    let that = this;
    app.POST('/schep-sns/sns/queryGoodsForApp',
      {
        pageSize: this.data.pageSize,
        pageIndex: this.data.pageIndex,
        showChannel: ''
      }).then(res => {
        wx.hideLoading();
        let data = res.data;
        if (data.responseCode == '0') {
          that.setData({
            goodsList: that.data.goodsList.concat(data.rows),
            allPages: Math.ceil(data.total/that.data.pageSize)
          });
          if(data.total == 0){
            that.setData({
              showLoading: false
            });
          }
          if (data.rows.length < that.data.pageSize) {
            that.setData({
              loadingText: '没有更多了...'
            });
          }
        }else {
          wx.showToast({
            title: data.responseMsg || '',
            icon: 'none',
            duration: 2000
          });
        }
      });
  },
  //跳转商品详情页
  getDetail: function (e) {
    wx.navigateTo({ url: '../goodsDetail/goodsDetail?goodsNo=' + e.target.dataset.id });
  },
  //获取页面数据
  getPageData: function () {
    wx.showLoading({
      title: '加载中'
    });
    let that = this;
    app.POST('/schep-sns/sns/getTimeCoinAbout',{})
    .then(res => {
      let data = res.data;
      if (data.responseCode == '0') {
        that.setData({
          lastTimeCoin: data.curObj.availableTimeCoin
        });
      }
    });
    that.getGoodsList();
  }
})
// pages/goodsList/goodsList.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lastTimeCoin: '-', //剩余时间币
    pageIndex: 0, //页码
    pageSize: 20, //页数
    allPages: 1, //总页数
    goodsList: [], //商品列表
    showLoading: true, //列表加载
    loadingText: '加载中...',
    loading: true, //页面加载
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
        pageIndex: this.data.pageIndex
      }).then(res => {
        let data = res.data;
        if (data.responseCode == '0') {
          that.setData({
            goodsList: Array.isArray(data.rows) ? that.data.goodsList.concat(data.rows):[],
            allPages: Math.ceil(data.total/that.data.pageSize)
          });
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
        that.setData({
          loading: false
        });
      });
  },
  //跳转商品详情页
  getDetail: function (e) {
    wx.navigateTo({ url: '../goodsDetail/goodsDetail?goodsNo=' + e.currentTarget.dataset.id });
  },
  //获取页面数据
  getPageData: function () {
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
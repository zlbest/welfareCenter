// pages/goodsDetail/goodsDetail.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //商品id
    goodsPic: '', //商品图片
    goodsName: '', //商品名称
    goodsPrice: '-', //商品价格
    goodsStore: '-', //商品库存
    goodsDetail: '', //商品详情内容
    exchangeDetail: '', //兑换说明内容
    isAbleExchange: false, //商品能够兑换
    showConfirm: false, //显示确认兑换
    loading: true, //页面加载
    isExchanging: false, //确认兑换防重
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.goodsNo
      //id: '01225'
    });
    this.getGoodsDetail();
  },

  //获取商品详情
  getGoodsDetail: function () {
    let that = this;
    app.POST('/schep-sns/sns/queryGoodsDetailForApp', {
      goodsNo: that.data.id
    }).then(res => {
      that.setData({
        loading: false
      });
      const data = res.data.curObj;
      if (res.data.responseCode == '0') {
        that.setData({
          goodsPic: data.pictureUrl,
          goodsName: data.goodsName,
          goodsPrice: parseFloat(data.exchangePrice).toFixed(2),
          goodsStore: data.availableNum,
          isAbleExchange: data.availableNum <= 0 ? false:true,
          goodsDetail: data.goodsDetail && decodeURI(data.goodsDetail),
          exchangeDetail: data.exchangeInstructions && decodeURI(data.exchangeInstructions)
        });
        WxParse.wxParse('article1', 'html', that.data.goodsDetail, that, 5);
        WxParse.wxParse('article2', 'html', that.data.exchangeDetail, that, 5);
        
      } else {
        wx.showToast({
          title: data.responseMsg || '',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  //切换确认兑换
  toggleConfirm: function () {
    this.setData({
      showConfirm: !this.data.showConfirm
    });
  },
  //兑换商品
  goExchange: function () {
    if(this.data.isExchanging) return;
    let that = this;
    that.setData({
      isExchanging: true
    });
    app.POST('/schep-sns/sns/exchangeCheck', {
      goodsNo: that.data.id,
      exchangeNum: 1
    }).then(res => {
      const data = res.data;
      if (res.data.responseCode == '0') {
        wx.navigateTo({ url: '../receiverAddress/receiverAddress?goodsNo='+that.data.id });
        setTimeout(() => {
          that.setData({
            showConfirm: false
          });
        }, 500);
      }else {
        wx.showToast({
          title: data.responseMsg || '',
          icon: 'none',
          duration: 2000
        });
      }
      that.setData({
        isExchanging: false
      });
    });
  },
  //已兑完提示
  disableExchange: function () {
    wx.showToast({
      title: '真遗憾,该商品已兑完了~',
      icon: 'none',
      duration: 2000
    });
  }
})
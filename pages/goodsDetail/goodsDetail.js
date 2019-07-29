// pages/goodsDetail/goodsDetail.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail();
  },

  //获取商品详情
  getGoodsDetail: function () {
    let article = '<div>我是HTML代码</div>';
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    let that = this;
    WxParse.wxParse('article1', 'html', article, that, 5);
    WxParse.wxParse('article2', 'html', article, that, 5);
  }
})
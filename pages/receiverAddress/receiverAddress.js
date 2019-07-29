// pages/receiverAddress/receiverAddress.js
Page({
  data: {
    name: '',
    phone: '',
    address: '',
    detail: '',
    ableToSubmit: false,
    region: ['', '', ''],
    customItem: '全部',
    showAddressPop: false,//显示地址确认弹窗
  },
  setName(e) {
    this.setData({
      name: e.detail.value
    });
    this.setSubmit()
  },
  setPhone(e) {
    this.setData({
      phone: e.detail.value
    });
    this.setSubmit()
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    this.setSubmit()
  },
  setDetail(e) {
    this.setData({
      detail: e.detail.value
    });
    this.setSubmit()
  },
  setSubmit(){//检查输入项-控制按钮变化
    if (this.data.name && this.data.phone && this.data.region[0] && this.data.detail) {
      this.setData({
        ableToSubmit: true
      });
    } else {
      this.setData({
        ableToSubmit: false
      });
    }
  },
  displayAddressPop(){//地址确认弹窗切换
    this.setData({
      showAddressPop: !this.data.showAddressPop
    });
  },
  goConfirm() {//输入内容完毕提交
    let phoneReg = /^1[3-9]\d{9}$/;
    if (this.data.name && phoneReg.test(this.data.phone) && this.data.region[0] && this.data.detail) {
      this.displayAddressPop()
    }else{
      wx.showToast({
        title: '提交失败，存在格式项不符~',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
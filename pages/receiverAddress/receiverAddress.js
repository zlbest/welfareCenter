// pages/receiverAddress/receiverAddress.js
const app = getApp();
Page({
  data: {
    id: '',
    name: '',
    phone: '',
    region: ['', '', ''],
    detail: '',
    ableToConfirm: false,
    truePhone: '',
    code: '',
    timer: '',
    tick: 0,
    ableToSubmit: false,
    showAddressPop: false,//显示地址确认弹窗
    showSecurePop: false,//安全验证弹窗
    secureText: '发送验证码',
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
  setCode(e) {
    this.setData({
      code: e.detail.value
    });
    this.setSubmit1()
  },
  setSubmit(){//检查输入项-控制按钮变化
    if (this.data.name && this.data.phone && this.data.region[0] && this.data.detail) {
      this.setData({
        ableToConfirm: true
      });
    } else {
      this.setData({
        ableToConfirm: false
      });
    }
  },
  setSubmit1() {//检查输入项-控制按钮变化
    if (this.data.truePhone && this.data.code) {
      this.setData({
        ableToSubmit: true
      });
    } else {
      this.setData({
        ableToSubmit: false
      });
    }
  },
  getCode() {/* 获取验证码 */
    app.POST('/schep-member/member/generateOTPAfterLogin', {
      templetId: 'KJ180206002',
      phone: this.data.truePhone
    }).then((res) => {
      let data = res.data;
      if (data.responseCode == 0) {
        this.setData({ tick: 10 });
        this.data.timer = setInterval(() => {
          this.setData({ tick: this.data.tick - 1 });
          if (this.data.tick == 0) {
            clearInterval(this.data.timer);
            this.setData({
              secureText: '重新发送'
            })
          }
        }, 1000);
      } else {
        wx.showToast({
          title: data.responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
    });
  }, 
  displayAddressPop(){//地址确认弹窗切换
    this.setData({
      showAddressPop: !this.data.showAddressPop
    });
  },
  displaySecurePop() {//安全验证弹窗切换
    this.setData({
      showSecurePop: !this.data.showSecurePop
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
  goSecure() {//弹出安全验证弹窗
    this.displayAddressPop()
    this.displaySecurePop()
    app.POST('/schep-member/member/queryUserByUserId', {})
    .then((res) => {
      let data = res.data;console.log(res);
      if (data.responseCode == 0) {
        this.setData({ truePhone: data.telephone });
      } else {
        wx.showToast({
          title: data.responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  goSubmit() {//提交订单
    wx.showLoading({
      title: '加载中',
    });
    app.POST('/schep-sns/sns/exchangeGoods', {
      goodsNo: this.data.id,
      exchangeNum: 1,
      receiverName: this.data.name,
      receiverTelephone: this.data.phone,
      areaCode: '0086',
      receiverAddressCounry: '中国',
      receiverAddressProvince: this.data.region[0],
      receiverAddressCity: this.data.region[1],
      receiverAddressCounty: this.data.region[2],
      receiverAddressStreet: this.data.detail,
      phonecode: this.data.code,
      templetId: 'KJ180206002'
    }).then((res) => {
      let data = res.data; console.log(res);
      if (data.responseCode == '0') {
        wx.showToast({
          title: '恭喜，商品兑换成功!',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
      } else if (data.responseCode == '101004'){
        wx.showToast({
          title: '验证码有误，请重新填写',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: data.responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading();
    });
  },
  onLoad: function (options) {
    this.setData({
      id: options.goodsNo
    })
    console.log(this.data.id)
  }
})
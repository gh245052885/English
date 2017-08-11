// pages/coach/coach.js

var history = require("../../utils/history.js");

Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    dtStart: '2017-02-10',
    dtEnd: '2017-03-10',
    dates: '2016-11-08',
    city:"上海",
    cityEnd:"上海"
  },
  bindCity: function () {
    console.log("bindViewTap var")
    wx.navigateTo({
      url: '../city/city?type=1'
    })
  }, 
  bindCityEnd: function() {
   
    wx.navigateTo({
      url: '../city/city?type=2'
    })
  }, 
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },  
  confirm_one: function (e) {
    console.log(e);
    console.log("confirm_one");
    this.setData({
      modalHidden: true,
      notice_str: '提交成功'
    });
  }, 
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },  
  formSubmit: function (e) {
    var that = this;
    var tokend = wx.getStorageSync('tokend')
    var name2 = e.detail.value;         //获取input初始值
    var ID_num2 = e.detail.value.ID_num2;    //获取input初始值
    console.log("e.detail.value:" + e.detail.value)
    console.log("name2:"+name2)
    var name = that.data.name ? that.data.name : name2    //三元运算，如果用户没修改信息，直接提交原来的信息，如果用户修改了信息，就将修改了的信息和未修改过的信息一起提交
    var ID_num = that.data.ID_num ? that.data.ID_num : ID_num2
    wx.request({
      method: 'POST',
      url: 'https://....?token=' + tokend, //接口地址
      data: {
        'name': name,
        'ID_num': ID_num
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.showToast({
          title: '资料修改成功',
          image: '../Image/suess.png',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index',
          })
        }, 2000)

      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      coachHistories: history.coach
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
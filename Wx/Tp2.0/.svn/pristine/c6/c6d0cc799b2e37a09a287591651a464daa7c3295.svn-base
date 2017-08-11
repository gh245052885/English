// pages/coach/coach.js

var history = require("../../utils/history.js");

Page({
  data: {
    dtstart: '2017-02-10',
    dtEnd: '2017-03-10',
    dates: '2016-11-08',
    city:"SH"
  },
  bindViewTap: function () {
    console.log("bindViewTap var")
    wx.navigateTo({
      url: '../city/city'
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
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
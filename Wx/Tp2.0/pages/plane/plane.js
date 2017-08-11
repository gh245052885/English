var url = "http://www.imooc.com/course/ajaxlist";
var imageUrl = "./images/tabbar/plane.png";
var page = 0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.info(that.data.list);
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}
var MyGetListByID = function (that, index) {
  var list = [];
  for (var i = 0; i < that.data.array.length; i++) {
    if (index != i) {
      list.push(that.data.array[i]);
    }
  }
  that.setData({
    myarray: list
  });
};


var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "A10010",
      answer: 134,
      listen: 2234,
      hidden: true
    }],
    imageUrl: imageUrl,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    text: "ddd",
    lbldtStart: "出发日期:",
    lbldtEnd:"结束日期:",
    myarray: [],
    array: [{
      qstatus:"申请中",message: 'foo1', dtStart: "2017-02-10", dtEnd: "2017-03-10", addStart: "上海", addEnd:"苏州",way:"江苏-湖南-湖北"
    }, {
        qstatus: "申请中",   message: 'foo2', dtStart: "2017-02-30", dtEnd: "2017-09-10", addStart: "上海", addEnd: "湘江", way: "江苏-湖南-湖北"
    }, {
        qstatus: "制作中",   message: 'foo3', dtStart: "2017-02-20", dtEnd: "2017-12-10", addStart: "上海", addEnd: "宁波", way: "江苏-湖南-湖北"
    }, {
        qstatus: "已成功",  message: 'foo4', dtStart: "2017-07-10", dtEnd: "2017-11-10", addStart: "上海", addEnd: "杭州", way: "江苏-湖南-湖北"
    }, {
        qstatus: "申请中",   message: 'bar5', dtStart: "2017-12-10", dtEnd: "2017-08-10", addStart: "上海", addEnd: "郑州", way: "江苏-湖南-湖北"
    }
    ]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      text: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    var that = this;
    if (this.data.currentTaB == cur) { return false; }
    else {
      MyGetListByID(that, cur);
      this.setData({
        currentTab: cur,
        text: e.target.dataset.current
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
    MyGetListByID(that,0);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  footerTap: app.footerTap
})
var utils = require('../../utils/util.js')
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips:false,
    data_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     


  },


  change:function(event){
      var id = event.currentTarget.dataset.id
      wx.navigateTo({
          url: '../myjoin/myjoin?join_id=' + id,
      })
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
      var that = this
      //渲染加入的签到列表
      wx.request({
          url: 'https://tadcap.com/getUserJoinProject?userId=' + app.data.userId,
          success: function (res) {
              console.log(res);
              if (res.data.length === 0 || res.statusCode != 200) {
                  that.setData({
                      tips: true
                  })
              }
              else {
                  //帅极了的模块，处理时间
                  var a = res.data
                  var j = a.length
                  console.log(a.length)
                  var timestamp = Date.now();
                  for (let i = 0; i < j; i++) {
                      a[i].start_time = new Date(parseInt(a[i].start_time)).toLocaleString().replace(/:\d{1,2}$/, ' ');

                      if (timestamp > a[i].end_time) {
                          a[i].end_time = '已结束'
                          a[i].flag = 'top-le'
                          a[i].creator = '/images/icon/ent.png'
                      }
                      else {
                          a[i].end_time = '进行中'
                          a[i].flag = 'top-left'
                          a[i].creator = '/images/icon/enter.png'
                      }
                  }
                  var dataList = a.reverse()
                  that.setData({
                      //隐藏欢迎提示
                      tips: false,
                      data_list: dataList
                  })
              }
          },
          fail:function(){
              that.setData({
                  //显示欢迎提示
                  tips: true
              })
          }
      })
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
  
  }
})
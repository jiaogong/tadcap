// pages/myjoin/myjoin.js
var utils = require('../../utils/util.js')
var app = getApp()

Page({

  data: {
    vue:{},
    time:'',
    id:0
  },



  share: function () {
      wx.navigateTo({
          url: '../share/share?id=' + this.data.id
      })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var join_id = options.join_id
    var that = this
    wx.request({
        url: 'https://tadcap.com/getProjectInfo?projectId=' + join_id,
        success: function (res) {
            //帅极了的模块，处理时间
            ///////////////
            console.log(99999)
            var time = new Date(parseInt(res.data.start_time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
            
            that.setData({
                vue:res.data,
                time:time,
                id: join_id
            })
        }
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
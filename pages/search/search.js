// pages/search/search.js
var utils = require('../../utils/util.js')
var app = getApp()

Page({

  data: {
    vue:{},
    time:'',
    id:0
  },


baoming:function(){
    wx.navigateTo({
        url: '../baoming/baoming?id=' + this.data.id,
    })
    
},

  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.request({
        url: 'http://115.159.22.122/KeDou/project/getProjectByProjectId',
        data: {
                projectId:id
        },
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            console.log(res)
            var time = utils.formatTime(new Date(res.data.result.startTime))
            console.log(time)
            console.log(666)
            that.setData({
                vue:res.data.result,
                time:time,
                id:id
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
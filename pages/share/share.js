// pages/share/share.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      vue: {},
      name: '',
      head : '',
      block:'a',
      time: '',
      dataList: [],
      num:0
  },

enter:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
        url: '../enter/enter?id=' + id,
    })
},


    formSubmit: function (event) {

        

    },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    var id = options.id
    var that = this
    wx.request({
        url: 'https://tadcap.com/getProjectInfo?projectId=' + id,
        success: function (res) {
            // //把时间转化成能看的
            var begin = res.data.start_time
            var time = new Date(parseInt(begin) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
            that.setData({
                vue:res.data,
                time:time,
                name:app.globalData.userInfo.nickName,
                head: app.globalData.userInfo.avatarUrl
            })
        }
    })
    ///
    wx.request({
        url: 'https://tadcap.com/getJoinerInfo?projectId=' + id,
        success: function (res) {
            console.log(12121298323)
            console.log(res)
        
            if (res.data.length === 0) {
                that.setData({
                    num:0
                })
            }
            else{
                var dataList = []
                for(let j = 0; j<res.data.length; j++){
                        dataList.push(res.data[j].avatar)
                }
                console.log(dataList)
                that.setData({
                    num: res.data.length,
                    dataList:dataList
                })
            }
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
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
      num:23
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
            // //把时间转化成能看的
            var begin = res.data.result.startTime
            var time = utils.formatTime(new Date(begin))
            that.setData({
                vue:res.data.result,
                time:time,
                name:app.globalData.userInfo.nickName,
                head: app.globalData.userInfo.avatarUrl
            })
        }
    })
    ///
    wx.request({
        url: 'http://115.159.22.122/KeDou/user/getJoinerOfProject',
        data: {
            projectId: id,
        },
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            console.log(12121298323)
            console.log(res)
            var key = String(res.data.code)
            if (key.charAt(key.length - 1) != 1) {
                that.setData({
                    num:0
                })
            }
            else{
                var dataList = []
                for(let j = 0; j<res.data.resultList.length; j++){
                        dataList.push(res.data.resultList[j].image)
                }
                console.log(dataList)
                that.setData({
                    num: res.data.resultList.length,
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
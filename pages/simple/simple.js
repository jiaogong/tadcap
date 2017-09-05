// pages/simple/simple.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    vue:{},
    time:''

  },

share:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
        url: '../share/share?id=' + id,
    })
},

//删除签到
    dell:function(event){
        var id = event.currentTarget.dataset.id
        wx.showModal({
            title: '确认删除这个签到？',
            content: '此操作会删除这个签到的所有数据',
            confirmColor:'#FF0002',
            success(e){
                if(e.confirm){
                var that = this
                wx.request({
                    url: 'http://115.159.22.122/KeDou/project/deleteProjectByProjectId',
                    data: {
                        projectId:id
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        wx.showToast({
                            title: '删除成功',
                            duration:1000,
                            success:function(){
                                wx.navigateBack({})
                            }
                        })
                    }
                })
                }
            }
        })
    },

change:function(){
    wx.navigateTo({
        url: '../register/register',
    })

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

////////////////
            that.setData({
                vue:res.data.result,
                time:time
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
  
  }
})
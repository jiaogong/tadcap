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
                    url: 'https://tadcap.com/delete?projectId=' + id,
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
        url: 'https://tadcap.com/getProjectInfo?projectId=' + id,
        success: function (res) {
            console.log(res);
            //把时间转化成能看的
            var begin = res.data.start_time;
            var time = new Date(parseInt(begin) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');;
            that.setData({
                vue:res.data,
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
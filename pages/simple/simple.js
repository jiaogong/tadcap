// pages/simple/simple.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    vue:{},
    time:'',
    projectId:null,
    qrflag:false
  },

share:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
        url: '../share/share?id=' + id,
    })
},

getQRcode:function(){
    let that = this;
    wx.navigateTo({
        url: '/pages/qrcode/qrcode?id=' + that.data.projectId + '&name=' + that.data.vue.project_name + '&endTime=' + that.data.vue.end_time
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
    this.setData({
        projectId:id
    });
    var that = this
    wx.request({
        url: 'https://tadcap.com/getProjectInfo?projectId=' + id,
        success: function (res) {
            console.log(res);
            let flag;
            if(res.data.qrcode === 1){
                flag = true;
            }
            else{
                flag = false;
            }
            //把时间转化成能看的
            var begin = res.data.start_time;
            var time = new Date(parseInt(begin)).toLocaleString().replace(/:\d{1,2}$/, ' ');;
            that.setData({
                vue:res.data,
                time:time,
                qrflag:flag
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
  onShareAppMessage(){
      return {
          title: '你有一个新的签到，请查收',
          path: '/pages/share/share?id=' + this.data.projectId,
          success: function (res) {
              // 转发成功
          },
          fail: function (res) {
              // 转发失败
          }
      }
  }
})
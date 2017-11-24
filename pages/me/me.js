const app = getApp()

Page({
  data: {
    nickname:'点击头像登录',
    avatar: '/images/icon/noname.jpg'
  },
  jump1: function () {
      wx.navigateTo({
          url: '/pages/sign/sign',
      })
  },
  jump2: function () {
      wx.navigateTo({
          url: '/pages/publish/publish',
      })
  },
  jump3: function (event) {
      wx.navigateTo({
          url: '/pages/join/join',
      })
  },
  jump4: function () {
      wx.navigateTo({
          url: '/pages/help/help',
      })
  },
  jump5: function () {
      wx.navigateTo({
          url: '/pages/us/us',
      })

  },

login:function(){
    let that = this;
    wx.request({
        url: 'https://tadcap.com/getUserInfo?userId=' + app.globalData.userId,
        success: function (res) {
            that.setData({
                nickname: res.data.nickname,
                avatar: res.data.avatar
            });
        }
    });
    //调用wxlogin重新获取信息
    wx.login({
        success:function(res){
            wx.request({
                url: 'https://tadcap.com/getOpenid?code=' + res.code,
                success: function (res) {
                    app.globalData.userId = res.data.user_id;
                    //获取用户头像信息
                    wx.getUserInfo({
                        success: function (res) {
                            //设置全局变量
                            app.globalData.userInfo = res.userInfo;
                            //更新数据库用户头像和昵称
                            wx.request({
                                url:'https://tadcap.com/refreshUserInfo',
                                data:{
                                    nickname: app.globalData.userInfo.nickName,
                                    avatar: app.globalData.userInfo.avatarUrl,
                                    userId: app.globalData.userId
                                },
                                success: function (res) {
                                    console.log(res);
                                    that.setData({
                                        nickname: app.globalData.userInfo.nickName,
                                        avatar: app.globalData.userInfo.avatarUrl
                                    });
                                }
                            })
                        }
                    })

                }
            })
        }
    })
},

  onLoad: function (options) {
    let that = this;
    wx.request({
        url: 'https://tadcap.com/getUserInfo?userId=' + app.globalData.userId,
        success:function(res){
            that.setData({
                nickname: res.data.nickname,
                avatar: res.data.avatar
            });
        }
    })
    
    
  },


  onShow: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  }
})
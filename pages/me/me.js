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
    try {
        var value = wx.getStorageSync('nickname')
        if (value) {
            app.data.nickname = value
        }
    } catch (e) {
        // Do something when catch error
        console.log('读缓存失败');
    }
    try {
        var value = wx.getStorageSync('avatar')
        if (value) {
            app.data.avatar = value
        }
    } catch (e) {
        // Do something when catch error
        console.log('读缓存失败');
    }
    //更新头像昵称
    this.setData({
        nickname: app.data.nickname,
        avatar: app.data.avatar
    });
},

  onLoad: function (options) {
      let that = this;
      //判断要不要创建新用户
      if (app.data.userId == 'abcd') {
          //通过login获取code
          wx.login({
              success: function (res) {
                  //获取openid
                  wx.request({
                      url: 'https://tadcap.com/getOpenid?code=' + res.code,
                      success: function (res) {
                          let userId = res.data.user_id;
                          //获取用户昵称头像
                          wx.getUserInfo({
                              success: function (res) {
                                  let nickname = res.userInfo.nickName;
                                  let avatar = res.userInfo.avatarUrl;
                                  //创建用户
                                  wx.request({
                                      url: 'https://tadcap.com/register',
                                      data: {
                                          userId: userId,
                                          nickname: nickname,
                                          avatar: avatar
                                      },
                                      method: 'POST',
                                      header: {
                                          'content-type': 'application/json' // 默认值
                                      },
                                      success: function (res) {
                                          //把user_id存入缓存
                                          wx.setStorage({
                                              key: "userId",
                                              data: userId,
                                              success:function(res){
                                                  console.log('保存缓存成功');
                                              }
                                          });
                                          wx.setStorage({
                                              key: "nickname",
                                              data: nickname,
                                              success: function (res) {
                                                  console.log('保存缓存成功');
                                              }
                                          });
                                          wx.setStorage({
                                              key: "avatar",
                                              data: avatar,
                                              success: function (res) {
                                                  console.log('保存缓存成功');
                                              }
                                          })

                                      }
                                  })
                              }
                          })
                      }
                  })
              },
              fail: function () {
                  //去获取授权
                  wx.redirectTo({
                      url: '/pages/refuse/refuse',
                  })
              }
          })
      }
      else{
          console.log('不需要创建用户了！');
          //更新头像昵称
          that.setData({
              nickname:app.data.nickname,
              avatar:app.data.avatar
          });
      }
    
    
  },


  onShow: function () {
      this.setData({
          nickname: app.data.nickname,
          avatar: app.data.avatar
      });
  },

  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  }
})
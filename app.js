App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
      var that = this;

      //调用login判断要不要创建用户
      wx.login({
          success: function (res) {
              wx.request({
                  url: 'https://tadcap.com/getOpenid?code=' + res.code,
                  success: function (res) {
                      that.globalData.userId = res.data.user_id;
                      //获取用户头像信息
                      wx.getUserInfo({

                          success: function (res) {
                              //设置全局变量
                              that.globalData.userInfo = res.userInfo;
                              //更新数据库用户头像和昵称
                              wx.request({
                                  url: 'https://tadcap.com/refreshUserInfo?nickname=' + res.userInfo.nickName + '&avatar=' + res.userInfo.avatarUrl + '&userId=' + that.globalData.userId,
                                  success: function (res) {
                                      console.log('刷新头像昵称成功');
                                      
                                  }
                              })
                          }
                      })
            
                  }
              })
          }
      })



      
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },
  //全局变量
  globalData: {
      userInfo: null,
      code: null,
      userId: ''
  }
})


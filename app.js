App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
      let that = this;
    //从缓存拿信息判断
      wx.getStorage({
          key: 'userId',
          success: function (res) {
              that.data.userId = res.data;
          }
      });
      wx.getStorage({
          key: 'nickname',
          success: function (res) {
              that.data.nickname = res.data;
          }
      });
      wx.getStorage({
          key: 'avatar',
          success: function (res) {
              that.data.avatar = res.data;
          }
      })

      
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
      let that = this;
      //从缓存拿信息判断
      wx.getStorage({
          key: 'userId',
          success: function (res) {
              that.data.userId = res.data;
          }
      });
      wx.getStorage({
          key: 'nickname',
          success: function (res) {
              that.data.nickname = res.data;
          }
      });
      wx.getStorage({
          key: 'avatar',
          success: function (res) {
              that.data.avatar = res.data;
          }
      })
  },
  //全局变量
  data: {
      userId: 'abcd',
      nickname: 'abcd',
      avatar: 'abcd'
  }
})


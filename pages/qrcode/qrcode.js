var code = require('../../utils/wxqrcode.js')

Page({

  data: {
      qrcode: null,
      name:null
  },


  onLoad: function (options) {
      let id = options.id;
      let name = options.name;
      let endTime = options.endTime;
      let that = this;
      wx.showModal({
          title: '使用方法',
          content: '点击确认以后截图保存，在活动现场放置打印好的二维码',
          showCancel:false,
      })
      wx.request({
          url: 'https://tadcap.com/getQRcode',
          data: {
              projectId: id,
              endTime: endTime
          },
          success: function (res) {
              that.setData({
                  qrcode: res.data,
                  name:name
              });
          }
      })
  },


  onReady: function () {
  
  },


  onShow: function () {
     
  },


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
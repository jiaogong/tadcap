var code = require('../../utils/wxqrcode.js')

Page({

  data: {
      qrcode: null
  },


  onLoad: function (options) {
      this.setData({
          qrcode: code.createQrCodeImg('123', { 'size': parseInt(500) })
      })
  },


  onReady: function () {
  
  },


  onShow: function () {
      var token = 'LHdUegu6FDhVKyWtLyFrkEbvEQlXqJs61VesoaLWa0D_4a2o-pBLA_ZCJDEb1InlcuF1F6ksNqHEb9Q05uU8nqja9d1m6n6eUkC-HzbNEqLzFSpO_ucjP-bY-Mg8zKy1SUPdADAGID'
      var url = 'https://api.weixin.qq.com/wxa/getwxacode?access_token='+token
      var that = this
      //渲染创建的签到列表
      wx.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=LHdUegu6FDhVKyWtLyFrkEbvEQlXqJs61VesoaLWa0D_4a2o-pBLA_ZCJDEb1InlcuF1F6ksNqHEb9Q05uU8nqja9d1m6n6eUkC-HzbNEqLzFSpO_ucjP-bY-Mg8zKy1SUPdADAGID',
          data: {
              path:'pages/index/index'
          },
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
        console.log(res)
          }
      })
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
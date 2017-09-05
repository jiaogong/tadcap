// pages/publish/publish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        //活动名字
        name: '高等数学',
        //活动地点
        place: '上海',
        //活动时间
        start: '2017/07/10 ',
        end: ' 2017/08/30'
    },

    cut: function () {
        wx.showModal({
            title: '微信号复制成功',
            content: '粘贴到 “添加朋友” 即可添加我为好友',
            showCancel: false
        })
        wx.setClipboardData({
            data: 'Owen_tp',
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
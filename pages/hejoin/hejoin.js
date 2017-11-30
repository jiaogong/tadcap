// pages/myjoin/myjoin.js
var utils = require('../../utils/util.js')
var app = getApp()

Page({

    data: {
        vue: {},
        time: '',
        id: 0,
        txt: '订阅提醒',
        flag: false,
        infoflag: false,
        buttonflag: true
    },



    fork: function (e) {
        let that = this;
        that.setData({
            txt: '已订阅',
            buttonflag: true
        });
        wx.request({
            url: 'https://tadcap.com/fork',
            data: {
                projectId: that.data.id,
                userId: app.data.userId,
                formId: e.detail.formId
            },
            success: function (res) {
                console.log(res);
            }
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var join_id = options.id
        var that = this
        wx.request({
            url: 'https://tadcap.com/getProjectInfo?projectId=' + join_id,
            success: function (res) {
                let info = false;
                if (res.data.information != '') {
                    info = true;
                }
                var time = new Date(parseInt(res.data.start_time)).toLocaleString().replace(/:\d{1,2}$/, ' ');

                that.setData({
                    vue: res.data,
                    time: time,
                    id: join_id,
                    infoflag: info
                })
            }
        })

        //查看用户是否订阅过通知
        wx.request({
            url: 'https://tadcap.com/checkMessageFlag',
            data: {
                projectId: join_id,
                userId: app.data.userId
            },
            success: function (res) {
                let flg = true;
                let txt = '已订阅';
                if (res.data[0].message_flag === 0) {
                    flg = false;
                    txt = '订阅提醒'
                }
                that.setData({
                    buttonflag: flg,
                    txt: txt
                });
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

    }
})
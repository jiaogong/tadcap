var utils = require('../../utils/util.js')
var app = getApp()

Page({


    data: {
        tips: false,
        data_list: [],
        time:''
    },
    jump: function () {
        wx.navigateTo({
            url: '/pages/sign/sign',
        })
    },

simple:function(event){
    var project_id = event.currentTarget.dataset.id
    wx.navigateTo({
            url: '../simple/simple?id=' + project_id,
    })
},


    onLoad: function (options) {
        var that = this;
        //渲染创建的签到列表
        wx.request({
            url: 'http://115.159.22.122/KeDou/project/getProjectCreatedByUser',
            data: {
                userId: app.globalData.userId
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                var key = String(res.data.code)
                if (key.charAt(key.length - 1) != 1) {
                    that.setData({
                        tips: true
                    })
                }
                else {
                    //帅极了的模块，处理时间
                    ///////////////
                    //////////////////
                    console.log(res)
                    console.log(that.data.run)
                    var a= res.data.resultList
                    var j = a.length
                    var timestamp = Date.parse(new Date());              
                    for (let i = 0; i < j; i++){
                        console.log('第'+ i +'个结束时间时间戳' + a[i].endTime)
                        a[i].startTime = utils.formatTime(new Date(a[i].startTime))
                        if (timestamp > a[i].endTime){
                            a[i].endTime = '已结束'
                            a[i].hasUsed = 'top-le'
                            a[i].theCreator = '/images/icon/ent.png'
                        }
                        else{
                            a[i].endTime = '进行中'
                            a[i].hasUsed = 'top-left'
                            a[i].theCreator = '/images/icon/enter.png'   
                        }
                    }
                    var dataList = a.reverse()
                    that.setData({
                        //隐藏欢迎提示
                        tips: false,
                        data_list: dataList
                    })
                }
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
        this.onLoad()
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
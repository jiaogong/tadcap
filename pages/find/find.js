//logs.js
var app = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        projectId: 0,
        projectName: '',
        has_used: 0,
        tips:true,
        data_list: []
    },

//搜索项目ID函数
formsubmit:function(res){
    var project_id = res.detail.value.id
    wx.request({
        url: 'http://115.159.22.122/KeDou/project/getProjectByProjectId?projectId=' + project_id,
        success:function(res){
            console.log(res)
            var arr = res.data.code
            var key = arr.toString()
            key = key.charAt(key.length-1)
            console.log(key)
            if(key == 1)
            {
                wx.navigateTo({
                 url: '../search/search?id=' + project_id,
                 })
            }
            else{
                wx.showToast({
                    title: '没有这个项目',
                    duration:1000,
                    image:"/images/icon/error.png"
                })
            }
        }
    })
},



    scancode: function () {
        wx.scanCode({
            success: (res) => {
            }
        })
    },
    /////////////////////////
    shock: function (event) {
        var project_id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/register/register?id=' + project_id       
        })
    },
    ////////////////////////////////

    onLoad: function () {
        var that = this;
        //渲染创建的签到列表
        wx.request({
            url: 'http://115.159.22.122/KeDou/project/getProjectCreatedByUser',
            data: {
                    userId:app.globalData.userId
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                var key = String(res.data.code)
                if (key.charAt(key.length - 1) != 1){
                    that.setData({
                        tips: true
                    })
                }
                else{
                    var dataList = res.data.resultList
                    ///////////
                    var a = res.data.resultList
                    var j = a.length
                    var timestamp = Date.parse(new Date());
                    for (let i = 0; i < j; i++) {
                        if (timestamp > a[i].endTime) {
                            a[i].hasUsed = '/images/icon/gry.png'
                        }
                        else {
                            a[i].hasUsed = '/images/icon/green.png'
                        }
                    }
                    var dataList = a.reverse()
                    /////////
                    that.setData({
                        //隐藏欢迎提示
                        tips: false,
                        data_list: dataList
                    })
                }
            }
        })
        //////////渲染加入的签到列表
        // wx.request({
        //     url: 'http://115.159.22.122/KeDou/project/getProjectJoinIn',
        //     data: {
        //         userId: app.globalData.userId
        //     },
        //     method: 'POST',
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     success: function (res) {
        //         if (res.data.reslutList != []) {
        //             var add = res.data.resultList
        //             var old = that.data.data_list

        //             var dataList = old.concat(add)
        //             that.setData({
        //                 //隐藏欢迎提示
        //                 tips: false,
        //                 data_list: dataList
        //             })
        //         }
        //         else {
        //             that.setData({
        //                 tips: true
        //             })
        //         }
        //     }
        // })
    },
    onPullDownRefresh(event){
        setTimeout(wx.stopPullDownRefresh(),2500)
    },
    onShow: function () {
        this.onLoad()
        
    },
})

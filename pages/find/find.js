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
        url: 'https://tadcap.com/getProjectInfo?projectId=' + project_id,
        success:function(res){
            console.log(res.data);
            if(res.data.P_ID != null)
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
            onlyFromCamera: true,
            success: (res) => {
                if(res.result == '123'){
                    wx.showToast({
                        title: '签到成功！',
                    })
                }
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
            url: 'https://tadcap.com/getUserCreatedProject?userId=' + app.globalData.userId,        
            success: function (res) {
                if (res.data.length === 0){
                    that.setData({
                        tips: true
                    })
                }
                else{
                    var dataList = res.data
                    var a = res.data
                    var j = a.length
                    var timestamp = Date.parse(new Date());
                    for (let i = 0; i < j; i++) {
                        if (timestamp > a[i].end_time) {
                            a[i].creator = '/images/icon/gry.png'
                        }
                        else {
                            a[i].creator = '/images/icon/green.png'
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
    onPullDownRefresh(event){
        setTimeout(wx.stopPullDownRefresh(),2500)
    },
    onShow: function () {
        this.onLoad()
        
    },
})

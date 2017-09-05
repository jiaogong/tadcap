// pages/enter/enter.js
var app = getApp()
Page({

    data: {
        disable: false,
        id: 0,
        project_name: '',
        data_list: []
    },

    submit: function (e) {
        var diy1,diy2,diy3,diy4,diy5
        var that = this
        var iid = that.data.id
        wx.request({
            url: 'http://115.159.22.122/KeDou/statistics/insertStatistics',
            data: {
                projectId: that.data.id,
                userId: app.globalData.userId,
                diyValue1: e.detail.value.name,
                diyValue2: '',
                diyValue3: '',
                diyValue4: '',
                diyValue5: ''
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                that.setData({
                    disable: true
                })
                wx.showToast({
                    title: '报名成功',
                    duration: 1000,
                    success: function () {
                        wx.redirectTo({
                            url: '../hejoin/hejoin?id=' + iid,
                        })
                    }
                })
            }
        })
    },




    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var project_id = options.id;
        this.setData({
            id: project_id
        })
        ///
        wx.request({
            url: 'http://115.159.22.122/KeDou/project/getProjectByProjectId',
            data: {
                projectId: project_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                var dataList = []
                if (res.data.result.diyName1 == '姓名') {
                    dataList.push(res.data.result.diyName1)
                }
                if (res.data.result.diyName2 == '手机号') {
                    dataList.push(res.data.result.diyName2)
                }
                if (res.data.result.diyName3 != '自定义' && res.data.result.diyName3 != '未选中') {
                    dataList.push(res.data.result.diyName3)
                }
                if (res.data.result.diyName3 != '自定义' && res.data.result.diyName3 != '未选中') {
                    dataList.push(res.data.result.diyName4)
                }
                if (res.data.result.diyName3 != '自定义' && res.data.result.diyName3 != '未选中') {
                    dataList.push(res.data.result.diyName5)
                }
                that.setData({
                    data_list: dataList,
                    project_name: res.data.result.projectName
                })
                console.log(dataList)
                console.log(66666)
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

    }
})



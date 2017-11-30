// pages/enter/enter.js
var app = getApp()
Page({

    data: {
        disable: false,
        id: 0,
        project_name: '',
        data1:null,
        data2: null,
        data3: null,
        data4: null,
        data5: null,
        key1:false,
        key2: false,
        key3: false,
        key4: false,
        key5: false,
    },

    submit: function (e) {
        var that = this
        var iid = that.data.id
        let data1 = e.detail.value.value1;
        let data2 = e.detail.value.value2;
        let data3 = e.detail.value.value3;
        let data4 = e.detail.value.value4;
        let data5 = e.detail.value.value5;
        if (data1 === undefined){
            data1 = 1024;
        }
        if (data2 === undefined) {
            data2 = 1024;
        }
        if (data3 === undefined) {
            data3 = 1024;
        }
        if (data4 === undefined) {
            data4 = 1024;
        }
        if (data5 === undefined) {
            data5 = 1024;
        }
        // if(that.data.key2 === true){
        //     if (e.detail.value.value2.length != 11) {
        //         wx.showToast({
        //             title: '请输入正确的手机号',
        //             duration: 1000
        //         })
        //     }
        //     else {
        //         wx.request({
        //             url: 'https://tadcap.com/signUp',
        //             data: {
        //                 projectId: that.data.id,
        //                 userId: app.data.userId,
        //                 diyValue1: data1,
        //                 diyValue2: data2,
        //                 diyValue3: data3,
        //                 diyValue4: data4,
        //                 diyValue5: data5,
        //                 avatar: app.data.avatar
        //             },
        //             method: 'POST',
        //             header: {
        //                 'content-type': 'application/json' // 默认值
        //             },
        //             success: function (res) {
        //                 that.setData({
        //                     disable: true
        //                 })
        //                 wx.showToast({
        //                     title: '报名成功',
        //                     duration: 1000,
        //                     success: function () {
        //                         wx.redirectTo({
        //                             url: '../hejoin/hejoin?id=' + iid,
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // }
        wx.request({
            url: 'https://tadcap.com/signUp',
            data: {
                projectId: that.data.id,
                userId: app.data.userId,
                diyValue1: data1,
                diyValue2: data2,
                diyValue3: data3,
                diyValue4: data4,
                diyValue5: data5,
                avatar: app.data.avatar
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
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
            url: 'https://tadcap.com/getProjectInfo?projectId=' + project_id,
            success: function (res) {
                console.log(res)
                let a = false, b = false, c = false, d = false, e = false;
                let A = null, B = null, C = null, D = null, E = null;
                if (res.data.diy_name1 == '姓名') {
                    A = res.data.diy_name1;
                    a = true;
                }
                if (res.data.diy_name2 == '手机号') {
                    B = res.data.diy_name2;
                    b = true;
                }
                if (res.data.diy_name3 != '自定义' && res.data.diy_name3 != '未选中') {
                    C = res.data.diy_name3;
                    c = true;
                }
                if (res.data.diy_name4 != '自定义' && res.data.diy_name4 != '未选中') {
                    D = res.data.diy_name4;
                    d = true;
                }
                if (res.data.diy_name5 != '自定义' && res.data.diy_name5 != '未选中') {
                    E = res.data.diy_name5;
                    e = true;
                }
                that.setData({
                    project_name: res.data.project_name,
                    data1:A,
                    data2:B,
                    data3:C,
                    data4:D,
                    data5:E,
                    key1:a,
                    key2:b,
                    key3:c,
                    key4:d,
                    key5:e
                })
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



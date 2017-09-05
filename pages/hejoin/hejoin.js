// pages/myjoin/myjoin.js
Page({


    data: {
        vue: {},
        time: ''
    },



    share: function () {
        wx.navigateTo({
            url: '../share/share',
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id
        var that = this
        wx.request({
            url: 'http://115.159.22.122/KeDou/project/getProjectByProjectId',
            data: {
                projectId: id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                //把时间转化成能看的
                var begin = res.data.result.startTime
                var end = res.data.result.endTime
                var d = new Date(begin)
                var year = d.getFullYear()
                var month = d.getMonth() + 1;
                var day = d.getDate();
                var hour = d.getHours();
                var minute = d.getMinutes();
                var e = new Date(end)
                var nian = e.getFullYear()
                var yue = e.getMonth() + 1;
                var ri = e.getDate();
                var xiaoshi = d.getHours();
                var fenzhong = d.getMinutes();
                year = String(year)
                month = String(month)
                day = String(day)
                hour = String(hour)
                minute = String(minute)
                nian = String(nian)
                yue = String(yue)
                ri = String(ri)
                xiaoshi = String(xiaoshi)
                fenzhong = String(fenzhong)
                var start_time = year + ' -' + month + '-' + day + ' ' + hour + ':' + minute
                var end_time = nian + ' -' + yue + '-' + ri + ' ' + xiaoshi + ':' + fenzhong
                var time = start_time + ' ' + '至' + ' ' + end_time
                console.log(res)
                that.setData({
                    vue: res.data.result,
                    time: time
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
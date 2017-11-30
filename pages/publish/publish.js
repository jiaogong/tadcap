var utils = require('../../utils/util.js')
var app = getApp()

Page({
    data: {
        tips: false,
        dataList: [],
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
        url: 'https://tadcap.com/getUserCreatedProject?userId=' + app.data.userId,
            success: function (res) {
                console.log(res.statusCode)
                if (res.data.length === 0 || res.statusCode != 200) {
                    that.setData({
                        tips: true
                    })
                }
                else {
                    console.log(res)
                    let dataList = res.data;
                    let timestamp = Date.now();         
                    for (let i = 0; i < dataList.length; i++){               
                        dataList[i].start_time = new Date(parseInt(dataList[i].start_time)).toLocaleString().replace(/:\d{1,2}$/, ' ');
                        if (timestamp > dataList[i].end_time){
                            dataList[i].end_time = '已结束'
                            dataList[i].flag = 'top-le'
                            dataList[i].creator = '/images/icon/ent.png'
                        }
                        else{
                            dataList[i].end_time = '进行中'
                            dataList[i].flag = 'top-left'
                            dataList[i].creator = '/images/icon/enter.png'   
                        }
                    }
                    that.setData({
                        //隐藏欢迎提示
                        tips: false,
                        dataList: dataList.reverse()
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
})
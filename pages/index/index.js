const app = getApp();

Page({
  data: {
      buttonImg : 'http://i2.kiimg.com/1949/458aae6c1f0475e5.png'
  },
    //按下按钮开始
    touchstart:function(){
        let that = this;
        that.setData({
            buttonImg: 'http://i2.kiimg.com/1949/cb78c896a66b457d.png'
        });
        //获取可签到的项目ID
        wx.request({
            url: 'https://tadcap.com/recentProjectId?userId=' + app.globalData.userId,
            success:function(res){
                let count = res.data.length;
                let projectIdInfo = res.data;
                //如果没有任务，提示
                if(res.data.length === 0){
                    wx.showToast({
                        title: '现在没有可签到的任务',
                        duration:1000
                    })
                }
                //有任务，继续
                else{
                    //获取位置
                    wx.getLocation({
                        success: function(res) {
                            let weidu = res.longitude;
                            let jingdu = res.latitude;
                            for(let i = 0; i<count; i++){
                                wx.request({
                                    url: 'https://tadcap.com/getProjectInfo?projectId=' + projectIdInfo[i],
                                    success:function(res){
                                        //地点匹配，签到成功
                                        console.log(weidu)
                                        console.log(res.data.longitude)
                                        console.log(jingdu)
                                        console.log(res.data.latitude)
                                        if (Math.abs(weidu - res.data.longitude) < 0.8 && Math.abs(jingdu - res.data.latitude) < 0.8){
                                            //向服务器发送签到成功信息
                                            wx.request({
                                                url: 'https://tadcap.com/sign',
                                                data:{
                                                    userId:app.globalData.userId,
                                                    projectId: projectIdInfo[i]
                                                },
                                                header: {
                                                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                                                },
                                                success:function(){
                                                    wx.showToast({
                                                        title: '签到成功',
                                                        icon: 'success'
                                                    })
                                                },
                                                fail:function(){
                                                    wx.showToast({
                                                        title: '签到失败，请重试',
                                                        duration:1000
                                                    })
                                                }
                                            })
                                        }
                                        //地点不匹配，签到失败
                                        else{
                                            wx.showToast({
                                                title: '签到失败，地点不匹配',
                                                duration:1000
                                            })
                                        }
                                    }
                                })
                            }
                        },
                    })
                }
            }
        })
    },
    //按下按钮结束
    touchend:function(){
        this.setData({
            buttonImg: 'http://i2.kiimg.com/1949/458aae6c1f0475e5.png'
        });
    },

    onLoad: function (options) {
    
    },
    onShow: function () {
    
    },
    onHide: function () {
    
    }
})
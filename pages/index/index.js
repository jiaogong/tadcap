const app = getApp();

Page({
  data: {
      buttonImg: '/images/icon/start.png',
      sceneId:null
  },
    //按下按钮开始
    touchstart:function(){
        let that = this;
        that.setData({
            buttonImg: '/images/icon/end.png'
        });
        //判断要不要创建新用户
        if (app.data.userId == 'abcd') {
            //通过login获取code
            wx.login({
                success: function (res) {
                    //获取openid
                    wx.request({
                        url: 'https://tadcap.com/getOpenid?code=' + res.code,
                        success: function (res) {
                            let userId = res.data.user_id;
                            //获取用户昵称头像
                            wx.getUserInfo({
                                success: function (res) {
                                    let nickname = res.userInfo.nickName;
                                    let avatar = res.userInfo.avatarUrl;
                                    //创建用户
                                    wx.request({
                                        url: 'https://tadcap.com/register',
                                        data: {
                                            userId: userId,
                                            nickname: nickname,
                                            avatar: avatar
                                        },
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/json' // 默认值
                                        },
                                        success: function (res) {
                                            //把user_id存入缓存
                                            wx.setStorage({
                                                key: "userId",
                                                data: userId,
                                                success: function (res) {
                                                    console.log('保存缓存成功');
                                                }
                                            });
                                            wx.setStorage({
                                                key: "nickname",
                                                data: nickname,
                                                success: function (res) {
                                                    console.log('保存缓存成功');
                                                }
                                            });
                                            wx.setStorage({
                                                key: "avatar",
                                                data: avatar,
                                                success: function (res) {
                                                    console.log('保存缓存成功');
                                                }
                                            })

                                        }
                                    })
                                }
                            })
                        }
                    })
                },
                fail: function () {
                    //去获取授权
                    wx.redirectTo({
                        url: '/pages/refuse/refuse',
                    })
                }
            })
        }
        //查询用户有没有获取授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting["scope.userInfo"] === false ||
                    res.authSetting["scope.userLocation"] === false) {
                    wx.redirectTo({
                        url: '/pages/refuse/refuse',
                    })
                }
            }
        })
        //获取可签到的项目ID
        wx.request({
            url: 'https://tadcap.com/recentProjectId?userId=' + app.data.userId,
            success:function(res){
                let count = res.data.length;
                let projectIdInfo = res.data;
                console.log(res)
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
                                        console.log('@@@@@@@@@@@@');
                                        console.log(Math.abs(weidu - res.data.longitude));
                                        console.log(Math.abs(jingdu - res.data.latitude));
                                        let QR = res.data.qrcode;
                                        if ((Math.abs(weidu - res.data.longitude) < 0.005) && (Math.abs(jingdu - res.data.latitude) < 0.0022)){
                                            //无需扫码签到
                                            if(QR === 0){
                                                //向服务器发送签到成功信息
                                                wx.request({
                                                    url: 'https://tadcap.com/sign',
                                                    data: {
                                                        userId: app.data.userId,
                                                        projectId: projectIdInfo[i]
                                                    },
                                                    success: function () {
                                                        wx.showToast({
                                                            title: '签到成功',
                                                            icon: 'success'
                                                        })
                                                    },
                                                    fail: function () {
                                                        wx.showToast({
                                                            title: '签到失败，请重试',
                                                            duration: 1000
                                                        })
                                                    }
                                                })
                                            }
                                            else if (QR == 1 && that.data.sceneId.toString() == projectIdInfo[i].toString()){
                                                //向服务器发送签到成功信息
                                                wx.request({
                                                    url: 'https://tadcap.com/sign',
                                                    data: {
                                                        userId: app.data.userId,
                                                        projectId: projectIdInfo[i]
                                                    },
                                                    success: function () {
                                                        wx.showToast({
                                                            title: '签到成功',
                                                            icon: 'success'
                                                        })
                                                    },
                                                    fail: function () {
                                                        wx.showToast({
                                                            title: '签到失败，请重试',
                                                            duration: 1000
                                                        })
                                                    }
                                                })
                                            }
                                            //扫码不匹配
                                            else{
                                                wx.showToast({
                                                    title: '签到失败，请扫描正确的二维码',
                                                    duration: 1000
                                                })
                                            }
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
            buttonImg: '/images/icon/start.png'
        });
    },

    onLoad: function (options) {
        var scene = decodeURIComponent(options.scene)
        this.setData({
            sceneId:scene
        });
    },
    onShow: function () {
    
    },
    onHide: function () {
    
    }
})
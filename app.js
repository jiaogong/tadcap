//app.js

App({

data:{
    userId:null,
    userInfo:{}
},

sign:function(){
    wx.login({
        success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            var code = res.code
            console.log(666)
            console.log(code)
            // 获取用户信息
            wx.getUserInfo({
                withCredentials: true,
                success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    var that = this
                    wx.request({
                        url: 'http://115.159.22.122/KeDou/user/decodeUserInfo',
                        data: {
                            userId: that.data.userId
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                           console.log('传送成功！')
                           console.log(res)
                        },
                        fail: function () {
                            
                        }
                    })

                    this.globalData.userInfo = res.userInfo

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                    }
                }
            })
        }
    })
},


    onLaunch: function () {
        var them = this
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code
                this.globalData.code = res.code
                // 获取用户信息
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo
                        var name = res.userInfo.nickName
                        var image = res.userInfo.avatarUrl
                        // this.setData({
                        //     userInfo: res.userInfo
                        // })
                        console.log(res.userInfo)
                        var JSCODE = code
                        var that = this
                        //获取openid
                        wx.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx06ac3006cb1e1319&secret=89cb56dbcb705a5f58b26a5ec5f0ff6b&js_code=' + JSCODE + '&grant_type=authorization_code',
                            success: function (res) {                       
                                // that.setData({
                                //     userId:res.data.openid
                                // })
                                them.globalData.userId = res.data.openid
                                // console.log('888888888888888888' + this.globalData.userId)
                                var that = this
                                wx.request({
                                    url: 'http://115.159.22.122/KeDou/user/insertUser',
                                    data: {
                                        userId: res.data.openid,
                                        name: name,
                                        phone:0,
                                        image: image
                                    },
                                    method: 'POST',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function (e) {
                                        console.log('传送成功！')
                                        console.log(e)
                                    },
                                    fail: function () {

                                    }
                                })
                                //////
                            }
                        })
                        
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                        }
                    }
                })
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            
                        }
                    }
                })
            }
        })

    },
    globalData: {
        userInfo: null,
        code:null,
        userId:''
    }
})


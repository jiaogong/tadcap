//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {
            nickName:'点击登录',
            avatarUrl:'/images/icon/noname.jpg'
        },
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    jump1: function () {
        wx.navigateTo({
            url: '/pages/publish/publish',
        })
    },
    jump2: function () {
        wx.navigateTo({
            url: '/pages/join/join',
        })
    },
    jump3: function (event) {
        wx.navigateTo({
            url: '/pages/help/help',
        })
    },
    jump4: function () {
        wx.navigateTo({
            url: '/pages/qrcode/qrcode',
        })
    },
    jump5: function () {
        wx.navigateTo({
            url: '/pages/sign/sign',
        })
        
    },
    //登录按钮
    bindViewTap:function(){
        var that = this
        //判定用户是否授权，没有授权无法打开
        wx.getSetting({
            success: function (res) {
                //没授权，调起设置页面
                if (!res.authSetting['scope.userInfo']) {
                    wx.showModal({
                        title: '点击授权登录',
                        content: '蝌蚪签到需要获取你的信息和定位权限才可以完成签到',
                        success: function () {
                            wx.openSetting({
                                success: function (e) {
                                    //获取授权成功

                                    if (e.authSetting['scope.userInfo']) {
                                        wx.getUserInfo({
                                            success: function(res){
                                                // 可以将 res 发送给后台解码出 unionId
                                                app.globalData.userInfo=res.userInfo
/////////
                                                
////////

                                                that.setData({      
                                                    userInfo: res.userInfo
                                                })
                                            }
                                        })
                                        //////
                                    }
                                }
                            })
                        }
                    })
                }
            }//getSeeting-success

        })
    },
    
    onLoad: function () {

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },


    //////////////////////////
    //////////////////////////
    ////////////////////////
    /////////////////////////
    onShow: function () {
        console.log('onshow开始执行')
        var that = this
        wx.request({
            url: 'http://115.159.22.122/KeDou/project/getProjectJoinIn',
            data: {
                userId: app.globalData.userId
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log('onshowwx.request success')
                console.log(res)
                var key = String(res.data.code)
                console.log(key.charAt(key.length - 1))
                //如果当前没有签到，设flag为0
                if (key.charAt(key.length - 1) != 1) {
                    that.setData({
                        flag: 0
                    })
                }
                else {
                    //获取现在的时间
                    console.log('进入到获取时间阶段了')
                    var tim = new Date()
                    console.log('先输出一下tim Date变量' + tim)
                    var nian = tim.getFullYear()
                    var yue = tim.getMonth() + 1
                    var ri = tim.getDate()
                    var xiaoshi = tim.getHours()
                    var fenzhong = tim.getMinutes()
                    console.log('当前时间用于判断有没有签到任务：' + nian + '/' + yue + '/' + ri + ' ' + xiaoshi + ':' + fenzhong)
                    //先把所有信息拉下来，一个一个比对时间
                    //如果时间在范围里，获取projectId
                    for (var i = 0; i < res.data.resultList.length; i++) {
                        console.log('获取到的数组长度' + res.data.resultList.length)
                        var start = res.data.resultList[i].startTime
                        var end = res.data.resultList[i].endTime
                        //转化开始时间
                        var d = new Date(start)
                        var year = d.getFullYear();
                        var month = d.getMonth() + 1;
                        var day = d.getDate();
                        var hour = d.getHours();
                        var minute = d.getMinutes();
                        console.log('服务器获取到的开始时间' + year + '/' + month + '/' + day + ' ' + hour + ':'  + minute)
                        //转化结束时间
                        var m = new Date(end)
                        var hh = m.getHours(); //结束小时
                        var mm = m.getMinutes(); //结束分钟
                        console.log('结束的小时是'+hh +'结束的分钟是'+ mm)
                        //开始比对时间
                        if (nian == year) {
                            //年相等，继续匹配
                            console.log('年相等，继续匹配')
                            if (yue == month) {
                                //年不等，设置flag
                                if (ri == day) {
                                    console.log('日相等，继续匹配')
                                    //日相等，继续匹配
                                    if (xiaoshi == hour) {
                                        //小时相等，继续匹配
                                        if(xiaoshi < hh){
                                            //跨小时的签到，分钟小于60就可以了
                                            if (fenzhong < 60) {
                                                /////////////////////
                                                //就是这个了，取projectId
                                                console.log('hi还是覅会发啊是捷达捷达司机')
                                                console.log(res.data.resultList[i].projectId)
                                                that.setData({
                                                    id: res.data.resultList[i].projectId,
                                                    flag: 1
                                                })
                                            }
                                        }
                                        else{
                                            //不是跨小时的签到，继续判断
                                            console.log('小时相等，继续匹配')
                                            if (fenzhong < minute) {
                                                //分钟小于开始时间
                                                console.log('分钟小于开始时间，不行')
                                                console.log('这个失败的项目id是：' + res.data.resultList[i].projectId)
                                                ////
                                                /////////
                                                //太早了，稍等一会就可以签到了，可以做提示，先设置为没有签到
                                                that.setData({
                                                    flag: 0
                                                })
                                            }
                                            else {
                                                //分钟大于等于开始时间，可能存在签到，判断是不是小于结束时间
                                                console.log('分钟大于等于开始时间，可能存在签到')
                                                console.log('结束的分钟是：' + mm)
                                                if (fenzhong < mm) {
                                                    /////////////////////
                                                    //就是这个了，取projectId
                                                    console.log('hi还是覅会发啊是捷达捷达司机')
                                                    console.log(res.data.resultList[i].projectId)
                                                    that.setData({
                                                        id: res.data.resultList[i].projectId,
                                                        flag: 1
                                                    })
                                                }
                                                else {
                                                    ////////
                                                    ///分钟过了，迟到了
                                                    console.log('分钟过了，迟到了')
                                                    that.setData({
                                                        flag: 0
                                                    })
                                                }
                                            }
                                        }

                                    }
                                    //小时不相等，如果小于，还有签到的可能性
                                    else if(xiaoshi < hour){
                                        var a = fenzhong +xiaoshi
                                        var b = hour + minute + 1
                                        if( a <= b){
                                            //就是这个了，取projectId
                                            console.log('hi还是覅会发啊是捷达捷达司机')
                                            console.log(res.data.resultList[i].projectId)
                                            that.setData({
                                                id: res.data.resultList[i].projectId,
                                                flag: 1
                                            })
                                        }
                                        else{
                                            console.log('这个失败的项目id是：' + res.data.resultList[i].projectId)
                                            //小时不等，设置flag
                                            that.setData({
                                                flag: 0
                                            })
                                        }
                                    }
                                    else {
                                        console.log('小时大了，如果在结束范围内，还是可以签到')                                   
                                        // // console.log('这个失败的项目id是：' + res.data.resultList[i].projectId)
                                        // //小时不等，设置flag
                                        // that.setData({
                                        //     flag: 0
                                        // })
                                        var a = fenzhong + xiaoshi
                                        var b = hour + minute + 1
                                        if(a<=b){
                                            //就是这个了，取projectId
                                            console.log('hi还是覅会发啊是捷达捷达司机')
                                            console.log(res.data.resultList[i].projectId)
                                            that.setData({
                                                id: res.data.resultList[i].projectId,
                                                flag: 1
                                            })
                                        }
                                        else{
                                            console.log('小时大了，失败')           
                                            that.setData({
                                                flag: 0
                                            })
                                        }
                                    }
                                }
                                else {
                                    console.log('日不相等，结束匹配')
                                    console.log('这个失败的项目id是：' + res.data.resultList[i].projectId)
                                    //日不等，设置flag
                                    that.setData({
                                        flag: 0
                                    })
                                }
                            }
                            else {
                                //月不等，设置flag
                                that.setData({
                                    flag: 0
                                })
                            }
                        }
                        else {
                            //年不等，设置flag
                            that.setData({
                                flag: 0
                            })
                        }
                        ///////////////////开始比对时间反括号
                    }
                }

            }
        })
    }
        ////////////////////////////
        //////////////////////////
        ////////////////////////////
        ////////////////////////////
})






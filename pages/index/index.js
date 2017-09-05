//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    buttonImg: "http://i2.kiimg.com/1949/458aae6c1f0475e5.png",
    //模拟从服务器获取数据
    //从服务器获取地点数据
    weidu: null,
    jingdu: null,
    //从服务器获取时间
    nian:null,
    yue:null,
    ri:null,
    xiaoshi1:null,
    xiaoshi2:null,
    fenzhong1:null,
    fenzhong2:null,
    //模拟从服务器申请查看当前有无签到任务，如果有，flag=1
    flag:1,
    //模拟从服务器获取签到范围，小、、中、大：0，1，2
    range:2,
    ///////////极为重要的projectId
    id:0
  },

//按下蝌蚪事件开始  
mytouchstart: function (e) {
    console.log('卧槽，到底有没有签到啊，flag=' + this.data.flag)
    this.setData({
        buttonImg: "http://i2.kiimg.com/1949/cb78c896a66b457d.png"
    })
    var range = 2
    var id = this.data.id
    var that = this
    ///////////////////////
    ///////////////////////
    //////////////////////////
  

    ////////////////////////
    //////////////////////
    ///////////////////////
wx.request({

    url: 'http://115.159.22.122/KeDou/project/getProjectByProjectId?projectId=' + id,
    success:function(res){
        //从服务器获取开始时间
       var start_time = res.data.result.startTime
       console.log('从服务器获取的开始时间的时间戳' +start_time)
       var d = new Date(start_time)
       var year = d.getFullYear(); 
       var month = d.getMonth() + 1;     
       var day = d.getDate();
       var hour = d.getHours();
       var minute = d.getMinutes();
       console.log('从服务器获取的时间：'+ year +'/' + month + '/' + day +' ' + hour + ':' +minute)
       //从服务器获取结束时间
       var end_time = res.data.result.endTime
       var d = new Date(end_time)
       var xiaoshi = d.getHours();
       var fenzhong = d.getMinutes();
       console.log('服务器'+hour)
       console.log('服务器'+minute)
       console.log('服务器'+xiaoshi)
       console.log('服务器' +fenzhong)
       //从服务器获取经纬度
       var position = res.data.result.theLocation
    //    var longitude = 0.0
    //    var latitude = 0.0
       var key = position.indexOf('&')
       var j = position.substring(0,key) 
       j = parseFloat(j)
       key = key + 1
       var len = position.length
       var w = position.substring(key, len) 
       w = parseFloat(w)
       //输出从服务器获取的经纬度
       console.log(666)
       console.log('从服务器获取的经度' + j)
       console.log('从服务器获取的纬度' + w)
       console.log(888)
       that.setData({
           nian:year,
           yue:month,
           ri:day,
            xiaoshi1:hour,
            xiaoshi2:xiaoshi,
            fenzhong1:minute,
            fenzhong2:fenzhong,
            weidu: w,
            jingdu: j,          
       })
    }
})
    console.log('到了本地定位的地点了')
//获取地点坐标
    wx.getLocation({
        type:'wgs84',   //使用wgs84模式
//获取地点坐标成功
        success: function(res) { 
            var latitude = res.latitude  //纬度
            var longitude = res.longitude //经度
            var accuracy = res.accuracy
            console.log('本地经度' + longitude)
            console.log('本地纬度' + latitude)
            console.log('精确度' + accuracy)

//获取当前时间
            var myDate = new Date()
            var year = myDate.getFullYear()
            var month = myDate.getMonth() + 1
            var day = myDate.getDate()
            var hour = myDate.getHours()
            var minute = myDate.getMinutes()
            console.log('当前时间：'+year + '/' + month + '/' + day + ' ' + hour + ':' + minute)

//判断时间地点是否相符
//判断当前有无签到任务，如果有，进入下一步

if(that.data.flag == 1)
{
            console.log('flag=1了，然后呢？？？？？？？')
            //判断当前年月日是否符合，符合进入下一步
            console.log('that.data.nian' + that.data.nian)
            console.log('that.data.yue' + that.data.yue)
            console.log('that.data.ri' + that.data.ri)
            console.log(that.data.nian == year && that.data.yue == month && that.data.ri == day)
            if(that.data.nian == year && that.data.yue == month && that.data.ri == day){
                //继续判定时刻是不是相符
                //判断小时
                console.log('到124行了')
                if(hour>=that.data.xiaoshi1 && hour<=that.data.xiaoshi2){
                    //如果是跨小时的
                    if(that.data.xiaoshi1 != that.data.xiaoshi2){
                        //如果是时间较小的那个小时
                        if(hour == that.data.xiaoshi1){
                            //早了
                            if(minute < that.data.fenzhong1){
                                wx.showToast({
                                    title: '签到失败，太早了',
                                    duration: 2000
                                })
                            }
                            //可以签到，判断地点是否符合
                            else{
                                //小范围
                                console.log('到140行了')
                                if(range == 0){
                                    //如果整数部分相同，则继续判断，否则地点不匹配
                                    if (parseInt(latitude)==parseInt(that.data.weidu)){
                                        //判断相减绝对值的范围
                                        if(-0.00030<=(latitude-that.data.weidu)<=0.00030)                                            {
                                            //判断经度
                                            //经纬度都符合，签到成功
                                            if (-0.00030 <= (longitude-that.data.jingdu)<=0.00030){
                                                wx.showToast({
                                                    title: '签到成功',
                                                    duration: 2000
                                                })
                                             /////////////////////////////////////////
                                            //签到成功，给服务器返回信息
                                                wx.request({
                                                    url: 'http://115.159.22.122/KeDou/statistics/sign',
                                                    data: {
                                                        userId: app.globalData.userId,
                                                        projectId:that.data.id,
                                                        sign:1
                                                    },
                                                    method: 'POST',
                                                    header: {
                                                        'content-type': 'application/x-www-form-urlencoded'
                                                    },
                                                    success: function (res) {
                                                        console.log(res)
                                                    },
                                                    fail: function () {

                                                    }
                                                })
                                            }
                                            //签到失败，经度不符合
                                            else{
                                                wx.showToast({
                                                    title: '签到失败，靠近一点更好哦',
                                                    duration: 2000
                                                })
                                            }
                                            
                                        }
                                        //签到失败没有到指定范围内
                                        else{
                                            wx.showToast({
                                                title: '签到失败，靠近一点更好哦',
                                                duration: 2000
                                            })
                                        }
                                    }
                                    //纬度相差过大，失败
                                    else{
                                        wx.showToast({
                                            title: '签到失败，地点不匹配',
                                            duration: 2000
                                        })
                                    }
                                }
                                //中范围
                                else if(range == 1){
                                    //如果整数部分相同，则继续判断，否则地点不匹配
                                    if (parseInt(latitude) == parseInt(that.data.weidu)) {
                                        //判断相减绝对值的范围
                                        if (-0.00050 <= (latitude - that.data.weidu) <= 0.00050) {
                                            //判断经度
                                            //经纬度都符合，签到成功
                                            if (-0.00030 <= (longitude - that.data.jingdu) <= 0.00030) {
                                                wx.showToast({
                                                    title: '签到成功',
                                                    duration: 2000
                                                })
                                                /////////////////////////////////////////
                                                //签到成功，给服务器返回信息
                                                wx.request({
                                                    url: 'http://115.159.22.122/KeDou/statistics/sign',
                                                    data: {
                                                        userId: app.globalData.userId,
                                                        projectId: that.data.id,
                                                        sign: 1
                                                    },
                                                    method: 'POST',
                                                    header: {
                                                        'content-type': 'application/x-www-form-urlencoded'
                                                    },
                                                    success: function (res) {
                                                        console.log(res)
                                                    },
                                                    fail: function () {

                                                    }
                                                })

                                            }
                                            //签到失败，经度不符合
                                            else {
                                                wx.showToast({
                                                    title: '签到失败，靠近一点更好哦',
                                                    duration: 2000
                                                })
                                            }

                                        }
                                        //签到失败没有到指定范围内
                                        else {
                                            wx.showToast({
                                                title: '签到失败，靠近一点更好哦',
                                                duration: 2000
                                            })
                                        }
                                    }
                                    //纬度相差过大，失败
                                    else {
                                        wx.showToast({
                                            title: '签到失败，地点不匹配',
                                            duration: 2000
                                        })
                                    }
                                }
                                //大范围
                                else if(range == 2){
                                    console.log('到261行了')
                                    //如果整数部分相同，则继续判断，否则地点不匹配
                                    if (parseInt(latitude) == parseInt(that.data.weidu)) {
                                        //判断相减绝对值的范围
                                        if (-0.00099 <= (latitude - that.data.weidu) <= 0.00099) {
                                            //判断经度
                                            //经纬度都符合，签到成功
                                            if (-0.00030 <= (longitude - that.data.jingdu) <= 0.00030) {
                                                wx.showToast({
                                                    title: '签到成功',
                                                    duration: 2000
                                                })
                                                /////////////////////////////////////////
                                                //签到成功，给服务器返回信息
                                                wx.request({
                                                    url: 'http://115.159.22.122/KeDou/statistics/sign',
                                                    data: {
                                                        userId: app.globalData.userId,
                                                        projectId: that.data.id,
                                                        sign: 1
                                                    },
                                                    method: 'POST',
                                                    header: {
                                                        'content-type': 'application/x-www-form-urlencoded'
                                                    },
                                                    success: function (res) {
                                                        console.log(res)
                                                    },
                                                    fail: function () {

                                                    }
                                                })

                                            }
                                            //签到失败，经度不符合
                                            else {
                                                wx.showToast({
                                                    title: '签到失败，靠近一点更好哦',
                                                    duration: 750
                                                })
                                            }

                                        }
                                        //签到失败没有到指定范围内
                                        else {
                                            wx.showToast({
                                                title: '签到失败，靠近一点更好哦',
                                                duration: 750
                                            })
                                        }
                                    }
                                    //纬度相差过大，失败
                                    else {
                                        wx.showToast({
                                            title: '签到失败，地点不匹配',
                                        })
                                    }
                                }

                            
                            }
                        }
                        //是时间较晚的那个小时
                        else if(hour == that.data.xiaoshi2){
                            //晚了
                            if(minute > that.data.fenzhong2){
                                wx.showToast({
                                    title: '签到失败，太晚了'
                                })
                            }
                            //可以签到
                            else{
                                wx.showToast({
                                    title: '签到成功',
                                    duration: 750
                                })
                                /////////////////////////////////////////
                                //签到成功，给服务器返回信息
                                wx.request({
                                    url: 'http://115.159.22.122/KeDou/statistics/sign',
                                    data: {
                                        userId: app.globalData.userId,
                                        projectId: that.data.id,
                                        sign: 1
                                    },
                                    method: 'POST',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function (res) {
                                        console.log(res)
                                    },
                                    fail: function () {

                                    }
                                })
                            }
                        }
                        //错误处理
                        else{
                            wx.showToast({
                                title: '签到失败，不在签到区间内',
                                duration: 2000
                            })
                        }
                    }

                //不是跨小时的
                else if(that.data.xiaoshi1 == that.data.xiaoshi2){
                    //只需要判断分钟在区间里即可
                    if(that.data.fenzhong1<=minute<=that.data.fenzhong2){
                        wx.showToast({
                            title: '签到成功',
                            duration: 750
                        })
                                /////////////////////////////////////////
                                //签到成功，给服务器返回信息
                        wx.request({
                            url: 'http://115.159.22.122/KeDou/statistics/sign',
                            data: {
                                userId: app.globalData.userId,
                                projectId: that.data.id,
                                sign: 1
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res)
                            },
                            fail: function () {

                            }
                        })
                    }
                    //太早了
                    else if(minute<that.data.fenzhong1){
                        wx.showToast({
                            title: '签到失败，太早了'
                        })
                    }
                    //太晚了
                    else if(minute>that.data.fenzhong2){
                        wx.showToast({
                            title: '签到失败，太晚了'
                        })
                    }
                    //异常处理
                    else{
                        wx.showToast({
                            title: '签到失败，不在签到区间内'
                        })
                    }
                }
                }
                //时刻不相符，签到失败
                else{
                    wx.showToast({
                        title: '签到失败，不在签到区间内'
                    })
                }
            }
            //年月日不符合，签到失败
            else{
                wx.showToast({
                    title: '现在没有任务可签到',
                    duration: 2000,
                    image:'/images/icon/empty.png'
                })
            }
}
//现在没有可签到的任务，提醒用户
else{
    wx.showToast({
        title: '现在没有任务可签到'
    })
    console.log('怎么直接跳出flag的if else了？？？？')
}
        },
//获取地点坐标失败
        fail:function(){ 
            wx.showToast({
                title: '未获得授权，请允许使用地理信息', //未获取地理位置授权，提醒用户去授权
            })
            wx.openSetting({

            })
        }
    })
},

//按下事件结束  
mytouchend: function () {
    this.setData({
        buttonImg: "http://i2.kiimg.com/1949/458aae6c1f0475e5.png"
    })
},


    onShow:function(){
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
                        console.log('服务器获取到的开始时间' + year + '/' + month + '/' + day + ' ' + hour + ':' + minute)
                        //转化结束时间
                        var m = new Date(end)
                        var hh = m.getHours(); //结束小时
                        var mm = m.getMinutes(); //结束分钟
                        console.log('结束的小时是' + hh + '结束的分钟是' + mm)
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
                                        if (xiaoshi < hh) {
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
                                        else {
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
                                    else if (xiaoshi < hour) {
                                        var a = fenzhong + xiaoshi
                                        var b = hour + minute + 1
                                        if (a <= b) {
                                            //就是这个了，取projectId
                                            console.log('hi还是覅会发啊是捷达捷达司机')
                                            console.log(res.data.resultList[i].projectId)
                                            that.setData({
                                                id: res.data.resultList[i].projectId,
                                                flag: 1
                                            })
                                        }
                                        else {
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
                                        if (a <= b) {
                                            //就是这个了，取projectId
                                            console.log('hi还是覅会发啊是捷达捷达司机')
                                            console.log(res.data.resultList[i].projectId)
                                            that.setData({
                                                id: res.data.resultList[i].projectId,
                                                flag: 1
                                            })
                                        }
                                        else {
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
        

})
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      array: [3,5,10,15,30],
      inp3:'begin',
      inp4: 'begin',
      inp5: 'begin',
      index: 0,
      min:' 分钟',
      count:3,
      date: '',
      dat:'',
      time: '',
      place_name:'点我选择地点',
      place_address:'',
      css1:'add',
      css2: 'add',
      css3: 'add',
      css4: 'add',
      css5: 'add',
      name:null,
      disable:true,
      latitude:0.0,
      longitude:0.0,
      diy1:'',
      diy2:'',
      diy3: '自定义',
      diy4: '自定义',
      diy5: '自定义',
      aa:'before',
      count1:0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      rad:'/images/icon/check1.png',
      qrflag:0
  },


check:function(){
    var that = this
    if (that.data.rad == '/images/icon/check1.png'){
        that.setData({
            rad: '/images/icon/check2.png',
            qrflag:1
            //启用二维码签到
        })
    }
    else{
        that.setData({
            rad: '/images/icon/check1.png',
            qrflag: 0
            //不启用二维码签到
        })
    }
},



  bindPickerChange: function (e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value)
      var count = 3
      if (e.detail.value == 0){
          count = 3
      }
      if (e.detail.value == 1) {
          count = 5
      }
      if (e.detail.value == 2) {
          count = 10
      }
      if (e.detail.value == 3) {
          count = 15
      }
      if (e.detail.value == 4) {
          count = 30
      }
      this.setData({
          index: e.detail.value,
          count:count
      })

  },
  bindDateChange: function (e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          date: e.detail.value
      })
  },
  bindTimeChange: function (e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          time: e.detail.value
      })
  },


//定位
    choseLocation:function(){
        var that = this;
        wx.chooseLocation({
            success: function(res) {
                if(res.name.length>10){
                    res.name = res.name.substring(0,10) + '...'
                }
                that.setData({
                    place_name:res.name,
                    place_address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude
                })
            },
        })
    },

    change3:function(event){
        this.setData({
            diy3:event.detail.value
        })
    },
    change4: function (event) {
        this.setData({
            diy4: event.detail.value
        })
    },
    change5: function (event) {
            this.setData({
                diy5: event.detail.value
            })
    },

    changeCss1:function(event){
        var a = event.currentTarget.dataset.name
        var that = this;
        if (this.data.css1 == 'add'){
            that.setData({
                css1:'chosed',
                count1:1
          })
          return
        }
        if (this.data.css1 == 'chosed'){
            that.setData({
                css1: 'add',
                count1:0
            })
            return
        }      
    },
    changeCss2: function (event) {
        var a = event.currentTarget.dataset.name

        var that = this;
        if (this.data.css2 == 'add') {
            that.setData({
                css2: 'chosed',
                count2:1
            })
            return
        }
        if (this.data.css2 == 'chosed') {
            that.setData({
                css2: 'add',
                count2:0
            })
            return
        }
    },
    changeCss3: function (event) {
        var a = event.currentTarget.dataset.name

        var that = this;
        if (this.data.css3 == 'add') {
            that.setData({
                css3: 'chosed',
                inp3:'begin',
                count3:1
            })
            return
        }
        if (this.data.css3 == 'chosed') {
            that.setData({
                css3: 'add',
               inp3:'end',
               count3:0
            })
            return
        }
    },
    changeCss4: function (event) {
        var a = event.currentTarget.dataset.name

        var that = this;
        if (this.data.css4 == 'add') {
            that.setData({
                css4: 'chosed',
                count4:1
            })
            return
        }
        if (this.data.css4 == 'chosed') {
            that.setData({
                css4: 'add',
               count4:0
            })
            return
        }
    },
    changeCss5: function (event) {
        var a = event.currentTarget.dataset.name

        var that = this;
        if (this.data.css5 == 'add') {
            that.setData({
                css5: 'chosed',
                count5:1
            })
            return
        }
        if (this.data.css5 == 'chosed') {
            that.setData({
                css5: 'add',
                count5:0
            })
            return
        }
    },

    formsubmit:function(e){
        var them = this
        //解决不填满表单的问题
        if (e.detail.value.ProjectName == ''){
            wx.showToast({
                title: '未填写活动名',
                duration: 1000,
                image: "/images/icon/error.png"
            })
            return
        }
        if (this.data.place_name === '点我选择地点') {
            wx.showToast({
                title: '未选择地点',
                duration: 1000,
                image: "/images/icon/error.png"
            })
            return
        }
        ///处理自定义信息
        if(this.data.css1 == 'chosed'){
            this.setData({
                diy1: '姓名'
            })
        }
        if (this.data.css2 == 'chosed') {
            this.setData({
                diy2: '手机号'
            })
        }
        if (this.data.css3 != 'chosed'){
            this.setData({
                diy3: '未选中'
            })
        }
        if (this.data.css4 != 'chosed') {
            this.setData({
                diy4: '未选中'
            })
        }
        if (this.data.css5 != 'chosed') {
            this.setData({
                diy5: '未选中'
            })
        }
        //合并经纬度
            var w = this.data.latitude //weidu
            var q = this.data.longitude
            w = String(w)
            q = String(q)
            q = q + '&'
            var position = q + w
            console.log(position)
        //将日期转化成标准格式
        var top = this.data.date
        var x = top.split('-')
        var a = x[0]
        var b = x[1]
        var c = x[2]
        b = parseInt(b)
        c = parseInt(c)
        if (b < 10) {
            b = String(b)
            b = '0' + b
        }
        if (c < 10) {
            c = String(c)
            c = '0' + c
        }
        top = a + '-' + b + '-' + c +' '
        //计算那个草泥马的初始时间问题
        var shijian = this.data.time
        shijian = shijian + ':00'
        var OOXX = top + shijian
        //草泥马的
        //将时间转化为标准格式
        var time = this.data.time
        var y = time.split(':')
        var c = y[0]
        var d = y[1]
        //先计算加上迟到时间变成多少
        c = parseInt(c)
        d = parseInt(d)
        var key = this.data.count
        d = d + key
        //时间进位
        if (d >= 60) {
            d = d - 60
            c = c + 1
            if (c >= 24) {
                c = c - 24
            }
        }
        if (c < 10) {
            c = String(c)
            c = '0' + c
        }
        if (d < 10) {
            d = String(d)
            d = '0' + d
        }
        time = c + ':' + d + ':00'
        var timeKey = top + time
        wx.request({
            url: 'http://115.159.22.122/KeDou/project/createProject',
            data: {
                projectName: e.detail.value.ProjectName,
                information: '666666666',
                creator: app.globalData.userId,
                startTime: OOXX,
                endTime: timeKey,
                theLocation: position,
                information: e.detail.value.add,
                diyName1:them.data.diy1,
                diyName2: them.data.diy2,
                diyName3: them.data.diy3,
                diyName4: them.data.diy4,
                diyName5: them.data.diy5
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                wx.showToast({
                    title: '创建成功',
                    duration: 1000,
                    success:function(){

                        setTimeout(function () {
                            wx.redirectTo({
                                url: '../publish/publish',
                            })},1800)
                       
                    }
                })


            },
            fail:function(){
                wx.showToast({
                    title: '创建失败',
                    duration: 1000,
                    image: "/images/icon/error.png"
                })
            }
            
        })
    },
    confirm:function(){
        if (this.data.count1 + this.data.count2 + this.data.count3 + this.data.count4 + this.data.count5==0){
            wx.showToast({
                title: '至少选择一个',
                duration:1000,
                image: "/images/icon/error.png"
            })
        }else{
            this.setData({
                aa: 'confirm',
                disable: false
            })
        }
    },
    //复制过来的
    powerDrawer: function (e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    util: function (currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例   
        var animation = wx.createAnimation({
            duration: 200,  //动画时长  
            timingFunction: "linear", //线性  
            delay: 0  //0则不延迟  
        });

        // 第2步：这个动画实例赋给当前的动画实例  
        this.animation = animation;

        // 第3步：执行第一组动画  
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存  
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画  
        setTimeout(function () {
            // 执行第二组动画  
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
            this.setData({
                animationData: animation
            })

            //关闭  
            if (currentStatu == "close") {
                this.setData(
                    {
                        showModalStatus: false
                    }
                );
            }
        }.bind(this), 200)

        // 显示  
        if (currentStatu == "open") {
            this.setData(
                {
                    showModalStatus: true
                }
            );
        }
    },


 /////////////////////
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取当前时间
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      var hour = myDate.getHours()
      var minute = myDate.getMinutes()
      var second = myDate.getSeconds()
      if(month<10){
          month = '0' + month
      }
        this.setData({
            date:year+'-'+month+'-'+day,
            dat: year + '-' + month + '-' + day,
            time:'00:00'
        })

        
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  }

})
var app = getApp()
Page({
    data: {
    data_list:[],
    vue:{},
    npm:{},
    pip:{},
    pid:null,
    downid:null,
    personInfo:null,
    flag:false,
    a:true,
    b:true,
    c:true,
    d:true,
    e:true
    },

preview:function(){
    wx.navigateTo({
        url: '../simple/simple?id=' + this.data.pid,
    })
},

cut:function(e){
    let that = this;
    var downid = e.currentTarget.dataset.id;
    var personInfo = this.data.pip[downid];
    console.log(personInfo)
    wx.showModal({
        title: '是否补签？',
        content: '这个操作无法撤回',
        success:function(res){
            if(res.confirm){
                wx.request({
                    url: 'https://tadcap.com/sign',
                    data:{
                        userId: personInfo.user_id,
                        projectId:that.data.pid
                    },
                    success:function(res){
                        that.onShow();
                    }
                    
                })
            }
        }
    })
},

    onLoad: function (options) {
        var id = options.id
        var that = this;
        that.setData({
            pid:id
        });
        wx.request({
            url: 'https://tadcap.com/getProjectInfo?projectId=' + id,
            success: function (res) {
                // console.log(res)
                let a = true, b = true, c = true, d = true, e = true;
                if(res.data.diy_name1 == '未选中'){
                    a = false;
                }
                if (res.data.diy_name2 == '未选中') {
                    b = false;
                }
                if (res.data.diy_name3 == '未选中') {
                    c = false;
                }
                if (res.data.diy_name4 == '未选中') {
                    d = false;
                }
                if (res.data.diy_name5 == '未选中') {
                    e = false;
                }
                that.setData({
                    vue:res.data,
                    a:a,
                    b:b,
                    c:c,
                    d:d,
                    e:e
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
        let that = this;
        /////
        wx.request({
            url: 'https://tadcap.com/getJoinerInfo?projectId=' + that.data.pid,
            success: function (res) {
                // console.log(res)
                that.setData({
                    data_list: res.data,
                    npm: res.data
                })
            }
        })

        wx.request({
            url: 'https://tadcap.com/unSign?projectId=' + that.data.pid,
            success: function (res) {
                // console.log(666666666666666666)
                // console.log(res.data)
                if (res.data.length == 0) {
                    that.setData({
                        flag: true
                    });
                }
                that.setData({
                    pip: res.data
                });
            }
        })
        
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
    onPullDownRefresh(event) {
        setTimeout(wx.stopPullDownRefresh(), 2500)
    },

    //复制过来的
powerDrawer: function (e) {  
    var currentStatu = e.currentTarget.dataset.statu;
    var downid = e.currentTarget.dataset.id;
    var personInfo = this.data.pip[downid];
    console.log(personInfo)
    this.setData({
        personInfo: personInfo
    });
    this.util(currentStatu)  
  },  
  util: function(currentStatu){  
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
  }  
  ////////////////////////////////
})
var app = getApp()
Page({
    data: {
    data_list:[],
    vue:{},
    npm:{},
    pip:{},
    pid:null

    },

preview:function(){
    wx.navigateTo({
        url: '../simple/simple',
    })
},

cut:function(){
    wx.showModal({
        title: '是否补签？',
        content: '这个操作无法撤回',
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
                console.log(res)
                that.setData({
                    vue:res.data
                })
            }
        })
        /////
        wx.request({
            url: 'https://tadcap.com/getJoinerInfo?projectId=' + id,
            success: function (res) {
                console.log(res)
                that.setData({
                    npm: res.data
                })
            }
        })

        wx.request({
            url: 'https://tadcap.com/unSign?projectId=' + id,
            success: function (res) {
                console.log(res)
                that.setData({
                    pip: res.data
                });
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
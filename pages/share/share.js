// pages/share/share.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      vue: {},
      name: '',
      head : '',
      block:'a',
      time: '',
      dataList: [],
      num:0
  },

enter:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
        url: '../enter/enter?id=' + id,
    })
},


    formSubmit: function (event) {

        

    },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // wx.showModal({
    //     title: '温馨提示',
    //     content: '第一次使用本小程序报名需点击授权才可以报名成功',
    //     showCancel:false
    // })
    var id = options.id
    var that = this
    wx.request({
        url: 'https://tadcap.com/getProjectInfo?projectId=' + id,
        success: function (res) {
            // //把时间转化成能看的
            var begin = res.data.start_time
            var time = new Date(parseInt(begin)).toLocaleString().replace(/:\d{1,2}$/, ' ');
            that.setData({
                vue: res.data,
                time: time
            })
            //获取任务创建者信息
            wx.request({
                url: 'https://tadcap.com/getUserInfo',
                data: {
                    userId:res.data.creator
                },
                success:function(res){
                    that.setData({
                        name: res.data.nickname,
                        head: app.data.avatar
                    });
                }
            })

            
        }
    })
    ///
    wx.request({
        url: 'https://tadcap.com/getJoinerInfo?projectId=' + id,
        success: function (res) {
            if (res.data.length === 0) {
                that.setData({
                    num:0
                })
            }
            else{
                var dataList = []
                for(let j = 0; j<res.data.length; j++){
                        dataList.push(res.data[j].avatar)
                }
                console.log(dataList)
                that.setData({
                    num: res.data.length,
                    dataList:dataList
                })
            }
        }
    })

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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
// pages/nextpage2/nextpage2.js

const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({

})
Component({

    data: {

        ifbookin: false,
        container_hide: false,
        add_success: true,
        add_fail: true,
        TabBarvalue: 'label_1',
        inputValue: '',
        bookInfo: [],
        list: [{
                value: 'label_1',
                icon: 'search',
                ariaLabel: '搜索'
            },
            {
                value: 'label_2',
                icon: 'wallet',
                ariaLabel: '图书馆'
            },
            {
                value: 'label_3',
                icon: 'user',
                ariaLabel: '个人中心'
            },
        ],
    },



    methods: {
        onLoad: function (options) {
            // 获取上一个页面传入的输入框的值并存入data
            this.setData({
                inputValue: options.inputValue
            })
            var that = this
            wx.cloud.init()
            wx.cloud.database().collection('Books').where({
                    _openid: 'app.globalData.openid',
                    title: that.data.inputValue,
                })
                .get({
                    success: function (res) {
                        console.log(res.data)
                        that.setData({
                            bookInfo: res.data
                        });
                    }
                })
        },




        /*底部导航栏*/
        TabBarChange(e) {
            this.setData({
                TabBarvalue: e.detail.value,
            });

            if (this.data.TabBarvalue == 'label_1') {
                app.globalData.PageNumber = app.globalData.PageNumber + 1
                if (app.globalData.PageNumber == 9) {
                    app.globalData.PageNumber = 1
                    wx.reLaunch({
                        url: '/pages/firstpage/firstpage'
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/firstpage/firstpage' // 跳转到目标页面
                    })
                }
            }

            if (this.data.TabBarvalue == 'label_2') {
                app.globalData.PageNumber = app.globalData.PageNumber + 1
                if (app.globalData.PageNumber == 9) {
                    app.globalData.PageNumber = 1
                    wx.reLaunch({
                        url: '/pages/nextpage1/nextpage1'
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/nextpage1/nextpage1' // 跳转到目标页面
                    })
                }
            }

            if (this.data.TabBarvalue == 'label_3') {
                app.globalData.PageNumber = app.globalData.PageNumber + 1
                if (app.globalData.PageNumber == 9) {
                    app.globalData.PageNumber = 1
                    wx.reLaunch({
                        url: '/pages/personpage/personpage'
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/personpage/personpage' // 跳转到目标页面
                    })
                }
            }



        },
        /*底部导航栏*/

        /*顶部导航栏*/
        onBack() {
            wx.navigateBack({
                delta: 1
            });
        },
        onGoHome() {
            wx.reLaunch({
                url: '/pages/firstpage/firstpage',
            });
        },
        /*顶部导航栏*/




    },

});
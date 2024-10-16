// pages/firstpage/firstpage.js
const app = getApp()
Page({

})
Component({
    onLoad: function (options) {
        wx.cloud.init()
        let that = this;
        wx.cloud.callFunction({
            name: 'GetID',
            success: res => {
                console.log('openid: ', res.result.openid)
                if (app.globalData.openid != res.result.openid) {
                    app.globalData.openid = res.result.openid
                }
                console.log('id: ', app.globalData.openid)
                // var openid = res.result.openId;
                // that.setData({
                //   openid: openid
                // })
            }
        })
    },

    data: {
        TabBarvalue: 'label_1',
        input_value: 'none',
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
        input(e) {

            this.setData({
                input_value: e.detail.value,
            });

            app.globalData.PageNumber = app.globalData.PageNumber + 1
            if (app.globalData.PageNumber == 9) {
                app.globalData.PageNumber = 1
                wx.reLaunch({
                    url: '/pages/firstnext/firstnext'
                })
            } else {
                wx.navigateTo({
                    url: '/pages/firstnext/firstnext?input_value=' + this.data.input_value // 跳转到目标页面
                })
            }
        },
    },

});
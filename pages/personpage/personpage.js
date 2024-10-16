// pages/personpage/personpage.js
const app = getApp()

Page({


})
Component({

    data: {
        id: "",
        avatarUrl: "",
        TabBarvalue: 'label_3',
        mid: {},
        input_value: 'none',
        hide: true,
        hide_id: true,
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

    ready() {
        setTimeout(() => {
            this.setData({
                enable: true
            });
        }, 1000);
    },

    methods: {
        onLoad: function (options) {
            this.setData({
                id: app.globalData.ID
            })
            this.setData({
                avatarUrl: app.globalData.defaultAvatarUrl
            })
            if (app.globalData.person_tap >= 1) {
                this.setData({
                    hide: true
                })
                this.setData({
                    hide_id: false
                })
            } else {
                this.setData({
                    hide: false
                })
                this.setData({
                    hide_id: true
                })
            }
        },
        onChooseAvatar(e) {
            const {
                avatarUrl
            } = e.detail
            this.setData({
                avatarUrl,
            })
            app.globalData.defaultAvatarUrl = avatarUrl

        },
        tap() {
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
            app.globalData.person_tap = app.globalData.person_tap + 1
            this.onLoad()
        },

        input(e) {
            app.globalData.ID = e.detail.value
            console.log(e.detail.value)
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

        handleClick(e) {
            console.log(e);
            wx.navigateTo({
                url: '/pages/chat/chat' // 跳转到目标页面
            })
        },

    },
});
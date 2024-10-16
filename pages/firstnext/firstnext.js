// pages/firstnext/firstnext.js
const app = getApp()
Page({

})
Component({

    data: {
        ifbookin: false,
        container_hide: false,
        add_success: true,
        add_fail: true,
        TabBarvalue: 'label_1',
        input_value: '',
        bookInfo: {},
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
                input_value: options.input_value
            })
            this.searchBookByISBN();
        },
        // 在 onLoad 或其他适当的时机调用该方法来请求API数据
        searchBookByISBN: function () {
            const apiUrl = 'http://feedback.api.juhe.cn/ISBN'; // API接口地址
            const appKey = 'ba4e7611b2d3fe7dfd6a72e062923279'; // 申请的APPKEY
            const isbn = this.data.input_value; // 实际的ISBN码

            wx.request({
                url: apiUrl,
                method: 'GET',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    key: appKey,
                    sub: isbn
                },
                success: (res) => {
                    // 请求成功，获取API返回的数据
                    const apiResponse = res.data;

                    if (apiResponse.error_code === 0) {
                        // 请求成功且无错误
                        const bookInfo = {
                            title: apiResponse.result.title,
                            subtitle: apiResponse.result.subtitle,
                            author: apiResponse.result.author,
                            pubdate: apiResponse.result.pubdate,
                            publisher: apiResponse.result.publisher,
                            binding: apiResponse.result.binding,
                            pages: apiResponse.result.pages,
                            price: apiResponse.result.price,
                            summary: apiResponse.result.summary,
                            images_medium: apiResponse.result.images_medium,
                            images_large: apiResponse.result.images_large,
                        };

                        // 将获取的书籍信息存储到 this.data.bookInfo 中
                        this.setData({
                            bookInfo
                        });
                        var that = this
                        wx.cloud.init()
                        wx.cloud.database().collection('Books').where({
                                _openid: 'app.globalData.openid',
                                isbn: that.data.input_value,
                            })
                            .get({
                                success: function (res) {
                                    console.log(res.data)
                                    if (res.data.length != 0) {
                                        that.setData({
                                            ifbookin: true
                                        });
                                    }

                                }
                            })
                    } else {
                        // 请求成功但有错误
                        console.error('API请求失败', apiResponse.reason);
                    }
                },
                fail: (error) => {
                    // 请求失败，处理错误信息
                    console.error('API请求失败', error);
                }
            });
        },

        // 添加数据
        add(e) {
            var that = this
            wx.cloud.init()
            if (!this.data.ifbookin) {
                wx.cloud.database().collection('Books').add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                        title: this.data.bookInfo.title,
                        subtitle: this.data.bookInfo.subtitle,
                        author: this.data.bookInfo.author,
                        pubdate: this.data.bookInfo.pubdate,
                        publisher: this.data.bookInfo.publisher,
                        binding: this.data.bookInfo.binding,
                        pages: this.data.bookInfo.pages,
                        price: this.data.bookInfo.price,
                        summary: this.data.bookInfo.summary,
                        images_medium: this.data.bookInfo.images_medium,
                        images_large: this.data.bookInfo.images_large,
                        isbn: this.data.input_value,
                        thoughts: '',
                        
                    },
                    success: function (res) {
                        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                        that.setData({
                            add_success: false
                        });
                        that.setData({
                            container_hide: true
                        })
                        console.log(res)
                    }
                })
            } else {
                this.setData({
                    add_fail: false
                });
                this.setData({
                    container_hide: true

                })
            }

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
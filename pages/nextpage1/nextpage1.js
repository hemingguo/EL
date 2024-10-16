// pages/nextpage1/nextpage1.js
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
Component({

    data: {
        collapseValue: null,
        book: [],
        showDeleteConfirm: false,
        deleteIndex: null,
        input: '',
        /*搜索-是否显示窗口 */
        showDialog: false, // 控制弹窗显示隐藏
        inputValue: '', // 输入框的值
        /*搜索-是否显示窗口 */


        TabBarvalue: 'label_2',
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
        // 新增保存感想按钮点击事件
        saveThoughts(e) {
            const index = e.currentTarget.dataset.index;
            const bookId = this.data.book[index]._id;
            const thoughts = [this.data.input]; // 将新输入的感想作为一个新的数组

            wx.cloud.database().collection('Books').doc(bookId).update({
                data: {
                    thoughts: thoughts // 更新感想数组
                },
                success: res => {
                    console.log('保存成功', res);
                    this.setData({
                        [`book[${index}].thoughts`]: thoughts, // 更新对应书籍的感想数组
                        input: '' // 清空输入框
                    });
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success'
                    });
                },
                fail: error => {
                    console.error('保存失败', error);
                    wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                    });
                }
            });
        },


        onThoughtsInput(e) {
            this.setData({
                input: e.detail.value
            });
        },


        showDeleteConfirm(e) {
            const index = e.currentTarget.dataset.index;
            this.setData({
                showDeleteConfirm: true,
                deleteIndex: index
            });
        },

        cancelDelete() {
            this.setData({
                showDeleteConfirm: false,
                deleteIndex: null
            });
        },
        confirmDelete() {
            const index = this.data.deleteIndex;
            const bookId = this.data.book[index]._id;

            wx.cloud.database().collection('Books').doc(bookId).remove()
                .then(res => {
                    console.log('删除成功', res);
                    const updatedBook = this.data.book.filter((_, i) => i !== index);
                    this.setData({
                        book: updatedBook,
                        showDeleteConfirm: false,
                        deleteIndex: null
                    });

                    // 更新折叠面板的展开状态
                    const updatedCollapseValue = this.data.collapseValue.filter(value => value !== index);
                    this.setData({
                        collapseValue: updatedCollapseValue
                    });

                    wx.showToast({
                        title: '删除成功',
                        icon: 'success'
                    });
                })
                .catch(error => {
                    console.error('删除失败', error);
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none'
                    });
                });
            wx.reLaunch({
                url: '/pages/nextpage1/nextpage1'
            })
        },

        onLoad(options) {
            var that = this;
            wx.cloud.init();
            wx.cloud.database().collection('Books').where({
                    _openid: 'app.globalData.openid',
                })
                .get({
                    success: function (res) {
                        console.log(res.data);
                        that.setData({
                            book: res.data,
                            collapseValue: new Array(res.data.length).fill(null) // 初始化为关闭状态
                        });
                    }
                });
        },
        /**
         * 弹窗显示隐藏控制函数
         */
        toggleDialog() {
            this.setData({
                showDialog: !this.data.showDialog
            });
        },

        /**
         * 输入框输入内容时触发的函数
         */
        bindInput(e) {
            this.setData({
                inputValue: e.detail.value
            });
        },

        /**
         * 弹窗确定按钮点击事件
         */
        confirmDialog(e) {
            console.log('输入的值为：', this.data.inputValue);

            this.toggleDialog(); // 关闭弹窗
            app.globalData.PageNumber = app.globalData.PageNumber + 1
            wx.navigateTo({
                url: '/pages/nextpage2/nextpage2?inputValue=' + this.data.inputValue // 跳转到目标页面 
            })
            this.setData({
                inputValue: ''
            });
        },

        /**
         * 弹窗取消按钮点击事件
         */
        cancelDialog() {
            this.setData({
                inputValue: ''
            });
            this.toggleDialog(); // 关闭弹窗
        },

        /*搜索-是否显示窗口 */

        /*刷新页面 */
        shuaxin() {
            wx.reLaunch({
                url: '/pages/nextpage1/nextpage1'
            })
        },
        /*刷新页面 */
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
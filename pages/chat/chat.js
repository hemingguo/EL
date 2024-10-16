// pages/chat/chat.js
const app = getApp()
Page({

})
Component({
    data: {
        userInput: '', // 用户输入的文本
        chatHistory: [], // 对话记录

        TabBarvalue: 'label_3',
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
        // 处理用户输入
        handleInput(e) {
            this.setData({
                userInput: e.detail.value
            });
        },

        // 发送用户输入并获取回复
        sendMessage() {
            const {
                userInput,
                chatHistory
            } = this.data;
            if (!userInput) {
                return;
            }

            // 添加用户输入到对话记录
            const newMessage = {
                content: userInput,
                sender: 'user'
            };
            this.setData({
                chatHistory: [...chatHistory, newMessage],
                userInput: ''
            });
            var that = this
            // 发送用户输入到 ChatGPT API
            wx.request({
                url: 'https://stream.api2d.net/v1/chat/completions',
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + 'fk204012-5a3A22MLZk4h1rS9FISLaAcu2ERnBQmu'
                    // 替换为你的 ChatGPT API 密钥
                    // "model": "gpt-3.5-turbo"

                },

                data: {
                    model: 'gpt-3.5-turbo',
                    messages: [ //{
                        // role: 'system',
                        //  content: 'user'
                        // },
                        {
                            role: 'user',
                            content: userInput
                        }
                    ]
                },
                success: (res) => {
                    console.log('success')
                    const {
                        choices
                    } = res.data;
                    if (choices && choices.length > 0) {
                        // 提取回复内容
                        const reply = choices[0].message.content;

                        // 添加回复到对话记录
                        const replyMessage = {
                            content: reply,
                            sender: 'bot'
                        };
                        this.setData({
                            chatHistory: [...chatHistory, replyMessage]
                        });
                    }
                },
                fail: (error) => {
                    console.error('Failed to send message:', error);
                }
            });
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
    }

})
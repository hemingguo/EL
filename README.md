[TOC]
---
#🔥2023EL交互组项目文档

> hemingguo 2023/5/27


## 基本概况
- **项目名称**：S & L
- **LOGO**：<img src="./R-C.png" alt="R-C" style="zoom:5%;" />
- **项目类型**：微信小程序
- **项目功能**：个人电子图书检索储存管理的轻量级小程序
- **队伍名称**：***Error***
- **成员介绍**：
  
   | 姓名 | 任务      |
   |:--------:| :-------------|
   | *蒋庠* | 队长，前端部分UI构造，API调用，部分逻辑功能实现，项目文档。 |
   | *吕一帆* | 数据库管理者，云函数，PPT制作。 |
   | *史茗宇* | 前端部分UI构造，API调用，云函数，大部分逻辑功能实现。 |
   | *周宏宇* | 数据库管理者，云函数，PPT制作。 |
- **任务周期**：1.需求分析，构思规划，美术概念图  ---> 24天
  
  ​                   2.基本框架搭建  ---> 7天
  
  ​                   3.基本功能实现 ---> 15天
  
  ​                   4.完善功能，后期准备工作 ---> 5天
  
  ---

## 项目详情
###UI框架
1.***组件***  ：使用官方TDesign组件库[^1]，搭建基本的导航栏，标签栏，以及一部分的按钮，弹窗。

2.***页面***：标签栏三大主页面（搜索，图书馆，个人中心），

         firstpage:搜索主页面
         firstnext:搜索跳转目标页面
         nextpage1:图书馆主页
         nextpage2:图书馆跳转目标页面
         personpage：个人中心
         chat:聊天功能
具体页面关系详见Project_Tree.md


### 主要功能
#### 🔎 *搜索*  
调用了第三方搜索API[^2]，利用图书唯一的ISBN码为请求参数，返回图书的封面图片，名称，出版社，页数，出版日期，装订方式，图书简介。让用户对图书的基本信息一目了然。

#### ⬆︎  *存储* 
利用小程序的云数据库，用户可以将心仪的图书储存至自己的个人云端图书馆，并包含了图书的绝大部分信息。

#### 📚︎ *管理* 
为用户提供了对图书的**删除，检索，笔记**的功能，用户可以删除不想看或者看完的书籍，检索自己的图书馆是否有某本书籍，在读某本书后可以记录感想，收获，或是记录读书页数作为电子书签。

#### 💬 *聊天*
为部分内向的用户提供智能聊天环境[^3]，可以与机器人交流读书，分享心得，同时也鼓励用户和其它用户分享图书，交流收获。

[^1]: Wechat MiniProgram组件库，详见：https://tdesign.tencent.com/miniprogram/getting-started
[^2]: 聚合数据ISBN数据查询，返回格式：json, 请求方式：get，详见：https://www.juhe.cn/docs/api/id/212
[^3]:内置chatgpt接口。

---

## 代码分析

### UI搭建

```html
<!-- 顶部导航栏 -->
<t-navbar title="S & L">
    <view slot="capsule" class="custom-capsule">
        <t-icon size="25" bind:tap="onBack" aria-role="button" aria-label="返回" name="chevron-left" class="custom-capsule__icon" />
        <t-icon size="25" bind:tap="onGoHome" aria-role="button" aria-label="首页" name="home" class="custom-capsule__icon" />
    </view>
</t-navbar>
<!-- 顶部导航栏 -->

<!-- 底部标签栏 -->
<view class="TabBar">
    <t-tab-bar value="{{TabBarvalue}}" bindchange="TabBarChange" shape="round" theme="tag" split="{{false}}" fixed="{{false}}">
        <t-tab-bar-item wx:for="{{list}}" wx:key="index" value="{{item.value}}" icon="{{item.icon}}" ariaLabel="{{item.ariaLabel}}">
            {{item.label}}
        </t-tab-bar-item>
    </t-tab-bar>
</view>
<!-- 底部标签栏 -->
```



### 页面跳转

```js
    //data
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
```



### API调用
```js
//firstpage页面传值👇
// wx.navigateTo({
//                    url: '/pages/firstnext/firstnext?input_value=' + this.data.input_value // 跳转到目标页面
//                })

//data
input_value: '',
bookInfo: {},
    
    
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
            const appKey = '*****'; // 申请的APPKEY
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
            
 //chatgpt:           
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
                    'Authorization': 'Bearer ' + '****'
                    // 替换为你的 ChatGPT API 密钥
                    // "model": "gpt-3.5-turbo"

                },
```


### 添加&&删除&&查找

```js
//add
add(e) {
            var that = this
            wx.cloud.init()
            if (!this.data.ifbookin) {
                wx.cloud.database().collection('Books').add({
                    // data 字段表示需新增的 JSON 数据
                    data: {                  
                        // 登陆后，每个用户根据自己的微信号获得个人id
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
                        note: '',
                        leaf: '',
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
// delete
confirmDelete() {
            const index = this.data.deleteIndex;
            const bookId = this.data.book[index]._id;

            wx.cloud.database().collection('Books').doc(bookId).remove()
                .then(res => {
                    console.log('删除成功', res);
                    const updatedBook = this.data.book.filter((_, i) => i !== index);
                    this.setData({
                        book: updatedBook,//更新图书馆
                        showDeleteConfirm: false,//关闭弹窗
                        deleteIndex: null//删除该图书的容器面板
                    });
// search
 onLoad: function (options) {
            // 获取上一个页面传入的输入框的值并存入data
            this.setData({
                inputValue: options.inputValue
            })
            var that = this
            wx.cloud.init()
            wx.cloud.database().collection('Books').where({
                    _openid: 'app.globalData.openid',
                    title: that.data.inputValue,//查找匹配条件为书名
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
```


### 折叠面板

```html
<!-- 折叠面板-->
<scroll-view scroll-y style="height: 1000rpx;" class="scroll">
    <t-collapse theme="card" defaultValue="{{collapseValue}}" expandMutex expandIcon>
        <block wx:for="{{book}}" wx:key="index">
            <t-collapse-panel header="{{book[index].title}}" value="{{index}}">
                <view class="panel-content">
                    <image class="thumbnail" src="{{book[index].images_medium}}"></image>
                    <view class="book-info">
                        <view class="book-info-item">作者：{{book[index].author}}</view>
                        <view class="book-info-item">出版社：{{book[index].publisher}}</view>
                        <view class="book-info-item">出版日期：{{book[index].pubdate}}</view>
                        <view class="book-info-item">简介：
                            <view wx:if="{{book[index].summary}}">{{book[index].summary}}</view>
                            <view wx:else>暂无</view>
                        </view>
                        <t-button theme="danger" icon="delete" bindtap="showDeleteConfirm" data-index="{{index}}" shape="circle" size="large" class="delete" aria-label="删除"></t-button>

                    </view>
                </view>
            </t-collapse-panel>
        </block>
    </t-collapse>
</scroll-view>
<!-- 折叠面板-->
```

### 读书感想

```js
	onThoughtsInput(e) {
            this.setData({
                input: e.detail.value
            });
        },
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



```


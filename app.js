import MPServerless from '@alicloud/mpserverless-sdk';
App({

    globalData: {
        PageNumber: 1,
        openid: 1,
        defaultAvatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
        person_tap: 0,
        ID: '',


    },



});


const mpserverless = new MPServerless(wx, {
    appId: 'wxca6ab18d7fc776d9',
    spaceId: 'mp-83b1810f-7263-47e6-a1d8-c1d5e9d6e0dc',
    clientSecret: 'mgh8n4Ya0adseXyKYMla8w==',
    endpoint: 'https://api.next.bspapp.com'
});
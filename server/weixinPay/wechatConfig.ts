let request = require('request');
let crypto = require('crypto');
let qs = require('querystring');
let xml2js = require('xml2js');


export class WechatConfig {

}








let wechat = {};

// 微信基本数据
wechat.config = {
    // 微信公众号 appid
    appId: 'wxbc8b10***********',
    // 微信公众号 appsecret
    appSecret: 'c9934********************',
    // 微信商户号，微信支付要用到的
    mch_id: '***********',
    // 微信支付的api-key
    api_key: '***************',

    // 获取微信基础access-token的url
    accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    // 获取微信网页授权所需的jsapi-ticket的url
    ticketUrl: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=',

    // 微信支付是否支持信用卡支付
    limit_pay: 'no_credit',
    // 微信支付回调通知支付结果
    notify_url: 'http://www.jmkbio.com/wechat/wxpay-cb',
    //微信支付统一下单的prepay_id的url
    prepay_id_url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',

    //正式环境的微信端auth2.0网页授权回调URL
    webAuthServerUrl: 'http://www.******.com/wechat/authtoken',

    //微信网页授权第一步所要请求获得code的URL
    webAuthCodeUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
    //微信网页授权所需的access_token，用于获取到用户的openid等信息
    webAuthTokenUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
};

//用于存储微信的基础access-token值，每天有请求限制次数
let gloAccessTokenData = {};

//公众号微信端页面请求所需jsapi-ticket数据缓存，每天有请求限制，用于签名并返回给前端构造wx.config
let jsapiTicketData = {};

//2小时过期时间，60*60*2
let expireTime = 7200 - 100;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wexinSetting = require("./weixinSetting");
var wechatGenerateService_1 = require("./wechatGenerateService");
var GenerateWechatCommandOrder = (function () {
    function GenerateWechatCommandOrder() {
        this.wechatGenerateService = new wechatGenerateService_1.WechatGenerateService();
        this.requestUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    }
    GenerateWechatCommandOrder.prototype.generatePreOrderOption = function () {
        var time = new Date();
        // let noceStr =
        var option = {
            appid: wexinSetting.appid,
            mch_id: wexinSetting.mch_id,
            //device_info?: string
            nonce_str: this.wechatGenerateService.generateRandomString(20)
            //签名
            ,
            //签名
            sign: string,
            //签名类型 sign_type?: "MD5" | "HMACSHA256"
            //商品描述
            body: wexinSetting.body,
            //商品详情 detail?: string
            //附加信息 attach?: string
            //商品订单号
            out_trade_no: this.wechatGenerateService.generateOrderNumber(time)
            //货币币种 fee_type?: string
            //标价金额
            ,
            //货币币种 fee_type?: string
            //标价金额
            total_fee: number
            //终端ip
            ,
            //终端ip
            spbill_create_ip: string
            //订单生成时间
            ,
            //订单生成时间
            time_start: this.wechatGenerateService.dealTimeFormat(time),
            //订单结束时间
            time_expire: this.wechatGenerateService.generateDealEndTime(time, 30),
            //订单优惠tag goods_tag?: string,
            // 微信支付回调通知支付结果
            notify_url: wexinSetting.url,
            trade_type: "JSAPI"
            //trade_type 为NATIVE 及扫码支付 必填 product_id?: string
            // 微信支付是否支持信用卡支付
            ,
            //trade_type 为NATIVE 及扫码支付 必填 product_id?: string
            // 微信支付是否支持信用卡支付
            limit_pay: "no_credit"
            //用户标识 trade_type=JSAPI时（即公众号支付），此参数必传，
            ,
            //用户标识 trade_type=JSAPI时（即公众号支付），此参数必传，
            openid: string
        };
    };
    return GenerateWechatCommandOrder;
}());
exports.GenerateWechatCommandOrder = GenerateWechatCommandOrder;

export declare namespace WechatOption {
    interface CommonOrderWeChatOption {
        // 微信公众号 appid
        appid: string

        // 微信商户号，微信支付要用到的
        mch_id: string

        //终端设备号
        device_info?: string

        //随机字符串
        nonce_str: string

        //签名
        sign: string

        //签名类型
        sign_type?: "MD5" | "HMACSHA256"

        //商品描述
        body: string

        //商品详情
        detail?: string

        //附加信息
        attach?: string

        //商品订单号
        out_trade_no: string

        //货币币种
        fee_type?: string

        //标价金额
        total_fee: number

        //终端ip
        spbill_create_ip: string

        //订单生成时间
        time_start?: string

        //订单结束时间
        time_expire?: string

        //订单优惠tag
        goods_tag?: string

        // 微信支付回调通知支付结果
        notify_url: string

        trade_type: "JSAPI" | "NATIVE" | "APP"

        //trade_type 为NATIVE 及扫码支付 必填
        product_id?: string

        // 微信支付是否支持信用卡支付
        limit_pay?: "no_credit"

        //用户标识 trade_type=JSAPI时（即公众号支付），此参数必传，
        openid: string

        //该字段用于上报场景信息，目前支持上报实际门店信息。
        scene_info?: JSON
    }

    // 公众号支付 原生扫码支付 app支付 刷卡支付
    type tradeType = "JSAPI" | "NATIVE" | "APP" | "MICROPAY"


    interface wxAccessToken {
        access_token: string
        expires_in: number
    }

    interface

}


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wxSetting = require("./weixinSetting");
var request = require("request");
var accessToken = (function () {
    function accessToken(db) {
        this.db = db;
    }
    accessToken.prototype.getNewAccessToken = function (callback) {
        var _this = this;
        var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&app=" + wxSetting.appid + "&secret=" + wxSetting.appsecret;
        request.get(url, function (err, res, body) {
            if (err) {
                callback(err);
            }
            else {
                _this.Mon;
                var col = _this.db.collection("accessToken");
                var wxAccessToken = JSON.parse(body);
                var accessToken_1 = { name: "accessToken", accessToken: wxAccessToken.access_token };
                callback(JSON.parse(res.body));
            }
        });
    };
    accessToken.prototype.generateUrl = function () {
        var originUrl = "https://api.weixin.qq.com/cgi-bin/token?";
        var grant_type = grant_typeclient_credential;
    };
    return accessToken;
}());
exports.accessToken = accessToken;
"&appid=APPID&secret=APPSECRET";

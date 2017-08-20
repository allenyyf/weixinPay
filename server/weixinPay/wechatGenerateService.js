"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WechatGenerateService = (function () {
    function WechatGenerateService() {
    }
    WechatGenerateService.prototype.generateRandomString = function (length) {
        var text = " ";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    };
    WechatGenerateService.prototype.generateTimestamp = function () {
        var time = new Date();
        var millisecond = time.getTime();
        var seconde = Math.round(millisecond / 1000);
    };
    WechatGenerateService.prototype.dealTimeFormat = function (Time) {
        var time = Time;
        var year = time.getFullYear().toString();
        var month = this.addZero((time.getMonth() + 1).toString());
        var date = this.addZero(time.getDate().toString());
        var hour = this.addZero(time.getHours().toString());
        var minute = this.addZero(time.getMinutes().toString());
        var second = this.addZero(time.getSeconds().toString());
        var startTime = year + month + date + hour + minute + second;
        return startTime;
    };
    WechatGenerateService.prototype.addZero = function (string) {
        if (string.length == 1) {
            return "0" + string;
        }
        return string;
    };
    WechatGenerateService.prototype.generateDealEndTime = function (Time, durationMinutes) {
        var time = Time.getTime();
        var endTime = time + durationMinutes * 60 * 1000;
        var endDate = new Date();
        endDate.setTime(endTime);
        return this.dealTimeFormat(endDate);
    };
    WechatGenerateService.prototype.generateOrderNumber = function (beginTime) {
        var time = this.dealTimeFormat(beginTime);
        var randomString = this.generateRandomString(15);
        var orderNumber = time + randomString;
        return orderNumber;
    };
    WechatGenerateService.prototype.generateCustomerIp = function () {
    };
    WechatGenerateService.prototype.generateSignature = function (option) {
        var copyOption = JSON.parse(JSON.stringify(option));
        var arrayOption = [];
        var sortArrayOption = [];
        var signatureString = "";
        for (var key in copyOption) {
            var value = copyOption[key];
            var keyValue = key + ":" + value;
            arrayOption.push(keyValue);
        }
        var len = arrayOption.length;
        for (var i = 0; i < len; i++) {
            for (var j = len - 1; j > i; j--) {
                var nextKey = arrayOption[j].split(":")[0];
                var key = arrayOption[j - 1].split(":")[0];
                var keyLenght = key.length;
                var nextKeyLength = nextKey.length;
                var minLength = Math.min(keyLenght, nextKeyLength);
                for (var k = 0; k < minLength; k++) {
                    if (key.charCodeAt(k) < nextKey.charCodeAt(k)) {
                        break;
                    }
                    else if (key.charCodeAt(k) == nextKey.charCodeAt(k)) {
                        if (k + 1 == minLength) {
                            if (minLength == nextKeyLength) {
                                var originKeyValue = arrayOption[j - 1];
                                arrayOption[j - 1] = arrayOption[j];
                                arrayOption[j] = originKeyValue;
                            }
                        }
                    }
                    else {
                        var originKeyValue = arrayOption[j - 1];
                        arrayOption[j - 1] = arrayOption[j];
                        arrayOption[j] = originKeyValue;
                        break;
                    }
                }
            }
        }
        arrayOption.forEach(function (keyValue) {
            var keyValueArray = keyValue.split(":");
            if (keyValueArray[1]) {
                signatureString += keyValueArray[0] + "=" + keyValueArray[1] + "&";
            }
        });
        return signatureString.slice(0, -1);
    };
    return WechatGenerateService;
}());
exports.WechatGenerateService = WechatGenerateService;

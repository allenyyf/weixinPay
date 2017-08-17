"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenerateWechatCommandOrder = (function () {
    function GenerateWechatCommandOrder() {
    }
    GenerateWechatCommandOrder.prototype.generateRandomString = function (length) {
        var text = " ";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    };
    GenerateWechatCommandOrder.prototype.generateTimestamp = function () {
        var time = new Date();
        var millisecond = time.getTime();
        var seconde = Math.round(millisecond / 1000);
    };
    GenerateWechatCommandOrder.prototype.generateDealStartTime = function () {
        var time = new Date();
        var year = time.getFullYear().toString();
        var month = (time.getMonth() + 1).toString();
        var date = time.getDate().toString();
        var hour = time.getHours().toString();
        var minute = time.getMinutes().toString();
        var second = time.getSeconds().toString();
        var startTime = year + month + date + hour + minute + second;
        return startTime;
    };
    GenerateWechatCommandOrder.prototype.generateOrderNumber = function () {
        var time = this.generateDealStartTime();
        var randomString = this.generateRandomString(15);
        var orderNumber = time + randomString;
        return orderNumber;
    };
    GenerateWechatCommandOrder.prototype.generateCustomerIp = function () {
    };
    GenerateWechatCommandOrder.prototype.generateSignature = function (option) {
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
    return GenerateWechatCommandOrder;
}());
exports.GenerateWechatCommandOrder = GenerateWechatCommandOrder;

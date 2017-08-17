"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateWechatCommandOrder = (function () {
    function generateWechatCommandOrder() {
    }
    generateWechatCommandOrder.prototype.generateRandomString = function (length) {
        var text = " ";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    };
    generateWechatCommandOrder.prototype.generateTimestamp = function () {
        var time = new Date();
        var millisecond = time.getTime();
        var seconde = Math.round(millisecond / 1000);
    };
    generateWechatCommandOrder.prototype.generateDealStartTime = function () {
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
    generateWechatCommandOrder.prototype.generateOrderNumber = function () {
        var time = this.generateDealStartTime();
        var randomString = this.generateRandomString(15);
        var orderNumber = time + randomString;
        return orderNumber;
    };
    generateWechatCommandOrder.prototype.generateCustomerIp = function () {
    };
    return generateWechatCommandOrder;
}());
exports.generateWechatCommandOrder = generateWechatCommandOrder;

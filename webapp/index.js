window.onload = function () {
    checkWeixinVision();
    bindEvent();
};
//公司，家
var ip = ["192.168.0.100", "192.168.11.144"];
var wechatVersion = 0;
function checkWeixinVision() {
    var ua = navigator.userAgent.toLowerCase();
    var element = document.getElementById("weixin-version");
    var weixinVersion = /micromessenger\/\d/.exec(ua);
    var template = "";
    if (weixinVersion) {
        var version = weixinVersion[0].split("/")[1];
        template = "<h1 id='weixin-version'>\u5FAE\u4FE1\u7248\u672C:" + version + "</h1>";
        wechatVersion = parseInt(version);
    }
    else {
        template = "<h1 id='weixin-version'>\u4E0D\u662F\u5FAE\u4FE1\u6D4F\u89C8\u5668</h1>";
    }
    var div = document.createElement("div");
    div.innerHTML = template;
    document.body.appendChild(div);
}
function bindEvent() {
    document.getElementById("createOrder").addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                console.log(xhr.response);
            }
            else {
            }
        };
        console.log(location.href);
        xhr.open("POST", "http://192.168.0.100:3000/createOrder");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(wechatVersion);
    });
}

window.onload = function () {
    checkWeixinVision();
};
function checkWeixinVision() {
    var ua = navigator.userAgent.toLowerCase();
    console.log(ua);
    var element = document.getElementById("weixin-version");
    var weixinVersion = /micromessenger\/\d/.exec(ua);
    var template = "";
    if (weixinVersion) {
        var version = weixinVersion[0].split("/")[1];
        template = "<h1 id='weixin-version'>\u5FAE\u4FE1\u7248\u672C:" + version + "</h1>";
    }
    else {
        template = "<h1 id='weixin-version'>\u4E0D\u662F\u5FAE\u4FE1\u6D4F\u89C8\u5668</h1>";
    }
    var div = document.createElement("div");
    div.innerHTML = template;
    console.log(div);
    document.body.appendChild(div);
}

//取得auth2.0网页授权code请求Url, _cb用于重定向该url并将后续得到的code值去得到用户的openid值 
/*
  _path: 获取code的回调路径，用于形成最终的微信服务器回调地址
         redirect_uri = baseUrl + _path
  _scope: 取得用户授权的类型，snsapi_base是静默授权并自动跳转到回调页的
          snsapi_userinfo授权需要用户手动同意，并且由于用户同意过，用来获取用户的基本信息
*/
wechat.getWebAuthCodeUrl = function (_path, _scope) {
    _path = _path || '';
    var _codeParams = {
        appid: wechat.config.appId,
        //网页auth2.0授权取得code后的回调地址，需urlencode处理
        redirect_uri: wechat.config.webAuthServerUrl + _path,
        response_type: 'code',
        scope: _scope || 'snsapi_base',
        state: 'STATA'
    };
    var _webCodeUrl = wechat.config.webAuthCodeUrl + qs.stringify(_codeParams) + '#wechat_redirect';
    console.log('web auth get code', _webCodeUrl);
    return _webCodeUrl;
};
//取得网页授权数据, access_token, openid等
wechat.getWebAuthToken = function (_code, _cb, _cbfail) {
    var _tokenParams = {
        appid: wechat.config.appId,
        secret: wechat.config.appSecret,
        code: _code,
        grant_type: 'authorization_code',
    };
    var _webTokenUrl = wechat.config.webAuthTokenUrl + qs.stringify(_tokenParams);
    console.log('web auth get access_token url: ', _webTokenUrl);
    request({
        method: 'get',
        url: _webTokenUrl
    }, function (err, res, body) {
        if (body) {
            var _data = JSON.parse(body);
            console.log('the openid of wx-user is ===', _data.openid);
            _cb && _cb(_data);
        }
        else {
            console.log('fail to get the web auth-token&&openid, error msg is ', err);
        }
    });
};
作者;
深思海数_willschang;
链接;
http: 來源;
简书;
著作权归作者所有;
商业转载请联系作者获得授权;
非商业转载请注明出处;
var object = {
    a: 1, z: 23, ab: 4, bcd: 123, f: 23, za: 23, d: 34, e: 4, b: 2, c: 3
};
generateSignature(object);
function generateSignature(option) {
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
    console.log(signatureString);
}

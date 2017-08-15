"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var bodyParser = require("body-parser");
var expressServer = (function () {
    function expressServer(port, host) {
        this.port = port;
        this.host = host;
        this.init();
    }
    expressServer.prototype.init = function () {
        var _this = this;
        this.server = Express();
        this.server.use(Express.static("../webapp"));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded());
        this.server.listen(this.port, this.host, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("set server success at " + _this.host + ":" + _this.port);
            }
        });
    };
    return expressServer;
}());
exports.expressServer = expressServer;

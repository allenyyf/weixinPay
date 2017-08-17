"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="typings/index.d.ts" />  
var process = require("process");
var expressServer_1 = require("./expressServer");
var path = require("path");
var position = process.argv[2];
var ip = ["192.168.0.112", "192.168.11.144"];
var app = new expressServer_1.expressServer(3000, ip[position]);
app.server.get("/", function (req, res) {
    res.redirect("/index");
});
app.server.get("/index", function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "../webapp/index.html"));
});
app.server.post("/createOrder", function (req, res, callback) {
    var ip = getClientIp(req);
    console.log(req.body);
    console.log(ip);
    res.send("\u4F60\u7684 ip " + ip);
});
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}
;

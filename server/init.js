"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="typings/index.d.ts" />  
var process = require("process");
var expressServer_1 = require("./expressServer");
var path = require("path");
var crypto = require("crypto");
var mongoService_1 = require("./mongoService");
var mongoService = new mongoService_1.MongoService();
mongoService.init();
var position = process.argv[2];
var ip = ["192.168.0.100", "192.168.11.144"];
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
    var col = mongoService.db.collection("accessToken");
    var ipObject = { ip: ip };
    col.insert(ipObject);
    res.send("\u4F60\u7684 ip " + ip);
});
app.server.get("/wx", function (req, res) {
    var wxSignature = req.query.signature;
    var echostr = req.query.echostr;
    if (wxSignature) {
        var signature = checkRequestFrom();
        if (wxSignature == signature) {
            res.send(echostr);
        }
        else {
            res.send("who are you");
        }
    }
    else {
        console.log("fail get signature");
    }
});
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}
function checkRequestFrom() {
    var string = "token" + "timestamp" + "nonce";
    var signature = crypto.createHash("sha1").update(string).digest("hex");
    return signature;
}

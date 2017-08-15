/// <reference path="typings/index.d.ts" />  
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expressServer_1 = require("./expressServer");
var dirname = __dirname;
var app = new expressServer_1.expressServer(3000, "localhost");
app.server.get("/", function (req, res) {
    res.redirect("/index");
});
app.server.get("/index", function (req, res) {
    res.set('Content-Type', 'text/html');
    var name = __dirname + "";
    res.sendFile(__dirname + "/index.html");
});

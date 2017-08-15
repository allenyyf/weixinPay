/// <reference path="typings/index.d.ts" />  
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expressServer_1 = require("./expressServer");
var path = require("path");
var app = new expressServer_1.expressServer(3000, "192.168.11.144");
app.server.get("/", function (req, res) {
    res.redirect("/index");
});
app.server.get("/index", function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "../webapp/index.html"));
});

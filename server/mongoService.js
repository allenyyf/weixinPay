"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = require("mongodb");
var setting = require("./setting");
var MongoService = (function () {
    function MongoService() {
        this.url = "mongodb://" + setting.database.host + ":" + setting.database.port + "/" + setting.database.name;
    }
    MongoService.prototype.init = function () {
        var _this = this;
        console.log(this.url);
        mongodb.MongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.log(err);
            }
            console.log("mongo connect");
            _this.db = db;
            _this.createAccessTokenCollection();
        });
    };
    MongoService.prototype.createAccessTokenCollection = function () {
        var _this = this;
        this.db.createCollection("accessToken", function (err, result) {
            if (err) {
                console.log(err);
            }
            _this.collectionAccessToken = _this.db.collection("accessToken");
            console.log("create access_token collection");
        });
    };
    MongoService.prototype.storageAccessToken = function (accessToken) {
        var access_Token = JSON.stringify(accessToken);
        this.collectionAccessToken.updateOne(access_Token);
    };
    return MongoService;
}());
exports.MongoService = MongoService;
